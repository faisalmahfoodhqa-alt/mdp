const express = require('express');
const productsController = require('../../controllers/products.controller');
const { authenticate, requireRoles } = require('../../middleware/auth');

const router = express.Router();

router.get('/', productsController.list);
router.get('/:id', productsController.getOne);

router.post('/', authenticate, requireRoles('seller', 'admin'), productsController.create);
router.patch('/:id', authenticate, requireRoles('seller', 'admin'), productsController.update);
router.delete('/:id', authenticate, requireRoles('seller', 'admin'), productsController.remove);

module.exports = router;
