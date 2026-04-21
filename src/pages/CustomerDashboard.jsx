import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Person, Telephone, Envelope, Lock, 
  CheckCircleFill, BoxArrowRight, CameraFill, 
  HeartFill, BellFill, Trash, Shop, InfoCircleFill,
  BagCheckFill, ClockHistory, BagCheck, ChevronLeft, ArrowRight
} from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';

const C = {
  primary: '#0a1a3a',
  gold: '#c88c23',
  goldLight: '#e5a847',
  white: '#ffffff',
  bg: '#f8f9fa',
  card: '#fafafa',
  text: '#1a2a4a',
  border: '#eef2f6',
  red: '#e74c3c',
  green: '#27ae60',
  gray: '#888'
};

const ALL_INTERESTS = [
  { id: 'mens', name: 'ملابس رجالية', icon: '👔' },
  { id: 'womens', name: 'ملابس نسائية', icon: '👗' },
  { id: 'kids', name: 'ملابس أطفال', icon: '🧸' },
  { id: 'electronics', name: 'إلكترونيات', icon: '📱' },
  { id: 'vehicles', name: 'السيارات', icon: '🚗' },
  { id: 'realestate', name: 'العقارات', icon: '🏠' },
  { id: 'construction', name: 'مواد البناء', icon: '🧱' },
  { id: 'food', name: 'مواد غذائية', icon: '🍎' }
];

const CustomerDashboard = ({ defaultTab }) => {
const { user, logout, markNotificationAsRead, clearNotifications, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState(defaultTab || 'menu');
  const [orderTypeTab, setOrderTypeTab] = useState('current');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!user) return null;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedUser = { ...user, profileImage: reader.result };
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const uIdx = users.findIndex(u => u.phone === user.phone);
        if(uIdx > -1) { 
          users[uIdx].profileImage = reader.result; 
          localStorage.setItem('users', JSON.stringify(users)); 
        }
        localStorage.setItem('user', JSON.stringify(updatedUser));
        window.location.reload();
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleInterest = (interestId) => {
    let currentInterests = user.interests || [];
    if (currentInterests.includes(interestId)) {
      currentInterests = currentInterests.filter(id => id !== interestId);
    } else {
      currentInterests = [...currentInterests, interestId];
    }
    const updatedUser = { ...user, interests: currentInterests };
    if(updateUser) updateUser(updatedUser);
  };

  const menuItems = [
    { id: 'profile', icon: Person, label: 'معلومات الحساب' },
    { id: 'wishlist', icon: HeartFill, label: 'المفضلة', badge: user.wishlist?.length, badgeColor: C.red },
    { id: 'interests', icon: CheckCircleFill, label: 'الاهتمامات' },
    { id: 'recent', icon: ClockHistory, label: 'منتجات زرتها سابقاً' },
    { id: 'orders', icon: BagCheckFill, label: 'طلباتي', badge: user.orders?.length, badgeColor: C.gold },
    { id: 'stores', icon: Shop, label: 'متاجر أتابعها' },
    { id: 'notifications', icon: BellFill, label: 'الإشعارات', badge: (user.notifications || []).filter(n => !n.read).length, badgeColor: C.red },
  ];

  const renderMobileHeader = () => {
    if (!isMobile) return null;
    return (
      <div style={{ background: C.primary, color: C.white, padding: '20px', paddingBottom: '30px', position: 'relative', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px', boxShadow: `0 10px 20px rgba(0,0,0,0.1)` }}>
        <button onClick={() => activeTab === 'menu' ? navigate('/') : setActiveTab('menu')} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: C.white, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px', zIndex: 2 }}>
          <ArrowRight size={24} />
        </button>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '30px', position: 'relative', zIndex: 1 }}>
          <div style={{ position: 'relative', width: '90px', height: '90px', marginBottom: '15px' }}>
            <div style={{
              width: '100%', height: '100%', borderRadius: '50%',
              background: user.profileImage ? `url(${user.profileImage}) center/cover no-repeat` : `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: C.primary, fontSize: '30px', fontWeight: 'bold', border: `3px solid ${C.gold}`,
              boxShadow: '0 5px 15px rgba(0,0,0,0.3)', overflow: 'hidden'
            }}>
              {!user.profileImage && (user.fullName?.charAt(0) || 'U').toUpperCase()}
            </div>
            <label style={{
              position: 'absolute', bottom: '-5px', right: '-5px',
              background: C.white, color: C.primary, width: '32px', height: '32px',
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', border: `2px solid ${C.gold}`, boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
            }}>
              <CameraFill size={16} />
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
            </label>
          </div>
          <h3 style={{ margin: '0', fontSize: '20px', fontWeight: 'bold' }}>{user.fullName}</h3>
          <p style={{ margin: '5px 0 0', color: `${C.white}99`, fontSize: '13px' }}>{user.phone}</p>
        </div>
      </div>
    );
  };

  const renderDesktopHeader = () => {
    if (isMobile) return null;
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px', padding: '20px', background: C.card, borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: `1px solid ${C.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ position: 'relative', width: '80px', height: '80px' }}>
            <div style={{
              width: '100%', height: '100%', borderRadius: '50%',
              background: user.profileImage ? `url(${user.profileImage}) center/cover no-repeat` : `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: C.primary, fontSize: '28px', fontWeight: 'bold', border: `3px solid ${C.white}`,
              overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
            }}>
              {!user.profileImage && (user.fullName?.charAt(0) || 'U').toUpperCase()}
            </div>
            <label style={{
              position: 'absolute', bottom: '0', right: '0',
              background: C.white, color: C.primary, width: '28px', height: '28px',
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', border: `1px solid ${C.border}`, boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}>
              <CameraFill size={14} />
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
            </label>
          </div>
          <div>
            <h2 style={{ margin: 0, color: C.primary, fontSize: '24px', fontWeight: 'bold' }}>أهلاً، {user.fullName}</h2>
            <p style={{ margin: '5px 0 0', color: C.gray, fontSize: '14px' }}>إدارة حسابك وتفضيلاتك الشخصية</p>
          </div>
        </div>
        
        <button 
          onClick={() => navigate('/')} 
          style={{ 
            display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 25px', 
            background: 'transparent', border: `1.5px solid ${C.gold}40`, borderRadius: '15px', 
            color: C.gold, fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s' 
          }}
          onMouseEnter={(e) => { e.target.style.background = `${C.gold}10`; e.target.style.borderColor = C.gold; }}
          onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.borderColor = `${C.gold}40`; }}
        >
          الرجوع للرئيسية <ArrowRight size={20} />
        </button>
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: C.bg, direction: 'rtl', paddingBottom: '80px' }}>
      
      {renderMobileHeader()}

      <div style={{ maxWidth: '1000px', margin: isMobile ? '-20px auto 0' : '40px auto', padding: '0 20px', position: isMobile ? 'relative' : 'static', zIndex: 10 }}>
        
        {renderDesktopHeader()}

        <div style={{ display: 'flex', gap: '20px', flexDirection: isMobile ? 'column' : 'row' }}>
          
          {/* Menu Sidebar / List */}
          {(activeTab === 'menu' || !isMobile) && (
            <div style={{ width: isMobile ? '100%' : '300px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ background: C.card, borderRadius: '24px', padding: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button 
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      style={{
                        width: '100%', padding: '15px', background: isActive && !isMobile ? `${C.gold}10` : 'transparent',
                        border: 'none', borderBottom: index < menuItems.length - 1 ? `1px solid ${C.border}` : 'none',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        cursor: 'pointer', transition: '0.2s', borderRadius: isActive && !isMobile ? '12px' : '0'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ width: '35px', height: '35px', borderRadius: '10px', background: `${C.primary}10`, color: C.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Icon size={18} />
                        </div>
                        <span style={{ fontSize: '15px', fontWeight: 'bold', color: C.text }}>{item.label}</span>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {item.badge > 0 && (
                          <span style={{ background: item.badgeColor || C.gold, color: C.white, padding: '2px 8px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                            {item.badge}
                          </span>
                        )}
                        <span style={{ color: C.gray, transform: 'rotate(180deg)', display: 'inline-block' }}>
                          <ChevronLeft size={16} />
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <button 
                onClick={() => { logout(); navigate('/'); }}
                style={{
                  width: '100%', padding: '15px 20px', background: C.card, border: 'none', borderRadius: '24px',
                  display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
                  marginTop: '10px'
                }}
              >
                <div style={{ width: '35px', height: '35px', borderRadius: '10px', background: `${C.red}15`, color: C.red, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <BoxArrowRight size={18} />
                </div>
                <span style={{ fontSize: '15px', fontWeight: 'bold', color: C.red }}>تسجيل الخروج</span>
              </button>
            </div>
          )}

          {/* Content Area */}
          {(activeTab !== 'menu' || !isMobile) && (
            <div style={{ flex: 1, background: C.card, borderRadius: '24px', padding: '25px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)', minHeight: '400px' }}>
              
              {isMobile && (
                <button onClick={() => setActiveTab('menu')} style={{ background: 'transparent', border: 'none', color: C.primary, fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '20px', cursor: 'pointer' }}>
                  <ChevronLeft size={16} /> عودة للقائمة
                </button>
              )}

              {activeTab === 'profile' && (
                <div style={{ maxWidth: '400px' }}>
                  <h3 style={{ borderBottom: `1px solid ${C.border}`, paddingBottom: '15px', marginBottom: '20px', color: C.primary }}>معلومات الحساب</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                       <label style={{ fontSize: '13px', color: '#888' }}>الاسم الكامل</label>
                       <input type="text" value={user.fullName || ''} readOnly style={{ padding: '12px', borderRadius: '10px', border: `1px solid ${C.border}`, outline: 'none', background: '#f5f5f5', color: '#666', fontWeight: 'bold' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                       <label style={{ fontSize: '13px', color: '#888' }}>رقم الهاتف</label>
                       <input type="text" value={user.phone || ''} readOnly style={{ padding: '12px', borderRadius: '10px', border: `1px solid ${C.border}`, outline: 'none', background: '#f5f5f5', color: '#666', fontWeight: 'bold', direction: 'ltr', textAlign: 'right' }} />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div>
                  <h3 style={{ borderBottom: `1px solid ${C.border}`, paddingBottom: '15px', marginBottom: '20px', color: C.primary }}>المفضلة</h3>
                  {(!user.wishlist || user.wishlist.length === 0) ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                      <HeartFill size={40} style={{ opacity: 0.2, marginBottom: '10px' }} />
                      <p>قائمة المفضلة فارغة</p>
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '15px' }}>
                      {user.wishlist.map(product => (
                        <div key={product.id} style={{ border: `1px solid ${C.border}`, borderRadius: '15px', overflow: 'hidden', position: 'relative' }}>
                          <Link to={`/product/${product.id}`}>
                            <img src={product.image} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                          </Link>
                          <div style={{ padding: '10px' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '13px', marginBottom: '5px', color: C.text }}>{product.name}</div>
                            <div style={{ color: C.gold, fontWeight: 'bold', fontSize: '14px' }}>{product.price} ريال</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'interests' && (
                <div>
                  <h3 style={{ borderBottom: `1px solid ${C.border}`, paddingBottom: '15px', marginBottom: '20px', color: C.primary }}>الاهتمامات المختارة</h3>
                  {(!user.interests || user.interests.length === 0) ? (
                    <div style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                      <p>لم تقم بتحديد اهتماماتك بعد</p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '30px' }}>
                      {user.interests.map((interest, idx) => {
                        const interestObj = ALL_INTERESTS.find(i => i.id === interest);
                        const label = interestObj ? interestObj.name : interest;
                        return (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', background: `${C.gold}15`, color: C.gold, padding: '8px 15px', borderRadius: '20px', fontWeight: 'bold', fontSize: '13px', gap: '8px' }}>
                          <span>{label}</span>
                          <button onClick={() => toggleInterest(interest)} style={{ background: 'transparent', border: 'none', color: C.red, cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
                            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>✕</span>
                          </button>
                        </div>
                        )
                      })}
                    </div>
                  )}

                  <h3 style={{ borderBottom: `1px solid ${C.border}`, paddingBottom: '15px', marginBottom: '20px', color: C.primary, marginTop: '20px' }}>إضافة اهتمامات أخرى</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {ALL_INTERESTS.filter(i => !(user.interests || []).includes(i.id)).map((interest, idx) => (
                      <button key={idx} onClick={() => toggleInterest(interest.id)} style={{ background: '#f5f5f5', border: `1px solid ${C.border}`, color: C.text, padding: '8px 15px', borderRadius: '20px', cursor: 'pointer', transition: '0.2s', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span style={{ fontSize: '16px', fontWeight: 'bold', color: C.gold }}>+</span> {interest.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'recent' && (
                <div>
                  <h3 style={{ borderBottom: `1px solid ${C.border}`, paddingBottom: '15px', marginBottom: '20px', color: C.primary }}>منتجات زرتها سابقاً</h3>
                  <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                     <ClockHistory size={40} style={{ opacity: 0.2, marginBottom: '10px' }} />
                     <p>لا توجد منتجات تم زيارتها مؤخراً</p>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${C.border}`, paddingBottom: '15px', marginBottom: '20px' }}>
                     <h3 style={{ margin: 0, color: C.primary }}>الإشعارات</h3>
                     <button onClick={clearNotifications} style={{ background: 'transparent', border: 'none', color: C.red, cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>مسح الكل</button>
                  </div>
                  {(!user.notifications || user.notifications.length === 0) ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                       <BellFill size={40} style={{ opacity: 0.2, marginBottom: '10px' }} />
                       <p>لا توجد إشعارات جديدة</p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                       {user.notifications.map(n => (
                         <div key={n.id} onClick={() => markNotificationAsRead(n.id)} style={{
                           padding: '15px', borderRadius: '12px', background: n.read ? '#fff' : `${C.gold}10`,
                           borderRight: `4px solid ${n.type === 'danger' ? C.red : n.type === 'warning' ? '#f1c40f' : C.gold}`,
                           cursor: 'pointer', border: `1px solid ${C.border}`
                         }}>
                            <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '5px', color: C.text }}>
                               {n.title} {!n.read && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: C.gold }}></span>}
                            </div>
                            <div style={{ fontSize: '12px', color: '#666' }}>{n.message}</div>
                         </div>
                       ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'orders' && (
                <div>
                   <h3 style={{ borderBottom: `1px solid ${C.border}`, paddingBottom: '15px', marginBottom: '25px', color: C.primary, fontWeight: '900' }}>سجل الطلبات وتتبع الحالة</h3>
                   {(!user.orders || user.orders.length === 0) ? (
                     <div style={{ textAlign: 'center', padding: '60px 40px', color: '#888' }}>
                        <BagCheck size={60} style={{ opacity: 0.2, marginBottom: '15px' }} />
                        <p style={{ fontSize: '16px' }}>لم تقم بإجراء أي طلبات حتى الآن</p>
                        <Link to="/" style={{ color: C.gold, fontWeight: 'bold', textDecoration: 'none' }}>ابدأ التسوق الآن ←</Link>
                     </div>
                   ) : (
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
                          <button 
                             onClick={() => setOrderTypeTab('current')} 
                             style={{ flex: 1, padding: '12px', borderRadius: '10px', fontWeight: 'bold', border: `1px solid ${orderTypeTab === 'current' ? C.primary : C.border}`, background: orderTypeTab === 'current' ? C.primary : C.card, color: orderTypeTab === 'current' ? 'white' : C.text, cursor: 'pointer', transition: '0.2s', fontSize: '14px' }}
                          >
                             الطلبات الحالية
                          </button>
                          <button 
                             onClick={() => setOrderTypeTab('past')} 
                             style={{ flex: 1, padding: '12px', borderRadius: '10px', fontWeight: 'bold', border: `1px solid ${orderTypeTab === 'past' ? C.primary : C.border}`, background: orderTypeTab === 'past' ? C.primary : C.card, color: orderTypeTab === 'past' ? 'white' : C.text, cursor: 'pointer', transition: '0.2s', fontSize: '14px' }}
                          >
                             الطلبات السابقة
                          </button>
                        </div>
                        
                        {(() => {
                           const currentOrders = user.orders.filter(o => !['delivered', 'cancelled'].includes(o.status || 'pending'));
                           const pastOrders = user.orders.filter(o => ['delivered', 'cancelled'].includes(o.status || 'pending'));
                           const ordersToShow = orderTypeTab === 'current' ? currentOrders : pastOrders;

                           if (ordersToShow.length === 0) {
                               return (
                                   <div style={{ textAlign: 'center', padding: '50px 20px', color: C.gray, fontSize: '16px', background: C.bg, borderRadius: '15px' }}>
                                       لا توجد طلبات في هذا القسم
                                   </div>
                               );
                           }

                           return ordersToShow.map(order => {
                               const status = order.status || 'pending';
                               const statusColors = {
                                 pending: { bg: '#fff9e6', text: '#856404', label: 'قيد الانتظار' },
                                 processing: { bg: '#eef2ff', text: '#3730a3', label: 'جاري التجهيز' },
                                 shipped: { bg: '#ecfdf5', text: '#065f46', label: 'جاري التوصيل' },
                                 delivered: { bg: '#f0fdf4', text: '#166534', label: 'تم التسليم ✓' },
                                 cancelled: { bg: '#fef2f2', text: '#991b1b', label: 'ملغي' }
                               };
                               const s = statusColors[status] || statusColors.pending;

                               return (
                                 <div key={order.id} style={{ border: `1px solid ${C.border}`, borderRadius: '20px', padding: '20px', background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                                      <div>
                                        <div style={{ fontWeight: 'bold', color: C.primary, fontSize: '16px', marginBottom: '4px' }}>طلب #{order.id}</div>
                                        <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>{new Date(order.date).toLocaleDateString('ar-YE')} - {new Date(order.date).toLocaleTimeString('ar-YE', {hour:'2-digit', minute:'2-digit'})}</div>
                                        
                                        {/* التعديل الذهبي واللفظ الجديد مع العودة للثيم الفاتح */}
                                        <div style={{ fontSize: '13px', color: C.gold, fontWeight: 'bold' }}>موعد وصول طلبك المتوقع: {(order.deliveryTime?.day) || ''} {(order.deliveryTime?.time) || ''}</div>
                                      </div>
                                      <span style={{ background: s.bg, color: s.text, padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', border: `1px solid ${s.text}20` }}>
                                        {s.label}
                                      </span>
                                    </div>

                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '15px', borderBottom: `1px solid ${C.border}`, paddingBottom: '15px' }}>
                                       {order.items?.map((item, idx) => (
                                          <div key={idx} onClick={() => navigate(`/order-details/${order.id}`)} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: C.bg, padding: '10px', borderRadius: '12px', cursor: 'pointer', border: `1px solid ${C.border}` }}>
                                             <img 
                                               src={item.image || (item.images?.[0]?.url || item.images?.[0]) || 'https://via.placeholder.com/80'} 
                                               style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} 
                                               alt={item.name}
                                             />
                                             <div style={{ fontSize: '12px', flex: 1 }}>
                                                <div style={{ fontWeight: 'bold', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: C.text }}>{item.name}</div>
                                                <div style={{ display: 'flex', gap: '5px', marginTop: '3px', flexWrap: 'wrap' }}>
                                                   {item.options?.size && <span style={{ background: '#ddd', padding: '1px 5px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>المقاس: {item.options.size}</span>}
                                                   {item.options?.color && <span style={{ background: '#ddd', padding: '1px 5px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>اللون: {item.options.color}</span>}
                                                </div>
                                                <div style={{ color: C.gold, fontWeight: 'bold', marginTop: '2px' }}>{item.quantity} × {parseFloat(item.price).toLocaleString()} ريال</div>
                                             </div>
                                          </div>
                                       ))}
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                       <div style={{ fontSize: '18px', fontWeight: '900', color: C.primary }}>
                                          <span style={{ fontSize: '13px', color: C.gray, fontWeight: 'normal' }}>الإجمالي: </span>
                                          {(order.total || order.items?.reduce((s, i) => s + (i.price * i.quantity), 0)).toLocaleString()} ريال
                                       </div>
                                       <div style={{ display: 'flex', gap: '10px' }}>
                                          {/* تم حذف زر الواتساب بناءً على طلبكم */}
                                          <button onClick={() => navigate(`/order-details/${order.id}`)} style={{ background: 'transparent', border: `1px solid ${C.border}`, color: C.text, padding: '8px 15px', borderRadius: '10px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                                            تفاصيل الطلب
                                          </button>
                                       </div>
                                    </div>
                                 </div>
                               );
                           });
                        })()}
                     </div>
                   )}
                </div>
              )}

              {activeTab === 'stores' && (
                <div>
                   <h3 style={{ borderBottom: `1px solid ${C.border}`, paddingBottom: '15px', marginBottom: '25px', color: C.primary, fontWeight: '900' }}>المتاجر المتابعة</h3>
                   {(!user.followedStores || user.followedStores.length === 0) ? (
                     <div style={{ textAlign: 'center', padding: '60px 40px', color: '#888' }}>
                        <Shop size={60} style={{ opacity: 0.2, marginBottom: '15px' }} />
                        <p style={{ fontSize: '16px' }}>لم تقم بمتابعة أي متاجر بعد</p>
                        <p style={{ fontSize: '13px' }}>تابع المتاجر لتصلك أحدث منتجاتهم وعروضهم حصرياً.</p>
                     </div>
                   ) : (
                     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px' }}>
                        {user.followedStores.map(store => (
                          <div key={store.id} style={{ border: `1px solid ${C.border}`, borderRadius: '18px', padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff' }}>
                             <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: C.gold, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '20px' }}>
                                   {store.name?.charAt(0) || 'S'}
                                </div>
                                <div style={{ fontWeight: 'bold', color: C.primary }}>{store.name}</div>
                             </div>
                             <Link to={`/store/${store.name.replace(/\s+/g, '-')}`} style={{ background: `${C.gold}15`, color: C.gold, border: 'none', padding: '6px 15px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', textDecoration: 'none' }}>
                                زيارة
                             </Link>
                          </div>
                        ))}
                     </div>
                   )}
                </div>
              )}
              
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;