const express = require('express');
const adminController = require('../../controllers/admin.controller');
const { authenticate, requireRoles } = require('../../middleware/auth');
const { requireAdminPermission } = require('../../middleware/requireAdminPermission');

const router = express.Router();

router.use(authenticate, requireRoles('admin'));

router.get('/snapshot', requireAdminPermission('canViewUsers'), adminController.snapshot);
router.get(
  '/platform-delivery-queue',
  requireAdminPermission('canViewPlatformDelivery'),
  adminController.platformDeliveryQueue
);

router.get('/users', requireAdminPermission('canViewUsers'), adminController.listUsers);
router.patch('/users/:id', requireAdminPermission('canEditUsers'), adminController.patchUser);
router.delete('/users/:id', requireAdminPermission('canDeleteUsers'), adminController.deleteUser);

router.post('/sync/users', requireAdminPermission('canEditUsers'), adminController.syncUsersBulk);
router.post('/sync/products', requireAdminPermission('canEditUsers'), adminController.syncProductsBulk);
router.post('/sync/orders', requireAdminPermission('canChangeOrderStatus'), adminController.syncOrdersBulk);
router.post('/sync/extras', adminController.syncExtras);

router.patch('/site-settings', requireAdminPermission('canEditSettings'), adminController.patchSiteSettings);

router.get('/backup/export', requireAdminPermission('canEditSettings'), adminController.exportBackup);

router.post('/audit-log', adminController.appendAudit);

module.exports = router;
