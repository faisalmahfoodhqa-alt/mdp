const mongoose = require('mongoose');

/** Matches flexible product objects from the current SPA */
const productSchema = new mongoose.Schema(
  {
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    storeName: { type: String, default: '' },
    name: { type: String, required: true, trim: true },
    price: { type: Number, default: 0 },
    description: { type: String, default: '' },
    category: { type: String, default: '' },
    images: { type: [mongoose.Schema.Types.Mixed], default: [] },
    image: { type: String, default: '' },
    stock: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
    /** any extra fields from the frontend */
    extra: { type: mongoose.Schema.Types.Mixed, default: {} }
  },
  { timestamps: true, strict: false }
);

productSchema.methods.toClientJSON = function toClientJSON() {
  const o = this.toObject();
  o.id = o._id.toString();
  o.sellerId = o.sellerId && o.sellerId.toString ? o.sellerId.toString() : o.sellerId;
  delete o.__v;
  return o;
};

module.exports = mongoose.model('Product', productSchema);
