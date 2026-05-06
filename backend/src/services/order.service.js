const Order = require('../models/Order');
const User = require('../models/User');
const mongoose = require('mongoose');
const rbac = require('../utils/rbac');
const { ApiError } = require('../utils/ApiError');

function serializeOrder(doc) {
  if (!doc) return null;
  const o = doc.toObject ? doc.toObject() : doc;
  const mongoId = o._id ? o._id.toString() : undefined;
  if (o.payload && typeof o.payload === 'object') {
    const out = { ...o.payload };
    if (out.id == null && mongoId) out.id = mongoId;
    out._mongoId = mongoId;
    return out;
  }
  return {
    id: mongoId,
    _mongoId: mongoId,
    customerId: o.customerUserId?.toString?.(),
    customerName: o.customerName,
    customerPhone: o.customerPhone,
    items: o.items,
    total: o.total,
    status: o.status,
    sellerName: o.sellerName,
    date: o.createdAt,
    subTotal: o.subTotal,
    deliveryFee: o.deliveryFee,
    discount: o.discount,
    payment: o.payment,
    shipping: o.shipping,
    notes: o.notes
  };
}

async function findOrderByRef(orderRef) {
  const ref = String(orderRef || '');
  if (mongoose.Types.ObjectId.isValid(ref) && String(new mongoose.Types.ObjectId(ref)) === ref) {
    const byMongo = await Order.findById(ref);
    if (byMongo) return byMongo;
  }
  let byPayload = await Order.findOne({ 'payload.id': ref });
  if (byPayload) return byPayload;
  const num = Number(ref);
  if (!Number.isNaN(num)) {
    byPayload = await Order.findOne({ 'payload.id': num });
    if (byPayload) return byPayload;
  }
  return null;
}

async function createFromCheckout(customerUser, body) {
  if (!customerUser || customerUser.role !== 'customer') {
    throw new ApiError(403, 'فقط العميل يمكنه إنشاء طلب بهذه الطريقة');
  }
  const items = Array.isArray(body.items) ? body.items : [];
  if (items.length === 0) {
    throw new ApiError(400, 'السلة فارغة');
  }

  const payload = { ...body, id: body.id || undefined, date: body.date || new Date().toISOString() };

  const doc = await Order.create({
    customerUserId: customerUser._id,
    customerName: body.customerName || customerUser.fullName || '',
    customerPhone: body.customerPhone || customerUser.phone || '',
    sellerName: body.sellerName || '',
    items,
    subTotal: Number(body.subTotal) || 0,
    deliveryFee: Number(body.deliveryFee) || 0,
    total: Number(body.total) || 0,
    discount: Number(body.discount) || 0,
    status: body.status || 'pending',
    payment: body.payment || {},
    shipping: body.shipping ?? null,
    notes: body.notes || '',
    payload
  });

  const notifBase = {
    title: `طلب جديد بقيمة ${Number(body.total) || 0} ريال`,
    message: `طلب من: ${doc.customerName} | ${doc.customerPhone}`,
    type: 'success',
    date: new Date().toISOString(),
    read: false
  };

  const sellerIds = new Set();
  for (const it of items) {
    const sid = it?.sellerId;
    if (sid && mongoose.Types.ObjectId.isValid(String(sid))) {
      sellerIds.add(String(sid));
    }
  }
  if (sellerIds.size === 0 && doc.sellerName) {
    const sellers = await User.find({ role: 'seller', storeName: doc.sellerName }).select('_id').lean();
    sellers.forEach((s) => sellerIds.add(String(s._id)));
  }

  for (const sid of sellerIds) {
    const n = { ...notifBase, id: `n-${Date.now()}-${sid}` };
    await User.findByIdAndUpdate(sid, {
      $push: { notifications: { $each: [n], $position: 0 } }
    }).catch(() => {});
  }

  return serializeOrder(doc);
}

async function listForUser(user) {
  let q = {};
  if (user.role === 'customer') {
    q = { customerUserId: user._id };
  } else if (user.role === 'seller') {
    const name = user.storeName || '';
    const sid = user._id.toString();
    q = {
      $or: [
        { sellerName: name },
        { 'payload.sellerName': name },
        { 'items.sellerId': sid },
        { 'items.sellerId': user._id }
      ]
    };
  } else {
    q = {};
  }
  const rows = await Order.find(q).sort({ createdAt: -1 }).limit(user.role === 'admin' ? 5000 : 500);
  return rows.map(serializeOrder);
}

async function updateStatus(orderRef, status, actor) {
  const allowed = ['pending', 'processing', 'shipping', 'delivered', 'cancelled', 'pending_payment'];
  if (!allowed.includes(status)) {
    throw new ApiError(400, 'حالة غير صالحة');
  }
  const order = await findOrderByRef(orderRef);
  if (!order) throw new ApiError(404, 'الطلب غير موجود');

  if (actor.role === 'admin') {
    order.status = status;
    if (order.payload && typeof order.payload === 'object') order.payload.status = status;
    await order.save();
    return serializeOrder(order);
  }

  if (actor.role === 'seller') {
    const name = actor.storeName || '';
    const sid = actor._id.toString();
    const matchStore =
      order.sellerName === name ||
      (order.payload && order.payload.sellerName === name);
    const matchItems = (order.items || []).some(
      (it) => String(it.sellerId) === sid || String(it.sellerId) === String(actor._id)
    );
    if (!matchStore && !matchItems) throw new ApiError(403, 'لا يمكنك تعديل هذا الطلب');
    order.status = status;
    if (order.payload && typeof order.payload === 'object') order.payload.status = status;
    await order.save();
    return serializeOrder(order);
  }

  throw new ApiError(403, 'غير مصرح');
}

async function listPlatformDeliveryQueue(actor) {
  if (actor.role !== 'admin') throw new ApiError(403, 'غير مصرح');
  if (!rbac.hasPermission(rbac.adminUserFromDoc(actor), 'canViewPlatformDelivery')) {
    throw new ApiError(403, 'غير مصرح بعرض توصيل المنصة');
  }
  const rows = await Order.find({
    $or: [{ 'payload.platformDeliveryPending': true }, { 'payload.fulfillmentModeResolved': 'platform' }]
  })
    .sort({ createdAt: -1 })
    .limit(500);
  return rows.map((doc) => serializeOrder(doc));
}

async function mergeOrderAdmin(orderRef, patch, actor) {
  if (actor.role !== 'admin') throw new ApiError(403, 'غير مصرح');
  const order = await findOrderByRef(orderRef);
  if (!order) throw new ApiError(404, 'الطلب غير موجود');
  const nextPayload =
    order.payload && typeof order.payload === 'object'
      ? { ...order.payload, ...patch }
      : { ...patch };
  order.payload = nextPayload;
  if (patch.status != null) order.status = patch.status;
  if (patch.items != null) order.items = patch.items;
  if (patch.total != null) order.total = Number(patch.total);
  await order.save();
  return serializeOrder(order);
}

module.exports = {
  createFromCheckout,
  listForUser,
  updateStatus,
  mergeOrderAdmin,
  serializeOrder,
  findOrderByRef,
  listPlatformDeliveryQueue
};
