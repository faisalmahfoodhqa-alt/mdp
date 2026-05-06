const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const SiteSettings = require('../models/SiteSettings');
const AdRequest = require('../models/AdRequest');
const PlanUpgradeRequest = require('../models/PlanUpgradeRequest');
const ChangeRequest = require('../models/ChangeRequest');
const AuditLog = require('../models/AuditLog');
const orderService = require('./order.service');

function serializeUser(u) {
  const o = u.toSafeJSON ? u.toSafeJSON() : userLeanSafe(u);
  return o;
}

function userLeanSafe(lean) {
  const { passwordHash, __v, ...rest } = lean;
  const id = lean._id.toString();
  return { ...rest, id };
}

async function getSnapshot() {
  const [usersRaw, products, orders, settingsDoc, ads, plans, changes, audits] = await Promise.all([
    User.find().sort({ createdAt: -1 }).limit(5000).lean(),
    Product.find().sort({ createdAt: -1 }).limit(100000).lean(),
    Order.find().sort({ createdAt: -1 }).limit(100000).lean(),
    SiteSettings.findOne({ key: 'default' }),
    AdRequest.find().sort({ createdAt: -1 }).limit(5000),
    PlanUpgradeRequest.find().sort({ createdAt: -1 }).limit(5000),
    ChangeRequest.find().sort({ createdAt: -1 }).limit(5000),
    AuditLog.find().sort({ createdAt: -1 }).limit(500)
  ]);

  const users = usersRaw.map(userLeanSafe);
  const productsOut = products.map((p) => {
    const { __v, _id, ...rest } = p;
    return { ...rest, id: _id.toString(), sellerId: p.sellerId?.toString?.() };
  });
  const ordersOut = orders.map((doc) => {
    const row = orderService.serializeOrder(doc);
    const mongoId = doc._id.toString();
    if (!row.id) row.id = mongoId;
    row._mongoId = mongoId;
    return row;
  });

  return {
    users,
    products: productsOut,
    orders: ordersOut,
    settings: settingsDoc?.data || {},
    adRequests: ads.map((a) => a.toJSONClient()),
    planRequests: plans.map((a) => a.toJSONClient()),
    changeRequests: changes.map((a) => a.toJSONClient()),
    auditLogs: audits.map((a) => ({
      action: a.action,
      meta: a.meta,
      adminUserId: a.adminUserId?.toString?.(),
      createdAt: a.createdAt
    }))
  };
}

async function syncAdsReplace(items) {
  await AdRequest.deleteMany({});
  if (!items?.length) return;
  await AdRequest.insertMany(items.map((payload) => ({ payload })));
}

async function syncPlansReplace(items) {
  await PlanUpgradeRequest.deleteMany({});
  if (!items?.length) return;
  await PlanUpgradeRequest.insertMany(items.map((payload) => ({ payload })));
}

async function syncChangesReplace(items) {
  await ChangeRequest.deleteMany({});
  if (!items?.length) return;
  await ChangeRequest.insertMany(items.map((payload) => ({ payload })));
}

async function syncAuditReplace(items) {
  await AuditLog.deleteMany({});
  if (!items?.length) return;
  await AuditLog.insertMany(
    items.map((row) => ({
      action: row.action || 'legacy',
      meta: row.meta || row,
      createdAt: row.createdAt ? new Date(row.createdAt) : new Date()
    }))
  );
}

module.exports = {
  getSnapshot,
  syncAdsReplace,
  syncPlansReplace,
  syncChangesReplace,
  syncAuditReplace
};
