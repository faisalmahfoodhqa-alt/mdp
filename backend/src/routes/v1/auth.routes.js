const express = require('express');
const rateLimit = require('express-rate-limit');
const authController = require('../../controllers/auth.controller');
const { authenticate } = require('../../middleware/auth');
const { runValidation } = require('../../middleware/runValidation');
const {
  registerRules,
  loginRules,
  checkPhoneRules,
  resetPasswordRules
} = require('../../validators/auth.validator');

const router = express.Router();

const jsonLimitHandler = (req, res, next, options) => {
  res.status(options.statusCode).json({
    success: false,
    error: 'تم تجاوز عدد المحاولات المسموح لهذا الإجراء. انتظر ثم أعد المحاولة.'
  });
};

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 25,
  standardHeaders: true,
  legacyHeaders: false,
  handler: jsonLimitHandler
});

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
  handler: jsonLimitHandler
});

const registerShortBurstLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 2,
  standardHeaders: true,
  legacyHeaders: false,
  handler: jsonLimitHandler
});

const resetPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  handler: jsonLimitHandler
});

const checkPhoneLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 40,
  standardHeaders: true,
  legacyHeaders: false,
  handler: jsonLimitHandler
});

router.post('/register', registerShortBurstLimiter, registerLimiter, registerRules, runValidation, authController.register);
router.post('/login', loginLimiter, loginRules, runValidation, authController.login);
router.post('/logout', authenticate, authController.logout);
router.post('/reset-password-phone', resetPasswordLimiter, resetPasswordRules, runValidation, authController.resetPasswordPhone);
router.get('/check-phone', checkPhoneLimiter, checkPhoneRules, runValidation, authController.checkPhone);
router.get('/me', authenticate, authController.me);

module.exports = router;
