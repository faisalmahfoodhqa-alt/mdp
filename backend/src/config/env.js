const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '..', '..', '.env'),
});

const requiredInProd = ['MONGODB_URI', 'JWT_SECRET'];

function validate() {
  if (process.env.NODE_ENV === 'production') {
    for (const k of requiredInProd) {
      if (!process.env[k]) {
        throw new Error(`Missing required env: ${k}`);
      }
    }
  }
}

module.exports = {
  validate,
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tawreeed_net',
  /** تشغيل MongoDB داخل الذاكرة (بدون تثبيت Mongo محلياً) — للتطوير فقط */
  mongoMemoryServer:
    process.env.MONGODB_MEMORY_SERVER === '1' || process.env.MONGODB_MEMORY_SERVER === 'true',
  /**
   * إصدار ثنائي mongodb-memory-server (MONGOMS_VERSION).
   * الافتراضي في الحزمة 8.x كبير جداً على ويندوز؛ 7.0.x أخف وأسرع للتنزيل الأول.
   */
  mongoMemoryBinVersion: process.env.MONGOMS_VERSION || '7.0.14',
  jwtSecret: process.env.JWT_SECRET || 'dev-only-change-me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  corsOrigin:
    process.env.CORS_ORIGIN ||
    'http://localhost:5173,http://127.0.0.1:5173',
  /** الوكلاء الموثوقون (nginx) لقراءة X-Forwarded-For بدقة مع rate limiting */
  trustProxy: process.env.TRUST_PROXY === '1' || process.env.TRUST_PROXY === 'true',
  /** حد الطلبات العام لكل IP (نافذة 15 دقيقة) */
  apiGlobalRateMax: Math.max(50, Number(process.env.API_GLOBAL_RATE_MAX) || (process.env.NODE_ENV === 'production' ? 400 : 2000)),
  /** تكلفة bcrypt — بين 10 و 14 */
  bcryptRounds: Math.min(14, Math.max(10, Number(process.env.BCRYPT_ROUNDS) || 12)),
  bootstrapAdminPhone: process.env.BOOTSTRAP_ADMIN_PHONE || '',
  bootstrapAdminPassword: process.env.BOOTSTRAP_ADMIN_PASSWORD || '',
  bootstrapAdminName: process.env.BOOTSTRAP_ADMIN_NAME || 'Admin'
};
