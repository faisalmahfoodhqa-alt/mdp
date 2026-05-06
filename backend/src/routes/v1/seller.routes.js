const express = require('express');
const rateLimit = require('express-rate-limit');
const { authenticate, requireRoles } = require('../../middleware/auth');
const { asyncHandler } = require('../../utils/asyncHandler');
const AdRequest = require('../../models/AdRequest');
const PlanUpgradeRequest = require('../../models/PlanUpgradeRequest');
const ChangeRequest = require('../../models/ChangeRequest');

const router = express.Router();

const sellerWriteLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({
      success: false,
      error: 'تجاوزت الحد المسموح لإرسال الطلبات كبائع. حاول لاحقاً.'
    });
  }
});

router.use(authenticate, requireRoles('seller'));
router.use(sellerWriteLimiter);

router.post(
  '/ad-requests',
  asyncHandler(async (req, res) => {
    const sid = req.user._id.toString();
    const body = req.body || {};
    const id = body.id || `ad-${Date.now()}`;
    const payload = {
      ...body,
      id,
      sellerId: body.sellerId || sid,
      status: body.status || 'pending'
    };
    await AdRequest.create({ payload });
    res.status(201).json({ success: true, data: { id } });
  })
);

router.post(
  '/plan-requests',
  asyncHandler(async (req, res) => {
    const sid = req.user._id.toString();
    const body = req.body || {};
    const id = body.id || `plan-${Date.now()}`;
    const payload = {
      ...body,
      id,
      sellerId: body.sellerId || sid,
      status: body.status || 'pending'
    };
    await PlanUpgradeRequest.create({ payload });
    res.status(201).json({ success: true, data: { id } });
  })
);

router.post(
  '/change-requests',
  asyncHandler(async (req, res) => {
    const sid = req.user._id.toString();
    const body = req.body || {};
    const id = body.id || `chg-${Date.now()}`;
    const payload = {
      ...body,
      id,
      sellerId: body.sellerId || sid,
      status: body.status || 'pending'
    };
    await ChangeRequest.create({ payload });
    res.status(201).json({ success: true, data: { id } });
  })
);

module.exports = router;
