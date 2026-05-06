const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { ApiError } = require('../utils/ApiError');
const { signToken } = require('../utils/jwt');
const env = require('../config/env');

const PHONE_RE = /^(77|78|71|70|73)[0-9]{7}$/;

const PLANS = {
  trial: { maxProducts: 20, maxImagesPerProduct: 2 },
  bronze: { maxProducts: 40, maxImagesPerProduct: 5 },
  silver: { maxProducts: 90, maxImagesPerProduct: 5 },
  gold: { maxProducts: 1000000, maxImagesPerProduct: 5 }
};

function assertPhone(phone) {
  const p = String(phone || '').trim();
  if (!PHONE_RE.test(p)) {
    throw new ApiError(400, 'رقم الجوال غير صحيح (يجب أن يبدأ بـ 77/78/71/70/73 وطوله 9 أرقام)');
  }
  return p;
}

async function registerCustomer({ fullName, phone, password }) {
  const p = assertPhone(phone);
  const exists = await User.findOne({ phone: p });
  if (exists) {
    throw new ApiError(409, 'رقم الجوال موجود مسبقاً');
  }
  const parts = String(fullName || '').trim().split(/\s+/);
  const displayName = parts.length <= 1 ? fullName : `${parts[0]} ${parts[parts.length - 1]}`;
  const passwordHash = await bcrypt.hash(String(password), env.bcryptRounds);
  const user = await User.create({
    phone: p,
    passwordHash,
    role: 'customer',
    fullName: String(fullName || '').trim(),
    displayName,
    profileImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName || 'U')}&background=c88c23&color=fff`
  });
  const token = signToken({ sub: user._id.toString(), role: user.role });
  return { token, user: user.toSafeJSON() };
}

async function registerSeller(body, plan = 'trial') {
  const p = assertPhone(body.phone);
  const exists = await User.findOne({ phone: p });
  if (exists) {
    throw new ApiError(409, 'رقم الجوال موجود مسبقاً');
  }
  const planKey = PLANS[plan] ? plan : 'trial';
  const planInfo = PLANS[planKey];
  const parts = String(body.fullName || '').trim().split(/\s+/);
  const displayName = parts.length <= 1 ? body.fullName : `${parts[0]} ${parts[parts.length - 1]}`;
  const passwordHash = await bcrypt.hash(String(body.password), env.bcryptRounds);
  const isTrial = planKey === 'trial';

  const user = await User.create({
    phone: p,
    passwordHash,
    role: 'seller',
    fullName: String(body.fullName || '').trim(),
    displayName,
    email: body.email || '',
    profileImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName || 'U')}&background=c88c23&color=fff`,
    storeName: body.storeName || '',
    storeUrl: body.storeUrl || '',
    businessActivity: body.businessActivity || '',
    address: body.address || {},
    addressDetails: body.addressDetails || '',
    storeLocation: body.storeLocation || { lat: null, lng: null },
    plan: planKey,
    planDuration: body.planDuration || 'monthly',
    trialStartDate: new Date(),
    isPaid: !isTrial,
    isApproved: !isTrial,
    maxProducts: planInfo.maxProducts,
    maxImagesPerProduct: planInfo.maxImagesPerProduct,
    deliveryMode: body.deliveryMode || 'seller',
    hasDelivery: true,
    deliveryPricePerKm: Number(body.deliveryPricePerKm) || 0,
    storeFrontPhotoUrl:
      typeof body.storeFrontPhotoUrl === 'string' ? body.storeFrontPhotoUrl.slice(0, 1200000) : ''
  });

  const token = signToken({ sub: user._id.toString(), role: user.role });
  return { token, user: user.toSafeJSON() };
}

async function login(phone, password) {
  const p = assertPhone(phone);
  const user = await User.findOne({ phone: p }).select('+passwordHash');
  if (!user) {
    throw new ApiError(401, 'رقم الجوال أو كلمة المرور غير صحيحة');
  }
  const ok = await user.comparePassword(String(password));
  if (!ok) {
    throw new ApiError(401, 'رقم الجوال أو كلمة المرور غير صحيحة');
  }
  if (user.isLocked) {
    throw new ApiError(403, 'الحساب موقوف');
  }
  const token = signToken({ sub: user._id.toString(), role: user.role });
  const safe = await User.findById(user._id);
  return { token, user: safe.toSafeJSON() };
}

async function checkPhone(phone) {
  const p = String(phone || '').trim();
  if (!p) return { exists: false };
  const exists = await User.exists({ phone: p });
  return { exists: Boolean(exists), field: exists ? 'phone' : null };
}

async function resetPasswordByPhone({ phone, password }) {
  const p = assertPhone(phone);
  const pwd = String(password || '');
  if (pwd.length < 6) {
    throw new ApiError(400, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل');
  }
  const user = await User.findOne({ phone: p }).select('+passwordHash');
  if (!user) {
    throw new ApiError(404, 'لم يتم العثور على حساب بهذا الرقم');
  }
  if (user.isLocked) {
    throw new ApiError(403, 'الحساب موقوف');
  }
  user.passwordHash = await bcrypt.hash(pwd, env.bcryptRounds);
  await user.save();
  return { ok: true };
}

module.exports = {
  registerCustomer,
  registerSeller,
  login,
  checkPhone,
  resetPasswordByPhone,
  PHONE_RE
};
