const bcrypt = require('bcryptjs');
const User = require('../models/User');
const env = require('../config/env');

/**
 * Ensures at least one admin exists when BOOTSTRAP_* env vars are set.
 */
async function ensureBootstrapAdmin() {
  const phone = String(env.bootstrapAdminPhone || '').trim();
  const password = env.bootstrapAdminPassword;
  if (!phone || !password) return null;

  const hasAdmin = await User.exists({ role: 'admin' });
  if (hasAdmin) return null;

  const passwordHash = await bcrypt.hash(String(password), env.bcryptRounds);
  const user = await User.create({
    phone,
    passwordHash,
    role: 'admin',
    fullName: env.bootstrapAdminName,
    displayName: env.bootstrapAdminName,
    adminRole: 'super_admin',
    adminPermissions: {},
    username: 'admin'
  });
  return user._id.toString();
}

module.exports = { ensureBootstrapAdmin };
