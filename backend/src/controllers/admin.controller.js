const { asyncHandler } = require('../utils/asyncHandler');
const userService = require('../services/user.service');
const siteSettingsService = require('../services/siteSettings.service');
const adminSnapshotService = require('../services/adminSnapshot.service');
const adminBulkSyncService = require('../services/adminBulkSync.service');
const orderService = require('../services/order.service');
const AuditLog = require('../models/AuditLog');
const securityAudit = require('../services/securityAudit.service');

const listUsers = asyncHandler(async (req, res) => {
  const data = await userService.listUsersForAdmin({
    role: req.query.role,
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 50
  });
  res.json({ success: true, data });
});

const patchUser = asyncHandler(async (req, res) => {
  const user = await userService.adminPatchUser(req.user, req.params.id, req.body);
  await securityAudit.logAdminActionFromReq(req.user, 'admin.user.patch', req, {
    targetUserId: req.params.id,
    updatedFields: Object.keys(req.body || {}).filter((k) => k !== 'password')
  });
  res.json({ success: true, data: { user } });
});

const deleteUser = asyncHandler(async (req, res) => {
  await userService.adminDeleteUser(req.user, req.params.id);
  await securityAudit.logAdminActionFromReq(req.user, 'admin.user.delete', req, {
    targetUserId: req.params.id
  });
  res.json({ success: true, data: { deleted: true } });
});

const getSiteSettings = asyncHandler(async (req, res) => {
  const settings = await siteSettingsService.getPublic();
  res.json({ success: true, data: { settings } });
});

const patchSiteSettings = asyncHandler(async (req, res) => {
  const settings = await siteSettingsService.updateByAdmin(req.body);
  await securityAudit.logAdminActionFromReq(req.user, 'admin.settings.patch', req, {
    topKeys: Object.keys(req.body || {}).slice(0, 40)
  });
  res.json({ success: true, data: { settings } });
});

const snapshot = asyncHandler(async (req, res) => {
  const data = await adminSnapshotService.getSnapshot();
  res.json({ success: true, data });
});

const platformDeliveryQueue = asyncHandler(async (req, res) => {
  const orders = await orderService.listPlatformDeliveryQueue(req.user);
  res.json({ success: true, data: { orders } });
});

const syncUsersBulk = asyncHandler(async (req, res) => {
  const users = req.body.users;
  await adminBulkSyncService.upsertUsers(req.user, users);
  await securityAudit.logAdminActionFromReq(req.user, 'admin.sync.users', req, {
    count: Array.isArray(users) ? users.length : 0
  });
  res.json({ success: true, data: { ok: true } });
});

const syncProductsBulk = asyncHandler(async (req, res) => {
  const products = req.body.products;
  await adminBulkSyncService.upsertProducts(req.user, products);
  await securityAudit.logAdminActionFromReq(req.user, 'admin.sync.products', req, {
    count: Array.isArray(products) ? products.length : 0
  });
  res.json({ success: true, data: { ok: true } });
});

const syncOrdersBulk = asyncHandler(async (req, res) => {
  const orders = req.body.orders;
  await adminBulkSyncService.replaceOrders(req.user, orders);
  await securityAudit.logAdminActionFromReq(req.user, 'admin.sync.orders', req, {
    count: Array.isArray(orders) ? orders.length : 0
  });
  res.json({ success: true, data: { ok: true } });
});

const syncExtras = asyncHandler(async (req, res) => {
  const body = req.body || {};
  await adminBulkSyncService.syncExtras(req.user, body);
  await securityAudit.logAdminActionFromReq(req.user, 'admin.sync.extras', req, {
    hasSettings: !!(body.settings && typeof body.settings === 'object'),
    adRequests: Array.isArray(body.adRequests) ? body.adRequests.length : null,
    planRequests: Array.isArray(body.planRequests) ? body.planRequests.length : null,
    changeRequests: Array.isArray(body.changeRequests) ? body.changeRequests.length : null,
    auditLogs: Array.isArray(body.auditLogs) ? body.auditLogs.length : null
  });
  res.json({ success: true, data: { ok: true } });
});

const appendAudit = asyncHandler(async (req, res) => {
  const rbac = require('../utils/rbac');
  if (!rbac.hasPermission(rbac.adminUserFromDoc(req.user), 'canViewAuditLog')) {
    const { ApiError } = require('../utils/ApiError');
    throw new ApiError(403, 'غير مصرح');
  }
  await AuditLog.create({
    action: req.body.action || 'admin.action',
    meta: req.body.meta || {},
    adminUserId: req.user._id,
    createdAt: new Date()
  });
  res.json({ success: true, data: { ok: true } });
});

/** تصدير JSON كامل للنسخ الاحتياطي — يتطلب صلاحية الإعدادات */
const exportBackup = asyncHandler(async (req, res) => {
  const data = await adminSnapshotService.getSnapshot();
  const payload = {
    exportedAt: new Date().toISOString(),
    version: 1,
    data
  };
  const filename = `tawreeed-backup-${Date.now()}.json`;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  await securityAudit.logAdminActionFromReq(req.user, 'admin.backup.export', req, {});
  res.send(JSON.stringify(payload));
});

module.exports = {
  listUsers,
  patchUser,
  deleteUser,
  getSiteSettings,
  patchSiteSettings,
  snapshot,
  platformDeliveryQueue,
  syncUsersBulk,
  syncProductsBulk,
  syncOrdersBulk,
  syncExtras,
  appendAudit,
  exportBackup
};
