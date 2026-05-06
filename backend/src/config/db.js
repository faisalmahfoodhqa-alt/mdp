const mongoose = require('mongoose');
const env = require('./env');

let memoryServerInstance = null;

function dbNameFromMongoUri(uri) {
  const raw = String(uri || '').trim().split('?')[0];
  const last = raw.lastIndexOf('/');
  if (last === -1 || last >= raw.length - 1) return undefined;
  const seg = raw.slice(last + 1);
  return seg ? seg : undefined;
}

async function connectDb() {
  mongoose.set('strictQuery', true);
  let uri = env.mongoUri;
  let options = {};

  if (env.mongoMemoryServer) {
    if (env.nodeEnv === 'production') {
      throw new Error('MONGODB_MEMORY_SERVER ممنوع في الإنتاج');
    }
    const { MongoMemoryServer } = require('mongodb-memory-server');
    memoryServerInstance = await MongoMemoryServer.create({
      binary: { version: env.mongoMemoryBinVersion },
    });
    uri = memoryServerInstance.getUri();
    const dbName = dbNameFromMongoUri(env.mongoUri) || 'tawreeed_net';
    options.dbName = dbName;
    console.log('[db] MongoDB Memory Server (dev) — لا يُستخدم في الإنتاج');
  }

  await mongoose.connect(uri, options);
  return mongoose.connection;
}

async function disconnectDb() {
  await mongoose.disconnect();
  if (memoryServerInstance) {
    await memoryServerInstance.stop();
    memoryServerInstance = null;
  }
}

module.exports = { connectDb, disconnectDb, mongoose };
