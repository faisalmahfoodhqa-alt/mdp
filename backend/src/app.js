const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const env = require('./config/env');
const v1Routes = require('./routes/v1');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

if (env.trustProxy) {
  app.set('trust proxy', 1);
}

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    originAgentCluster: true,
    dnsPrefetchControl: { allow: false },
    frameguard: { action: 'deny' },
    hsts:
      env.nodeEnv === 'production'
        ? { maxAge: 31536000, includeSubDomains: true, preload: true }
        : false,
    ieNoOpen: true,
    noSniff: true,
    permittedCrossDomainPolicies: { permittedPolicies: 'none' },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
  })
);

const corsOrigins = env.corsOrigin
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    credentials: true,
    origin(origin, callback) {
      if (env.nodeEnv !== 'production') {
        // تطوير: السماح بأي Origin (مثلاً http://IP:5173 من الجوال) دون تعديل CORS_ORIGIN يدوياً
        return callback(null, true);
      }
      if (!origin) {
        return callback(null, false);
      }
      if (corsOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, false);
    }
  })
);

app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
app.use(express.json({ limit: '25mb' }));

app.get('/', (req, res) => {
  res.json({
    success: true,
    data: {
      name: 'tawreeed-api',
      docs: '/api/v1/health',
      api: '/api/v1'
    }
  });
});

app.use('/api/v1', v1Routes);

app.use((req, res) => {
  res.status(404).json({ success: false, error: 'المسار غير موجود' });
});

app.use(errorHandler);

module.exports = app;
