const express = require('express');
const rateLimit = require('express-rate-limit');
const usersController = require('../../controllers/users.controller');
const { authenticate } = require('../../middleware/auth');
const { runValidation } = require('../../middleware/runValidation');
const { patchMeRules } = require('../../validators/users.validator');

const router = express.Router();

const patchMeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({
      success: false,
      error: 'محاولات تحديث كثيرة لهذا الحساب. حاول لاحقاً.'
    });
  }
});

router.use(authenticate);

router.patch('/me', patchMeLimiter, patchMeRules, runValidation, usersController.patchMe);

module.exports = router;
