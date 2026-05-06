const app = require('./app');
const env = require('./config/env');
const { connectDb } = require('./config/db');
const { ensureBootstrapAdmin } = require('./services/bootstrap.service');

env.validate();

async function main() {
  await connectDb();
  const created = await ensureBootstrapAdmin();
  if (created) {
    console.log('[bootstrap] Created default admin user:', created);
  }
  app.listen(env.port, () => {
    console.log(`API listening on http://localhost:${env.port}`);
    console.log(`Health: http://localhost:${env.port}/api/v1/health`);
  });
}

main().catch((err) => {
  console.error(err);
  const msg = String(err?.message || err || '');
  if (/27017|MongooseServerSelectionError|MongoNetworkError/i.test(msg)) {
    console.error('\n[MongoDB] تعذّر الاتصال بقاعدة البيانات.');
    console.error('  شغّل MongoDB محلياً (افتراضي mongodb://127.0.0.1:27017) أو عيّن MONGODB_URI في backend/.env (مثل MongoDB Atlas).');
    console.error('  بدون Mongo لن يقلع الـ API ولن يتصل الفرونت بالباك اند بشكل كامل.\n');
  }
  process.exit(1);
});
