const AuditLog = require('../models/AuditLog');
const { clientIp, clientUa } = require('../utils/requestMeta');

function maskPhone(phone) {
  const p = String(phone || '').replace(/\D/g, '');
  if (p.length < 4) return '***';
  return `***${p.slice(-4)}`;
}

async function safeWrite(action, { actorUserId = null, meta = {} }) {
  try {
    await AuditLog.create({
      action,
      meta,
      adminUserId: actorUserId || undefined,
      createdAt: new Date()
    });
  } catch (err) {
    console.error('[securityAudit]', err.message);
  }
}

function baseMeta(req) {
  return {
    ip: clientIp(req),
    ua: clientUa(req)
  };
}

async function logLoginSuccess(userLike, req) {
  const uid = userLike._id || userLike.id;
  await safeWrite('auth.login.success', {
    actorUserId: uid,
    meta: {
      ...baseMeta(req),
      role: userLike.role,
      phoneMasked: maskPhone(userLike.phone)
    }
  });
}

async function logLoginFailure(phone, req, reason = 'invalid_credentials') {
  await safeWrite('auth.login.failure', {
    meta: {
      ...baseMeta(req),
      phoneMasked: maskPhone(phone),
      reason
    }
  });
}

async function logLogout(userDoc, req) {
  const uid = userDoc._id || userDoc.id;
  await safeWrite('auth.logout', {
    actorUserId: uid,
    meta: {
      ...baseMeta(req),
      role: userDoc.role,
      phoneMasked: maskPhone(userDoc.phone)
    }
  });
}

async function logRegister(userLike, req, roleLabel) {
  const uid = userLike._id || userLike.id;
  await safeWrite(roleLabel === 'seller' ? 'auth.register.seller' : 'auth.register.customer', {
    actorUserId: uid,
    meta: {
      ...baseMeta(req),
      role: roleLabel,
      phoneMasked: maskPhone(userLike.phone)
    }
  });
}

async function logPasswordResetSuccess(phone, req) {
  await safeWrite('auth.password.reset', {
    meta: {
      ...baseMeta(req),
      phoneMasked: maskPhone(phone)
    }
  });
}

async function logAdminActionFromReq(actorDoc, action, req, metaExtra = {}) {
  const meta =
    req && typeof req.headers === 'object'
      ? baseMeta(req)
      : { ip: '', ua: '' };
  await safeWrite(action, {
    actorUserId: actorDoc._id,
    meta: {
      ...meta,
      adminPhoneMasked: maskPhone(actorDoc.phone),
      adminRole: actorDoc.role,
      ...metaExtra
    }
  });
}

async function logProfilePatch(userDoc, req, fields) {
  await safeWrite('user.profile.patch', {
    actorUserId: userDoc._id,
    meta: {
      ...baseMeta(req),
      role: userDoc.role,
      fields: Array.isArray(fields) ? fields.slice(0, 80) : []
    }
  });
}

module.exports = {
  maskPhone,
  logLoginSuccess,
  logLoginFailure,
  logLogout,
  logRegister,
  logPasswordResetSuccess,
  logAdminActionFromReq,
  logProfilePatch
};
