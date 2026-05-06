/**
 * عنوان العميل الحقيقي خلف البروكسي / CDN — يفعَّل مع trust proxy في التطبيق.
 */
function clientIp(req) {
  const xf = req.headers['x-forwarded-for'];
  if (typeof xf === 'string' && xf.trim()) {
    return xf.split(',')[0].trim();
  }
  return req.ip || req.socket?.remoteAddress || '';
}

function clientUa(req) {
  const ua = req.headers['user-agent'];
  return typeof ua === 'string' ? ua.slice(0, 512) : '';
}

module.exports = { clientIp, clientUa };
