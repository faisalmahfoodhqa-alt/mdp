const User = require('../models/User');
const { verifyToken } = require('../utils/jwt');
const { ApiError } = require('../utils/ApiError');
const { asyncHandler } = require('../utils/asyncHandler');

const authenticate = asyncHandler(async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    throw new ApiError(401, 'مطلوب رمز الدخول');
  }
  const token = auth.slice(7).trim();
  let decoded;
  try {
    decoded = verifyToken(token);
  } catch {
    throw new ApiError(401, 'جلسة غير صالحة أو منتهية');
  }
  const user = await User.findById(decoded.sub);
  if (!user) {
    throw new ApiError(401, 'المستخدم غير موجود');
  }
  req.user = user;
  req.tokenPayload = decoded;
  next();
});

function requireRoles(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, 'غير مصرح'));
    }
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, 'صلاحيات غير كافية'));
    }
    next();
  };
}

module.exports = { authenticate, requireRoles };
