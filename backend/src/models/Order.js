const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    customerUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    customerName: { type: String, default: '' },
    customerPhone: { type: String, default: '' },
    sellerName: { type: String, default: '' },
    items: { type: [mongoose.Schema.Types.Mixed], default: [] },
    subTotal: { type: Number, default: 0 },
    deliveryFee: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    status: { type: String, default: 'pending', index: true },
    payment: { type: mongoose.Schema.Types.Mixed, default: {} },
    shipping: { type: mongoose.Schema.Types.Mixed, default: null },
    notes: { type: String, default: '' },
    /** full snapshot for backward compatibility with checkout payload */
    payload: { type: mongoose.Schema.Types.Mixed, default: null }
  },
  { timestamps: true }
);

orderSchema.methods.toClientJSON = function toClientJSON() {
  const o = this.toObject();
  const id = o._id.toString();
  if (o.payload && typeof o.payload === 'object') {
    return { ...o.payload, id: o.payload.id != null ? o.payload.id : id, _id: id };
  }
  return {
    id,
    customerId: o.customerUserId?.toString?.(),
    customerName: o.customerName,
    customerPhone: o.customerPhone,
    items: o.items,
    subTotal: o.subTotal,
    deliveryFee: o.deliveryFee,
    total: o.total,
    discount: o.discount,
    status: o.status,
    payment: o.payment,
    shipping: o.shipping,
    notes: o.notes,
    sellerName: o.sellerName,
    date: o.createdAt
  };
};

module.exports = mongoose.model('Order', orderSchema);
