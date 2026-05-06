const express = require('express');
const ordersController = require('../../controllers/orders.controller');
const { authenticate, requireRoles } = require('../../middleware/auth');

const router = express.Router();

router.use(authenticate);

router.get('/', ordersController.listMine);
router.post('/', requireRoles('customer'), ordersController.create);
router.patch('/:id/status', requireRoles('seller', 'admin'), ordersController.patchStatus);
router.patch('/:id', requireRoles('admin'), ordersController.mergeOrder);

module.exports = router;
