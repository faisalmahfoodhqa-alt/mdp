const { asyncHandler } = require('../utils/asyncHandler');
const productService = require('../services/product.service');

const list = asyncHandler(async (req, res) => {
  const { sellerId, page, limit, q } = req.query;
  const data = await productService.listPublic({
    sellerId: sellerId || undefined,
    page: Number(page) || 1,
    limit: Number(limit) || 48,
    search: q || ''
  });
  res.json({ success: true, data });
});

const getOne = asyncHandler(async (req, res) => {
  const product = await productService.getById(req.params.id);
  res.json({ success: true, data: { product } });
});

const create = asyncHandler(async (req, res) => {
  const product = await productService.createForSeller(req.user, req.body);
  res.status(201).json({ success: true, data: { product } });
});

const update = asyncHandler(async (req, res) => {
  const product = await productService.updateForSeller(req.user, req.params.id, req.body);
  res.json({ success: true, data: { product } });
});

const remove = asyncHandler(async (req, res) => {
  await productService.deleteForSeller(req.user, req.params.id);
  res.json({ success: true, data: { deleted: true } });
});

module.exports = { list, getOne, create, update, remove };
