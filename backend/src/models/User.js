const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, unique: true, trim: true, index: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ['customer', 'seller', 'admin'], required: true, index: true },

    fullName: { type: String, default: '' },
    displayName: { type: String, default: '' },
    email: { type: String, default: '' },
    profileImage: { type: String, default: '' },

    wishlist: { type: [mongoose.Schema.Types.Mixed], default: [] },
    followedStores: { type: [mongoose.Schema.Types.Mixed], default: [] },
    walletBalance: { type: Number, default: 0 },
    /** @deprecated for new code — prefer Order collection */
    orders: { type: [mongoose.Schema.Types.Mixed], default: [] },
    notifications: { type: [mongoose.Schema.Types.Mixed], default: [] },

    storeName: { type: String, default: '' },
    storeUrl: { type: String, default: '' },
    businessActivity: { type: String, default: '' },
    address: { type: mongoose.Schema.Types.Mixed, default: {} },
    addressDetails: { type: String, default: '' },
    storeLocation: {
      lat: { type: Number, default: null },
      lng: { type: Number, default: null }
    },

    plan: { type: String, default: 'trial' },
    planDuration: { type: String, default: 'monthly' },
    trialStartDate: { type: Date, default: null },
    isPaid: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
    maxProducts: { type: Number, default: 20 },
    maxImagesPerProduct: { type: Number, default: 2 },

    logo: { type: String, default: '' },
    /** صورة واجهة المحل للتوثيق/عرضها على مشرف التوصيل */
    storeFrontPhotoUrl: { type: String, default: '' },
    banner: { type: String, default: '' },
    socialLinks: { type: mongoose.Schema.Types.Mixed, default: {} },
    isVacationMode: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    verificationStatus: { type: String, default: 'unverified' },
    verificationDocs: { type: mongoose.Schema.Types.Mixed, default: [] },

    deliveryMode: { type: String, default: 'seller' },
    deliveryService: { type: String, default: 'merchant' },
    hasDelivery: { type: Boolean, default: true },
    deliveryPricePerKm: { type: Number, default: 0 },

    adminRole: { type: String, default: '' },
    adminPermissions: { type: mongoose.Schema.Types.Mixed, default: {} },
    username: { type: String, default: '' },
    isLocked: { type: Boolean, default: false }
  },
  { timestamps: true, minimize: false }
);

userSchema.methods.comparePassword = async function comparePassword(plain) {
  return bcrypt.compare(plain, this.passwordHash);
};

userSchema.methods.toSafeJSON = function toSafeJSON() {
  const o = this.toObject({ virtuals: true });
  delete o.passwordHash;
  o.id = o._id.toString();
  delete o.__v;
  return o;
};

module.exports = mongoose.model('User', userSchema);
