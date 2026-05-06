const SiteSettings = require('../models/SiteSettings');
const { ApiError } = require('../utils/ApiError');

const KEY = 'default';

async function getPublic() {
  let doc = await SiteSettings.findOne({ key: KEY });
  if (!doc) {
    doc = await SiteSettings.create({
      key: KEY,
      data: {
        siteName: 'توريد نت',
        sitePhone: '',
        siteEmail: ''
      }
    });
  }
  return doc.data || {};
}

async function updateByAdmin(partial) {
  const cur = await getPublic();
  const merged = { ...cur, ...(partial && typeof partial === 'object' ? partial : {}) };
  const doc = await SiteSettings.findOneAndUpdate(
    { key: KEY },
    { $set: { data: merged } },
    { new: true, upsert: true }
  );
  return doc.data || {};
}

module.exports = { getPublic, updateByAdmin };
