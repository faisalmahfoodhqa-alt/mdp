const mongoose = require('mongoose');

/** طلبات إعلان — نفس الشكل المرن الذي كان في localStorage */
const adRequestSchema = new mongoose.Schema(
  {
    payload: { type: mongoose.Schema.Types.Mixed, default: {} }
  },
  { timestamps: true }
);

adRequestSchema.methods.toJSONClient = function toJSONClient() {
  const p = this.payload || {};
  const id = p.id || this._id.toString();
  return { ...p, id, _mongoId: this._id.toString() };
};

module.exports = mongoose.model('AdRequest', adRequestSchema);
