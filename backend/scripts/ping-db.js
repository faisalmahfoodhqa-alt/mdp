/**

 * تحقّق سريع من اتصال MongoDB قبل تشغيل الـ API — exit 0 نجاح، 1 فشل

 */

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const { connectDb, disconnectDb } = require('../src/config/db');



(async () => {

  try {

    await connectDb();

    console.log('[ping-db] OK');

    await disconnectDb();

    process.exit(0);

  } catch (e) {

    console.error('[ping-db] FAIL —', e.message);

    console.error('  تأكد أن MongoDB يعمل أو صحّح MONGODB_URI في backend/.env');

    console.error(

      '  أو للتطوير بدون Mongo محلي: ضع في .env المتغير MONGODB_MEMORY_SERVER=1 أو شغّل npm run ping-db:memory',

    );

    try {

      await disconnectDb();

    } catch (_) {

      /* ignore */

    }

    process.exit(1);

  }

})();


