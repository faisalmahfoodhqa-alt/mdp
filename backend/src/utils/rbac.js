/**
 * Mirror of frontend rbac.js (CommonJS) — enforcement on server
 */

const ADMIN_ROLES = {
  SUPER_ADMIN: 'super_admin',
  SUPERVISOR: 'supervisor',
  STAFF: 'staff',
  DELIVERY_SUPERVISOR: 'delivery_supervisor'
};

const LEGACY_ADMIN_ROLES = {
  OPERATIONS_ADMIN: 'operations_admin',
  SUPPORT_ADMIN: 'support_admin',
  CONTENT_ADMIN: 'content_admin'
};

const ADMIN_PERMISSION_KEYS = [
  'canViewUsers',
  'canEditUsers',
  'canDeleteUsers',
  'canApproveVerification',
  'canReviewPlanRequests',
  'canReviewAdsRequests',
  'canReviewChangeRequests',
  'canChangeOrderStatus',
  'canBulkOrderActions',
  'canEditSettings',
  'canViewAuditLog',
  'canManageAdminRoles',
  'canDeleteProducts',
  'canViewPlatformDelivery'
];

const SUPER_ADMIN_ONLY_KEYS = new Set([
  'canManageAdminRoles',
  'canEditSettings',
  'canDeleteUsers'
]);

const _fullTrue = () =>
  Object.fromEntries(ADMIN_PERMISSION_KEYS.map((k) => [k, true]));

const _supervisorCeiling = () => {
  const o = {};
  for (const k of ADMIN_PERMISSION_KEYS) {
    o[k] = !SUPER_ADMIN_ONLY_KEYS.has(k);
  }
  return o;
};

const _deliverySupervisorCeiling = () => {
  const o = {};
  for (const k of ADMIN_PERMISSION_KEYS) {
    o[k] = k === 'canViewPlatformDelivery' || k === 'canChangeOrderStatus';
  }
  return o;
};

const _staffCeiling = () => {
  const o = {};
  for (const k of ADMIN_PERMISSION_KEYS) {
    o[k] = ['canViewUsers', 'canChangeOrderStatus', 'canBulkOrderActions', 'canReviewChangeRequests'].includes(k);
  }
  return o;
};

const PERMISSION_CEILING = {
  [ADMIN_ROLES.SUPER_ADMIN]: _fullTrue(),
  [ADMIN_ROLES.SUPERVISOR]: _supervisorCeiling(),
  [ADMIN_ROLES.STAFF]: _staffCeiling(),
  [ADMIN_ROLES.DELIVERY_SUPERVISOR]: _deliverySupervisorCeiling()
};

const LEGACY_DEFAULT_PERMISSIONS = {
  [LEGACY_ADMIN_ROLES.OPERATIONS_ADMIN]: {
    canViewUsers: true,
    canEditUsers: true,
    canDeleteUsers: false,
    canApproveVerification: true,
    canReviewPlanRequests: true,
    canReviewAdsRequests: true,
    canReviewChangeRequests: true,
    canChangeOrderStatus: true,
    canBulkOrderActions: true,
    canEditSettings: false,
    canViewAuditLog: true,
    canManageAdminRoles: false,
    canDeleteProducts: true,
    canViewPlatformDelivery: true
  },
  [LEGACY_ADMIN_ROLES.SUPPORT_ADMIN]: {
    canViewUsers: true,
    canEditUsers: false,
    canDeleteUsers: false,
    canApproveVerification: false,
    canReviewPlanRequests: false,
    canReviewAdsRequests: false,
    canReviewChangeRequests: true,
    canChangeOrderStatus: true,
    canBulkOrderActions: false,
    canEditSettings: false,
    canViewAuditLog: true,
    canManageAdminRoles: false,
    canDeleteProducts: false,
    canViewPlatformDelivery: false
  },
  [LEGACY_ADMIN_ROLES.CONTENT_ADMIN]: {
    canViewUsers: false,
    canEditUsers: false,
    canDeleteUsers: false,
    canApproveVerification: false,
    canReviewPlanRequests: false,
    canReviewAdsRequests: true,
    canReviewChangeRequests: false,
    canChangeOrderStatus: false,
    canBulkOrderActions: false,
    canEditSettings: false,
    canViewAuditLog: false,
    canManageAdminRoles: false,
    canDeleteProducts: false,
    canViewPlatformDelivery: false
  }
};

function normalizeAdminRole(raw) {
  if (!raw || raw === ADMIN_ROLES.SUPER_ADMIN) return ADMIN_ROLES.SUPER_ADMIN;
  if (raw === ADMIN_ROLES.DELIVERY_SUPERVISOR) return ADMIN_ROLES.DELIVERY_SUPERVISOR;
  if (raw === ADMIN_ROLES.SUPERVISOR || raw === LEGACY_ADMIN_ROLES.OPERATIONS_ADMIN) return ADMIN_ROLES.SUPERVISOR;
  if (
    raw === ADMIN_ROLES.STAFF ||
    raw === LEGACY_ADMIN_ROLES.SUPPORT_ADMIN ||
    raw === LEGACY_ADMIN_ROLES.CONTENT_ADMIN
  ) {
    return ADMIN_ROLES.STAFF;
  }
  return ADMIN_ROLES.STAFF;
}

function getAdminRole(user) {
  if (!user || user.role !== 'admin') return null;
  return normalizeAdminRole(user.adminRole || ADMIN_ROLES.SUPER_ADMIN);
}

function getPermissionCeiling(normalizedRole) {
  if (!normalizedRole) return {};
  return PERMISSION_CEILING[normalizedRole] || PERMISSION_CEILING[ADMIN_ROLES.STAFF];
}

function sanitizeAdminPermissions(normalizedRole, partial = {}) {
  const ceiling = getPermissionCeiling(normalizedRole);
  const out = {};
  for (const k of ADMIN_PERMISSION_KEYS) {
    out[k] = Boolean(ceiling[k] && partial[k]);
  }
  return out;
}

function storedPermissionsFallback(user, normalizedRole) {
  const raw = user?.adminRole;
  if (normalizedRole === ADMIN_ROLES.DELIVERY_SUPERVISOR) {
    return sanitizeAdminPermissions(normalizedRole, {
      canViewPlatformDelivery: true,
      canChangeOrderStatus: true
    });
  }
  if (raw && LEGACY_DEFAULT_PERMISSIONS[raw]) {
    return sanitizeAdminPermissions(normalizedRole, LEGACY_DEFAULT_PERMISSIONS[raw]);
  }
  return sanitizeAdminPermissions(
    normalizedRole,
    Object.fromEntries(ADMIN_PERMISSION_KEYS.map((k) => [k, true]))
  );
}

function getEffectivePermissions(user) {
  const normalizedRole = getAdminRole(user);
  if (!normalizedRole) return {};
  if (normalizedRole === ADMIN_ROLES.SUPER_ADMIN) {
    return _fullTrue();
  }
  const ceiling = getPermissionCeiling(normalizedRole);
  let stored = user?.adminPermissions;
  if (!stored || typeof stored !== 'object' || Object.keys(stored).length === 0) {
    stored = storedPermissionsFallback(user, normalizedRole);
  }
  const out = {};
  for (const k of ADMIN_PERMISSION_KEYS) {
    out[k] = Boolean(ceiling[k] && stored[k]);
  }
  return out;
}

function hasPermission(user, permission) {
  if (!user || user.role !== 'admin') return false;
  return Boolean(getEffectivePermissions(user)[permission]);
}

function adminUserFromDoc(doc) {
  if (!doc) return null;
  const u = doc.toObject ? doc.toObject() : doc;
  return {
    ...u,
    adminRole: u.adminRole,
    adminPermissions: u.adminPermissions
  };
}

module.exports = {
  ADMIN_ROLES,
  ADMIN_PERMISSION_KEYS,
  hasPermission,
  getAdminRole,
  getEffectivePermissions,
  sanitizeAdminPermissions,
  adminUserFromDoc
};
