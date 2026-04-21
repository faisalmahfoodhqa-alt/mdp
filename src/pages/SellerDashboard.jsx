// src/pages/SellerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusCircle, BoxArrowRight, GraphUp, Search, 
  XCircle, HouseDoor, FileText, Bell, Person,
  ShieldCheck, BoxSeam, ArrowRightSquare
} from 'react-bootstrap-icons';
import { useAuth } from '../context/AuthContext';

// Import refactored components
import { C } from '../components/dashboard/seller/constants';
import { Stat, ApprovalBanner, TrialBanner, LockedScreen, PaymentReminderBanner, AddressReminderBanner } from '../components/dashboard/seller/SellerBanners';
import { ProductForm, ProductCard } from '../components/dashboard/seller/ProductManager';
import { AdsSection } from '../components/dashboard/seller/AdsSection';
import { VerificationPage, VerificationBanner } from '../components/dashboard/seller/VerificationSection';
import { NotificationsSection } from '../components/dashboard/seller/NotificationsSection';
import { OrdersSection } from '../components/dashboard/seller/OrdersSection';
import { ProfileSection } from '../components/dashboard/seller/ProfileSection';

const SellerDashboard = () => {
  const { user, updateUser, logout, getSubscriptionStatus, addProduct, updateProduct, deleteProduct } = useAuth();
  const [page, setPage] = useState('home');
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Change request modal state
  const [changeReqModal, setChangeReqModal] = useState({ show: false, type: '', label: '', currentVal: '' });
  const [pendingVal, setPendingVal] = useState('');
  const [reqReason, setReqReason] = useState('');

  const status = getSubscriptionStatus();
  const products = user?.products || [];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    
    const handleSetPage = (e) => setPage(e.detail);
    window.addEventListener('set-seller-page', handleSetPage);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('set-seller-page', handleSetPage);
    };
  }, []);

  if (!user) return null;

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { icon: <FileText size={24} color={C.gold}/>, label: 'إجمالي الطلبات', value: '0', sub: 'طلب جديد اليوم', color: C.gold },
    { icon: <GraphUp size={24} color={C.green}/>, label: 'المبيعات اليومية', value: '0', sub: 'ريال يمني', color: C.green },
    { icon: <PlusCircle size={24} color={C.sidebar}/>, label: 'المنتجات العامة', value: products.length, sub: `${products.filter(p=>p.isVisible).length} منتج نشط`, color: C.sidebar },
  ];

  const navItems = [
    { key: 'home', icon: <HouseDoor />, label: 'الرئيسية' },
    { key: 'products', icon: <BoxSeam />, label: 'منتجاتي' },
    { key: 'orders', icon: <FileText />, label: 'الطلبات', badge: 0 },
    { key: 'ads', icon: <GraphUp />, label: 'الإعلانات' },
    { key: 'profile', icon: <Person />, label: 'إعدادات المتجر' },
  ];

  // Helper functions
  const handleSaveProduct = (prod) => {
    if (editProduct) {
      updateProduct(editProduct.id, prod);
    } else {
      const res = addProduct(prod);
      if (!res.success) {
        alert(res.error);
        return;
      }
    }
    setShowForm(false);
    setEditProduct(null);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      deleteProduct(id);
    }
  };

  const toggleProductVisibility = (product) => {
    updateProduct(product.id, { isVisible: !product.isVisible });
  };

  const submitVerification = (docs) => {
    updateUser({ verificationDocs: docs, verificationStatus: 'pending' });
  };

  const submitChangeRequest = () => {
    if (!pendingVal) { alert('يرجى إدخال القيمة الجديدة'); return; }
    const requests = JSON.parse(localStorage.getItem('accountChangeRequests') || '[]');
    requests.push({
      id: Date.now(),
      sellerId: user.id,
      sellerName: user.storeName,
      type: changeReqModal.type,
      label: changeReqModal.label,
      currentValue: changeReqModal.currentVal,
      requestedValue: pendingVal,
      reason: reqReason,
      status: 'pending',
      date: new Date().toISOString()
    });
    localStorage.setItem('accountChangeRequests', JSON.stringify(requests));
    alert('تم إرسال طلب التعديل للإدارة بنجاح.');
    setChangeReqModal({ ...changeReqModal, show: false });
    setPendingVal(''); setReqReason('');
  };

  return (
    <div style={{ background: C.bg, minHeight: '100vh', direction: 'rtl', paddingBottom: '90px', fontFamily: 'Cairo, sans-serif' }}>
      <div style={{ background: C.sidebar, padding: isMobile ? '15px 20px' : '20px 40px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Link to={`/store/${user.storeUrl}`} style={{ display: 'flex', alignItems: 'center', gap: '15px', textDecoration: 'none', color: 'inherit' }}>
            <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: C.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              {user.logo ? <img src={user.logo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt=""/> : <HouseDoor size={24} color={C.sidebar}/>}
            </div>
            <div>
              <h1 style={{ fontSize: '18px', fontWeight: '800', margin: 0, color: C.gold }}>{user.storeName}</h1>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>لوحة تحكم البائع</div>
            </div>
          </Link>
          <Link 
            to={`/store/${user.storeUrl}`}
            style={{ 
              background: `${C.gold}20`, 
              color: C.gold, 
              padding: '6px 12px', 
              borderRadius: '8px', 
              fontSize: '12px', 
              fontWeight: 'bold', 
              textDecoration: 'none',
              border: `1px solid ${C.gold}40`
            }}
          >
            زيارة المتجر 👁️
          </Link>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '15px' }}>
              <button 
                onClick={() => setPage('notifications')} 
                style={{ 
                  background: 'rgba(255,255,255,0.1)', 
                  border: 'none', 
                  color: page === 'notifications' ? C.gold : 'white', 
                  padding: isMobile ? '8px' : '10px', 
                  borderRadius: '10px', 
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
               <Bell size={isMobile ? 18 : 20}/>
               {(user.notifications || []).filter(n => !n.read).length > 0 && (
                 <span style={{ 
                   position: 'absolute', 
                   top: '5px', 
                   right: '5px', 
                   background: '#e74c3c', 
                   color: 'white', 
                   fontSize: '9px', 
                   width: '15px', 
                   height: '15px', 
                   borderRadius: '50%', 
                   display: 'flex', 
                   alignItems: 'center', 
                   justifyContent: 'center',
                   fontWeight: 'bold',
                   border: `2px solid ${C.sidebar}`
                 }}>
                   {(user.notifications || []).filter(n => !n.read).length}
                 </span>
               )}
             </button>

              {/* Back to Home Button */}
              <Link 
                to="/" 
                style={{ 
                  background: 'rgba(255,255,255,0.1)', 
                  border: 'none', 
                  color: 'white', 
                  padding: isMobile ? '8px 12px' : '10px 15px', 
                  borderRadius: '10px', 
                  cursor: 'pointer',
                  textDecoration: 'none',
                  fontSize: isMobile ? '12px' : '13px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 'bold'
                }}
              >
                {!isMobile && 'المتجر الرئيسي'}
                <ArrowRightSquare size={isMobile ? 18 : 20} style={{ transform: 'rotate(180deg)' }}/>
              </Link>

             <div style={{ textAlign: 'left', display: isMobile ? 'none' : 'block' }}>
                <div style={{ fontSize: '13px', fontWeight: '700' }}>{user.fullName}</div>
                <div style={{ fontSize: '10px', color: C.goldLight }}>{status?.planInfo?.name}</div>
             </div>
        </div>
      </div>

      {isMobile && (
        <div style={{ background: C.sidebar, padding: '10px 20px', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', position: 'sticky', top: '75px', zIndex: 999, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: '15px', fontWeight: '800', color: C.gold }}>{user.fullName}</div>
        </div>
      )}

      <div style={{ padding: isMobile ? '20px' : '30px 40px', maxWidth: '1400px', margin: '0 auto' }}>
        {status?.isLocked ? <LockedScreen /> : (
          <>
            {/* Always visible banners based on status */}
            {!user.isApproved && <ApprovalBanner user={user} />}
            
            {/* Verification Banner should be shown if not verified, regardless of approval */}
            {user.verificationStatus !== 'verified' && <VerificationBanner user={user} setPage={setPage} />}
            
            {user.isApproved && (
              <>
                <TrialBanner status={status} user={user} />
                {(!user.paymentMethods || user.paymentMethods.length === 0) && <PaymentReminderBanner setPage={(p) => { setPage(p); setTimeout(() => { window.dispatchEvent(new CustomEvent('focus-section', { detail: 'payment' })); }, 100); }} />}
                {(!user.addressDetails || !user.storeLocation) && <AddressReminderBanner setPage={(p) => { setPage(p); setTimeout(() => { window.dispatchEvent(new CustomEvent('focus-section', { detail: 'location' })); }, 100); }} />}
              </>
            )}

            {/* Content Sections */}
            <div style={{ marginTop: '10px' }}>
              {page === 'home' && (
                user.isApproved ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '20px' }}>
                        {stats.map((s, i) => <Stat key={i} {...s} />)}
                      </div>
                  </div>
                ) : (
                  <div style={{ background: C.card, borderRadius: '20px', padding: '40px', textAlign: 'center', border: `1px solid ${C.border}`, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <div style={{ width: '80px', height: '80px', background: `${C.gold}10`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                       <ShieldCheck size={40} color={C.gold} />
                    </div>
                    <h3 style={{ color: C.text, fontWeight: '800' }}>حسابك قيد المراجعة الآن</h3>
                    <p style={{ color: C.gray, fontSize: '14px', maxWidth: '400px', margin: '0 auto 20px', lineHeight: '1.6' }}>
                      مرحباً بك في توريد نت. لقد استلمنا طلب انضمامك كبائع، ويتم حالياً مراجعة بياناتك من قبل الإدارة.
                      <br/> 
                      <b>الخطوة التالية:</b> يرجى التأكد من رفع وثائق الهوية في قسم "التوثيق" لتسريع عملية التفعيل.
                    </p>
                    <button onClick={() => setPage('verification')} style={{ background: C.sidebar, color: C.gold, border: 'none', padding: '12px 30px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>انتقل لتوثيق الهوية</button>
                  </div>
                )
              )}

              {page === 'products' && (
                user.isApproved ? (
                  <div style={{ background: C.card, borderRadius: '20px', padding: isMobile ? '20px' : '30px', border: `1px solid ${C.border}`, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'stretch' : 'center', gap: '20px', marginBottom: '30px' }}>
                      <div>
                        <h2 style={{ fontSize: '20px', fontWeight: '800', color: C.text, margin: 0 }}>كتالوج المنتجات</h2>
                        <p style={{ color: C.gray, fontSize: '13px', margin: '5px 0 0' }}>إدارة وتعديل منتجات متجرك المعروضة</p>
                      </div>
                      {!showForm && (
                        <button 
                          onClick={() => {
                            if (!user.isVerified) {
                              alert('يرجى توثيق حسابك أولاً (رفع الهوية/الجواز) لتتمكن من إضافة منتجات لمتجرك.');
                              setPage('verification');
                              return;
                            }
                            setShowForm(true);
                          }} 
                          style={{ 
                            background: user.isVerified ? `linear-gradient(135deg, ${C.sidebar}, #1a3a6a)` : '#95a5a6', 
                            color: user.isVerified ? C.gold : 'white', 
                            border: 'none', 
                            padding: '12px 25px', 
                            borderRadius: '12px', 
                            fontWeight: '800', 
                            cursor: 'pointer', 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '8px', 
                            boxShadow: user.isVerified ? `0 8px 15px ${C.sidebar}40` : 'none' 
                          }}
                        >
                          <PlusCircle size={18}/> 
                          {!user.isVerified && <ShieldCheck size={16} />}
                          إضافة منتج جديد
                        </button>
                      )}
                    </div>

                    {showForm ? (
                      <ProductForm 
                        user={user} 
                        status={status} 
                        editProduct={editProduct} 
                        onSave={handleSaveProduct} 
                        onCancel={() => { setShowForm(false); setEditProduct(null); }} 
                        isMobile={isMobile}
                      />
                    ) : (
                      <>
                        <div style={{ position: 'relative', marginBottom: '25px' }}>
                          <Search style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', color: C.gray }} />
                          <input type="text" placeholder="ابحث عن منتج بالاسم أو القسم..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '14px 45px 14px 20px', borderRadius: '15px', border: `1px solid ${C.border}`, outline: 'none', background: C.bg, fontSize: '14px' }} />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                          {filteredProducts.map(p => (
                            <ProductCard key={p.id} product={p} onEdit={(prod) => { setEditProduct(prod); setShowForm(true); }} onDelete={handleDeleteProduct} onToggleVisibility={toggleProductVisibility} />
                          ))}
                        </div>

                        {filteredProducts.length === 0 && (
                          <div style={{ textAlign: 'center', padding: '60px 20px', color: C.gray }}>
                            <Search size={40} style={{ opacity: 0.2, marginBottom: '15px' }} />
                            <p>لم يتم العثور على منتجات تطابق بحثك</p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ) : (
                  <div style={{ background: C.card, borderRadius: '20px', padding: '40px', textAlign: 'center', border: `1px solid ${C.border}` }}>
                    <BoxSeam size={40} color={C.gray} style={{ marginBottom: '15px', opacity: 0.5 }} />
                    <h3 style={{ color: C.text }}>إدارة المنتجات</h3>
                    <p style={{ color: C.gray, fontSize: '14px' }}>يجب تفعيل حسابك من قبل الإدارة أولاً لتتمكن من إضافة وإدارة منتجاتك.</p>
                  </div>
                )
              )}

              {page === 'orders' && (
                user.isApproved ? <OrdersSection user={user} /> : (
                  <div style={{ background: C.card, borderRadius: '20px', padding: '40px', textAlign: 'center', border: `1px solid ${C.border}` }}>
                    <FileText size={40} color={C.gray} style={{ marginBottom: '15px', opacity: 0.5 }} />
                    <h3 style={{ color: C.text }}>إدارة الطلبات</h3>
                    <p style={{ color: C.gray, fontSize: '14px' }}>ستتمكن من استقبال وإدارة طلبات العملاء فور تفعيل الحساب.</p>
                  </div>
                )
              )}

              {page === 'ads' && (
                user.isApproved ? <AdsSection user={user} products={products} updateUser={updateUser} /> : (
                  <div style={{ background: C.card, borderRadius: '20px', padding: '40px', textAlign: 'center', border: `1px solid ${C.border}` }}>
                    <GraphUp size={40} color={C.gray} style={{ marginBottom: '15px', opacity: 0.5 }} />
                    <h3 style={{ color: C.text }}>إعلانات المتجر</h3>
                    <p style={{ color: C.gray, fontSize: '14px' }}>خدمات الترويج والإعلانات ستكون متاحة بعد تفعيل الحساب.</p>
                  </div>
                )
              )}

              {page === 'profile' && (
                user.isApproved ? (
                  <ProfileSection 
                    user={user} 
                    status={status} 
                    updateUser={updateUser} 
                    isMobile={isMobile} 
                    setChangeReqModal={setChangeReqModal} 
                  />
                ) : (
                  <div style={{ background: C.card, borderRadius: '20px', padding: '40px', textAlign: 'center', border: `1px solid ${C.border}`, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <Person size={40} color={C.gray} style={{ marginBottom: '15px', opacity: 0.5 }} />
                    <h3 style={{ color: C.text }}>إعدادات المتجر</h3>
                    <p style={{ color: C.gray, fontSize: '14px', maxWidth: '400px', margin: '0 auto' }}>
                      لا يمكنك تعديل بيانات المتجر (الشعار، الغلاف، الموقع) إلا بعد موافقة الإدارة على طلب اشتراكك وتفعيل حسابك بشكل رسمي.
                    </p>
                  </div>
                )
              )}

              {page === 'notifications' && <NotificationsSection user={user} updateUser={updateUser} />}
              {page === 'verification' && <VerificationPage user={user} submitVerification={submitVerification} />}
            </div>
          </>
        )}
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: C.sidebar, boxShadow: '0 -4px 20px rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '10px 0', paddingBottom: isMobile ? '25px' : '10px', zIndex: 1000, borderTop: `1px solid ${C.gold}30` }}>
        {navItems.map((item) => {
          const isActive = page === item.key;
          return (
            <button key={item.key} onClick={() => { setPage(item.key); setShowForm(false); setEditProduct(null); }} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: isActive ? C.gold : 'rgba(255,255,255,0.5)', cursor: 'pointer', position: 'relative', transition: 'all 0.2s' }}>
              <div style={{ fontSize: isMobile ? '20px' : '24px', transform: isActive ? 'scale(1.1)' : 'scale(1)' }}>{item.icon}</div>
              <span style={{ fontSize: '10px', fontWeight: isActive ? '700' : '400', opacity: isActive ? 1 : 0.8 }}>{item.label}</span>
              {item.badge > 0 && (
                <span style={{ position: 'absolute', top: '-5px', right: '25%', background: C.red, color: C.white, fontSize: '9px', fontWeight: 'bold', minWidth: '15px', height: '15px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 3px' }}>{item.badge}</span>
              )}
            </button>
          );
        })}
        <button onClick={logout} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: 'rgba(231,76,60,0.8)', cursor: 'pointer' }}>
          <BoxArrowRight size={isMobile ? 20 : 24} /><span style={{ fontSize: '10px' }}>خروج</span>
        </button>
      </div>

      {changeReqModal.show && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: C.white, borderRadius: '24px', width: '100%', maxWidth: '450px', padding: '30px', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', color: C.text }}>طلب تعديل: {changeReqModal.label}</h3>
              <button onClick={() => setChangeReqModal({ ...changeReqModal, show: false })} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.gray }}><XCircle size={24}/></button>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: C.gray, marginBottom: '8px' }}>القيمة الحالية</label>
              <div style={{ background: C.bg, padding: '12px', borderRadius: '12px', fontSize: '14px', color: C.gray }}>{changeReqModal.currentVal}</div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: C.gray, marginBottom: '8px' }}>القيمة الجديدة المطلوبة</label>
              <input value={pendingVal} onChange={(e) => setPendingVal(e.target.value)} placeholder={`أدخل ${changeReqModal.label} الجديد...`} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: `1px solid ${C.border}`, outline: 'none', fontSize: '14px' }} />
            </div>
            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: C.gray, marginBottom: '8px' }}>سبب التعديل (اختياري)</label>
              <textarea value={reqReason} onChange={(e) => setReqReason(e.target.value)} placeholder="وضح سبب الرغبة في التغيير للإدارة..." style={{ width: '100%', height: '80px', padding: '12px', borderRadius: '12px', border: `1px solid ${C.border}`, outline: 'none', fontSize: '14px', resize: 'none' }} />
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={submitChangeRequest} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: 'none', background: C.gold, color: C.sidebar, fontWeight: '800', cursor: 'pointer' }}>إرسال الطلب</button>
              <button onClick={() => setChangeReqModal({ ...changeReqModal, show: false })} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: `1px solid ${C.border}`, background: 'none', color: C.gray, cursor: 'pointer' }}>إلغاء</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
