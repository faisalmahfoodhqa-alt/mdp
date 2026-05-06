const { body } = require('express-validator');

/** حقول شائعة آمنة؛ الحقول المركّبة (address، wishlist، …) تُمرَّر بدون سلسلة تحقق صارمة لتجنب كسر العملاء */
const patchMeRules = [
  body('fullName').optional().trim().isLength({ min: 1, max: 120 }).withMessage('الاسم غير صالح'),
  body('displayName').optional().trim().isLength({ max: 120 }),
  body('email').optional({ values: 'falsy' }).trim().isEmail(),
  body('password')
    .optional()
    .isLength({ min: 6, max: 128 })
    .withMessage('كلمة المرور الجديدة يجب أن تكون بين 6 و 128 حرفاً'),
  body('walletBalance').optional().isFloat({ min: 0, max: 1e12 }),
  body('plan').optional().isString().isLength({ max: 40 }),
  body('maxProducts').optional().isInt({ min: 0, max: 10000000 }),
  body('maxImagesPerProduct').optional().isInt({ min: 1, max: 50 }),
  body('isPaid').optional().isBoolean(),
  body('isApproved').optional().isBoolean(),
  body('isVacationMode').optional().isBoolean(),
  body('deliveryPricePerKm').optional().isFloat({ min: 0, max: 999999 }),
  body('deliveryMode').optional().isIn(['seller', 'platform']),
  body('storeName').optional().trim().isLength({ max: 200 }),
  body('storeUrl').optional().trim().isLength({ max: 120 }),
  body('storeFrontPhotoUrl').optional().isString().isLength({ max: 1200000 }).withMessage('رابط صورة المحل طويل جداً')
];

module.exports = { patchMeRules };
