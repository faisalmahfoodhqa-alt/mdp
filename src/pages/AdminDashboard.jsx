// src/pages/AdminDashboard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, PLANS } from '../context/AuthContext';
import {
  People, Shop, Bag, CheckCircleFill, XCircleFill,
  LockFill, UnlockFill, Trash, BoxArrowRight,
  PersonBadge, GraphUp, Clock, StarFill, Eye,
  GearFill, BellFill, Shield, Search, PencilFill,
  ArrowClockwise, ChatDots, BoxSeam, CurrencyDollar, Megaphone, CheckLg, XLg, Wallet2
} from 'react-bootstrap-icons';

const C = {
  primary: '#0a1a3a', gold: '#c88c23', goldL: '#e5a847',
  white: '#ffffff', light: '#f8f9fa', red: '#dc3545',
  green: '#28a745', gray: '#6c757d', orange: '#fd7e14',
  blue: '#0d6efd', purple: '#6f42c1'
};

const TRIAL_DAYS = 10;

const getStatus = (seller) => {
  const plan = seller.plan || 'trial';
  const start = seller.trialStartDate ? new Date(seller.trialStartDate) : new Date();
  const days = Math.floor((new Date() - start) / 86400000);
  const daysLeft = Math.max(0, TRIAL_DAYS - days);
  const isPaid = seller.isPaid || false;
  const isLocked = plan === 'trial' && days >= TRIAL_DAYS && !isPaid;
  return { plan, daysLeft, isPaid, isLocked, planInfo: PLANS[plan] || PLANS.trial };
};

const Card = ({ icon, label, value, bg }) => (
  <div style={{ background: C.white, borderRadius: 16, padding: '20px', boxShadow: '0 3px 15px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 14 }}>
    <div style={{ width: 52, height: 52, borderRadius: 14, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
    <div>
      <div style={{ fontSize: 28, fontWeight: 'bold', color: C.primary }}>{value}</div>
      <div style={{ fontSize: 12, color: C.gray }}>{label}</div>
    </div>
  </div>
);

const Badge = ({ children, color }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 'bold', background: color + '18', color }}>{children}</span>
);

const Btn = ({ onClick, color = C.red, children, style = {} }) => (
  <button onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 13px', background: color + '15', color, border: `1px solid ${color}30`, borderRadius: 8, cursor: 'pointer', fontSize: 12, fontWeight: 600, ...style }}>{children}</button>
);

const Modal = ({ title, onClose, children }) => (
  <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
    <div style={{ background: C.white, borderRadius: 20, padding: 28, width: '100%', maxWidth: 500, direction: 'rtl', maxHeight: '80vh', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h3 style={{ margin: 0, color: C.primary }}>{title}</h3>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: C.gray }}>×</button>
      </div>
      {children}
    </div>
  </div>
);

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [tab, setTab] = useState('overview');
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem('users') || '[]'));
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null);
  const [settings, setSettings] = useState(() => {
    try { return JSON.parse(localStorage.getItem('siteSettings') || '{}'); } catch { return {}; }
  });
  const [toast, setToast] = useState(null);

  const reload = () => setUsers(JSON.parse(localStorage.getItem('users') || '[]'));

  const [adRequests, setAdRequests] = useState(() => JSON.parse(localStorage.getItem('adRequests') || '[]'));
  const [planRequests, setPlanRequests] = useState(() => JSON.parse(localStorage.getItem('planUpgradeRequests') || '[]'));
  const reloadAds = () => setAdRequests(JSON.parse(localStorage.getItem('adRequests') || '[]'));
  const reloadPlans = () => setPlanRequests(JSON.parse(localStorage.getItem('planUpgradeRequests') || '[]'));
  const pendingAds = adRequests.filter(r => r.status === 'pending');
  const pendingPlans = planRequests.filter(r => r.status === 'pending');

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const saveUsers = (updated) => {
    localStorage.setItem('users', JSON.stringify(updated));
    reload();
  };

  const sellers = users.filter(u => u.role === 'seller');
  const customers = users.filter(u => u.role === 'customer');
  const allProducts = JSON.parse(localStorage.getItem('allProducts') || '[]');
  const allOrders = users.flatMap(u => (u.orders || []).map(o => ({ ...o, customerName: u.fullName, customerPhone: u.phone })));

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

  const deletUser = (id) => {
    if (!window.confirm('هل أنت متأكد من الحذف؟')) return;
    const updated = users.filter(u => u.id !== id);
    const prods = allProducts.filter(p => p.sellerId !== id);
    localStorage.setItem('allProducts', JSON.stringify(prods));
    saveUsers(updated);
    showToast('تم الحذف بنجاح');
  };

  const toggleLock = (id) => {
    const updated = users.map(u => u.id === id ? { ...u, isLocked: !u.isLocked, isPaid: u.isLocked ? u.isPaid : false } : u);
    saveUsers(updated);
    showToast('تم تحديث الحالة');
  };

  const activatePaid = (id) => {
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
    const planInfo = PLANS[plan] || PLANS.trial;
    const updated = users.map(u => u.id === id ? { ...u, plan, maxProducts: planInfo.maxProducts, maxImagesPerProduct: planInfo.maxImagesPerProduct } : u);
    saveUsers(updated);
    showToast('تم تغيير الباقة');
  };

  const saveSettings = () => {
    localStorage.setItem('siteSettings', JSON.stringify(settings));
    showToast('تم حفظ الإعدادات ✅');
  };

  const deleteProduct = (pid, sellerId) => {
    const prods = allProducts.filter(p => p.id !== pid);
    localStorage.setItem('allProducts', JSON.stringify(prods));
    const updated = users.map(u => u.id === sellerId ? { ...u, products: (u.products || []).filter(p => p.id !== pid) } : u);
    saveUsers(updated);
    showToast('تم حذف المنتج');
  };

  const handleAdRequest = (reqId, action, adminNote = '') => {
    const all = JSON.parse(localStorage.getItem('adRequests') || '[]');
    const updated = all.map(r => {
      if (r.id !== reqId) return r;
      const newR = { ...r, status: action, adminNote, reviewedAt: new Date().toISOString() };
      
      // إذا تمت الموافقة: نضع العلامة على المنتج في allProducts مع تاريخ الانتهاء
      if (action === 'approved') {
        const durationDays = r.duration || 1;
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + parseInt(durationDays));
        const expiryStr = expiryDate.toISOString();

        const prods = JSON.parse(localStorage.getItem('allProducts') || '[]');
        const updProds = prods.map(p => {
          if (p.id !== r.productId) return p;
          const updatedP = r.adType === 'offer' 
            ? { ...p, isOffer: true, offerExpiry: expiryStr } 
            : { ...p, isFeatured: true, featuredExpiry: expiryStr };
          return updatedP;
        });
        localStorage.setItem('allProducts', JSON.stringify(updProds));

        // تحديث منتجات البائع أيضاً
        const uList = JSON.parse(localStorage.getItem('users') || '[]');
        const uIdx = uList.findIndex(u => u.id === r.sellerId);
        if (uIdx !== -1) {
          uList[uIdx].products = (uList[uIdx].products || []).map(p => {
            if (p.id !== r.productId) return p;
            return r.adType === 'offer' 
              ? { ...p, isOffer: true, offerExpiry: expiryStr } 
              : { ...p, isFeatured: true, featuredExpiry: expiryStr };
          });
          uList[uIdx].notifications = [{
            id: Date.now(), title: '✅ تم تفعيل إعلانك',
            message: `تم قبول طلبك! منتجك "${r.productName}" سيظهر كـ ${r.adType === 'offer' ? 'عرض اليوم' : 'منتج مميز'} لمدة ${durationDays} أيام (حتى ${expiryDate.toLocaleDateString('ar-YE')}).`,
            type: 'success', date: new Date().toISOString(), read: false
          }, ...(uList[uIdx].notifications || [])];
          localStorage.setItem('users', JSON.stringify(uList));
          reload();
        }
      } else if (action === 'rejected') {
        const uList = JSON.parse(localStorage.getItem('users') || '[]');
        const uIdx = uList.findIndex(u => u.id === r.sellerId);
        if (uIdx !== -1) {
          uList[uIdx].notifications = [{
            id: Date.now(), title: '❌ نعتذر، تم رفض طلب الإعلان',
            message: `تم رفض طلبك لتمييز المنتج "${r.productName}"${adminNote ? '. السبب: ' + adminNote : ''}. يمكنك التواصل مع الدعم لمزيد من التفاصيل.`,
            type: 'error', date: new Date().toISOString(), read: false
          }, ...(uList[uIdx].notifications || [])];
          localStorage.setItem('users', JSON.stringify(uList));
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
    const updated = users.map(u => {
      if (u.id !== sellerId) return u;
      
      const newU = { 
        ...u, 
        isVerified: status === 'verified', 
        isApproved: status === 'verified' ? true : u.isApproved, // فتح اللوحة تلقائياً عند قبول التوثيق
        verificationStatus: status,
        verificationNote: note,
        verifiedAt: status === 'verified' ? new Date().toISOString() : null
      };

      // Add notification
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
    showToast(status === 'verified' ? 'تم التوثيق بنجاح ✅' : 'تم رفض الطلب');
  };

  const handleApprovePlan = (reqId, action) => {
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
    showToast(action === 'approve' ? 'تم تفعيل الباقة بنجاح' : 'تم رفض الطلب');
  };


  const TABS = [
    { key: 'overview',   icon: <GraphUp size={15} />,   mIcon: <GraphUp size={22} />,   label: 'نظرة عامة',                              short: 'عامة' },
    { key: 'sellers',   icon: <Shop size={15} />,      mIcon: <Shop size={22} />,      label: `البائعون (${sellers.length})`,            short: 'بائعون' },
    { key: 'customers', icon: <People size={15} />,    mIcon: <People size={22} />,    label: `العملاء (${customers.length})`,            short: 'عملاء' },
    { key: 'products',  icon: <Bag size={15} />,       mIcon: <Bag size={22} />,       label: `المنتجات (${allProducts.length})`,         short: 'منتجات' },
    { key: 'orders',    icon: <BoxSeam size={15} />,   mIcon: <BoxSeam size={22} />,   label: `الطلبات (${allOrders.length})`,            short: 'طلبات' },
    { key: 'verifications', icon: <PersonBadge size={15} />, mIcon: <PersonBadge size={22} />, label: `توثيق البائعين (${sellers.filter(s => s.verificationStatus === 'pending').length})`, short: 'توثيق' },
    { key: 'plan-requests', icon: <CurrencyDollar size={15} />, mIcon: <CurrencyDollar size={22} />, label: `طلبات الاشتراك (${pendingPlans.length})`, short: 'اشتراكات' },
    { key: 'ads',       icon: <Megaphone size={15} />, mIcon: <Megaphone size={22} />, label: `طلبات الإعلان (${pendingAds.length})`,    short: 'إعلان' },
    { key: 'settings',  icon: <GearFill size={15} />,  mIcon: <GearFill size={22} />,  label: 'الإعدادات',                          short: 'إعدادات' },
  ];


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
      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 99999, background: toast.type === 'error' ? C.red : '#1a3a2a', color: C.white, padding: '12px 28px', borderRadius: 12, fontWeight: 'bold', boxShadow: '0 8px 30px rgba(0,0,0,0.2)' }}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <style>{`
        .admin-desktop-tabs { display: flex; }
        .admin-mobile-nav   { display: none; }
        .admin-content-wrap { padding-bottom: 24px; }
        @media (max-width: 767px) {
          .admin-desktop-tabs { display: none !important; }
          .admin-mobile-nav   { display: flex !important; }
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
              <div style={{ color: `${C.gold}cc`, fontSize: 11 }}>مرحباً، {user.fullName || 'المدير'}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Link to="/" style={{ color: `${C.white}bb`, fontSize: 12, textDecoration: 'none', padding: '7px 14px', borderRadius: 8, border: `1px solid ${C.white}20` }}>الموقع</Link>
            <button onClick={logout} style={{ background: `${C.red}20`, color: '#ff6b6b', border: 'none', padding: '7px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', gap: 5 }}>
              <BoxArrowRight size={14} /> خروج
            </button>
          </div>
        </div>
        {/* Desktop Tabs — hidden on mobile */}
        <div className="admin-desktop-tabs" style={{ maxWidth: 1400, margin: '0 auto', padding: '0 20px 14px', overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: 8, width: 'max-content' }}>
            {TABS.map(t => (
              <button key={t.key} onClick={() => { setTab(t.key); setSearch(''); }} style={{
                padding: '9px 16px', border: 'none', borderRadius: 50, cursor: 'pointer',
                fontWeight: 'bold', fontSize: 13,
                background: tab === t.key ? `linear-gradient(135deg,${C.gold},${C.goldL})` : 'rgba(255,255,255,0.12)',
                color: tab === t.key ? C.primary : C.white,
                display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s', whiteSpace: 'nowrap'
              }}>{t.icon} {t.label}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="admin-content-wrap" style={{ maxWidth: 1400, margin: '0 auto', padding: '24px 20px' }}>

        {/* Search bar (except overview & settings) */}
        {['sellers', 'customers', 'products', 'orders'].includes(tab) && (
          <div style={{ position: 'relative', marginBottom: 20 }}>
            <Search size={16} color={C.gray} style={{ position: 'absolute', top: '50%', right: 16, transform: 'translateY(-50%)' }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 بحث..."
              style={{ width: '100%', padding: '12px 44px 12px 16px', border: `2px solid ${C.gold}30`, borderRadius: 12, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
          </div>
        )}

        {/* ======== OVERVIEW ======== */}
        {tab === 'overview' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16, marginBottom: 28 }}>
              <Card icon={<Shop size={26} color={C.gold} />}       label="إجمالي البائعين"       value={sellers.length}                                              color={C.gold}   bg={`${C.gold}15`} />
              <Card icon={<CheckCircleFill size={26} color={C.green} />} label="بائعون نشطون"    value={sellers.filter(s => !getStatus(s).isLocked).length}           color={C.green}  bg={`${C.green}15`} />
              <Card icon={<LockFill size={26} color={C.red} />}    label="حسابات موقوفة"         value={sellers.filter(s => getStatus(s).isLocked || s.isLocked).length} color={C.red}    bg={`${C.red}15`} />
              <Card icon={<StarFill size={26} color={C.gold} />}    label="اشتراكات مدفوعة"      value={sellers.filter(s => s.isPaid).length}                        color={C.gold}   bg={`${C.gold}15`} />
              <Card icon={<People size={26} color={C.blue} />}      label="إجمالي العملاء"       value={customers.length}                                            color={C.blue}   bg={`${C.blue}15`} />
              <Card icon={<Bag size={26} color={C.orange} />}       label="إجمالي المنتجات"      value={allProducts.length}                                          color={C.orange} bg={`${C.orange}15`} />
              <Card icon={<BoxSeam size={26} color={C.purple} />}   label="إجمالي الطلبات"      value={allOrders.length}                                            color={C.purple} bg={`${C.purple}15`} />
              <Card icon={<CurrencyDollar size={26} color={C.green} />} label="بائعون بحاجة تفعيل" value={sellers.filter(s => s.isPaid === false && s.plan !== 'trial').length} color={C.green} bg={`${C.green}15`} />
            </div>

            {/* أحدث البائعين */}
            <div style={{ background: C.white, borderRadius: 16, padding: 20, boxShadow: '0 3px 15px rgba(0,0,0,0.06)', marginBottom: 20 }}>
              <h3 style={{ margin: '0 0 16px', color: C.primary, fontSize: 15 }}>⏱ أحدث البائعين المسجلين</h3>
              {sellers.slice(-5).reverse().map(s => {
                const st = getStatus(s);
                return (
                  <div key={s.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${C.light}`, flexWrap: 'wrap', gap: 8 }}>
                    <div>
                      <div style={{ fontWeight: 'bold', color: C.primary }}>{s.storeName}</div>
                      <div style={{ fontSize: 12, color: C.gray }}>{s.phone}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <Badge color={st.isLocked || s.isLocked ? C.red : st.isPaid ? C.green : C.gold}>
                        {st.isLocked || s.isLocked ? 'موقوف' : st.isPaid ? 'مدفوع' : 'تجريبي'}
                      </Badge>
                      {!st.isPaid && s.plan !== 'trial' && (
                        <Btn color={C.green} onClick={() => activatePaid(s.id)}><UnlockFill size={12} /> تفعيل</Btn>
                      )}
                    </div>
                  </div>
                );
              })}
              {sellers.length === 0 && <p style={{ color: C.gray, textAlign: 'center' }}>لا يوجد بائعون بعد</p>}
            </div>

            {/* أحدث الطلبات */}
            <div style={{ background: C.white, borderRadius: 16, padding: 20, boxShadow: '0 3px 15px rgba(0,0,0,0.06)' }}>
              <h3 style={{ margin: '0 0 16px', color: C.primary, fontSize: 15 }}>📦 أحدث الطلبات</h3>
              {allOrders.slice(-5).reverse().map((o, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${C.light}`, flexWrap: 'wrap', gap: 8 }}>
                  <div>
                    <div style={{ fontWeight: 'bold', color: C.primary }}>طلب #{String(o.id).slice(-5)}</div>
                    <div style={{ fontSize: 12, color: C.gray }}>{o.customerName} — {o.customerPhone}</div>
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 'bold', color: C.gold }}>{(o.total || 0).toLocaleString()} ر.ي</div>
                    <Badge color={o.status === 'delivered' ? C.green : o.status === 'cancelled' ? C.red : C.orange}>{o.status || 'قيد المعالجة'}</Badge>
                  </div>
                </div>
              ))}
              {allOrders.length === 0 && <p style={{ color: C.gray, textAlign: 'center' }}>لا توجد طلبات بعد</p>}
            </div>
          </div>
        )}

        {/* ======== SELLERS ======== */}
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
                    {seller.storeUrl && <div style={{ color: C.gold, fontSize: 11, marginTop: 2 }}>/store/{seller.storeUrl}</div>}
                    <div style={{ fontSize: 11, color: C.gray, marginTop: 2 }}>
                      {seller.createdAt ? new Date(seller.createdAt).toLocaleDateString('ar-YE') : '—'}
                    </div>
                  </div>

                  <div style={{ textAlign: 'center', minWidth: 90 }}>
                    <Badge color={locked ? C.red : st.isPaid ? C.green : C.gold}>
                      {locked ? <><LockFill size={10} /> موقوف</> : st.isPaid ? <><CheckCircleFill size={10} /> مدفوع</> : <><Clock size={10} /> تجريبي ({st.daysLeft}ي)</>}
                    </Badge>
                    <div style={{ fontSize: 11, color: C.gray, marginTop: 4 }}>{st.planInfo.badge} {st.planInfo.name}</div>
                  </div>

                  <div style={{ textAlign: 'center', minWidth: 60 }}>
                    <div style={{ fontSize: 22, fontWeight: 'bold', color: C.primary }}>{seller.products?.length || 0}</div>
                    <div style={{ fontSize: 11, color: C.gray }}>منتج</div>
                  </div>

                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {/* تفعيل مدفوع إذا قدّم طلب */}
                    {!st.isPaid && seller.plan !== 'trial' && (
                      <Btn color={C.green} onClick={() => activatePaid(seller.id)}><UnlockFill size={12} /> تفعيل</Btn>
                    )}
                    {/* إيقاف / رفع إيقاف */}
                    <Btn color={locked ? C.green : C.orange} onClick={() => toggleLock(seller.id)}>
                      {locked ? <><UnlockFill size={12} /> رفع الإيقاف</> : <><LockFill size={12} /> إيقاف</>}
                    </Btn>
                    {/* تغيير الباقة */}
                    <Btn color={C.blue} onClick={() => setModal({ type: 'changePlan', data: seller })}><GearFill size={12} /> باقة</Btn>
                    {/* عرض */}
                    <Btn color={C.purple} onClick={() => setModal({ type: 'viewSeller', data: seller })}><Eye size={12} /> عرض</Btn>
                    {/* حذف */}
                    <Btn color={C.red} onClick={() => deletUser(seller.id)}><Trash size={12} /> حذف</Btn>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ======== CUSTOMERS ======== */}
        {tab === 'customers' && (
          <div>
            {filteredCustomers.length === 0 && <div style={{ textAlign: 'center', padding: 60, color: C.gray }}><People size={50} color={`${C.primary}30`} /><p>لا يوجد عملاء</p></div>}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {filteredCustomers.map(c => (
                <div key={c.id} style={{ background: C.white, borderRadius: 14, padding: '14px 18px', boxShadow: '0 3px 10px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                  <img src={c.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.fullName || 'U')}&background=c88c23&color=fff`} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }} alt="" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', color: C.primary }}>{c.fullName}</div>
                    <div style={{ fontSize: 12, color: C.gray }}>{c.phone} | {c.createdAt ? new Date(c.createdAt).toLocaleDateString('ar-YE') : '—'}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <Badge color={C.blue}>{c.orders?.length || 0} طلب</Badge>
                    <Btn color={C.purple} onClick={() => setModal({ type: 'viewCustomer', data: c })}><Eye size={12} /> عرض</Btn>
                    <Btn color={C.red} onClick={() => deletUser(c.id)}><Trash size={12} /> حذف</Btn>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======== PRODUCTS ======== */}
        {tab === 'products' && (
          <div>
            {filteredProducts.length === 0 && <div style={{ textAlign: 'center', padding: 60, color: C.gray }}><Bag size={50} color={`${C.orange}40`} /><p>لا توجد منتجات</p></div>}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 16 }}>
              {filteredProducts.map(p => (
                <div key={p.id} style={{ background: C.white, borderRadius: 16, overflow: 'hidden', boxShadow: '0 3px 15px rgba(0,0,0,0.07)' }}>
                  {p.images?.[0]?.url ? (
                    <img src={p.images[0].url} alt={p.name} style={{ width: '100%', height: 150, objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: 150, background: `${C.gold}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Bag size={36} color={`${C.gold}50`} /></div>
                  )}
                  <div style={{ padding: 14 }}>
                    <div style={{ fontWeight: 'bold', color: C.primary, fontSize: 14, marginBottom: 3 }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: C.gray, marginBottom: 4 }}>🏪 {p.storeName}</div>
                    <div style={{ color: C.gold, fontWeight: 'bold', marginBottom: 10 }}>{(p.price || 0).toLocaleString()} ر.ي</div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <Link to={`/product/${p.id}`} style={{ flex: 1, padding: '6px', background: `${C.blue}10`, color: C.blue, border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 12, textDecoration: 'none', textAlign: 'center' }}>
                        <Eye size={12} /> عرض
                      </Link>
                      <button onClick={() => deleteProduct(p.id, p.sellerId)} style={{ flex: 1, padding: '6px', background: `${C.red}10`, color: C.red, border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 12 }}>
                        <Trash size={12} /> حذف
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======== AD REQUESTS ======== */}
        {tab === 'ads' && (
          <div>
            {adRequests.length === 0 && <div style={{ textAlign: 'center', padding: 60, color: C.gray }}><Megaphone size={50} color={`${C.gold}30`} /><p>لا توجد طلبات إعلان حالياً</p></div>}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[...adRequests].reverse().map(req => {
                const isPending = req.status === 'pending';
                return (
                  <div key={req.id} style={{ background: C.white, borderRadius: 16, padding: 20, boxShadow: '0 3px 15px rgba(0,0,0,0.06)', borderRight: `5px solid ${req.status === 'approved' ? C.green : req.status === 'rejected' ? C.red : C.orange}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                      <div style={{ display: 'flex', gap: 14 }}>
                        {req.productImage && <img src={req.productImage} style={{ width: 60, height: 60, borderRadius: 10, objectFit: 'cover' }} alt="" />}
                        <div>
                          <div style={{ fontWeight: 'bold', color: C.primary, fontSize: 16 }}>{req.productName}</div>
                          <div style={{ fontSize: 13, color: C.gray }}>🏪 {req.sellerName} ({req.sellerPhone})</div>
                          <div style={{ fontSize: 12, color: C.gold, marginTop: 4, fontWeight: 'bold' }}>
                            {req.adType === 'featured' ? '⭐ منتج مميز' : '🔥 عرض اليوم'} | المدة: {req.duration || 1} أيام
                          </div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: 18, fontWeight: 'bold', color: C.green }}>{(req.totalPrice || 0).toLocaleString()} ر.ي</div>
                        <Badge color={req.status === 'approved' ? C.green : req.status === 'rejected' ? C.red : C.orange}>
                          {req.status === 'approved' ? 'مقبول' : req.status === 'rejected' ? 'مرفوض' : 'قيد المراجعة'}
                        </Badge>
                      </div>
                    </div>

                    {req.note && (
                      <div style={{ background: C.light, padding: 12, borderRadius: 10, marginTop: 12, fontSize: 13, color: C.gray }}>
                        📝 ملاحظة البائع: {req.note}
                      </div>
                    )}

                    {isPending && (
                      <div style={{ display: 'flex', gap: 10, marginTop: 15 }}>
                        <button onClick={() => handleAdRequest(req.id, 'approved')} style={{ flex: 1, padding: '10px', background: C.green, color: 'white', border: 'none', borderRadius: 10, fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                          <CheckLg size={18} /> قبول الطلب
                        </button>
                        <button onClick={() => {
                          const msg = window.prompt('سبب الرفض (اختياري):');
                          handleAdRequest(req.id, 'rejected', msg);
                        }} style={{ flex: 1, padding: '10px', background: C.red, color: 'white', border: 'none', borderRadius: 10, fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                          <XLg size={16} /> رفض الطلب
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======== ORDERS ======== */}
        {tab === 'orders' && (
          <div>
            {allOrders.length === 0 && <div style={{ textAlign: 'center', padding: 60, color: C.gray }}><BoxSeam size={50} color={`${C.purple}40`} /><p>لا توجد طلبات بعد</p></div>}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {allOrders.slice().reverse().map((o, i) => (
                <div key={i} style={{ background: C.white, borderRadius: 14, padding: '16px 20px', boxShadow: '0 3px 10px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', color: C.primary }}>طلب #{String(o.id || i).slice(-6)}</div>
                    <div style={{ fontSize: 12, color: C.gray }}>{o.customerName} — {o.customerPhone}</div>
                    <div style={{ fontSize: 11, color: C.gray, marginTop: 2 }}>
                      {o.createdAt ? new Date(o.createdAt).toLocaleString('ar-YE') : '—'}
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 'bold', color: C.gold, fontSize: 16 }}>{(o.total || 0).toLocaleString()} ر.ي</div>
                    <div style={{ fontSize: 11, color: C.gray }}>{o.items?.length || 0} منتج</div>
                  </div>
                  <Badge color={o.status === 'delivered' ? C.green : o.status === 'cancelled' ? C.red : o.status === 'shipping' ? C.blue : C.orange}>
                    {o.status === 'delivered' ? 'تم التوصيل' : o.status === 'cancelled' ? 'ملغي' : o.status === 'shipping' ? 'جاري الشحن' : 'قيد المعالجة'}
                  </Badge>
                  <Btn color={C.purple} onClick={() => setModal({ type: 'viewOrder', data: o })}><Eye size={12} /> تفاصيل</Btn>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======== VERIFICATIONS ======== */}
        {tab === 'verifications' && (
          <div>
            {sellers.filter(s => s.verificationStatus === 'pending').length === 0 && (
              <div style={{ textAlign: 'center', padding: 60, color: C.gray }}>
                <PersonBadge size={50} color={`${C.gold}30`} />
                <p>لا توجد طلبات توثيق معلقة</p>
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
              {sellers.filter(s => s.verificationStatus === 'pending').map(seller => (
                <div key={seller.id} style={{ background: C.white, borderRadius: 16, padding: 20, boxShadow: '0 3px 15px rgba(0,0,0,0.06)', borderRight: `5px solid ${C.orange}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                    <div>
                      <div style={{ fontWeight: 'bold', color: C.primary, fontSize: 16 }}>{seller.storeName}</div>
                      <div style={{ fontSize: 13, color: C.gray }}>{seller.fullName} | {seller.phone}</div>
                      <div style={{ fontSize: 12, color: C.gold, marginTop: 4 }}>
                         تاريخ الطلب: {seller.verificationSubmittedAt ? new Date(seller.verificationSubmittedAt).toLocaleString('ar-YE') : '—'}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                       <button onClick={() => setModal({ type: 'viewDocs', data: seller })} style={{ padding: '8px 16px', background: `${C.blue}10`, color: C.blue, border: 'none', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer' }}>
                         عرض المستندات ({seller.verificationDocs?.length || 0})
                       </button>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 10, marginTop: 15 }}>
                    <button onClick={() => handleVerification(seller.id, 'verified')} style={{ flex: 1, padding: '10px', background: C.green, color: 'white', border: 'none', borderRadius: 10, fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                      <CheckLg size={18} /> قبول وتوثيق
                    </button>
                    <button onClick={() => {
                        const note = window.prompt('سبب الرفض (اختياري - يظهر للبائع):');
                        handleVerification(seller.id, 'rejected', note);
                    }} style={{ flex: 1, padding: '10px', background: C.red, color: 'white', border: 'none', borderRadius: 10, fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                      <XLg size={16} /> رفض الطلب
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======== PLAN REQUESTS ======== */}
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
                        <div style={{ fontSize: 12, color: C.gold, marginTop: 4, fontWeight: 'bold' }}>
                          السعر: {(req.price || 0).toLocaleString()} ر.ي | عبر: {req.paymentMethod}
                        </div>
                        <div style={{ fontSize: 12, color: C.blue, marginTop: 4 }}>
                          رقم العملية: <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>{req.transactionId}</span>
                        </div>
                        {req.receiptImage && (
                          <div style={{ marginTop: 10 }}>
                             <button onClick={() => setModal({ type: 'viewImage', data: req.receiptImage })} style={{ background: `${C.gold}15`, color: C.gold, border: `1px solid ${C.gold}30`, padding: '4px 10px', borderRadius: '6px', fontSize: '11px', cursor: 'pointer', fontWeight: 'bold' }}>👁 عرض صورة السند</button>
                          </div>
                        )}
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: 12, color: C.gray }}>{new Date(req.date).toLocaleString('ar-YE')}</div>
                        <Badge color={req.status === 'approved' ? C.green : req.status === 'rejected' ? C.red : C.orange}>
                          {req.status === 'approved' ? 'تم التفعيل' : req.status === 'rejected' ? 'مرفوض' : 'قيد الانتظار'}
                        </Badge>
                      </div>
                    </div>

                    {isPending && (
                      <div style={{ display: 'flex', gap: 10, marginTop: 15 }}>
                        <button onClick={() => handleApprovePlan(req.id, 'approve')} style={{ flex: 1, padding: '10px', background: C.green, color: 'white', border: 'none', borderRadius: 10, fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                          <CheckLg size={18} /> تفعيل الباقة
                        </button>
                        <button onClick={() => {
                          if (window.confirm('هل أنت متأكد من رفض الطلب؟')) handleApprovePlan(req.id, 'reject');
                        }} style={{ flex: 1, padding: '10px', background: C.red, color: 'white', border: 'none', borderRadius: 10, fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                          <XLg size={16} /> رفض الطلب
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======== SETTINGS ======== */}
        {tab === 'settings' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 20 }}>
            {/* إعدادات الموقع */}
            <div style={{ background: C.white, borderRadius: 16, padding: 24, boxShadow: '0 3px 15px rgba(0,0,0,0.06)' }}>
              <h3 style={{ margin: '0 0 20px', color: C.primary, fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}><GearFill size={16} color={C.gold} /> إعدادات الموقع</h3>
              {[
                { key: 'siteName', label: 'اسم الموقع', placeholder: 'توريد نت' },
                { key: 'sitePhone', label: 'رقم التواصل', placeholder: '776981756' },
                { key: 'siteEmail', label: 'البريد الإلكتروني', placeholder: 'info@example.com' },
                { key: 'siteAddress', label: 'العنوان', placeholder: 'صنعاء، اليمن' },
                { key: 'adPriceFeatured', label: 'سعر المنتج المميز (ريال)', placeholder: '1000' },
                { key: 'adPriceOffer', label: 'سعر عرض اليوم (ريال)', placeholder: '1500' },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: 12, color: C.gray, marginBottom: 5 }}>{f.label}</label>
                  <input value={settings[f.key] || ''} onChange={e => setSettings({ ...settings, [f.key]: e.target.value })} placeholder={f.placeholder}
                    style={{ width: '100%', padding: '10px 14px', border: `2px solid ${C.gold}30`, borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              ))}
              <button onClick={saveSettings} style={{ width: '100%', padding: 12, background: `linear-gradient(135deg,${C.gold},${C.goldL})`, border: 'none', borderRadius: 10, fontWeight: 'bold', color: C.primary, cursor: 'pointer', fontSize: 14 }}>
                💾 حفظ الإعدادات
              </button>
            </div>

            {/* إعدادات OTP وكلمة المرور */}
            <div style={{ background: C.white, borderRadius: 16, padding: 24, boxShadow: '0 3px 15px rgba(0,0,0,0.06)' }}>
              <h3 style={{ margin: '0 0 20px', color: C.primary, fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}><Shield size={16} color={C.gold} /> الأمان</h3>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 12, color: C.gray, marginBottom: 5 }}>رمز التحقق OTP (للتسجيل)</label>
                <input value={settings.otpCode || '1234'} onChange={e => setSettings({ ...settings, otpCode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                  style={{ width: '100%', padding: '10px 14px', border: `2px solid ${C.gold}30`, borderRadius: 10, fontSize: 18, letterSpacing: 8, outline: 'none', boxSizing: 'border-box', textAlign: 'center', fontWeight: 'bold' }} />
                <div style={{ fontSize: 11, color: C.gray, marginTop: 4 }}>الرمز الحالي المستخدم في التسجيل</div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 12, color: C.gray, marginBottom: 5 }}>رقم جوال الأدمن</label>
                <input value={settings.adminPhone || '776981756'} onChange={e => setSettings({ ...settings, adminPhone: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', border: `2px solid ${C.gold}30`, borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 12, color: C.gray, marginBottom: 5 }}>كلمة مرور جديدة للأدمن</label>
                <input type="password" value={settings.newAdminPass || ''} onChange={e => setSettings({ ...settings, newAdminPass: e.target.value })} placeholder="اتركها فارغة إذا لم تريد التغيير"
                  style={{ width: '100%', padding: '10px 14px', border: `2px solid ${C.gold}30`, borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <button onClick={() => {
                const us = JSON.parse(localStorage.getItem('users') || '[]');
                const idx = us.findIndex(u => u.role === 'admin');
                if (idx !== -1) {
                  if (settings.newAdminPass) us[idx].password = settings.newAdminPass;
                  if (settings.adminPhone) us[idx].phone = settings.adminPhone;
                  localStorage.setItem('users', JSON.stringify(us));
                }
                saveSettings();
                setSettings(s => ({ ...s, newAdminPass: '' }));
              }} style={{ width: '100%', padding: 12, background: `linear-gradient(135deg,${C.primary},#1a3a6a)`, border: 'none', borderRadius: 10, fontWeight: 'bold', color: C.white, cursor: 'pointer', fontSize: 14 }}>
                🔒 حفظ إعدادات الأمان
              </button>
            </div>

            {/* إعدادات الفترة التجريبية */}
            <div style={{ background: C.white, borderRadius: 16, padding: 24, boxShadow: '0 3px 15px rgba(0,0,0,0.06)' }}>
              <h3 style={{ margin: '0 0 20px', color: C.primary, fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}><Clock size={16} color={C.gold} /> إعدادات البائعين</h3>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 12, color: C.gray, marginBottom: 5 }}>مدة الفترة التجريبية (أيام)</label>
                <input type="number" value={settings.trialDays || 10} min={1} max={90}
                  onChange={e => setSettings({ ...settings, trialDays: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', border: `2px solid ${C.gold}30`, borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 12, color: C.gray, marginBottom: 5 }}>رسالة ترحيب للبائعين الجدد</label>
                <textarea value={settings.welcomeMsg || ''} onChange={e => setSettings({ ...settings, welcomeMsg: e.target.value })} rows={3} placeholder="أهلاً بك في توريد نت..."
                  style={{ width: '100%', padding: '10px 14px', border: `2px solid ${C.gold}30`, borderRadius: 10, fontSize: 13, outline: 'none', boxSizing: 'border-box', resize: 'vertical' }} />
              </div>
              <div style={{ background: `${C.gold}10`, borderRadius: 10, padding: 14, marginBottom: 16 }}>
                <div style={{ fontSize: 13, color: C.primary, fontWeight: 'bold' }}>📊 إحصائيات الباقات</div>
                {Object.entries(PLANS).map(([key, plan]) => (
                  <div key={key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.gray, marginTop: 6 }}>
                    <span>{plan.badge} {plan.name}</span>
                    <span style={{ fontWeight: 'bold', color: C.primary }}>{sellers.filter(s => s.plan === key).length} بائع</span>
                  </div>
                ))}
              </div>
              <button onClick={saveSettings} style={{ width: '100%', padding: 12, background: `linear-gradient(135deg,${C.gold},${C.goldL})`, border: 'none', borderRadius: 10, fontWeight: 'bold', color: C.primary, cursor: 'pointer', fontSize: 14 }}>
                💾 حفظ
              </button>
            </div>

            {/* إعدادات المحافظ الإلكترونية */}
            <div style={{ background: C.white, borderRadius: 16, padding: 24, boxShadow: '0 3px 15px rgba(0,0,0,0.06)' }}>
              <h3 style={{ margin: '0 0 20px', color: C.primary, fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}><Wallet2 size={16} color={C.gold} /> حسابات المحافظ (للبائعين)</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                {(settings.adminWallets || []).map((w, idx) => (
                  <div key={idx} style={{ background: C.light, padding: 10, borderRadius: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      {w.logo && <img src={w.logo} style={{ width: 35, height: 35, borderRadius: 8, objectFit: 'cover' }} alt="" />}
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 'bold' }}>{w.name}</div>
                        <div style={{ fontSize: 12, color: C.gray }}>{w.number}</div>
                      </div>
                    </div>
                    <button onClick={() => {
                        const newWallets = settings.adminWallets.filter((_, i) => i !== idx);
                        setSettings({ ...settings, adminWallets: newWallets });
                    }} style={{ color: C.red, background: 'none', border: 'none', cursor: 'pointer' }}><Trash size={16}/></button>
                  </div>
                ))}
              </div>
              <div style={{ background: `${C.gold}10`, padding: 15, borderRadius: 12, border: `1px dashed ${C.gold}50` }}>
                <div style={{ fontSize: 12, fontWeight: 'bold', color: C.primary, marginBottom: 10 }}>إضافة محفظة جديدة</div>
                
                <div style={{ marginBottom: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
                   <div onClick={() => document.getElementById('walletLogoInput').click()} style={{ width: 50, height: 50, borderRadius: 10, border: `1px dashed ${C.gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', overflow: 'hidden', background: 'white' }}>
                      {settings.tempWalletLogo ? <img src={settings.tempWalletLogo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt=""/> : <span style={{ fontSize: 10, color: C.gold }}>لوجو</span>}
                   </div>
                   <input type="file" id="walletLogoInput" hidden accept="image/*" onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (ev) => setSettings({ ...settings, tempWalletLogo: ev.target.result });
                        reader.readAsDataURL(file);
                      }
                   }} />
                   <div style={{ flex: 1 }}>
                      <input id="walletName" placeholder="اسم المحفظة (مثلاً جوالي)" style={{ width: '100%', padding: '8px 12px', marginBottom: 5, borderRadius: 8, border: `1px solid ${C.gold}30`, fontSize: 13 }} />
                      <input id="walletNumber" placeholder="رقم المحفظة" style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: `1px solid ${C.gold}30`, fontSize: 13 }} />
                   </div>
                </div>

                <button onClick={() => {
                    const name = document.getElementById('walletName').value;
                    const number = document.getElementById('walletNumber').value;
                    if (!name || !number) return;
                    const newWallets = [...(settings.adminWallets || []), { id: Date.now(), name, number, logo: settings.tempWalletLogo }];
                    setSettings({ ...settings, adminWallets: newWallets, tempWalletLogo: null });
                    document.getElementById('walletName').value = '';
                    document.getElementById('walletNumber').value = '';
                }} style={{ width: '100%', padding: 10, background: C.primary, color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 'bold' }}>+ إضافة المحفظة</button>
              </div>
              <button onClick={saveSettings} style={{ width: '100%', marginTop: 15, padding: 12, background: `linear-gradient(135deg,${C.gold},${C.goldL})`, border: 'none', borderRadius: 10, fontWeight: 'bold', color: C.primary, cursor: 'pointer', fontSize: 14 }}>
                💾 حفظ التغييرات
              </button>
            </div>

            {/* إجراءات سريعة */}
            <div style={{ background: C.white, borderRadius: 16, padding: 24, boxShadow: '0 3px 15px rgba(0,0,0,0.06)' }}>
              <h3 style={{ margin: '0 0 20px', color: C.primary, fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}><ArrowClockwise size={16} color={C.gold} /> إجراءات المشرف</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button onClick={() => { if (window.confirm('سيتم تفعيل جميع البائعين المعلقين. متأكد؟')) { const us = JSON.parse(localStorage.getItem('users') || '[]'); const updated = us.map(u => u.role === 'seller' && !u.isPaid && u.plan !== 'trial' ? { ...u, isPaid: true, isApproved: true } : u); saveUsers(updated); showToast('تم تفعيل جميع البائعين ✅'); } }}
                  style={{ padding: '12px 16px', background: `${C.green}10`, color: C.green, border: `1px solid ${C.green}30`, borderRadius: 10, cursor: 'pointer', fontWeight: 'bold', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <CheckCircleFill size={15} /> تفعيل جميع البائعين المعلقين
                </button>
                <button onClick={() => { if (window.confirm('سيتم إيقاف جميع الحسابات التجريبية المنتهية. متأكد؟')) { const us = JSON.parse(localStorage.getItem('users') || '[]'); const updated = us.map(u => { if (u.role !== 'seller') return u; const st = getStatus(u); return st.isTrialExpired && !u.isPaid ? { ...u, isLocked: true } : u; }); saveUsers(updated); showToast('تم إيقاف الحسابات المنتهية'); } }}
                  style={{ padding: '12px 16px', background: `${C.orange}10`, color: C.orange, border: `1px solid ${C.orange}30`, borderRadius: 10, cursor: 'pointer', fontWeight: 'bold', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <LockFill size={15} /> إيقاف الحسابات التجريبية المنتهية
                </button>
                <button onClick={() => { if (window.confirm('تحذير! سيتم حذف جميع المنتجات. متأكد؟')) { localStorage.setItem('allProducts', '[]'); const us = JSON.parse(localStorage.getItem('users') || '[]'); saveUsers(us.map(u => ({ ...u, products: [] }))); showToast('تم حذف جميع المنتجات'); } }}
                  style={{ padding: '12px 16px', background: `${C.red}10`, color: C.red, border: `1px solid ${C.red}30`, borderRadius: 10, cursor: 'pointer', fontWeight: 'bold', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Trash size={15} /> حذف جميع المنتجات
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========== MODALS ========== */}
      {modal?.type === 'viewImage' && (
        <Modal title="سند التحويل" onClose={() => setModal(null)}>
          <div style={{ textAlign: 'center' }}>
            <img src={modal.data} style={{ maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} alt="Receipt" />
            <button onClick={() => setModal(null)} style={{ marginTop: '20px', width: '100%', padding: '12px', background: C.primary, color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>إغلاق</button>
          </div>
        </Modal>
      )}

      {modal?.type === 'viewSeller' && (
        <Modal title={`تفاصيل البائع — ${modal.data.storeName}`} onClose={() => setModal(null)}>
          {[
            ['الاسم الكامل', modal.data.fullName],
            ['رقم الجوال', modal.data.phone],
            ['اسم المتجر', modal.data.storeName],
            ['رابط المتجر', `/store/${modal.data.storeUrl}`],
            ['البريد الإلكتروني', modal.data.email || '—'],
            ['الباقة', `${PLANS[modal.data.plan]?.badge || ''} ${PLANS[modal.data.plan]?.name || 'تجريبية'}`],
            ['عدد المنتجات', modal.data.products?.length || 0],
            ['تاريخ التسجيل', modal.data.createdAt ? new Date(modal.data.createdAt).toLocaleString('ar-YE') : '—'],
            ['نشاط التجارة', modal.data.businessActivity || '—'],
            ['العنوان', modal.data.address ? `${modal.data.address.state}, ${modal.data.address.street}` : '—'],
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${C.light}`, fontSize: 14 }}>
              <span style={{ color: C.gray }}>{k}</span>
              <span style={{ fontWeight: 'bold', color: C.primary }}>{v}</span>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <Link to={`/store/${modal.data.storeUrl}`} target="_blank" onClick={() => setModal(null)}
              style={{ flex: 1, padding: 12, background: `${C.blue}10`, color: C.blue, border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 'bold', fontSize: 13, textAlign: 'center', textDecoration: 'none' }}>
              <Eye size={14} /> عرض المتجر
            </Link>
            <button onClick={() => { setModal(null); deletUser(modal.data.id); }}
              style={{ flex: 1, padding: 12, background: `${C.red}10`, color: C.red, border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 'bold', fontSize: 13 }}>
              <Trash size={14} /> حذف
            </button>
          </div>
        </Modal>
      )}

      {modal?.type === 'viewCustomer' && (
        <Modal title={`تفاصيل العميل — ${modal.data.fullName}`} onClose={() => setModal(null)}>
          {[
            ['الاسم الكامل', modal.data.fullName],
            ['رقم الجوال', modal.data.phone],
            ['تاريخ التسجيل', modal.data.createdAt ? new Date(modal.data.createdAt).toLocaleString('ar-YE') : '—'],
            ['عدد الطلبات', modal.data.orders?.length || 0],
            ['المفضلة', modal.data.wishlist?.length || 0],
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
            <div style={{ fontSize: 13, color: C.gray, marginBottom: 8 }}>المنتجات</div>
            {(modal.data.items || []).map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${C.light}`, fontSize: 13 }}>
                <span>{item.name} × {item.quantity}</span>
                <span style={{ color: C.gold, fontWeight: 'bold' }}>{((item.price || 0) * (item.quantity || 1)).toLocaleString()} ر.ي</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontSize: 16, fontWeight: 'bold' }}>
            <span style={{ color: C.gray }}>الإجمالي</span>
            <span style={{ color: C.gold }}>{(modal.data.total || 0).toLocaleString()} ر.ي</span>
          </div>
          {modal.data.shippingAddress && (
            <div style={{ background: C.light, borderRadius: 10, padding: 12, fontSize: 13, color: C.gray, marginTop: 8 }}>
              📍 {modal.data.shippingAddress}
            </div>
          )}
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
                <a href={doc.url} target="_blank" rel="noreferrer" style={{ display: 'block', padding: '10px', textAlign: 'center', textDecoration: 'none', background: C.white, color: C.blue, fontSize: 13, fontWeight: 'bold' }}>فتح في نافذة جديدة</a>
              </div>
            ))}
            {(!modal.data.verificationDocs?.files || modal.data.verificationDocs.files.length === 0) && <p style={{ textAlign: 'center', color: C.gray }}>لم يتم رفع مستندات</p>}
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 25 }}>
             <button onClick={() => { handleVerification(modal.data.id, 'verified'); setModal(null); }} style={{ flex: 1, padding: 12, background: C.green, color: 'white', border: 'none', borderRadius: 10, fontWeight: 'bold', cursor: 'pointer' }}>قبول</button>
             <button onClick={() => { 
                const note = window.prompt('سبب الرفض:');
                handleVerification(modal.data.id, 'rejected', note);
                setModal(null);
             }} style={{ flex: 1, padding: 12, background: C.red, color: 'white', border: 'none', borderRadius: 10, fontWeight: 'bold', cursor: 'pointer' }}>رفض</button>
             <button onClick={() => setModal(null)} style={{ flex: 1, padding: 12, background: C.light, color: C.gray, border: 'none', borderRadius: 10, fontWeight: 'bold', cursor: 'pointer' }}>إغلاق</button>
          </div>
        </Modal>
      )}

      {modal?.type === 'changePlan' && (
        <Modal title={`تغيير باقة — ${modal.data.storeName}`} onClose={() => setModal(null)}>
          <p style={{ color: C.gray, fontSize: 13, marginBottom: 16 }}>الباقة الحالية: <strong>{PLANS[modal.data.plan]?.name || 'تجريبية'}</strong></p>
          {Object.entries(PLANS).map(([key, plan]) => (
            <button key={key} onClick={() => { changePlan(modal.data.id, key); setModal(null); }}
              style={{ width: '100%', padding: '12px 16px', marginBottom: 8, background: modal.data.plan === key ? `${C.gold}15` : C.light, border: `2px solid ${modal.data.plan === key ? C.gold : 'transparent'}`, borderRadius: 12, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold' }}>
              <span style={{ color: C.primary }}>{plan.badge} {plan.name}</span>
              <span style={{ color: C.gold, fontSize: 13 }}>{plan.basePrice ? `${plan.basePrice.toLocaleString()} ر.ي/شهر` : 'مجاناً'}</span>
            </button>
          ))}
        </Modal>
      )}


      <nav className="admin-mobile-nav" style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
        background: C.primary,
        borderTop: `2px solid ${C.gold}40`,
        display: 'none', /* overridden by CSS to flex on mobile */
        justifyContent: 'space-around', alignItems: 'stretch',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.3)'
      }}>
        {TABS.map(t => (
          <button key={t.key} onClick={() => { setTab(t.key); setSearch(''); window.scrollTo({ top: 0, behavior: 'instant' }); }}
            style={{
              flex: 1, border: 'none', background: 'transparent', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 3, padding: '10px 0',
              color: tab === t.key ? C.gold : `${C.white}80`,
              transition: 'color 0.2s'
            }}
          >
            <span style={{ color: tab === t.key ? C.gold : `${C.white}60`, transition: 'color 0.2s' }}>{t.mIcon}</span>
            <span style={{ fontSize: 10, fontWeight: 'bold', letterSpacing: 0.3 }}>{t.short}</span>
            {tab === t.key && (
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: C.gold, marginTop: 1 }} />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}


