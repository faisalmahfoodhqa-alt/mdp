const mongoose = require('mongoose');

const planUpgradeRequestSchema = new mongoose.Schema(
  {
    payload: { type: mongoose.Schema.Types.Mixed, default: {} }
  },
  { timestamps: true }
);

planUpgradeRequestSchema.methods.toJSONClient = function toJSONClient() {
  const p = this.payload || {};
  const id = p.id || this._id.toString();
  return { ...p, id, _mongoId: this._id.toString() };
};

module.exports = mongoose.model('PlanUpgradeRequest', planUpgradeRequestSchema);
