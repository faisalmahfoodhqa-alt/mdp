// src/pages/AdminDashboard.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, PLANS } from '../context/AuthContext';
import { canTransitionOrderStatus, getAdminRole, getAdminRoleLabel, ADMIN_ROLES, ADMIN_PERMISSION_KEYS, PERMISSION_LABELS_AR, sanitizeAdminPermissions, getPermissionCeiling } from '../utils/rbac';
import { Badge as SharedBadge, Modal as SharedModal, Button as SharedButton, Card as SharedCard, Input as SharedInput, UIButton } from '../shared/components/ui';
import {
  People, Shop, Bag, CheckCircleFill, LockFill, UnlockFill, Trash, BoxArrowRight,
  PersonBadge, GraphUp, Clock, StarFill, Eye, GearFill, Shield, Search,
  ArrowClockwise, BoxSeam, CurrencyDollar, Megaphone, CheckLg, XLg, Wallet2,
  Truck
} from 'react-bootstrap-icons';

import { useBackend, filterMongoDocRows } from '../config/backend';
import { backendApi } from '../api/backendApi';

const C = {
  primary: '#0a1a3a', gold: '#c88c23', goldL: '#e5a847',
  white: '#ffffff', light: '#f8f9fa', red: '#dc3545',
  green: '#28a745', gray: '#6c757d', orange: '#fd7e14',
  blue: '#0d6efd', purple: '#6f42c1'
};

const TRIAL_DAYS = 90;

/** أقسام التنقل الرئيسية → التبويبات الفرعية (ترتيب هرمي أوضح في الواجهة) */
const ADMIN_NAV_SECTION_BLUEPRINT = [
  { id: 'overview', title: 'نظرة عامة', shortTitle: 'عامة', Icon: GraphUp, keys: ['overview'] },
  {
    id: 'seller',
    title: 'البائعون والمنتجات',
    shortTitle: 'بائعون',
    Icon: Shop,
    keys: ['sellers', 'products', 'verifications', 'change-requests', 'plan-requests', 'ads']
  },
  {
    id: 'customer',
    title: 'العملاء والطلبات',
    shortTitle: 'عملاء',
    Icon: People,
    keys: ['customers', 'orders']
  },
  {
    id: 'tawreed-delivery',
    title: 'توصيل توريد نت',
    shortTitle: 'توصيل',
    Icon: Truck,
    keys: ['platform-delivery']
  },
  {
    id: 'system',
    title: 'النظام والفريق',
    shortTitle: 'نظام',
    Icon: GearFill,
    keys: ['team', 'settings', 'audit-log']
  }
];

const getStatus = (seller) => {
  const plan = seller.plan || 'trial';
  const start = seller.trialStartDate ? new Date(seller.trialStartDate) : new Date();
  const days = Math.floor((new Date() - start) / 86400000);
  const daysLeft = Math.max(0, TRIAL_DAYS - days);
  const isPaid = seller.isPaid || false;
  const isTrialExpired = days >= TRIAL_DAYS;
  const isLocked = plan === 'trial' && isTrialExpired && !isPaid;
  return { plan, daysLeft, isPaid, isLocked, isTrialExpired, planInfo: PLANS[plan] || PLANS.trial };
};

const Card = ({ icon, label, value, bg }) => (
  <SharedCard
    padding="lg"
    style={{
      background: C.white,
      borderRadius: 16,
      padding: '20px',
      boxShadow: '0 3px 15px rgba(0,0,0,0.06)',
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }}
  >
    <div style={{ width: 52, height: 52, borderRadius: 14, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
    <div>
      <div style={{ fontSize: 28, fontWeight: 'bold', color: C.primary }}>{value}</div>
      <div style={{ fontSize: 12, color: C.gray }}>{label}</div>
    </div>
  </SharedCard>
);

const Badge = ({ children, color }) => (
  <SharedBadge
    tone="neutral"
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      padding: '3px 10px',
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 'bold',
      background: color + '18',
      color
    }}
  >
    {children}
  </SharedBadge>
);

const Btn = ({ onClick, color = C.red, children, style = {} }) => (
  <SharedButton
    onClick={onClick}
    variant="secondary"
    size="sm"
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      padding: '6px 13px',
      background: color + '15',
      color,
      border: `1px solid ${color}30`,
      borderRadius: 8,
      cursor: 'pointer',
      fontSize: 12,
      fontWeight: 600,
      ...style
    }}
  >
    {children}
  </SharedButton>
);

const Modal = ({ title, onClose, children }) => (
  <SharedModal
    title={title}
    onClose={onClose}
    overlayStyle={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.5)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16
    }}
    contentStyle={{
      background: C.white,
      borderRadius: 20,
      padding: 28,
      width: '100%',
      maxWidth: 500,
      direction: 'rtl',
      maxHeight: '80vh',
      overflowY: 'auto'
    }}
    titleStyle={{ margin: 0, color: C.primary }}
    closeButtonStyle={{
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: 22,
      color: C.gray
    }}
  >
    {children}
  </SharedModal>
);

export default function AdminDashboard() {
  const { user, logout, hasPermission, canAccessAdminTab, getAdminRoleLabel: sessionAdminLabel, updateUser } = useAuth();
  const [tab, setTab] = useState('overview');

  const VALID_ORDER_STATUSES = ['pending', 'processing', 'shipping', 'delivered', 'cancelled'];
  const ORDER_STATUS_ALIASES = { shipped: 'shipping', confirmed: 'processing' };
  const normalizeOrderStatus = (s) => ORDER_STATUS_ALIASES[s] || s;

  const getUsers = () => {
    const primary = JSON.parse(localStorage.getItem('all_users') || '[]');
    if (Array.isArray(primary) && primary.length > 0) return primary;
    const legacy = JSON.parse(localStorage.getItem('users') || '[]');
    return Array.isArray(legacy) ? legacy : [];
  };
  const getProducts = () => {
    const primary = JSON.parse(localStorage.getItem('all_products') || '[]');
    if (Array.isArray(primary) && primary.length > 0) return primary;
    const legacy = JSON.parse(localStorage.getItem('allProducts') || '[]');
    return Array.isArray(legacy) ? legacy : [];
  };
  const getOrders = (usersRef = null) => {
    const primary = JSON.parse(localStorage.getItem('all_orders') || '[]');
    if (Array.isArray(primary) && primary.length > 0) return primary;
    const usersSrc = usersRef || getUsers();
    return usersSrc.flatMap(u => (u.orders || []).map(o => ({ ...o, customerName: u.fullName, customerPhone: u.phone })));
  };
  const syncUsers = (updated) => {
    localStorage.setItem('all_users', JSON.stringify(updated));
    localStorage.setItem('users', JSON.stringify(updated));
    if (useBackend) {
      const bulk = filterMongoDocRows(updated);
      if (bulk.length) backendApi.adminSyncUsers(bulk).catch((err) => console.error(err));
    }
  };
  const syncProducts = (updated) => {
    localStorage.setItem('all_products', JSON.stringify(updated));
    localStorage.setItem('allProducts', JSON.stringify(updated));
    if (useBackend) {
      const bulk = filterMongoDocRows(updated);
      if (bulk.length) backendApi.adminSyncProducts(bulk).catch((err) => console.error(err));
    }
  };
  const syncOrders = (updated) => {
    localStorage.setItem('all_orders', JSON.stringify(updated));
    if (useBackend) {
      backendApi.adminSyncOrders(updated).catch((err) => console.error(err));
    }
  };

  const [users, setUsers] = useState(getUsers);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null);
  const [settings, setSettings] = useState(() => {
    try { return JSON.parse(localStorage.getItem('siteSettings') || '{}'); } catch { return {}; }
  });
  /** بعد تحميل اللقطة من الخادم نسمح بمزامنة الإعدادات تلقائياً ونتجنب دفع حالة قديمة قبل الجلب */
  const adminSnapshotReadyRef = useRef(false);
  const lastPushedSettingsJsonRef = useRef('');
  const settingsPushTimerRef = useRef(null);
  const [toast, setToast] = useState(null);
  const [selectedOrderIds, setSelectedOrderIds] = useState([]);
  const [bulkStatus, setBulkStatus] = useState('processing');
  const [adRequests, setAdRequests] = useState(() => JSON.parse(localStorage.getItem('adRequests') || '[]'));
  const [planRequests, setPlanRequests] = useState(() => JSON.parse(localStorage.getItem('planUpgradeRequests') || '[]'));
  const [auditLogs, setAuditLogs] = useState(() => {
    try {
      const logs = JSON.parse(localStorage.getItem('admin_audit_log') || '[]');
      return Array.isArray(logs) ? logs : [];
    } catch {
      return [];
    }
  });
  const [changeRequests, setChangeRequests] = useState(() => {
    try {
      const reqs = JSON.parse(localStorage.getItem('change_requests') || '[]');
      return Array.isArray(reqs) ? reqs : [];
    } catch {
      return [];
    }
  });
  const [teamModal, setTeamModal] = useState(null);
  const [platformQueue, setPlatformQueue] = useState([]);
  const [platformQueueLoading, setPlatformQueueLoading] = useState(false);
  const deliverySuperBootRef = useRef(false);

  const reload = () => setUsers(getUsers());

  useEffect(() => {
    if (!user?.id || user.role !== 'admin' || deliverySuperBootRef.current) return;
    if (getAdminRole(user) === ADMIN_ROLES.DELIVERY_SUPERVISOR) {
      deliverySuperBootRef.current = true;
      setTab('platform-delivery');
    }
  }, [user]);

  const canViewPlatformDeliveryUi = hasPermission('canViewPlatformDelivery');
  useEffect(() => {
    if (tab !== 'platform-delivery' || !canViewPlatformDeliveryUi) return undefined;
    let cancelled = false;
    (async () => {
      if (useBackend) {
        setPlatformQueueLoading(true);
        try {
          const d = await backendApi.adminPlatformDeliveryQueue();
          if (!cancelled) setPlatformQueue(Array.isArray(d?.orders) ? d.orders : []);
        } catch (e) {
          if (!cancelled) {
            setPlatformQueue([]);
            showToast(e.message || 'تعذر تحميل طابور التوصيل', 'error');
          }
        } finally {
          if (!cancelled) setPlatformQueueLoading(false);
        }
      } else {
        const local = getOrders(users).filter(
          (o) => o.platformDeliveryPending === true || o.fulfillmentModeResolved === 'platform'
        );
        if (!cancelled) setPlatformQueue(local);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [tab, useBackend, users, canViewPlatformDeliveryUi]);
  const reloadAds = () => setAdRequests(JSON.parse(localStorage.getItem('adRequests') || '[]'));
  const reloadPlans = () => setPlanRequests(JSON.parse(localStorage.getItem('planUpgradeRequests') || '[]'));
  const reloadChangeRequests = () => {
    try {
      const reqs = JSON.parse(localStorage.getItem('change_requests') || '[]');
      setChangeRequests(Array.isArray(reqs) ? reqs : []);
    } catch {
      setChangeRequests([]);
    }
  };
  const pendingAds = adRequests.filter(r => r.status === 'pending');
  const pendingPlans = planRequests.filter(r => r.status === 'pending');
  const pendingChangeRequests = changeRequests.filter(r => r.status === 'pending');

  const AUDIT_KEY = 'admin_audit_log';
  const logAudit = (action, meta = {}) => {
    try {
      const row = {
        id: Date.now() + Math.floor(Math.random() * 1000),
        action,
        meta,
        by: { adminId: user?.id, adminName: user?.fullName || 'admin' },
        at: new Date().toISOString()
      };
      const existing = JSON.parse(localStorage.getItem(AUDIT_KEY) || '[]');
      const arr = Array.isArray(existing) ? existing : [];
      arr.unshift(row);
      const trimmed = arr.slice(0, 500);
      localStorage.setItem(AUDIT_KEY, JSON.stringify(trimmed));
      setAuditLogs(trimmed);
      if (useBackend) {
        backendApi
          .adminAppendAudit({
            action,
            meta: { ...meta, ...row.by, at: row.at }
          })
          .catch(() => {});
      }
    } catch {}
  };

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  /** حفظ إعدادات الموقع في المتصفح فوراً، ومزامنة الخادم تلقائياً بعد توقف الكتابة (~0.7 ث) — بدون انتظار فواصل طويلة */
  useEffect(() => {
    if (!hasPermission('canEditSettings')) return undefined;

    try {
      localStorage.setItem('siteSettings', JSON.stringify(settings));
    } catch {
      /* ignore */
    }

    if (!useBackend) return undefined;

    if (!adminSnapshotReadyRef.current) return undefined;

    const json = JSON.stringify(settings);
    if (json === lastPushedSettingsJsonRef.current) return undefined;

    if (settingsPushTimerRef.current) clearTimeout(settingsPushTimerRef.current);
    settingsPushTimerRef.current = setTimeout(async () => {
      settingsPushTimerRef.current = null;
      try {
        await backendApi.adminSyncExtras({ settings });
        lastPushedSettingsJsonRef.current = json;
      } catch (e) {
        showToast(e.message || 'تعذر الحفظ التلقائي للإعدادات على الخادم', 'error');
      }
    }, 700);

    return () => {
      if (settingsPushTimerRef.current) clearTimeout(settingsPushTimerRef.current);
    };
  }, [settings, useBackend, hasPermission]);

  useEffect(() => {
    if (!useBackend || user?.role !== 'admin') return;
    let cancelled = false;
    (async () => {
      try {
        const d = await backendApi.adminSnapshot();
        if (cancelled) return;
        localStorage.setItem('all_users', JSON.stringify(d.users || []));
        localStorage.setItem('users', JSON.stringify(d.users || []));
        localStorage.setItem('all_products', JSON.stringify(d.products || []));
        localStorage.setItem('allProducts', JSON.stringify(d.products || []));
        localStorage.setItem('all_orders', JSON.stringify(d.orders || []));
        localStorage.setItem('siteSettings', JSON.stringify(d.settings || {}));
        localStorage.setItem('adRequests', JSON.stringify(d.adRequests || []));
        localStorage.setItem('planUpgradeRequests', JSON.stringify(d.planRequests || []));
        localStorage.setItem('change_requests', JSON.stringify(d.changeRequests || []));
        const auditMapped = (d.auditLogs || []).map((log, i) => ({
          id: `${log.createdAt || ''}-${i}`,
          action: log.action,
          meta: log.meta,
          by: { adminId: log.adminUserId },
          at: log.createdAt
        }));
        localStorage.setItem('admin_audit_log', JSON.stringify(auditMapped));
        const nextSettings = d.settings || {};
        lastPushedSettingsJsonRef.current = JSON.stringify(nextSettings);
        adminSnapshotReadyRef.current = true;
        setUsers(d.users || []);
        setSettings(nextSettings);
        setAdRequests(d.adRequests || []);
        setPlanRequests(d.planRequests || []);
        setChangeRequests(d.changeRequests || []);
        setAuditLogs(auditMapped);
      } catch (e) {
        console.error('admin snapshot', e);
        try {
          lastPushedSettingsJsonRef.current = JSON.stringify(
            JSON.parse(localStorage.getItem('siteSettings') || '{}')
          );
        } catch {
          lastPushedSettingsJsonRef.current = '{}';
        }
        adminSnapshotReadyRef.current = true;
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user?.role]);

  const saveUsers = (updated) => {
    syncUsers(updated);
    reload();
  };

  const sellers = users.filter(u => u.role === 'seller');
  const customers = users.filter(u => u.role === 'customer');
  const adminTeam = users.filter(u => u.role === 'admin');
  const superAdminCount = adminTeam.filter((a) => getAdminRole(a) === ADMIN_ROLES.SUPER_ADMIN).length;
  const allProducts = getProducts();
  const allOrders = getOrders(users);

  const filteredSellers = sellers.filter(s =>
    (s.storeName || '').toLowerCase().includes(search.toLowerCase()) ||
    (s.fullName || '').toLowerCase().includes(search.toLowerCase()) ||
    (s.phone || '').includes(search)
  );
  const filteredCustomers = customers.filter(c =>
    (c.fullName || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.phone || '').includes(search)
  );
  const filteredProducts = allProducts.filter(p =>
    (p.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (p.storeName || '').toLowerCase().includes(search.toLowerCase())
  );

  const allPermsTrue = () => Object.fromEntries(ADMIN_PERMISSION_KEYS.map((k) => [k, true]));

  const openCreateTeamModal = () => {
    const role = ADMIN_ROLES.SUPERVISOR;
    setTeamModal({
      mode: 'create',
      form: {
        fullName: '',
        phone: '',
        password: '',
        adminRole: role,
        adminPermissions: sanitizeAdminPermissions(role, allPermsTrue())
      }
    });
  };

  const openEditTeamModal = (adm) => {
    const role = getAdminRole(adm);
    const hasStored = adm.adminPermissions && typeof adm.adminPermissions === 'object' && Object.keys(adm.adminPermissions).length > 0;
    const perms = role === ADMIN_ROLES.SUPER_ADMIN
      ? {}
      : sanitizeAdminPermissions(role, hasStored ? adm.adminPermissions : allPermsTrue());
    setTeamModal({
      mode: 'edit',
      adminId: adm.id,
      form: {
        fullName: adm.fullName || '',
        phone: String(adm.phone || ''),
        password: '',
        adminRole: role,
        adminPermissions: perms
      }
    });
  };

  const persistTeamMember = () => {
    if (!hasPermission('canManageAdminRoles')) {
      showToast('ليس لديك صلاحية إدارة الفريق', 'error');
      return;
    }
    if (!teamModal?.form) return;
    const f = teamModal.form;
    const roleNorm = f.adminRole;
    if (![ADMIN_ROLES.SUPER_ADMIN, ADMIN_ROLES.SUPERVISOR, ADMIN_ROLES.STAFF, ADMIN_ROLES.DELIVERY_SUPERVISOR].includes(roleNorm)) {
      showToast('دور غير صالح', 'error');
      return;
    }
    const perms = roleNorm === ADMIN_ROLES.SUPER_ADMIN ? {} : sanitizeAdminPermissions(roleNorm, f.adminPermissions || {});
    const fullName = (f.fullName || '').trim();
    const phone = String(f.phone || '').replace(/\D/g, '');
    if (!fullName || !phone) {
      showToast('الاسم ورقم الجوال مطلوبان', 'error');
      return;
    }

    if (teamModal.mode === 'create') {
      const pwd = (f.password || '').trim();
      if (!pwd) {
        showToast('كلمة المرور مطلوبة للحساب الجديد', 'error');
        return;
      }
      if (getUsers().some((u) => String(u.phone) === phone)) {
        showToast('رقم الجوال مستخدم مسبقاً', 'error');
        return;
      }
      const row = {
        id: Date.now(),
        role: 'admin',
        adminRole: roleNorm,
        adminPermissions: roleNorm === ADMIN_ROLES.SUPER_ADMIN ? {} : perms,
        fullName,
        phone,
        password: pwd,
        username: f.username || `admin_${phone.slice(-4)}`,
        notifications: [],
        orders: [],
        wishlist: [],
        followedStores: [],
        createdAt: new Date().toISOString()
      };
      saveUsers([...getUsers(), row]);
      logAudit('admin.team.create', { adminId: row.id, phone, adminRole: roleNorm });
      showToast('تم إنشاء حساب الإدارة ✅');
      setTeamModal(null);
      return;
    }

    const adminId = teamModal.adminId;
    const existing = getUsers().find((u) => u.id === adminId);
    if (!existing || existing.role !== 'admin') return;

    const wasSuper = getAdminRole(existing) === ADMIN_ROLES.SUPER_ADMIN;
    const willSuper = roleNorm === ADMIN_ROLES.SUPER_ADMIN;
    if (wasSuper && !willSuper && superAdminCount <= 1) {
      showToast('لا يمكن إزالة آخر سوبر أدمن من النظام', 'error');
      return;
    }

    if (getUsers().some((u) => String(u.phone) === phone && u.id !== adminId)) {
      showToast('رقم الجوال مستخدم بحساب آخر', 'error');
      return;
    }

    const pwd = (f.password || '').trim();
    const nextRow = {
      ...existing,
      fullName,
      phone,
      adminRole: roleNorm,
      adminPermissions: roleNorm === ADMIN_ROLES.SUPER_ADMIN ? {} : perms
    };
    if (pwd) nextRow.password = pwd;

    const us = getUsers().map((u) => (u.id === adminId ? nextRow : u));
    saveUsers(us);
    logAudit('admin.team.update', { adminId, adminRole: roleNorm });
    if (String(user?.id) === String(adminId)) {
      updateUser(nextRow);
    }
    showToast('تم تحديث عضو الفريق ✅');
    setTeamModal(null);
  };

  const deletUser = (id) => {
    if (!hasPermission('canDeleteUsers')) {
      showToast('ليس لديك صلاحية حذف المستخدمين', 'error');
      return;
    }
    const target = users.find(u => u.id === id);
    if (target?.role === 'admin' && getAdminRole(target) === ADMIN_ROLES.SUPER_ADMIN && superAdminCount <= 1) {
      showToast('لا يمكن حذف آخر سوبر أدمن في النظام', 'error');
      return;
    }
    if (!window.confirm('هل أنت متأكد من الحذف؟')) return;
    const updated = users.filter(u => u.id !== id);
    const prods = allProducts.filter(p => p.sellerId !== id);
    syncProducts(prods);
    saveUsers(updated);
    showToast('تم الحذف بنجاح');
  };

  const toggleLock = (id) => {
    if (!hasPermission('canEditUsers')) {
      showToast('ليس لديك صلاحية تعديل الحسابات', 'error');
      return;
    }
    const updated = users.map(u => u.id === id ? { ...u, isLocked: !u.isLocked, isPaid: u.isLocked ? u.isPaid : false } : u);
    saveUsers(updated);
    showToast('تم تحديث الحالة');
  };

  const activatePaid = (id) => {
    if (!hasPermission('canEditUsers')) {
      showToast('ليس لديك صلاحية تفعيل الحسابات', 'error');
      return;
    }
    const updated = users.map(u => {
      if (u.id !== id) return u;
      const plan = u.plan || 'trial';
      const planInfo = PLANS[plan] || PLANS.trial;
      return { ...u, isPaid: true, isApproved: true, maxProducts: planInfo.maxProducts, maxImagesPerProduct: planInfo.maxImagesPerProduct };
    });
    saveUsers(updated);
    showToast('تم تفعيل الحساب المدفوع ✅');
  };

  const changePlan = (id, plan) => {
    if (!hasPermission('canEditUsers')) {
      showToast('ليس لديك صلاحية تغيير الباقات', 'error');
      return;
    }
    const planInfo = PLANS[plan] || PLANS.trial;
    const updated = users.map(u => u.id === id ? { ...u, plan, maxProducts: planInfo.maxProducts, maxImagesPerProduct: planInfo.maxImagesPerProduct } : u);
    saveUsers(updated);
    showToast('تم تغيير الباقة');
  };

  const saveSettings = async () => {
    if (!hasPermission('canEditSettings')) {
      showToast('ليس لديك صلاحية تعديل الإعدادات', 'error');
      return;
    }
    localStorage.setItem('siteSettings', JSON.stringify(settings));
    if (useBackend) {
      try {
        await backendApi.adminSyncExtras({ settings });
      } catch (e) {
        showToast(e.message || 'فشل حفظ الإعدادات على الخادم', 'error');
        return;
      }
    }
    lastPushedSettingsJsonRef.current = JSON.stringify(settings);
    showToast('تم حفظ الإعدادات ✅');
  };

  const deleteProduct = (pid, sellerId) => {
    if (!hasPermission('canDeleteProducts')) {
      showToast('ليس لديك صلاحية حذف المنتجات', 'error');
      return;
    }
    const prods = allProducts.filter(p => p.id !== pid);
    syncProducts(prods);
    const updated = users.map(u => u.id === sellerId ? { ...u, products: (u.products || []).filter(p => p.id !== pid) } : u);
    saveUsers(updated);
    showToast('تم حذف المنتج');
  };

  const handleAdRequest = (reqId, action, adminNote = '') => {
    if (!hasPermission('canReviewAdsRequests')) {
      showToast('ليس لديك صلاحية مراجعة الإعلانات', 'error');
      return;
    }
    const all = JSON.parse(localStorage.getItem('adRequests') || '[]');
    const updated = all.map(r => {
      if (r.id !== reqId) return r;
      const newR = { ...r, status: action, adminNote, reviewedAt: new Date().toISOString() };
      if (action === 'approved') {
        const durationDays = r.duration || 1;
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + parseInt(durationDays, 10));
        const expiryStr = expiryDate.toISOString();

        const updProds = getProducts().map(p => {
          if (p.id !== r.productId) return p;
          return r.adType === 'slider'
            ? { ...p, isSliderAd: true, sliderAdExpiry: expiryStr }
            : { ...p, isFeatured: true, featuredExpiry: expiryStr };
        });
        syncProducts(updProds);

        const uList = getUsers();
        const uIdx = uList.findIndex(u => u.id === r.sellerId);
        if (uIdx !== -1) {
          uList[uIdx].products = (uList[uIdx].products || []).map(p => {
            if (p.id !== r.productId) return p;
            return r.adType === 'slider'
              ? { ...p, isSliderAd: true, sliderAdExpiry: expiryStr }
              : { ...p, isFeatured: true, featuredExpiry: expiryStr };
          });
          uList[uIdx].notifications = [{
            id: Date.now(), title: '✅ تم تفعيل إعلانك',
            message: `تم قبول طلبك! منتجك "${r.productName}" سيظهر كـ ${r.adType === 'slider' ? 'إعلان في السلايدر الرئيسي' : 'منتج مميز'} لمدة ${durationDays} أيام (حتى ${expiryDate.toLocaleDateString('ar-YE')}).`,
            type: 'success', date: new Date().toISOString(), read: false
          }, ...(uList[uIdx].notifications || [])];
          syncUsers(uList);
          reload();
        }
      } else if (action === 'rejected') {
        const uList = getUsers();
        const uIdx = uList.findIndex(u => u.id === r.sellerId);
        if (uIdx !== -1) {
          uList[uIdx].notifications = [{
            id: Date.now(), title: '❌ نعتذر، تم رفض طلب الإعلان',
            message: `تم رفض طلبك لتمييز المنتج "${r.productName}"${adminNote ? '. السبب: ' + adminNote : ''}. يمكنك التواصل مع الدعم لمزيد من التفاصيل.`,
            type: 'error', date: new Date().toISOString(), read: false
          }, ...(uList[uIdx].notifications || [])];
          syncUsers(uList);
          reload();
        }
      }
      return newR;
    });
    localStorage.setItem('adRequests', JSON.stringify(updated));
    reloadAds();
    showToast(action === 'approved' ? 'تم تفعيل الإعلان بنجاح ✅' : 'تم رفض الإعلان');
  };

  const handleVerification = (sellerId, status, note = '') => {
    if (!hasPermission('canApproveVerification')) {
      showToast('ليس لديك صلاحية مراجعة التوثيق', 'error');
      return;
    }
    const updated = users.map(u => {
      if (u.id !== sellerId) return u;
      const newU = {
        ...u,
        isVerified: status === 'verified',
        isApproved: status === 'verified' ? true : u.isApproved,
        verificationStatus: status,
        verificationNote: note,
        verifiedAt: status === 'verified' ? new Date().toISOString() : null
      };
      if (!newU.notifications) newU.notifications = [];
      newU.notifications.unshift({
        id: Date.now(),
        title: status === 'verified' ? '✅ تم توثيق حسابك' : '❌ تم رفض توثيق الحساب',
        message: status === 'verified' ? 'تم قبول طلب التوثيق بنجاح! يمكنك الآن البدء بإضافة المنتجات والبيع.' : `نعتذر، لم يتم قبول مستندات التوثيق. ${note ? 'السبب: ' + note : 'يرجى إعادة المحاولة برفع صور أكثر وضوحاً.'}`,
        date: new Date().toISOString(),
        read: false,
        type: status === 'verified' ? 'success' : 'danger'
      });
      return newU;
    });
    saveUsers(updated);
    logAudit('verification.update', { sellerId, status, note });
    showToast(status === 'verified' ? 'تم التوثيق بنجاح ✅' : 'تم رفض الطلب');
  };

  const handleApprovePlan = (reqId, action) => {
    if (!hasPermission('canReviewPlanRequests')) {
      showToast('ليس لديك صلاحية مراجعة طلبات الاشتراك', 'error');
      return;
    }
    const allReqs = JSON.parse(localStorage.getItem('planUpgradeRequests') || '[]');
    const req = allReqs.find(r => r.id === reqId);
    if (!req) return;

    if (action === 'approve') {
      const planInfo = PLANS[req.planKey];
      const updatedUsers = users.map(u => {
        if (u.id !== req.sellerId) return u;
        const newU = {
          ...u,
          plan: req.planKey,
          isPaid: true,
          isApproved: true,
          maxProducts: planInfo.maxProducts,
          maxImagesPerProduct: planInfo.maxImagesPerProduct,
          paidAt: new Date().toISOString()
        };
        if (!newU.notifications) newU.notifications = [];
        newU.notifications.unshift({
          id: Date.now(),
          title: '🎊 تم تفعيل باقتك',
          message: `مبروك! تم تفعيل اشتراكك في باقة ${planInfo.name}. يمكنك الآن الاستفادة من كافة مزايا الباقة.`,
          date: new Date().toISOString(),
          read: false,
          type: 'success'
        });
        return newU;
      });
      saveUsers(updatedUsers);
    }

    const updatedReqs = allReqs.map(r => r.id === reqId ? { ...r, status: action === 'approve' ? 'approved' : 'rejected' } : r);
    localStorage.setItem('planUpgradeRequests', JSON.stringify(updatedReqs));
    reloadPlans();
    logAudit('planRequest.review', { reqId, action });
    showToast(action === 'approve' ? 'تم تفعيل الباقة بنجاح' : 'تم رفض الطلب');
  };

  const updateOrderStatus = async (orderId, status) => {
    if (!hasPermission('canChangeOrderStatus')) {
      showToast('ليس لديك صلاحية تعديل حالة الطلب', 'error');
      return;
    }
    const normalized = normalizeOrderStatus(status);
    if (!VALID_ORDER_STATUSES.includes(normalized)) return;

    const all = getOrders(users);
    const target = all.find(o => String(o.id) === String(orderId));
    if (!target) return;
    const currentStatus = normalizeOrderStatus(target.status || 'pending');
    if (!canTransitionOrderStatus(currentStatus, normalized)) {
      showToast('الانتقال بين الحالات غير مسموح حسب سياسة الطلب', 'error');
      return;
    }

    if (useBackend) {
      try {
        await backendApi.patchOrderStatus(orderId, normalized);
      } catch (e) {
        showToast(e.message || 'تعذر تحديث الطلب على الخادم', 'error');
        return;
      }
    }

    const updatedOrders = all.map(o =>
      String(o.id) === String(orderId)
        ? { ...o, status: normalized, updatedAt: new Date().toISOString() }
        : o
    );
    syncOrders(updatedOrders);

    const updatedUsers = users.map(u => {
      let nextUser = u;

      if (Array.isArray(u.orders) && u.orders.length > 0) {
        const userOrders = u.orders.map(o =>
          String(o.id) === String(orderId)
            ? { ...o, status: normalized, updatedAt: new Date().toISOString() }
            : o
        );
        nextUser = { ...nextUser, orders: userOrders };
      }

      const isCustomer =
        (target.customerId && String(u.id) === String(target.customerId)) ||
        (!target.customerId && target.customerPhone && u.phone === target.customerPhone);

      if (isCustomer) {
        const statusText =
          normalized === 'pending'
            ? 'قيد الانتظار'
            : normalized === 'processing'
            ? 'قيد المعالجة'
            : normalized === 'shipping'
              ? 'جاري التوصيل'
              : normalized === 'delivered'
                ? 'تم التوصيل'
                : 'ملغي';
        const notifications = Array.isArray(nextUser.notifications) ? nextUser.notifications : [];
        nextUser = {
          ...nextUser,
          notifications: [
            {
              id: Date.now() + Math.floor(Math.random() * 1000),
              title: '📦 تحديث حالة الطلب',
              message: `تم تحديث حالة طلبك #${String(orderId).slice(-6)} إلى: ${statusText}.`,
              date: new Date().toISOString(),
              read: false,
              type: normalized === 'cancelled' ? 'danger' : 'info'
            },
            ...notifications
          ]
        };
      }

      return nextUser;
    });

    saveUsers(updatedUsers);
    logAudit('order.status.update', { orderId, status: normalized });
    showToast('تم تحديث حالة الطلب بنجاح');

    if (tab === 'platform-delivery' && canViewPlatformDeliveryUi) {
      if (useBackend) {
        backendApi
          .adminPlatformDeliveryQueue()
          .then((d) => setPlatformQueue(Array.isArray(d?.orders) ? d.orders : []))
          .catch(() => {});
      } else {
        try {
          const raw = JSON.parse(localStorage.getItem('all_orders') || '[]');
          setPlatformQueue(
            Array.isArray(raw)
              ? raw.filter(
                  (o) => o.platformDeliveryPending === true || o.fulfillmentModeResolved === 'platform'
                )
              : []
          );
        } catch {
          /* ignore */
        }
      }
    }
  };

  const reviewChangeRequest = (reqId, action, adminNote = '') => {
    if (!hasPermission('canReviewChangeRequests')) {
      showToast('ليس لديك صلاحية مراجعة طلبات التعديل', 'error');
      return;
    }
    const all = (() => {
      try {
        const v = JSON.parse(localStorage.getItem('change_requests') || '[]');
        return Array.isArray(v) ? v : [];
      } catch {
        return [];
      }
    })();

    const req = all.find(r => r.id === reqId);
    if (!req) return;

    const updatedReqs = all.map(r => {
      if (r.id !== reqId) return r;
      return { ...r, status: action, adminNote, reviewedAt: new Date().toISOString() };
    });

    if (action === 'approved') {
      const updatedUsers = getUsers().map(u => {
        if (u.id !== req.sellerId) return u;
        const patch = {};
        if (req.type === 'phone') patch.phone = req.requestedValue;
        if (req.type === 'storeName') patch.storeName = req.requestedValue;
        if (req.type === 'businessActivity') patch.businessActivity = req.requestedValue;
        if (req.type === 'deliveryMode') patch.deliveryMode = req.requestedValue;
        const nextU = { ...u, ...patch };
        const notifications = Array.isArray(nextU.notifications) ? nextU.notifications : [];
        notifications.unshift({
          id: Date.now(),
          title: '✅ تم قبول طلب التعديل',
          message: `تم قبول طلب تعديل "${req.label}".${adminNote ? ' ملاحظة: ' + adminNote : ''}`,
          date: new Date().toISOString(),
          read: false,
          type: 'success'
        });
        return { ...nextU, notifications };
      });
      syncUsers(updatedUsers);
      reload();
    } else if (action === 'rejected') {
      const updatedUsers = getUsers().map(u => {
        if (u.id !== req.sellerId) return u;
        const notifications = Array.isArray(u.notifications) ? u.notifications : [];
        notifications.unshift({
          id: Date.now(),
          title: '❌ تم رفض طلب التعديل',
          message: `تم رفض طلب تعديل "${req.label}".${adminNote ? ' السبب: ' + adminNote : ''}`,
          date: new Date().toISOString(),
          read: false,
          type: 'danger'
        });
        return { ...u, notifications };
      });
      syncUsers(updatedUsers);
      reload();
    }

    localStorage.setItem('change_requests', JSON.stringify(updatedReqs));
    reloadChangeRequests();
    logAudit('changeRequest.review', { reqId, action, adminNote, sellerId: req.sellerId, type: req.type });
    showToast(action === 'approved' ? 'تم قبول طلب التعديل ✅' : 'تم رفض طلب التعديل');
  };

  const toggleOrderSelection = (orderId) => {
    const strId = String(orderId);
    setSelectedOrderIds((prev) =>
      prev.includes(strId) ? prev.filter((id) => id !== strId) : [...prev, strId]
    );
  };

  const toggleSelectAllOrders = () => {
    const allIds = allOrders.map((o) => String(o.id));
    if (selectedOrderIds.length === allIds.length) {
      setSelectedOrderIds([]);
      return;
    }
    setSelectedOrderIds(allIds);
  };

  const applyBulkOrderStatus = () => {
    if (!hasPermission('canBulkOrderActions')) {
      showToast('ليس لديك صلاحية تنفيذ العمليات الجماعية', 'error');
      return;
    }
    if (selectedOrderIds.length === 0) {
      showToast('حدد طلبًا واحدًا على الأقل', 'error');
      return;
    }
    selectedOrderIds.forEach((orderId) => updateOrderStatus(orderId, bulkStatus));
    setSelectedOrderIds([]);
    logAudit('order.bulk.status.update', { count: selectedOrderIds.length, status: bulkStatus });
  };

  const TABS = [
    { key: 'overview', icon: <GraphUp size={15} />, mIcon: <GraphUp size={22} />, label: 'نظرة عامة', short: 'عامة' },
    { key: 'sellers', icon: <Shop size={15} />, mIcon: <Shop size={22} />, label: `البائعون (${sellers.length})`, short: 'بائعون' },
    { key: 'customers', icon: <People size={15} />, mIcon: <People size={22} />, label: `العملاء (${customers.length})`, short: 'عملاء' },
    { key: 'products', icon: <Bag size={15} />, mIcon: <Bag size={22} />, label: `المنتجات (${allProducts.length})`, short: 'منتجات' },
    { key: 'orders', icon: <BoxSeam size={15} />, mIcon: <BoxSeam size={22} />, label: `الطلبات (${allOrders.length})`, short: 'طلبات' },
    { key: 'platform-delivery', icon: <Truck size={15} />, mIcon: <Truck size={22} />, label: `توصيل توريد نت (${platformQueue.length})`, short: 'توصيل' },
    { key: 'verifications', icon: <PersonBadge size={15} />, mIcon: <PersonBadge size={22} />, label: `توثيق البائعين (${sellers.filter(s => s.verificationStatus === 'pending').length})`, short: 'توثيق' },
    { key: 'change-requests', icon: <ArrowClockwise size={15} />, mIcon: <ArrowClockwise size={22} />, label: `طلبات التعديل (${pendingChangeRequests.length})`, short: 'تعديل' },
    { key: 'plan-requests', icon: <CurrencyDollar size={15} />, mIcon: <CurrencyDollar size={22} />, label: `طلبات الاشتراك (${pendingPlans.length})`, short: 'اشتراكات' },
    { key: 'ads', icon: <Megaphone size={15} />, mIcon: <Megaphone size={22} />, label: `طلبات الإعلان (${pendingAds.length})`, short: 'إعلان' },
    { key: 'team', icon: <PersonBadge size={15} />, mIcon: <PersonBadge size={22} />, label: `فريق الإدارة (${adminTeam.length})`, short: 'فريق' },
    { key: 'settings', icon: <GearFill size={15} />, mIcon: <GearFill size={22} />, label: 'الإعدادات', short: 'إعدادات' },
    { key: 'audit-log', icon: <Clock size={15} />, mIcon: <Clock size={22} />, label: `سجل التدقيق (${auditLogs.length})`, short: 'السجل' },
  ];
  const visibleTabs = TABS.filter((t) => canAccessAdminTab(t.key));

  const visibleSections = ADMIN_NAV_SECTION_BLUEPRINT.map((meta) => ({
    ...meta,
    tabs: meta.keys.map((k) => visibleTabs.find((t) => t.key === k)).filter(Boolean)
  })).filter((sec) => sec.tabs.length > 0);

  const currentSection =
    visibleSections.find((s) => s.tabs.some((t) => t.key === tab)) || visibleSections[0];

  if (!user || user.role !== 'admin') return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', direction: 'rtl' }}>
      <div style={{ textAlign: 'center' }}>
        <LockFill size={48} color={C.red} style={{ marginBottom: 16 }} />
        <h2 style={{ color: C.primary }}>غير مصرح لك بالوصول</h2>
        <Link to="/" style={{ color: C.gold }}>العودة للرئيسية</Link>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: C.light, direction: 'rtl' }}>
      {toast && (
        <div style={{ position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 99999, background: toast.type === 'error' ? C.red : '#1a3a2a', color: C.white, padding: '12px 28px', borderRadius: 12, fontWeight: 'bold', boxShadow: '0 8px 30px rgba(0,0,0,0.2)' }}>
          {toast.msg}
        </div>
      )}

      {teamModal && (
        <Modal title={teamModal.mode === 'create' ? 'إضافة عضو إدارة' : 'تعديل عضو إدارة'} onClose={() => setTeamModal(null)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: C.gray, marginBottom: 5 }}>الاسم الكامل</label>
              <SharedInput
                value={teamModal.form.fullName}
                onChange={(e) => setTeamModal((tm) => ({ ...tm, form: { ...tm.form, fullName: e.target.value } }))}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: `2px solid ${C.gold}30`, fontSize: 14 }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: C.gray, marginBottom: 5 }}>رقم الجوال</label>
              <SharedInput
                value={teamModal.form.phone}
                onChange={(e) => setTeamModal((tm) => ({ ...tm, form: { ...tm.form, phone: e.target.value } }))}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: `2px solid ${C.gold}30`, fontSize: 14 }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: C.gray, marginBottom: 5 }}>
                كلمة المرور {teamModal.mode === 'edit' ? '(اتركها فارغة إن لم تتغير)' : ''}
              </label>
              <SharedInput
                type="password"
                value={teamModal.form.password}
                onChange={(e) => setTeamModal((tm) => ({ ...tm, form: { ...tm.form, password: e.target.value } }))}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: `2px solid ${C.gold}30`, fontSize: 14 }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: C.gray, marginBottom: 5 }}>الدور</label>
              <select
                value={teamModal.form.adminRole}
                onChange={(e) => {
                  const nr = e.target.value;
                  setTeamModal((tm) => ({
                    ...tm,
                    form: {
                      ...tm.form,
                      adminRole: nr,
                      adminPermissions: nr === ADMIN_ROLES.SUPER_ADMIN ? {} : sanitizeAdminPermissions(nr, allPermsTrue())
                    }
                  }));
                }}
                style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: `2px solid ${C.gold}30`, fontSize: 14 }}
              >
                <option value={ADMIN_ROLES.SUPER_ADMIN}>سوبر أدمن — تحكم كامل</option>
                <option value={ADMIN_ROLES.SUPERVISOR}>مشرف — دون إعدادات النظام وإدارة الفريق وحذف المستخدمين</option>
                <option value={ADMIN_ROLES.STAFF}>موظف — نطاق ضيق (طلبات وعرض أساسي)</option>
                <option value={ADMIN_ROLES.DELIVERY_SUPERVISOR}>مشرف توصيل توريد نت — طابور التوصيل وتغيير حالة الطلب فقط</option>
              </select>
            </div>
            {teamModal.form.adminRole === ADMIN_ROLES.SUPER_ADMIN ? (
              <p style={{ margin: 0, fontSize: 13, color: C.gray, lineHeight: 1.6 }}>حساب سوبر أدمن يملك جميع الصلاحيات تلقائياً.</p>
            ) : (
              <div style={{ border: `1px solid ${C.gold}22`, borderRadius: 12, padding: 12, background: C.light }}>
                <div style={{ fontWeight: 'bold', marginBottom: 10, color: C.primary, fontSize: 13 }}>صلاحيات مخصّصة (ضمن سقف الدور)</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 220, overflowY: 'auto' }}>
                  {ADMIN_PERMISSION_KEYS.filter((k) => getPermissionCeiling(teamModal.form.adminRole)[k]).map((key) => (
                    <label key={key} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', fontSize: 13 }}>
                      <input
                        type="checkbox"
                        checked={Boolean(teamModal.form.adminPermissions[key])}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setTeamModal((tm) => ({
                            ...tm,
                            form: {
                              ...tm.form,
                              adminPermissions: { ...tm.form.adminPermissions, [key]: checked }
                            }
                          }));
                        }}
                      />
                      <span>{PERMISSION_LABELS_AR[key] || key}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
              <UIButton type="button" onClick={persistTeamMember} style={{ flex: 1, padding: 12, background: C.gold, color: C.white, border: 'none', borderRadius: 10, fontWeight: 'bold', cursor: 'pointer' }}>
                حفظ
              </UIButton>
              <UIButton type="button" onClick={() => setTeamModal(null)} style={{ flex: 1, padding: 12, background: 'transparent', color: C.gray, border: `1px solid ${C.gray}40`, borderRadius: 10, fontWeight: 'bold', cursor: 'pointer' }}>
                إلغاء
              </UIButton>
            </div>
          </div>
        </Modal>
      )}

      <style>{`
        .admin-desktop-tabs { display: flex; flex-direction: column; gap: 10px; }
        .admin-desktop-primary { display: flex; gap: 8px; overflow-x: auto; width: 100%; }
        .admin-desktop-secondary { display: flex; gap: 8px; overflow-x: auto; flex-wrap: wrap; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.14); }
        .admin-mobile-nav { display: none; }
        .admin-mobile-sub-tabs { display: none; }
        .admin-content-wrap { padding-bottom: 24px; }
        @media (max-width: 767px) {
          .admin-desktop-tabs { display: none !important; }
          .admin-mobile-nav { display: flex !important; }
          .admin-mobile-sub-tabs {
            display: flex !important;
            gap: 8px;
            overflow-x: auto;
            padding: 10px 16px 12px;
            background: rgba(0,0,0,0.12);
            border-bottom: 1px solid rgba(255,255,255,0.08);
            -webkit-overflow-scrolling: touch;
          }
          .admin-content-wrap { padding-bottom: 90px; }
        }
      `}</style>

      <div style={{ background: `linear-gradient(135deg,${C.primary},#1a3a6a)`, boxShadow: '0 2px 20px rgba(0,0,0,0.2)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: `${C.gold}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={22} color={C.gold} />
            </div>
            <div>
              <div style={{ color: C.white, fontWeight: 'bold', fontSize: 17 }}>لوحة تحكم الأدمن</div>
              <div style={{ color: `${C.gold}cc`, fontSize: 11 }}>
                مرحباً، {user.fullName || 'المدير'} — {sessionAdminLabel ? sessionAdminLabel() : getAdminRoleLabel(user)}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Link to="/" style={{ color: `${C.white}bb`, fontSize: 12, textDecoration: 'none', padding: '7px 14px', borderRadius: 8, border: `1px solid ${C.white}20` }}>الموقع</Link>
            <UIButton onClick={logout} style={{ background: `${C.red}20`, color: '#ff6b6b', border: 'none', padding: '7px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', gap: 5 }}>
              <BoxArrowRight size={14} /> خروج
            </UIButton>
          </div>
        </div>

        <div className="admin-desktop-tabs" style={{ maxWidth: 1400, margin: '0 auto', padding: '0 20px 14px' }}>
          <div className="admin-desktop-primary">
            {visibleSections.map((sec) => {
              const secActive = currentSection?.id === sec.id;
              const SecIcon = sec.Icon;
              return (
                <UIButton
                  key={sec.id}
                  type="button"
                  onClick={() => {
                    setTab(sec.tabs[0].key);
                    setSearch('');
                  }}
                  style={{
                    padding: '9px 18px',
                    border: 'none',
                    borderRadius: 50,
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: 13,
                    background: secActive ? `linear-gradient(135deg,${C.gold},${C.goldL})` : 'rgba(255,255,255,0.12)',
                    color: secActive ? C.primary : C.white,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <SecIcon size={15} /> {sec.title}
                </UIButton>
              );
            })}
          </div>
          {currentSection && currentSection.tabs.length > 1 && (
            <div className="admin-desktop-secondary">
              {currentSection.tabs.map((t) => (
                <UIButton
                  key={t.key}
                  type="button"
                  onClick={() => {
                    setTab(t.key);
                    setSearch('');
                  }}
                  style={{
                    padding: '7px 14px',
                    border: 'none',
                    borderRadius: 40,
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: 12,
                    background: tab === t.key ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.1)',
                    color: tab === t.key ? C.primary : `${C.white}ee`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap',
                    borderBottom: tab === t.key ? `2px solid ${C.gold}` : '2px solid transparent'
                  }}
                >
                  {t.icon} {t.label}
                </UIButton>
              ))}
            </div>
          )}
        </div>

        <div className="admin-mobile-sub-tabs">
          {currentSection && currentSection.tabs.length > 1 &&
            currentSection.tabs.map((t) => (
              <UIButton
                key={t.key}
                type="button"
                onClick={() => {
                  setTab(t.key);
                  setSearch('');
                  window.scrollTo({ top: 0, behavior: 'auto' });
                }}
                style={{
                  padding: '8px 14px',
                  border: 'none',
                  borderRadius: 40,
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: 12,
                  flexShrink: 0,
                  background: tab === t.key ? `linear-gradient(135deg,${C.gold},${C.goldL})` : 'rgba(255,255,255,0.14)',
                  color: tab === t.key ? C.primary : C.white,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5
                }}
              >
                {t.short}
              </UIButton>
            ))}
        </div>
      </div>

      <div className="admin-content-wrap" style={{ maxWidth: 1400, margin: '0 auto', padding: '24px 20px' }}>
        {['sellers', 'customers', 'products', 'orders'].includes(tab) && (
          <div style={{ position: 'relative', marginBottom: 20 }}>
            <Search size={16} color={C.gray} style={{ position: 'absolute', top: '50%', right: 16, transform: 'translateY(-50%)' }} />
            <SharedInput
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="🔍 بحث..."
              style={{ width: '100%', padding: '12px 44px 12px 16px', border: `2px solid ${C.gold}30`, borderRadius: 12, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
        )}

        {tab === 'overview' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16, marginBottom: 28 }}>
              <Card icon={<Shop size={26} color={C.gold} />} label="إجمالي البائعين" value={sellers.length} bg={`${C.gold}15`} />
              <Card icon={<CheckCircleFill size={26} color={C.green} />} label="بائعون نشطون" value={sellers.filter(s => !getStatus(s).isLocked).length} bg={`${C.green}15`} />
              <Card icon={<LockFill size={26} color={C.red} />} label="حسابات موقوفة" value={sellers.filter(s => getStatus(s).isLocked || s.isLocked).length} bg={`${C.red}15`} />
              <Card icon={<StarFill size={26} color={C.gold} />} label="اشتراكات مدفوعة" value={sellers.filter(s => s.isPaid).length} bg={`${C.gold}15`} />
              <Card icon={<People size={26} color={C.blue} />} label="إجمالي العملاء" value={customers.length} bg={`${C.blue}15`} />
              <Card icon={<Bag size={26} color={C.orange} />} label="إجمالي المنتجات" value={allProducts.length} bg={`${C.orange}15`} />
              <Card icon={<BoxSeam size={26} color={C.purple} />} label="إجمالي الطلبات" value={allOrders.length} bg={`${C.purple}15`} />
              <Card icon={<CurrencyDollar size={26} color={C.green} />} label="بائعون بحاجة تفعيل" value={sellers.filter(s => s.isPaid === false && s.plan !== 'trial').length} bg={`${C.green}15`} />
            </div>
          </div>
        )}

        {tab === 'sellers' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filteredSellers.length === 0 && <div style={{ textAlign: 'center', padding: 60, color: C.gray }}><Shop size={50} color={`${C.gold}30`} /><p>لا يوجد نتائج</p></div>}
            {filteredSellers.map(seller => {
              const st = getStatus(seller);
              const locked = st.isLocked || seller.isLocked;
              return (
                <div key={seller.id} style={{ background: C.white, borderRadius: 16, padding: '18px 20px', boxShadow: '0 3px 15px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', borderRight: `4px solid ${locked ? C.red : st.isPaid ? C.green : C.gold}` }}>
                  <div style={{ flex: 1, minWidth: 180 }}>
                    <div style={{ fontWeight: 'bold', color: C.primary, fontSize: 15 }}>{seller.storeName}</div>
                    <div style={{ color: C.gray, fontSize: 12 }}>{seller.fullName} | {seller.phone}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {!st.isPaid && seller.plan !== 'trial' && <Btn color={C.green} onClick={() => activatePaid(seller.id)}><UnlockFill size={12} /> تفعيل</Btn>}
                    <Btn color={locked ? C.green : C.orange} onClick={() => toggleLock(seller.id)}>{locked ? <><UnlockFill size={12} /> رفع الإيقاف</> : <><LockFill size={12} /> إيقاف</>}</Btn>
                    <Btn color={C.blue} onClick={() => setModal({ type: 'changePlan', data: seller })}><GearFill size={12} /> باقة</Btn>
                    <Btn color={C.purple} onClick={() => setModal({ type: 'viewSeller', data: seller })}><Eye size={12} /> عرض</Btn>
                    {hasPermission('canDeleteUsers') && (
                      <Btn color={C.red} onClick={() => deletUser(seller.id)}><Trash size={12} /> حذف</Btn>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab === 'customers' && (
          <div>
            {filteredCustomers.length === 0 && <div style={{ textAlign: 'center', padding: 60, color: C.gray }}><People size={50} color={`${C.primary}30`} /><p>لا يوجد عملاء</p></div>}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {filteredCustomers.map(c => (
                <div key={c.id} style={{ background: C.white, borderRadius: 14, padding: '14px 18px', boxShadow: '0 3px 10px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                  <img src={c.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.fullName || 'U')}&background=c88c23&color=fff`} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }} alt="" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', color: C.primary }}>{c.fullName}</div>
                    <div style={{ fontSize: 12, color: C.gray }}>{c.phone}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <Badge color={C.blue}>{c.orders?.length || 0} طلب</Badge>
                    <Btn color={C.purple} onClick={() => setModal({ type: 'viewCustomer', data: c })}><Eye size={12} /> عرض</Btn>
                    {hasPermission('canDeleteUsers') && (
                      <Btn color={C.red} onClick={() => deletUser(c.id)}><Trash size={12} /> حذف</Btn>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'products' && (
          <div>
            {filteredProducts.length === 0 && <div style={{ textAlign: 'center', padding: 60, color: C.gray }}><Bag size={50} color={`${C.orange}40`} /><p>لا توجد منتجات</p></div>}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 16 }}>
              {filteredProducts.map(p => (
                <div key={p.id} style={{ background: C.white, borderRadius: 16, overflow: 'hidden', boxShadow: '0 3px 15px rgba(0,0,0,0.07)' }}>
                  <div style={{ padding: 14 }}>
                    <div style={{ fontWeight: 'bold', color: C.primary, fontSize: 14, marginBottom: 3 }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: C.gray, marginBottom: 4 }}>🏪 {p.storeName}</div>
                    <div style={{ color: C.gold, fontWeight: 'bold', marginBottom: 10 }}>{(p.price || 0).toLocaleString()} ر.ي</div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <Link to={`/product/${p.id}`} style={{ flex: 1, padding: '6px', background: `${C.blue}10`, color: C.blue, border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 12, textDecoration: 'none', textAlign: 'center' }}><Eye size={12} /> عرض</Link>
                      <UIButton onClick={() => deleteProduct(p.id, p.sellerId)} style={{ flex: 1, padding: '6px', background: `${C.red}10`, color: C.red, border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 12 }}><Trash size={12} /> حذف</UIButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'orders' && (
          <div>
            {hasPermission('canBulkOrderActions') && allOrders.length > 0 && (
              <div style={{ background: C.white, borderRadius: 14, padding: '12px 14px', boxShadow: '0 3px 10px rgba(0,0,0,0.05)', marginBottom: 12, display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                <UIButton onClick={toggleSelectAllOrders} style={{ padding: '8px 12px', background: `${C.blue}12`, color: C.blue, border: `1px solid ${C.blue}35`, borderRadius: 8, fontWeight: 'bold', cursor: 'pointer' }}>
                  {selectedOrderIds.length === allOrders.length ? 'إلغاء تحديد الكل' : 'تحديد الكل'}
                </UIButton>
                <select value={bulkStatus} onChange={(e) => setBulkStatus(e.target.value)} style={{ padding: '8px 10px', border: `1px solid ${C.gold}40`, borderRadius: 8 }}>
                  <option value="processing">قيد المعالجة</option>
                  <option value="shipping">جاري التوصيل</option>
                  <option value="delivered">تم التوصيل</option>
                  <option value="cancelled">ملغي</option>
                </select>
                <UIButton onClick={applyBulkOrderStatus} style={{ padding: '8px 12px', background: `${C.green}15`, color: C.green, border: `1px solid ${C.green}40`, borderRadius: 8, fontWeight: 'bold', cursor: 'pointer' }}>
                  تطبيق جماعي ({selectedOrderIds.length})
                </UIButton>
              </div>
            )}
            {allOrders.length === 0 && <div style={{ textAlign: 'center', padding: 60, color: C.gray }}><BoxSeam size={50} color={`${C.purple}40`} /><p>لا توجد طلبات بعد</p></div>}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {allOrders.slice().reverse().map((o, i) => (
                <div key={i} style={{ background: C.white, borderRadius: 14, padding: '16px 20px', boxShadow: '0 3px 10px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                  {hasPermission('canBulkOrderActions') && (
                    <input
                      type="checkbox"
                      checked={selectedOrderIds.includes(String(o.id))}
                      onChange={() => toggleOrderSelection(o.id)}
                    />
                  )}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', color: C.primary }}>طلب #{String(o.id || i).slice(-6)}</div>
                    <div style={{ fontSize: 12, color: C.gray }}>{o.customerName} — {o.customerPhone}</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 'bold', color: C.gold, fontSize: 16 }}>{(o.total || 0).toLocaleString()} ر.ي</div>
                    <div style={{ fontSize: 11, color: C.gray }}>{o.items?.length || 0} منتج</div>
                  </div>
                  <Badge color={
                    o.status === 'delivered'
                      ? C.green
                      : o.status === 'cancelled'
                        ? C.red
                        : o.status === 'shipping'
                          ? C.blue
                          : o.status === 'processing'
                            ? C.purple
                            : C.orange
                  }>
                    {o.status === 'delivered'
                      ? 'تم التوصيل'
                      : o.status === 'cancelled'
                        ? 'ملغي'
                        : o.status === 'shipping'
                          ? 'جاري التوصيل'
                          : o.status === 'processing'
                            ? 'قيد المعالجة'
                            : 'قيد الانتظار'}
                  </Badge>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <Btn color={C.orange} onClick={() => updateOrderStatus(o.id, 'processing')}>معالجة</Btn>
                    <Btn color={C.blue} onClick={() => updateOrderStatus(o.id, 'shipping')}>شحن</Btn>
                    <Btn color={C.green} onClick={() => updateOrderStatus(o.id, 'delivered')}>تسليم</Btn>
                    <Btn color={C.red} onClick={() => updateOrderStatus(o.id, 'cancelled')}>إلغاء</Btn>
                  </div>
                  <Btn color={C.purple} onClick={() => setModal({ type: 'viewOrder', data: o })}><Eye size={12} /> تفاصيل</Btn>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'platform-delivery' && (
          <div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
              <h3 style={{ margin: 0, color: C.primary, flex: 1, minWidth: 200, fontSize: 17 }}>
                طابور توصيل المنصّة (بائع ← عميل عبر توريد نت)
              </h3>
              <UIButton
                type="button"
                onClick={async () => {
                  setPlatformQueueLoading(true);
                  try {
                    if (useBackend) {
                      const d = await backendApi.adminPlatformDeliveryQueue();
                      setPlatformQueue(Array.isArray(d?.orders) ? d.orders : []);
                    } else {
                      setPlatformQueue(
                        getOrders(getUsers()).filter(
                          (item) =>
                            item.platformDeliveryPending === true || item.fulfillmentModeResolved === 'platform'
                        )
                      );
                    }
                  } catch (e) {
                    showToast(e.message || 'تعذر التحديث', 'error');
                  } finally {
                    setPlatformQueueLoading(false);
                  }
                }}
                style={{
                  padding: '10px 16px',
                  background: `${C.blue}14`,
                  color: C.blue,
                  border: `1px solid ${C.blue}35`,
                  borderRadius: 10,
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                <ArrowClockwise size={14} /> تحديث
              </UIButton>
            </div>
            <p style={{ color: C.gray, fontSize: 13, marginBottom: 18, lineHeight: 1.65 }}>
              يُنشئ <strong>السوبر أدمن</strong> حساب «مشرف توصيل توريد نت» من فريق الإدارة. تُحسب أجرة التوصيل في الطلب (500 ر.ي لكل كيلومتر تقريبي بين موقع المتجر وموقع العميل) وتُخزَّن مع الطلب.
            </p>
            {platformQueueLoading && platformQueue.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 48, color: C.gray }}>جاري تحميل الطابور…</div>
            ) : platformQueue.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 60, color: C.gray }}>
                <Truck size={50} color={`${C.gold}33`} />
                <p>لا توجد طلبات في طابور توصيل توريد نت حالياً.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {platformQueue
                  .slice()
                  .reverse()
                  .map((o) => {
                    const snap = o.sellerFulfillmentSnapshot || {};
                    const ship = o.shipping || {};
                    const custMap =
                      typeof ship.lat === 'number' && typeof ship.lng === 'number'
                        ? `https://www.google.com/maps/search/?api=1&query=${ship.lat},${ship.lng}`
                        : '';
                    const storeLat = snap.storeLocation?.lat;
                    const storeLng = snap.storeLocation?.lng;
                    const sellerMap =
                      typeof storeLat === 'number' && typeof storeLng === 'number'
                        ? `https://www.google.com/maps/search/?api=1&query=${storeLat},${storeLng}`
                        : '';
                    const pay = o.payment || {};
                    const payLabel =
                      pay.method === 'cash'
                        ? 'نقدًا عند الاستلام'
                        : pay.method === 'platform_wallet'
                          ? 'محفظة المنصّة'
                          : typeof pay.wallet === 'string'
                            ? pay.wallet
                            : pay.wallet?.name || pay.method || '—';
                    const stNorm = normalizeOrderStatus(o.status || 'pending');
                    return (
                      <div
                        key={String(o.id)}
                        style={{
                          background: C.white,
                          borderRadius: 16,
                          padding: '18px 20px',
                          boxShadow: '0 3px 15px rgba(0,0,0,0.06)',
                          borderRight: `5px solid ${C.gold}`,
                          display: 'grid',
                          gap: 14
                        }}
                      >
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
                          <div style={{ flex: 1, minWidth: 200 }}>
                            <div style={{ fontWeight: 'bold', color: C.primary, fontSize: 16 }}>
                              طلب #{String(o.id || '').slice(-8)}
                            </div>
                          </div>
                          <Badge
                            color={
                              stNorm === 'delivered'
                                ? C.green
                                : stNorm === 'cancelled'
                                  ? C.red
                                  : stNorm === 'shipping'
                                    ? C.blue
                                    : stNorm === 'processing'
                                      ? C.purple
                                      : C.orange
                            }
                          >
                            {stNorm === 'delivered'
                              ? 'تم التوصيل'
                              : stNorm === 'cancelled'
                                ? 'ملغي'
                                : stNorm === 'shipping'
                                  ? 'جاري التوصيل'
                                  : stNorm === 'processing'
                                    ? 'قيد المعالجة'
                                    : 'قيد الانتظار'}
                          </Badge>
                          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', width: '100%' }}>
                            {hasPermission('canChangeOrderStatus') && (
                              <>
                                <Btn color={C.orange} onClick={() => updateOrderStatus(o.id, 'processing')}>
                                  معالجة
                                </Btn>
                                <Btn color={C.blue} onClick={() => updateOrderStatus(o.id, 'shipping')}>
                                  شحن
                                </Btn>
                                <Btn color={C.green} onClick={() => updateOrderStatus(o.id, 'delivered')}>
                                  تسليم
                                </Btn>
                                <Btn color={C.red} onClick={() => updateOrderStatus(o.id, 'cancelled')}>
                                  إلغاء
                                </Btn>
                              </>
                            )}
                            <Btn color={C.purple} onClick={() => setModal({ type: 'viewOrder', data: o })}>
                              <Eye size={12} /> تفاصيل
                            </Btn>
                          </div>
                        </div>
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                            gap: 14,
                            fontSize: 13
                          }}
                        >
                          <div style={{ background: C.light, padding: 12, borderRadius: 12 }}>
                            <div style={{ fontWeight: 'bold', color: C.primary, marginBottom: 8 }}>العميل — نقطة التسليم</div>
                            <div>
                              {o.customerName} — <span dir="ltr">{o.customerPhone}</span>
                            </div>
                            <div style={{ marginTop: 6, color: C.gray }}>
                              {[ship.address, ship.details].filter(Boolean).join(' — ') || '—'}
                            </div>
                            {custMap ? (
                              <a
                                href={custMap}
                                target="_blank"
                                rel="noreferrer"
                                style={{ color: C.blue, marginTop: 8, display: 'inline-block' }}
                              >
                                فتح موقع العميل على الخريطة
                              </a>
                            ) : (
                              <div style={{ color: C.gray, marginTop: 8 }}>لا يوجد موقع على الخريطة</div>
                            )}
                          </div>
                          <div style={{ background: C.light, padding: 12, borderRadius: 12 }}>
                            <div style={{ fontWeight: 'bold', color: C.primary, marginBottom: 8 }}>البائع — نقطة الاستلام</div>
                            <div>{snap.storeName || o.sellerName || '—'}</div>
                            <div dir="ltr" style={{ marginTop: 4 }}>
                              {snap.phone || '—'}
                            </div>
                            <div style={{ marginTop: 6, color: C.gray }}>
                              {snap.addressLine || snap.addressDetails || '—'}
                            </div>
                            {sellerMap ? (
                              <a
                                href={sellerMap}
                                target="_blank"
                                rel="noreferrer"
                                style={{ color: C.blue, marginTop: 8, display: 'inline-block' }}
                              >
                                فتح موقع المتجر على الخريطة
                              </a>
                            ) : (
                              <div style={{ color: C.gray, marginTop: 8 }}>لم يُضبط موقع المتجر</div>
                            )}
                            {snap.storeFrontPhotoUrl ? (
                              <div style={{ marginTop: 10 }}>
                                <div style={{ fontSize: 11, color: C.gray, marginBottom: 4 }}>صورة واجهة المحل</div>
                                <img
                                  alt=""
                                  src={snap.storeFrontPhotoUrl}
                                  style={{ width: '100%', maxHeight: 120, objectFit: 'cover', borderRadius: 10 }}
                                />
                              </div>
                            ) : (
                              <div style={{ marginTop: 8, fontSize: 12, color: C.orange }}>
                                لا توجد صورة واجهة محل في لقطة الطلب (يُفضّل رفعها عند التوثيق)
                              </div>
                            )}
                          </div>
                          <div style={{ background: C.light, padding: 12, borderRadius: 12 }}>
                            <div style={{ fontWeight: 'bold', color: C.primary, marginBottom: 8 }}>الدفع والتسعير</div>
                            <div>
                              الإجمالي:{' '}
                              <strong style={{ color: C.gold }}>{(o.total || 0).toLocaleString()} ر.ي</strong>
                            </div>
                            <div>أجرة التوصيل: {(o.deliveryFee || 0).toLocaleString()} ر.ي</div>
                            <div>
                              المسافة (تقريبية):{' '}
                              {typeof o.deliveryDistanceKm === 'number' ? `≈ ${o.deliveryDistanceKm.toFixed(1)} كم` : '—'}
                              {typeof o.platformDeliveryRatePerKmYer === 'number'
                                ? ` — ${o.platformDeliveryRatePerKmYer} ر.ي/كم`
                                : ''}
                            </div>
                            <div style={{ marginTop: 6 }}>
                              طريقة الدفع: {payLabel}
                              {pay.verificationCode ? (
                                <>
                                  {' '}
                                  | مرجع العملية: <strong dir="ltr">{pay.verificationCode}</strong>
                                </>
                              ) : null}
                            </div>
                            {o.deliveryPricingNote ? (
                              <div style={{ fontSize: 12, color: C.gray, marginTop: 6 }}>{o.deliveryPricingNote}</div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}

        {tab === 'ads' && (
          <div>
            {adRequests.length === 0 && <div style={{ textAlign: 'center', padding: 60, color: C.gray }}><Megaphone size={50} color={`${C.gold}30`} /><p>لا توجد طلبات إعلان حالياً</p></div>}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[...adRequests].reverse().map(req => {
                const isPending = req.status === 'pending';
                return (
                  <div key={req.id} style={{ background: C.white, borderRadius: 16, padding: 20, boxShadow: '0 3px 15px rgba(0,0,0,0.06)', borderRight: `5px solid ${req.status === 'approved' ? C.green : req.status === 'rejected' ? C.red : C.orange}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                      <div>
                        <div style={{ fontWeight: 'bold', color: C.primary, fontSize: 16 }}>{req.productName}</div>
                        <div style={{ fontSize: 13, color: C.gray }}>🏪 {req.sellerName} ({req.sellerPhone})</div>
                        <div style={{ fontSize: 12, color: C.blue, marginTop: 4, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                          <span>{req.adType === 'featured' ? '⭐ منتج مميز' : '📢 إعلان سلايدر'}</span>
                          <span>⏱ {req.duration || 1} أيام</span>
                          <span style={{ color: C.gold, fontWeight: 'bold' }}>💰 {(req.totalPrice || 0).toLocaleString()} ريال</span>
                        </div>
                        {req.note && <div style={{ fontSize: 12, color: C.gray, marginTop: 4 }}>📝 {req.note}</div>}
                      </div>
                      <Badge color={req.status === 'approved' ? C.green : req.status === 'rejected' ? C.red : C.orange}>
                        {req.status === 'approved' ? 'مقبول' : req.status === 'rejected' ? 'مرفوض' : 'قيد المراجعة'}
                      </Badge>
                    </div>
                    {isPending && (
                      <div style={{ display: 'flex', gap: 10, marginTop: 15 }}>
                        <UIButton onClick={() => handleAdRequest(req.id, 'approved')} style={{ flex: 1, padding: '10px', background: C.green, color: 'white', border: 'none', borderRadius: 10, fontWeight: 'bold', cursor: 'pointer' }}><CheckLg size={18} /> قبول الطلب</UIButton>
                        <UIButton onClick={() => { const msg = window.prompt('سبب الرفض (اختياري):'); handleAdRequest(req.id, 'rejected', msg || ''); }} style={{ flex: 1, padding: '10px', background: C.red, color: 'white', border: 'none', borderRadius: 10, fontWeight: 'bold', cursor: 'pointer' }}><XLg size={16} /> رفض الطلب</UIButton>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab === 'verifications' && (
          <div>
            {sellers.filter(s => s.verificationStatus === 'pending').length === 0 && (
              <div style={{ textAlign: 'center', padding: 60, color: C.gray }}>
                <PersonBadge size={50} color={`${C.gold}30`} />
                <p>لا توجد طلبات توثيق معلقة</p>
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
              {sellers.filter(s => s.verificationStatus === 'pending').map((seller) => (
                <div key={seller.id} style={{ background: C.white, borderRadius: 16, padding: 20, boxShadow: '0 3px 15px rgba(0,0,0,0.06)', borderRight: `5px solid ${C.orange}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                    <div>
                      <div style={{ fontWeight: 'bold', color: C.primary, fontSize: 16 }}>{seller.storeName}</div>
                      <div style={{ fontSize: 13, color: C.gray }}>{seller.fullName} | {seller.phone}</div>
                      <div style={{ fontSize: 12, color: C.gold, marginTop: 4 }}>
                        تاريخ الطلب: {seller.verificationSubmittedAt ? new Date(seller.verificationSubmittedAt).toLocaleString('ar-YE') : '—'}
                      </div>
                    </div>
                    <UIButton
                      onClick={() => setModal({ type: 'viewDocs', data: seller })}
                      style={{ padding: '8px 14px', background: `${C.blue}10`, color: C.blue, border: `1px solid ${C.blue}30`, borderRadius: 8, fontWeight: 'bold', cursor: 'pointer', fontSize: 12 }}
                    >
                      <Eye size={12} /> عرض المستندات ({seller.verificationDocs?.files?.length || 0}
                      {(seller.storeFrontPhotoUrl || '').trim() ? ' + واجهة' : ''})
                    </UIButton>
                  </div>

                  <div style={{ display: 'flex', gap: 10, marginTop: 15 }}>
                    <UIButton
                      onClick={() => handleVerification(seller.id, 'verified')}
                      style={{ flex: 1, padding: '10px', background: C.green, color: 'white', border: 'none', borderRadius: 10, fontWeight: 'bold', cursor: 'pointer' }}
                    >
                      <CheckLg size={18} /> قبول وتوثيق
                    </UIButton>
                    <UIButton
                      onClick={() => {
                        const note = window.prompt('سبب الرفض (اختياري - يظهر للبائع):');
                        handleVerification(seller.id, 'rejected', note || '');
                      }}
                      style={{ flex: 1, padding: '10px', background: C.red, color: 'white', border: 'none', borderRadius: 10, fontWeight: 'bold', cursor: 'pointer' }}
                    >
                      <XLg size={16} /> رفض الطلب
                    </UIButton>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20 }}>
              <h3 style={{ margin: '0 0 12px', color: C.primary, fontSize: 15 }}>سجل المراجعات السابقة</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {sellers.filter(s => s.verificationStatus === 'verified' || s.verificationStatus === 'rejected').map((seller) => (
                  <div key={`reviewed-${seller.id}`} style={{ background: C.white, borderRadius: 14, padding: '14px 18px', boxShadow: '0 3px 10px rgba(0,0,0,0.05)', borderRight: `4px solid ${seller.verificationStatus === 'verified' ? C.green : C.red}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                      <div>
                        <div style={{ fontWeight: 'bold', color: C.primary }}>{seller.storeName}</div>
                        <div style={{ fontSize: 12, color: C.gray }}>{seller.fullName} | {seller.phone}</div>
                        {seller.verificationNote && <div style={{ marginTop: 4, fontSize: 12, color: C.red }}>ملاحظة الرفض: {seller.verificationNote}</div>}
                      </div>
                      <Badge color={seller.verificationStatus === 'verified' ? C.green : C.red}>
                        {seller.verificationStatus === 'verified' ? 'موثق' : 'مرفوض'}
                      </Badge>
                    </div>
                  </div>
                ))}
                {sellers.filter(s => s.verificationStatus === 'verified' || s.verificationStatus === 'rejected').length === 0 && (
                  <div style={{ padding: 14, textAlign: 'center', color: C.gray, background: C.white, borderRadius: 12 }}>
                    لا يوجد سجل مراجعات حتى الآن
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {tab === 'change-requests' && (
          <div>
            {changeRequests.length === 0 && (
              <div style={{ textAlign: 'center', padding: 60, color: C.gray }}>
                <ArrowClockwise size={50} color={`${C.gold}30`} />
                <p>لا توجد طلبات تعديل حالياً</p>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[...changeRequests].slice().reverse().map((req) => {
                const isPending = req.status === 'pending';
                const border =
                  req.status === 'approved' ? C.green : req.status === 'rejected' ? C.red : C.orange;

                return (
                  <div
                    key={req.id}
                    style={{
                      background: C.white,
                      borderRadius: 16,
                      padding: 20,
                      boxShadow: '0 3px 15px rgba(0,0,0,0.06)',
                      borderRight: `5px solid ${border}`
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                      <div>
                        <div style={{ fontWeight: 'bold', color: C.primary, fontSize: 16 }}>
                          {req.label} — {req.sellerName}
                        </div>
                        <div style={{ fontSize: 13, color: C.gray }}>
                          النوع: <b>{req.type}</b>
                        </div>
                        <div style={{ fontSize: 13, color: C.gray, marginTop: 6 }}>
                          الحالي: <b>{String(req.currentValue || '—')}</b>
                        </div>
                        <div style={{ fontSize: 13, color: C.gray }}>
                          المطلوب: <b style={{ color: C.gold }}>{String(req.requestedValue || '—')}</b>
                        </div>
                        {req.reason && (
                          <div style={{ marginTop: 8, fontSize: 12, color: C.gray }}>
                            سبب الطلب: {req.reason}
                          </div>
                        )}
                        <div style={{ marginTop: 8, fontSize: 12, color: C.gray }}>
                          التاريخ: {req.date ? new Date(req.date).toLocaleString('ar-YE') : '—'}
                        </div>
                      </div>
                      <Badge color={req.status === 'approved' ? C.green : req.status === 'rejected' ? C.red : C.orange}>
                        {req.status === 'approved' ? 'مقبول' : req.status === 'rejected' ? 'مرفوض' : 'قيد المراجعة'}
                      </Badge>
                    </div>

                    {isPending && (
                      <div style={{ display: 'flex', gap: 10, marginTop: 15 }}>
                        <UIButton
                          onClick={() => reviewChangeRequest(req.id, 'approved')}
                          style={{
                            flex: 1,
                            padding: '10px',
                            background: C.green,
                            color: 'white',
                            border: 'none',
                            borderRadius: 10,
                            fontWeight: 'bold',
                            cursor: 'pointer'
                          }}
                        >
                          <CheckLg size={18} /> قبول وتنفيذ
                        </UIButton>
                        <UIButton
                          onClick={() => {
                            const note = window.prompt('سبب الرفض (اختياري):');
                            reviewChangeRequest(req.id, 'rejected', note || '');
                          }}
                          style={{
                            flex: 1,
                            padding: '10px',
                            background: C.red,
                            color: 'white',
                            border: 'none',
                            borderRadius: 10,
                            fontWeight: 'bold',
                            cursor: 'pointer'
                          }}
                        >
                          <XLg size={16} /> رفض
                        </UIButton>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab === 'plan-requests' && (
          <div>
            {planRequests.length === 0 && <div style={{ textAlign: 'center', padding: 60, color: C.gray }}><CurrencyDollar size={50} color={`${C.gold}30`} /><p>لا توجد طلبات اشتراك حالياً</p></div>}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
              {[...planRequests].reverse().map(req => {
                const isPending = req.status === 'pending';
                return (
                  <div key={req.id} style={{ background: C.white, borderRadius: 16, padding: 20, boxShadow: '0 3px 15px rgba(0,0,0,0.06)', borderRight: `5px solid ${req.status === 'approved' ? C.green : req.status === 'rejected' ? C.red : C.orange}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                      <div>
                        <div style={{ fontWeight: 'bold', color: C.primary, fontSize: 16 }}>باقة {req.planName}</div>
                        <div style={{ fontSize: 13, color: C.gray }}>🏪 {req.storeName}</div>
                      </div>
                      <Badge color={req.status === 'approved' ? C.green : req.status === 'rejected' ? C.red : C.orange}>
                        {req.status === 'approved' ? 'تم التفعيل' : req.status === 'rejected' ? 'مرفوض' : 'قيد الانتظار'}
                      </Badge>
                    </div>
                    {isPending && (
                      <div style={{ display: 'flex', gap: 10, marginTop: 15 }}>
                        <UIButton onClick={() => handleApprovePlan(req.id, 'approve')} style={{ flex: 1, padding: '10px', background: C.green, color: 'white', border: 'none', borderRadius: 10, fontWeight: 'bold', cursor: 'pointer' }}><CheckLg size={18} /> تفعيل الباقة</UIButton>
                        <UIButton onClick={() => { if (window.confirm('هل أنت متأكد من رفض الطلب؟')) handleApprovePlan(req.id, 'reject'); }} style={{ flex: 1, padding: '10px', background: C.red, color: 'white', border: 'none', borderRadius: 10, fontWeight: 'bold', cursor: 'pointer' }}><XLg size={16} /> رفض الطلب</UIButton>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab === 'team' && (
          <div>
            <div style={{ background: C.white, borderRadius: 16, padding: 20, marginBottom: 18, boxShadow: '0 3px 15px rgba(0,0,0,0.06)', borderRight: `4px solid ${C.gold}` }}>
              <p style={{ margin: '0 0 14px', color: C.gray, fontSize: 14, lineHeight: 1.65 }}>
                <strong>السوبر أدمن</strong> يضيف المشرفين وموظفي الإدارة و<strong>مشرف توصيل توريد نت</strong> (يرى طابور توصيل المنصّة فقط ويحدّث حالة الطلب). يُحدَّد لكل شخص صلاحياته ضمن <strong>سقف الدور</strong>: الموظف لا يتعدّى حدود «موظف»، ومشرف التوصيل لا يصل لبيانات البائعين/العملاء العامة خارج الطابور المخصّص.
              </p>
              <UIButton onClick={openCreateTeamModal} style={{ padding: '12px 22px', background: `linear-gradient(135deg,${C.gold},${C.goldL})`, border: 'none', borderRadius: 12, fontWeight: 'bold', color: C.primary, cursor: 'pointer' }}>
                + إضافة عضو إدارة
              </UIButton>
            </div>
            {adminTeam.length === 0 && (
              <div style={{ textAlign: 'center', padding: 60, color: C.gray }}><PersonBadge size={50} color={`${C.gold}30`} /><p>لا يوجد أعضاء فريق</p></div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {adminTeam.map((adm) => {
                const r = getAdminRole(adm);
                const isSuper = r === ADMIN_ROLES.SUPER_ADMIN;
                const cantDelete = isSuper && superAdminCount <= 1;
                return (
                  <div key={adm.id} style={{ background: C.white, borderRadius: 16, padding: '18px 20px', boxShadow: '0 3px 15px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <div style={{ fontWeight: 'bold', color: C.primary }}>{adm.fullName || '—'}</div>
                      <div style={{ fontSize: 12, color: C.gray }}>{adm.phone}</div>
                    </div>
                    <Badge
                      color={
                        isSuper ? C.purple : r === ADMIN_ROLES.SUPERVISOR ? C.blue : r === ADMIN_ROLES.DELIVERY_SUPERVISOR ? C.orange : C.gray
                      }
                    >
                      {getAdminRoleLabel(adm)}
                    </Badge>
                    <Btn color={C.blue} onClick={() => openEditTeamModal(adm)}><GearFill size={12} /> تعديل</Btn>
                    {hasPermission('canDeleteUsers') && (
                      <Btn
                        color={C.red}
                        onClick={() => {
                          if (cantDelete) showToast('لا يمكن حذف آخر سوبر أدمن في النظام', 'error');
                          else deletUser(adm.id);
                        }}
                        style={{ opacity: cantDelete ? 0.5 : 1 }}
                      >
                        <Trash size={12} /> حذف
                      </Btn>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab === 'settings' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 20 }}>
            <div style={{ background: C.white, borderRadius: 16, padding: 24, boxShadow: '0 3px 15px rgba(0,0,0,0.06)' }}>
              <h3 style={{ margin: '0 0 20px', color: C.primary, fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}><GearFill size={16} color={C.gold} /> إعدادات الموقع</h3>
              {[
                { key: 'siteName', label: 'اسم الموقع', placeholder: 'توريد نت' },
                { key: 'sitePhone', label: 'رقم التواصل', placeholder: '776981756' },
                { key: 'siteEmail', label: 'البريد الإلكتروني', placeholder: 'info@example.com' },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: 12, color: C.gray, marginBottom: 5 }}>{f.label}</label>
                  <SharedInput
                    value={settings[f.key] || ''}
                    onChange={(e) => setSettings({ ...settings, [f.key]: e.target.value })}
                    placeholder={f.placeholder}
                    style={{ width: '100%', padding: '10px 14px', border: `2px solid ${C.gold}30`, borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              ))}
              <UIButton onClick={saveSettings} style={{ width: '100%', padding: 12, background: `linear-gradient(135deg,${C.gold},${C.goldL})`, border: 'none', borderRadius: 10, fontWeight: 'bold', color: C.primary, cursor: 'pointer', fontSize: 14 }}>💾 حفظ الإعدادات الآن</UIButton>
              <p style={{ margin: '10px 0 0', fontSize: 11, color: C.gray, lineHeight: 1.5 }}>
                {useBackend && hasPermission('canEditSettings')
                  ? 'يتم حفظ التغييرات في المتصفح فوراً، ورفعها للخادم تلقائياً بعد ثوانٍ قليلة من آخر تعديل — لا حاجة لفاصل زمني طويل.'
                  : 'يتم حفظ التغييرات في المتصفح فوراً.'}
              </p>
            </div>

            <div style={{ background: C.white, borderRadius: 16, padding: 24, boxShadow: '0 3px 15px rgba(0,0,0,0.06)' }}>
              <h3 style={{ margin: '0 0 20px', color: C.primary, fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}><ArrowClockwise size={16} color={C.gold} /> إجراءات المشرف</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {hasPermission('canEditUsers') && (
                <UIButton onClick={() => { if (window.confirm('سيتم تفعيل جميع البائعين المعلقين. متأكد؟')) { const us = getUsers(); const updated = us.map(u => u.role === 'seller' && !u.isPaid && u.plan !== 'trial' ? { ...u, isPaid: true, isApproved: true } : u); saveUsers(updated); showToast('تم تفعيل جميع البائعين ✅'); } }}
                  style={{ padding: '12px 16px', background: `${C.green}10`, color: C.green, border: `1px solid ${C.green}30`, borderRadius: 10, cursor: 'pointer', fontWeight: 'bold', fontSize: 13 }}>
                  <CheckCircleFill size={15} /> تفعيل جميع البائعين المعلقين
                </UIButton>
                )}
                {hasPermission('canEditUsers') && (
                <UIButton onClick={() => { if (window.confirm('سيتم إيقاف جميع الحسابات التجريبية المنتهية. متأكد؟')) { const us = getUsers(); const updated = us.map(u => { if (u.role !== 'seller') return u; const st = getStatus(u); return st.isTrialExpired && !u.isPaid ? { ...u, isLocked: true } : u; }); saveUsers(updated); showToast('تم إيقاف الحسابات المنتهية'); } }}
                  style={{ padding: '12px 16px', background: `${C.orange}10`, color: C.orange, border: `1px solid ${C.orange}30`, borderRadius: 10, cursor: 'pointer', fontWeight: 'bold', fontSize: 13 }}>
                  <LockFill size={15} /> إيقاف الحسابات التجريبية المنتهية
                </UIButton>
                )}
                {hasPermission('canEditSettings') && hasPermission('canDeleteProducts') && (
                <UIButton onClick={() => { if (window.confirm('تحذير! سيتم حذف جميع المنتجات. متأكد؟')) { syncProducts([]); const us = getUsers(); saveUsers(us.map(u => ({ ...u, products: [] }))); showToast('تم حذف جميع المنتجات'); } }}
                  style={{ padding: '12px 16px', background: `${C.red}10`, color: C.red, border: `1px solid ${C.red}30`, borderRadius: 10, cursor: 'pointer', fontWeight: 'bold', fontSize: 13 }}>
                  <Trash size={15} /> حذف جميع المنتجات
                </UIButton>
                )}
              </div>
            </div>
          </div>
        )}

        {tab === 'audit-log' && (
          <div>
            {auditLogs.length === 0 && (
              <div style={{ textAlign: 'center', padding: 60, color: C.gray }}>
                <Clock size={50} color={`${C.gold}30`} />
                <p>لا توجد سجلات تدقيق حالياً</p>
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {auditLogs.map((log) => (
                <div key={log.id} style={{ background: C.white, borderRadius: 14, padding: '14px 18px', boxShadow: '0 3px 10px rgba(0,0,0,0.05)', borderRight: `4px solid ${C.blue}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <div style={{ fontWeight: 'bold', color: C.primary }}>{log.action || 'action'}</div>
                    <div style={{ fontSize: 12, color: C.gray }}>{log.at ? new Date(log.at).toLocaleString('ar-YE') : '—'}</div>
                  </div>
                  <div style={{ fontSize: 12, color: C.gray, marginTop: 6 }}>
                    بواسطة: {log.by?.adminName || 'admin'}
                  </div>
                  {log.meta && (
                    <div style={{ marginTop: 8, fontSize: 12, color: C.primary, background: C.light, borderRadius: 8, padding: '8px 10px', whiteSpace: 'pre-wrap' }}>
                      {JSON.stringify(log.meta, null, 2)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {modal?.type === 'viewSeller' && (
        <Modal title={`تفاصيل البائع — ${modal.data.storeName}`} onClose={() => setModal(null)}>
          {[
            ['الاسم الكامل', modal.data.fullName],
            ['رقم الجوال', modal.data.phone],
            ['اسم المتجر', modal.data.storeName],
            ['الباقة', `${PLANS[modal.data.plan]?.badge || ''} ${PLANS[modal.data.plan]?.name || 'تجريبية'}`],
            ['عدد المنتجات', modal.data.products?.length || 0],
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${C.light}`, fontSize: 14 }}>
              <span style={{ color: C.gray }}>{k}</span>
              <span style={{ fontWeight: 'bold', color: C.primary }}>{v}</span>
            </div>
          ))}
        </Modal>
      )}

      {modal?.type === 'viewCustomer' && (
        <Modal title={`تفاصيل العميل — ${modal.data.fullName}`} onClose={() => setModal(null)}>
          {[
            ['الاسم الكامل', modal.data.fullName],
            ['رقم الجوال', modal.data.phone],
            ['عدد الطلبات', modal.data.orders?.length || 0],
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${C.light}`, fontSize: 14 }}>
              <span style={{ color: C.gray }}>{k}</span>
              <span style={{ fontWeight: 'bold', color: C.primary }}>{v}</span>
            </div>
          ))}
        </Modal>
      )}

      {modal?.type === 'viewOrder' && (
        <Modal title={`تفاصيل الطلب #${String(modal.data.id).slice(-6)}`} onClose={() => setModal(null)}>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: C.gray, marginBottom: 4 }}>العميل</div>
            <div style={{ fontWeight: 'bold', color: C.primary }}>{modal.data.customerName} — {modal.data.customerPhone}</div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: C.gray, marginBottom: 4 }}>الحالة الحالية</div>
            <Badge color={
              modal.data.status === 'delivered'
                ? C.green
                : modal.data.status === 'cancelled'
                  ? C.red
                  : modal.data.status === 'shipping'
                    ? C.blue
                    : modal.data.status === 'processing'
                      ? C.purple
                      : C.orange
            }>
              {modal.data.status === 'delivered'
                ? 'تم التوصيل'
                : modal.data.status === 'cancelled'
                  ? 'ملغي'
                  : modal.data.status === 'shipping'
                    ? 'جاري التوصيل'
                    : modal.data.status === 'processing'
                      ? 'قيد المعالجة'
                      : 'قيد الانتظار'}
            </Badge>
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: C.gray, marginBottom: 6 }}>المنتجات</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {(modal.data.items || []).map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, fontSize: 13, padding: '8px 10px', borderRadius: 10, background: C.light }}>
                  <span style={{ color: C.primary }}>{item.name || item.productName || 'منتج'}</span>
                  <span style={{ color: C.gray }}>x{item.quantity || 1}</span>
                </div>
              ))}
              {(modal.data.items || []).length === 0 && <div style={{ color: C.gray, fontSize: 13 }}>لا توجد عناصر</div>}
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, color: C.gray, marginBottom: 4 }}>إجمالي الطلب</div>
            <div style={{ fontWeight: 'bold', color: C.gold }}>{(modal.data.total || 0).toLocaleString()} ر.ي</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <UIButton onClick={() => { updateOrderStatus(modal.data.id, 'processing'); setModal(null); }} style={{ padding: 10, background: `${C.orange}15`, color: C.orange, border: `1px solid ${C.orange}40`, borderRadius: 10, cursor: 'pointer', fontWeight: 'bold' }}>قيد المعالجة</UIButton>
            <UIButton onClick={() => { updateOrderStatus(modal.data.id, 'shipping'); setModal(null); }} style={{ padding: 10, background: `${C.blue}15`, color: C.blue, border: `1px solid ${C.blue}40`, borderRadius: 10, cursor: 'pointer', fontWeight: 'bold' }}>جاري الشحن</UIButton>
            <UIButton onClick={() => { updateOrderStatus(modal.data.id, 'delivered'); setModal(null); }} style={{ padding: 10, background: `${C.green}15`, color: C.green, border: `1px solid ${C.green}40`, borderRadius: 10, cursor: 'pointer', fontWeight: 'bold' }}>تم التوصيل</UIButton>
            <UIButton onClick={() => { updateOrderStatus(modal.data.id, 'cancelled'); setModal(null); }} style={{ padding: 10, background: `${C.red}15`, color: C.red, border: `1px solid ${C.red}40`, borderRadius: 10, cursor: 'pointer', fontWeight: 'bold' }}>إلغاء</UIButton>
          </div>
        </Modal>
      )}

      {modal?.type === 'changePlan' && (
        <Modal title={`تغيير باقة — ${modal.data.storeName}`} onClose={() => setModal(null)}>
          <p style={{ color: C.gray, fontSize: 13, marginBottom: 16 }}>الباقة الحالية: <strong>{PLANS[modal.data.plan]?.name || 'تجريبية'}</strong></p>
          {Object.entries(PLANS).map(([key, plan]) => (
            <UIButton key={key} onClick={() => { changePlan(modal.data.id, key); setModal(null); }}
              style={{ width: '100%', padding: '12px 16px', marginBottom: 8, background: modal.data.plan === key ? `${C.gold}15` : C.light, border: `2px solid ${modal.data.plan === key ? C.gold : 'transparent'}`, borderRadius: 12, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold' }}>
              <span style={{ color: C.primary }}>{plan.badge} {plan.name}</span>
              <span style={{ color: C.gold, fontSize: 13 }}>{plan.basePrice ? `${plan.basePrice.toLocaleString()} ر.ي/شهر` : 'مجاناً'}</span>
            </UIButton>
          ))}
        </Modal>
      )}

      {modal?.type === 'viewDocs' && (
        <Modal title={`مستندات توثيق — ${modal.data.storeName}`} onClose={() => setModal(null)}>
          <div style={{ marginBottom: 15 }}>
            <Badge color={C.gold}>نوع الوثيقة: {modal.data.verificationDocs?.docType === 'id' ? 'بطاقة شخصية' : 'جواز سفر'}</Badge>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 15 }}>
            {(modal.data.verificationDocs?.files || []).map((doc, i) => (
              <div key={i} style={{ border: `1px solid ${C.light}`, borderRadius: 12, overflow: 'hidden' }}>
                <div style={{ padding: '8px 12px', background: C.light, fontSize: 12, color: C.gray, fontWeight: 'bold' }}>
                  {doc.type === 'front' ? 'الوجه الأمامي' : doc.type === 'back' ? 'الوجه الخلفي' : 'جواز السفر'}
                </div>
                <img src={doc.url} style={{ width: '100%', display: 'block' }} alt="" />
                <a href={doc.url} target="_blank" rel="noreferrer" style={{ display: 'block', padding: '10px', textAlign: 'center', textDecoration: 'none', background: C.white, color: C.blue, fontSize: 13, fontWeight: 'bold' }}>
                  فتح في نافذة جديدة
                </a>
              </div>
            ))}
            {(!modal.data.verificationDocs?.files || modal.data.verificationDocs.files.length === 0) && (
              <p style={{ textAlign: 'center', color: C.gray }}>لم يتم رفع مستندات</p>
            )}
          </div>

          {(String(modal.data.storeFrontPhotoUrl || '').trim())
            ? (
            <div style={{ marginTop: 22 }}>
              <div style={{ marginBottom: 8 }}>
                <Badge color={C.green}>صورة واجهة المحل</Badge>
              </div>
              <div style={{ border: `2px solid ${C.gold}40`, borderRadius: 12, overflow: 'hidden' }}>
                <img src={modal.data.storeFrontPhotoUrl.trim()} style={{ width: '100%', display: 'block', maxHeight: 280, objectFit: 'cover' }} alt="واجهة المحل" />
                <a href={modal.data.storeFrontPhotoUrl.trim()} target="_blank" rel="noreferrer" style={{ display: 'block', padding: '10px', textAlign: 'center', textDecoration: 'none', background: C.white, color: C.blue, fontSize: 13, fontWeight: 'bold' }}>
                  فتح صورة واجهة المحل بحجم كامل
                </a>
              </div>
            </div>
              )
            : (
            <div style={{ marginTop: 22, padding: '14px', borderRadius: 12, background: `${C.orange}14`, border: `1px solid ${C.orange}44` }}>
              <p style={{ fontSize: 13, color: C.orange, margin: 0, lineHeight: 1.6 }}>
                <strong>صورة واجهة المحل:</strong> غير محفوظة على الخادم. تأكّد أن البائع يضغط إرسال التوثيق بعد رفعها، وأعد تحميل اللوحة؛ إذا استمرت المشكلة قد تجاوز سابقاً الحدّ الأقصى لحجم الطلب (تم ضبطه على الخادم ليتسع صور أكثر).
              </p>
            </div>
              )}
          <div style={{ display: 'flex', gap: 10, marginTop: 25 }}>
            <UIButton
              onClick={() => {
                handleVerification(modal.data.id, 'verified');
                setModal(null);
              }}
              style={{ flex: 1, padding: 12, background: C.green, color: 'white', border: 'none', borderRadius: 10, fontWeight: 'bold', cursor: 'pointer' }}
            >
              قبول
            </UIButton>
            <UIButton
              onClick={() => {
                const note = window.prompt('سبب الرفض:');
                handleVerification(modal.data.id, 'rejected', note || '');
                setModal(null);
              }}
              style={{ flex: 1, padding: 12, background: C.red, color: 'white', border: 'none', borderRadius: 10, fontWeight: 'bold', cursor: 'pointer' }}
            >
              رفض
            </UIButton>
            <UIButton onClick={() => setModal(null)} style={{ flex: 1, padding: 12, background: C.light, color: C.gray, border: 'none', borderRadius: 10, fontWeight: 'bold', cursor: 'pointer' }}>
              إغلاق
            </UIButton>
          </div>
        </Modal>
      )}

      <nav className="admin-mobile-nav" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200, background: C.primary, borderTop: `2px solid ${C.gold}40`, display: 'none', justifyContent: 'space-around', alignItems: 'stretch', paddingBottom: 'env(safe-area-inset-bottom, 0px)', boxShadow: '0 -4px 20px rgba(0,0,0,0.3)' }}>
        {visibleSections.map((sec) => {
          const secActive = currentSection?.id === sec.id;
          const SecIcon = sec.Icon;
          return (
            <UIButton
              key={sec.id}
              type="button"
              onClick={() => {
                setTab(sec.tabs[0].key);
                setSearch('');
                window.scrollTo({ top: 0, behavior: 'auto' });
              }}
              style={{
                flex: 1,
                minWidth: 0,
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3,
                padding: '10px 4px',
                color: secActive ? C.gold : `${C.white}80`
              }}
            >
              <span style={{ color: secActive ? C.gold : `${C.white}60` }}>
                <SecIcon size={22} />
              </span>
              <span style={{ fontSize: 10, fontWeight: 'bold', letterSpacing: 0.2, textAlign: 'center', lineHeight: 1.15 }}>{sec.shortTitle}</span>
              {secActive && <span style={{ width: 4, height: 4, borderRadius: '50%', background: C.gold, marginTop: 1 }} />}
            </UIButton>
          );
        })}
      </nav>
    </div>
  );
}
