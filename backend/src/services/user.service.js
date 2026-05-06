const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Product = require('../models/Product');
const { ApiError } = require('../utils/ApiError');
const rbac = require('../utils/rbac');

const env = require('../config/env');

async function updateMe(userId, updates) {
  const forbidden = ['passwordHash', 'role', 'phone', '_id', 'id'];
  const data = { ...updates };
  for (const k of forbidden) delete data[k];

  if (updates.password) {
    data.passwordHash = await bcrypt.hash(String(updates.password), env.bcryptRounds);
    delete data.password;
  }

  const user = await User.findByIdAndUpdate(userId, { $set: data }, { new: true, runValidators: true });
  if (!user) throw new ApiError(404, 'المستخدم غير موجود');
  return user.toSafeJSON();
}

async function listUsersForAdmin({ role, page = 1, limit = 50 }) {
  const q = {};
  if (role) q.role = role;
  const skip = (Math.max(1, page) - 1) * Math.min(100, Math.max(1, limit));
  const take = Math.min(100, Math.max(1, limit));
  const [items, total] = await Promise.all([
    User.find(q).sort({ createdAt: -1 }).skip(skip).limit(take).lean(),
    User.countDocuments(q)
  ]);
  return {
    items: items.map((u) => {
      const { _id, ...rest } = u;
      return { ...rest, id: _id.toString() };
    }),
    total,
    page: Math.max(1, page),
    limit: take
  };
}

async function adminPatchUser(actor, targetId, updates) {
  if (actor.role !== 'admin') throw new ApiError(403, 'غير مصرح');
  const forbidden = ['passwordHash'];
  const data = { ...updates };
  for (const k of forbidden) delete data[k];
  if (updates.password) {
    data.passwordHash = await bcrypt.hash(String(updates.password), env.bcryptRounds);
    delete data.password;
  }
  const user = await User.findByIdAndUpdate(targetId, { $set: data }, { new: true });
  if (!user) throw new ApiError(404, 'المستخدم غير موجود');
  return user.toSafeJSON();
}

async function adminDeleteUser(actor, targetId) {
  if (actor.role !== 'admin') throw new ApiError(403, 'غير مصرح');
  if (!rbac.hasPermission(rbac.adminUserFromDoc(actor), 'canDeleteUsers')) {
    throw new ApiError(403, 'لا يمكن حذف المستخدمين');
  }
  const target = await User.findById(targetId);
  if (!target) throw new ApiError(404, 'المستخدم غير موجود');
  if (String(actor._id) === String(target._id)) {
    throw new ApiError(400, 'لا يمكنك حذف حسابك وأنت مسجّل به');
  }
  if (target.role === 'admin') {
    const r = rbac.getAdminRole(rbac.adminUserFromDoc(target));
    if (r === rbac.ADMIN_ROLES.SUPER_ADMIN) {
      const superCount = await User.countDocuments({
        role: 'admin',
        $or: [{ adminRole: rbac.ADMIN_ROLES.SUPER_ADMIN }, { adminRole: { $exists: false } }, { adminRole: '' }]
      });
      if (superCount <= 1) throw new ApiError(400, 'لا يمكن حذف آخر سوبر أدمن');
    }
  }
  await Product.deleteMany({ sellerId: targetId });
  await User.deleteOne({ _id: targetId });
  return { ok: true };
}

module.exports = { updateMe, listUsersForAdmin, adminPatchUser, adminDeleteUser };
