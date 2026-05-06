const express = require('express');
const rateLimit = require('express-rate-limit');
const env = require('../../config/env');
const healthRoutes = require('./health.routes');
const authRoutes = require('./auth.routes');
const usersRoutes = require('./users.routes');
const productsRoutes = require('./products.routes');
const ordersRoutes = require('./orders.routes');
const adminRoutes = require('./admin.routes');
const settingsRoutes = require('./settings.routes');
const sellerRoutes = require('./seller.routes');

const router = express.Router();

const globalApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: env.apiGlobalRateMax,
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.method === 'OPTIONS',
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({
      success: false,
      error: 'تم تجاوز الحد الأقصى للطلبات على الخادم. حاول بعد قليل.'
    });
  }
});

router.use('/health', healthRoutes);
router.use(globalApiLimiter);

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/products', productsRoutes);
router.use('/orders', ordersRoutes);
router.use('/admin', adminRoutes);
router.use('/seller', sellerRoutes);
router.use('/settings', settingsRoutes);

module.exports = router;
