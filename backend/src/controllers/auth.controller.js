const { asyncHandler } = require('../utils/asyncHandler');
const { ApiError } = require('../utils/ApiError');
const authService = require('../services/auth.service');
const securityAudit = require('../services/securityAudit.service');

const register = asyncHandler(async (req, res) => {
  const role = req.body.role || 'customer';
  if (role === 'admin') {
    throw new ApiError(403, 'لا يمكن إنشاء حساب أدمن عبر التسجيل العام');
  }
  if (role === 'seller') {
    const { token, user } = await authService.registerSeller(req.body, req.body.plan);
    await securityAudit.logRegister(user, req, 'seller');
    return res.status(201).json({ success: true, data: { token, user } });
  }
  const { token, user } = await authService.registerCustomer({
    fullName: req.body.fullName,
    phone: req.body.phone,
    password: req.body.password
  });
  await securityAudit.logRegister(user, req, 'customer');
  return res.status(201).json({ success: true, data: { token, user } });
});

const login = asyncHandler(async (req, res) => {
  const phone = req.body.phone;
  try {
    const { token, user } = await authService.login(phone, req.body.password);
    await securityAudit.logLoginSuccess(user, req);
    res.json({ success: true, data: { token, user } });
  } catch (err) {
    const reason =
      err instanceof ApiError && err.statusCode === 403 ? 'account_locked' : 'invalid_credentials';
    await securityAudit.logLoginFailure(phone, req, reason);
    throw err;
  }
});

const logout = asyncHandler(async (req, res) => {
  await securityAudit.logLogout(req.user, req);
  res.json({ success: true, data: { ok: true } });
});

const checkPhone = asyncHandler(async (req, res) => {
  const result = await authService.checkPhone(req.query.phone);
  res.json({ success: true, data: result });
});

const me = asyncHandler(async (req, res) => {
  res.json({ success: true, data: { user: req.user.toSafeJSON() } });
});

const resetPasswordPhone = asyncHandler(async (req, res) => {
  await authService.resetPasswordByPhone({
    phone: req.body.phone,
    password: req.body.password
  });
  await securityAudit.logPasswordResetSuccess(req.body.phone, req);
  res.json({ success: true, data: { ok: true } });
});

module.exports = { register, login, logout, checkPhone, me, resetPasswordPhone };
