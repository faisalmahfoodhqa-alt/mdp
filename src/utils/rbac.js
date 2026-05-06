/**
 * صلاحيات لوحة الإدارة — هرمية: سوبر أدمن > مشرف > موظف
 * الصلاحيات الفعلية = تقاطع (سقف الدور) ∩ (ما اختاره السوبر أدمن للحساب في adminPermissions)
 */

export const ADMIN_ROLES = {
  SUPER_ADMIN: 'super_admin',
  SUPERVISOR: 'supervisor',
  STAFF: 'staff',
  DELIVERY_SUPERVISOR: 'delivery_supervisor'
};

/** أدوار قديمة في البيانات المحفوظة — تُطبَّع عند القراءة */
const LEGACY_ADMIN_ROLES = {
  OPERATIONS_ADMIN: 'operations_admin',
  SUPPORT_ADMIN: 'support_admin',
  CONTENT_ADMIN: 'content_admin'
};

export const ADMIN_ROLE_LABELS_AR = {
  [ADMIN_ROLES.SUPER_ADMIN]: 'سوبر أدمن',
  [ADMIN_ROLES.SUPERVISOR]: 'مشرف',
  [ADMIN_ROLES.STAFF]: 'موظف',
  [ADMIN_ROLES.DELIVERY_SUPERVISOR]: 'مشرف توصيل توريد نت',
  [LEGACY_ADMIN_ROLES.OPERATIONS_ADMIN]: 'مشرف (قديم)',
  [LEGACY_ADMIN_ROLES.SUPPORT_ADMIN]: 'موظف (قديم)',
  [LEGACY_ADMIN_ROLES.CONTENT_ADMIN]: 'موظف (قديم)'
};

/** كل مفاتيح الصلاحيات المعروفة */
export const ADMIN_PERMISSION_KEYS = [
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

/** وصف عربي لكل صلاحية — واجهة «فريق الإدارة» */
export const PERMISSION_LABELS_AR = {
  canViewUsers: 'عرض البائعين والعملاء والمنتجات والقوائم',
  canEditUsers: 'تعديل الحسابات (تفعيل، إيقاف، تغيير الباقة)',
  canDeleteUsers: 'حذف المستخدمين (عملاء/بائعين)',
  canApproveVerification: 'الموافقة على توثيق البائعين',
  canReviewPlanRequests: 'مراجعة طلبات الاشتراك/الباقات',
  canReviewAdsRequests: 'مراجعة طلبات الإعلانات',
  canReviewChangeRequests: 'مراجعة طلبات تعديل الحساب',
  canChangeOrderStatus: 'تغيير حالة الطلبات',
  canBulkOrderActions: 'عمليات الطلبات الجماعية',
  canEditSettings: 'تعديل إعدادات الموقع والإجراءات الحساسة',
  canViewAuditLog: 'عرض سجل التدقيق',
  canManageAdminRoles: 'إدارة فريق الإدارة (سوبر/مشرف/موظف)',
  canDeleteProducts: 'حذف المنتجات من المنصة',
  canViewPlatformDelivery: 'عرض طابور توصيل توريد نت (البائع المنصّة–العميل)'
};

/** صلاحيات حصرية للسوبر أدمن — لا يظهر سقفها للمشرف/الموظف */
export const SUPER_ADMIN_ONLY_KEYS = new Set([
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

/** أقصى ما يمكن للموظف امتلاكه */
const _staffCeiling = () => {
  const o = {};
  for (const k of ADMIN_PERMISSION_KEYS) {
    o[k] = ['canViewUsers', 'canChangeOrderStatus', 'canBulkOrderActions', 'canReviewChangeRequests'].includes(k);
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

export const PERMISSION_CEILING = {
  [ADMIN_ROLES.SUPER_ADMIN]: _fullTrue(),
  [ADMIN_ROLES.SUPERVISOR]: _supervisorCeiling(),
  [ADMIN_ROLES.STAFF]: _staffCeiling(),
  [ADMIN_ROLES.DELIVERY_SUPERVISOR]: _deliverySupervisorCeiling()
};

/** افتراضيات الأدوار القديمة (قبل نظام المشرف/الموظف) */
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

/**
 * يطبّع الدور المخزَّن إلى أحد: super_admin | supervisor | staff | delivery_supervisor
 */
export const normalizeAdminRole = (raw) => {
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
};

export const getAdminRole = (user) => {
  if (!user || user.role !== 'admin') return null;
  return normalizeAdminRole(user.adminRole || ADMIN_ROLES.SUPER_ADMIN);
};

/**
 * سقف الصلاحيات لدور معيّن (بدون النظر لـ adminPermissions)
 */
export const getPermissionCeiling = (normalizedRole) => {
  if (!normalizedRole) return {};
  return PERMISSION_CEILING[normalizedRole] || PERMISSION_CEILING[ADMIN_ROLES.STAFF];
};

/**
 * يدمج مدخلات الواجهة مع السقف — لا يمكن تجاوز سقف الدور
 */
export const sanitizeAdminPermissions = (normalizedRole, partial = {}) => {
  const ceiling = getPermissionCeiling(normalizedRole);
  const out = {};
  for (const k of ADMIN_PERMISSION_KEYS) {
    out[k] = Boolean(ceiling[k] && partial[k]);
  }
  return out;
};

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
  /* مشرف جديد بدون صلاحيات مخزنة => تفعيل كل ما يسمح به السقف */
  return sanitizeAdminPermissions(
    normalizedRole,
    Object.fromEntries(ADMIN_PERMISSION_KEYS.map((k) => [k, true]))
  );
}

/**
 * الصلاحيات الفعلية بعد تطبيق السقف والاختيارات المخزنة
 */
export const getEffectivePermissions = (user) => {
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
};

export const hasPermission = (user, permission) => {
  if (!user || user.role !== 'admin') return false;
  return Boolean(getEffectivePermissions(user)[permission]);
};

const TAB_PERMISSION_MAP = {
  overview: 'canViewUsers',
  sellers: 'canViewUsers',
  customers: 'canViewUsers',
  products: 'canViewUsers',
  orders: 'canViewUsers',
  verifications: 'canApproveVerification',
  'change-requests': 'canReviewChangeRequests',
  'plan-requests': 'canReviewPlanRequests',
  ads: 'canReviewAdsRequests',
  'platform-delivery': 'canViewPlatformDelivery',
  settings: 'canEditSettings',
  'audit-log': 'canViewAuditLog',
  team: 'canManageAdminRoles'
};

export const canAccessAdminTab = (user, tabKey) => {
  if (!user || user.role !== 'admin') return false;
  const requiredPermission = TAB_PERMISSION_MAP[tabKey];
  if (!requiredPermission) return true;
  return hasPermission(user, requiredPermission);
};

export const getAdminRoleLabel = (user) => {
  const r = getAdminRole(user);
  return ADMIN_ROLE_LABELS_AR[r] || 'مدير';
};

export const ORDER_STATUS_TRANSITIONS = {
  pending: ['processing', 'cancelled'],
  processing: ['shipping', 'cancelled'],
  shipping: ['delivered', 'cancelled'],
  delivered: [],
  cancelled: []
};

export const canTransitionOrderStatus = (currentStatus, nextStatus) => {
  if (!currentStatus || !nextStatus) return false;
  if (currentStatus === nextStatus) return true;
  const allowed = ORDER_STATUS_TRANSITIONS[currentStatus] || [];
  return allowed.includes(nextStatus);
};

/** توافق إصدارات قديمة — لو كان الكود يستورد ADMIN_ROLES القديمة */
export const ADMIN_ROLE_LABELS = { ...ADMIN_ROLE_LABELS_AR };
