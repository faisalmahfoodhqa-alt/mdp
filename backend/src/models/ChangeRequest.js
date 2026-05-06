const mongoose = require('mongoose');

const changeRequestSchema = new mongoose.Schema(
  {
    payload: { type: mongoose.Schema.Types.Mixed, default: {} }
  },
  { timestamps: true }
);

changeRequestSchema.methods.toJSONClient = function toJSONClient() {
  const p = this.payload || {};
  const id = p.id || this._id.toString();
  return { ...p, id, _mongoId: this._id.toString() };
};

module.exports = mongoose.model('ChangeRequest', changeRequestSchema);
