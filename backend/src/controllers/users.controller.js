const { asyncHandler } = require('../utils/asyncHandler');
const userService = require('../services/user.service');
const securityAudit = require('../services/securityAudit.service');

const patchMe = asyncHandler(async (req, res) => {
  const user = await userService.updateMe(req.user._id, req.body);
  const fields = Object.keys(req.body || {}).filter((k) => k !== 'password');
  await securityAudit.logProfilePatch(req.user, req, fields);
  res.json({ success: true, data: { user } });
});

module.exports = { patchMe };
