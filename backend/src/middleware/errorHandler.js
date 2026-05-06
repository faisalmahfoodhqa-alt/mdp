const env = require('../config/env');
const { ApiError } = require('../utils/ApiError');

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const status = err instanceof ApiError ? err.statusCode : err.statusCode || 500;
  const body = {
    success: false,
    error: err.message || 'خطأ في الخادم',
    ...(err.details && { details: err.details })
  };
  if (env.nodeEnv === 'development' && err.stack) {
    body.stack = err.stack;
  }
  res.status(status).json(body);
}

module.exports = { errorHandler };
