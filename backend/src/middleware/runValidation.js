const { validationResult } = require('express-validator');
const { ApiError } = require('../utils/ApiError');

/** بعد سلاسل express-validator — يوقف الطلب عند أول خطأ برسالة عربية واضحة */
function runValidation(req, res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const first = result.array({ onlyFirstError: true })[0];
    const msg = first?.msg || 'بيانات غير صالحة';
    return next(new ApiError(400, msg));
  }
  next();
}

module.exports = { runValidation };
