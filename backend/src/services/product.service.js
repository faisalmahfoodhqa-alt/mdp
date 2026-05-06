const Product = require('../models/Product');
const User = require('../models/User');
const { ApiError } = require('../utils/ApiError');

function serializeProduct(doc) {
  if (!doc) return null;
  const o = doc.toObject ? doc.toObject() : doc;
  const id = o._id.toString();
  const { __v, ...rest } = o;
  return { ...rest, id, _id: id, sellerId: o.sellerId?.toString?.() || o.sellerId };
}

async function listPublic({ sellerId, page = 1, limit = 48, search = '' }) {
  const q = { isVisible: true };
  if (sellerId) {
    const { Types } = require('mongoose');
    if (!Types.ObjectId.isValid(sellerId)) {
      throw new ApiError(400, 'معرّف البائع غير صالح');
    }
    q.sellerId = sellerId;
  }
  if (search) {
    q.$or = [
      { name: new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') },
      { storeName: new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') }
    ];
  }
  const skip = (Math.max(1, page) - 1) * Math.min(100, Math.max(1, limit));
  const take = Math.min(100, Math.max(1, limit));
  const [items, total] = await Promise.all([
    Product.find(q).sort({ createdAt: -1 }).skip(skip).limit(take),
    Product.countDocuments(q)
  ]);
  return { items: items.map(serializeProduct), total, page: Math.max(1, page), limit: take };
}

async function getById(id) {
  const p = await Product.findById(id);
  if (!p || !p.isVisible) throw new ApiError(404, 'المنتج غير موجود');
  return serializeProduct(p);
}

async function createForSeller(sellerUser, body) {
  if (sellerUser.role !== 'seller') throw new ApiError(403, 'فقط البائع يضيف منتجات');
  const status = await accountStatus(sellerUser);
  if (status.isLocked) throw new ApiError(403, 'الحساب موقوف');
  const count = await Product.countDocuments({ sellerId: sellerUser._id });
  if (count >= status.maxProducts) {
    throw new ApiError(400, `لقد وصلت للحد الأقصى من المنتجات (${status.maxProducts})`);
  }

  const { id, _id, sellerId, ...rest } = body;
  const product = await Product.create({
    ...rest,
    sellerId: sellerUser._id,
    storeName: body.storeName || sellerUser.storeName || '',
    name: body.name || 'بدون اسم',
    price: Number(body.price) || 0
  });
  return serializeProduct(product);
}

async function updateForSeller(sellerUser, productId, body) {
  const p = await Product.findById(productId);
  if (!p) throw new ApiError(404, 'المنتج غير موجود');
  if (sellerUser.role === 'seller' && String(p.sellerId) !== String(sellerUser._id)) {
    throw new ApiError(403, 'لا يمكنك تعديل منتج غيرك');
  }
  if (sellerUser.role !== 'admin' && sellerUser.role !== 'seller') {
    throw new ApiError(403, 'غير مصرح');
  }
  const { id, _id, sellerId, ...rest } = body;
  Object.assign(p, rest);
  await p.save();
  return serializeProduct(p);
}

async function deleteForSeller(sellerUser, productId) {
  const p = await Product.findById(productId);
  if (!p) throw new ApiError(404, 'المنتج غير موجود');
  if (sellerUser.role === 'seller' && String(p.sellerId) !== String(sellerUser._id)) {
    throw new ApiError(403, 'لا يمكنك حذف منتج غيرك');
  }
  if (sellerUser.role !== 'admin' && sellerUser.role !== 'seller') {
    throw new ApiError(403, 'غير مصرح');
  }
  await p.deleteOne();
  return { ok: true };
}

async function accountStatus(seller) {
  const TRIAL_DAYS = 90;
  const plan = seller.plan || 'trial';
  const start = seller.trialStartDate ? new Date(seller.trialStartDate) : new Date(seller.createdAt);
  const days = Math.floor((Date.now() - start) / 86400000);
  const isTrialExpired = plan === 'trial' && days >= TRIAL_DAYS;
  const isPaid = Boolean(seller.isPaid);
  const isLocked = plan === 'trial' && isTrialExpired && !isPaid;
  const maxProducts = seller.maxProducts || 20;
  return { isLocked, maxProducts };
}

module.exports = {
  listPublic,
  getById,
  createForSeller,
  updateForSeller,
  deleteForSeller
};
