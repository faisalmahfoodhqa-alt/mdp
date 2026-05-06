const { body, query } = require('express-validator');

const phoneRe = /^(77|78|71|70|73)[0-9]{7}$/;

const registerRules = [
  body('role').optional().isIn(['customer', 'seller']).withMessage('نوع الحساب غير صالح'),
  body('fullName')
    .trim()
    .notEmpty()
    .withMessage('الاسم الكامل مطلوب')
    .isLength({ max: 120 })
    .withMessage('الاسم طويل جداً'),
  body('phone')
    .trim()
    .matches(phoneRe)
    .withMessage('رقم الجوال غير صالح (يجب أن يبدأ بـ 77/78/71/70/73 وطوله 9 أرقام)'),
  body('password')
    .isLength({ min: 6, max: 128 })
    .withMessage('كلمة المرور يجب أن تكون بين 6 و 128 حرفاً'),
  body('email').optional({ values: 'falsy' }).trim().isEmail().withMessage('البريد الإلكتروني غير صالح'),
  body('storeName')
    .if(body('role').equals('seller'))
    .trim()
    .notEmpty()
    .withMessage('اسم المتجر مطلوب للبائع')
    .isLength({ max: 200 }),
  body('storeUrl').optional().trim().isLength({ max: 120 }),
  body('businessActivity').optional().trim().isLength({ max: 200 }),
  body('plan').optional().isIn(['trial', 'bronze', 'silver', 'gold']).withMessage('الباقة غير صالحة'),
  body('planDuration').optional().isIn(['monthly', 'yearly']).withMessage('مدة الباقة غير صالحة'),
  body('deliveryMode').optional().isIn(['seller', 'platform']).withMessage('وضع التوصيل غير صالح'),
  body('deliveryPricePerKm').optional().isFloat({ min: 0, max: 999999 }).withMessage('سعر الكيلومتر غير صالح'),
  body('storeFrontPhotoUrl')
    .optional({ values: 'falsy' })
    .isString()
    .isLength({ max: 1200000 })
    .withMessage('رابط صورة المحل طويل جداً')
];

const loginRules = [
  body('phone')
    .trim()
    .matches(phoneRe)
    .withMessage('رقم الجوال غير صالح'),
  body('password').notEmpty().withMessage('كلمة المرور مطلوبة').isLength({ max: 128 })
];

const checkPhoneRules = [
  query('phone')
    .trim()
    .matches(phoneRe)
    .withMessage('رقم الجوال غير صالح للتحقق')
];

const resetPasswordRules = [
  body('phone').trim().matches(phoneRe).withMessage('رقم الجوال غير صالح'),
  body('password').isLength({ min: 6, max: 128 }).withMessage('كلمة المرور يجب أن تكون بين 6 و 128 حرفاً')
];

module.exports = {
  registerRules,
  loginRules,
  checkPhoneRules,
  resetPasswordRules,
  phoneRe
};
