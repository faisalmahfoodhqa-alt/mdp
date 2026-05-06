const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const SiteSettings = require('../models/SiteSettings');
const adminSnapshotService = require('./adminSnapshot.service');
const rbac = require('../utils/rbac');
const { ApiError } = require('../utils/ApiError');
const env = require('../config/env');

function assertPerm(actor, key) {
  if (!rbac.hasPermission(rbac.adminUserFromDoc(actor), key)) {
    throw new ApiError(403, 'ليس لديك هذه الصلاحية');
  }
}

async function upsertUsers(actor, usersPayload) {
  assertPerm(actor, 'canEditUsers');
  if (!Array.isArray(usersPayload)) throw new ApiError(400, 'users غير صالح');
  for (const u of usersPayload) {
    const id = u.id || u._id;
    if (!id || !mongoose.Types.ObjectId.isValid(String(id))) continue;
    const data = { ...u };
    delete data.id;
    delete data._id;
    delete data.passwordHash;
    if (u.password && String(u.password).length > 0) {
      data.passwordHash = await bcrypt.hash(String(u.password), env.bcryptRounds);
    }
    delete data.password;
    await User.findByIdAndUpdate(id, { $set: data }, { new: true });
  }
}

async function upsertProducts(actor, productsPayload) {
  assertPerm(actor, 'canEditUsers');
  if (!Array.isArray(productsPayload)) throw new ApiError(400, 'products غير صالح');
  for (const p of productsPayload) {
    const id = p.id || p._id;
    if (!id || !mongoose.Types.ObjectId.isValid(String(id))) continue;
    const data = { ...p };
    delete data.id;
    delete data._id;
    if (data.sellerId && mongoose.Types.ObjectId.isValid(String(data.sellerId))) {
      data.sellerId = new mongoose.Types.ObjectId(String(data.sellerId));
    }
    await Product.findByIdAndUpdate(id, { $set: data }, { upsert: true, new: true });
  }
}

async function replaceOrders(actor, ordersPayload) {
  assertPerm(actor, 'canChangeOrderStatus');
  if (!Array.isArray(ordersPayload)) throw new ApiError(400, 'orders غير صالح');
  await Order.deleteMany({});
  const docs = ordersPayload.map((o) => ({
    customerUserId: o.customerUserId && mongoose.Types.ObjectId.isValid(String(o.customerUserId))
      ? new mongoose.Types.ObjectId(String(o.customerUserId))
      : undefined,
    customerName: o.customerName || '',
    customerPhone: o.customerPhone || '',
    sellerName: o.sellerName || '',
    items: Array.isArray(o.items) ? o.items : [],
    subTotal: Number(o.subTotal) || 0,
    deliveryFee: Number(o.deliveryFee) || 0,
    total: Number(o.total) || 0,
    discount: Number(o.discount) || 0,
    status: o.status || 'pending',
    payment: o.payment || {},
    shipping: o.shipping ?? null,
    notes: o.notes || '',
    payload: { ...o, id: o.id }
  }));
  if (docs.length) await Order.insertMany(docs);
}

async function syncExtras(actor, body) {
  const { settings, adRequests, planRequests, changeRequests, auditLogs } = body;
  if (settings && typeof settings === 'object') {
    assertPerm(actor, 'canEditSettings');
    await SiteSettings.findOneAndUpdate(
      { key: 'default' },
      { $set: { data: settings } },
      { upsert: true, new: true }
    );
  }
  if (Array.isArray(adRequests)) {
    assertPerm(actor, 'canReviewAdsRequests');
    await adminSnapshotService.syncAdsReplace(adRequests);
  }
  if (Array.isArray(planRequests)) {
    assertPerm(actor, 'canReviewPlanRequests');
    await adminSnapshotService.syncPlansReplace(planRequests);
  }
  if (Array.isArray(changeRequests)) {
    assertPerm(actor, 'canReviewChangeRequests');
    await adminSnapshotService.syncChangesReplace(changeRequests);
  }
  if (Array.isArray(auditLogs)) {
    assertPerm(actor, 'canViewAuditLog');
    await adminSnapshotService.syncAuditReplace(auditLogs);
  }
}

module.exports = {
  upsertUsers,
  upsertProducts,
  replaceOrders,
  syncExtras
};
