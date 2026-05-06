const { asyncHandler } = require('../utils/asyncHandler');
const orderService = require('../services/order.service');

const create = asyncHandler(async (req, res) => {
  const order = await orderService.createFromCheckout(req.user, req.body);
  res.status(201).json({ success: true, data: { order } });
});

const listMine = asyncHandler(async (req, res) => {
  const orders = await orderService.listForUser(req.user);
  res.json({ success: true, data: { orders } });
});

const patchStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const order = await orderService.updateStatus(req.params.id, status, req.user);
  res.json({ success: true, data: { order } });
});

const mergeOrder = asyncHandler(async (req, res) => {
  const order = await orderService.mergeOrderAdmin(req.params.id, req.body || {}, req.user);
  res.json({ success: true, data: { order } });
});

module.exports = { create, listMine, patchStatus, mergeOrder };
