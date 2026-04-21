// src/pages/Stores.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shop, Search, GeoAlt, ChevronLeft, ArrowRight } from 'react-bootstrap-icons';

const C = {
  primary: '#0a1a3a',
  gold: '#c88c23',
  goldLight: '#e5a847',
  white: '#ffffff',
  bg: '#f0f2f7',
  card: '#ffffff',
  green: '#27ae60',
  gray: '#6c757d',
  border: '#e8ecf0',
  text: '#1a2a4a'
};

const Stores = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('');
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const CATEGORIES = [
    { name: 'الكل', key: '' },
    { name: 'ملابس', key: 'ملابس', icon: '👔' },
    { name: 'إلكترونيات', key: 'الأجهزة الإلكترونية', icon: '📱' },
    { name: 'مركبات', key: 'المركبات', icon: '🚗' },
    { name: 'عقارات', key: 'العقارات', icon: '🏠' },
    { name: 'مواد بناء', key: 'مواد البناء', icon: '🔨' },
    { name: 'مواد غذائية', key: 'المواد الغذائية', icon: '🍎' }
  ];

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth <= 768);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    // محاكاة تأخير جلب البيانات ليعطي شعور بالاحترافية
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const activeSellers = users.filter(u => u.role === 'seller' && !u.isLocked && u.isVerified);
      setStores(activeSellers);
      setLoading(false);
    }, 500);
  }, []);

  const filteredStores = stores.filter(store => {
    const matchSearch = store.storeName?.toLowerCase().includes(search.toLowerCase()) || 
                       store.address?.state?.includes(search);
    const matchCat = !selectedCat || store.businessActivity === selectedCat || store.businessCategory === selectedCat;
    return matchSearch && matchCat;
  });

  return (
    <div style={{ minHeight: '100vh', direction: 'rtl', background: C.bg }}>
      {/* غلاف الصفحة */}
      <div style={{
        background: `linear-gradient(135deg, ${C.primary}, #1a3a6a)`,
        padding: isMobile ? '15px 10px 25px' : '35px 20px',
        textAlign: 'center',
        color: C.white,
        position: 'relative'
      }}>
        {/* زر الرجوع والعنوان في شريط واحد */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          position: 'relative',
          marginBottom: '8px'
        }}>
          <button 
            onClick={() => navigate(-1)}
            style={{
              position: 'absolute',
              right: '0',
              background: 'transparent',
              border: `1px solid ${C.white}`,
              color: C.white,
              width: isMobile ? '28px' : '32px',
              height: isMobile ? '28px' : '32px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s'
            }}
          >
            <ArrowRight size={isMobile ? 12 : 14} />
          </button>
          
          <h1 style={{ fontSize: isMobile ? '22px' : '28px', fontWeight: 'bold', margin: '0' }}>المتاجر الشريكة</h1>
        </div>
        
        <p style={{ fontSize: isMobile ? '13px' : '14px', opacity: 0.8, maxWidth: '500px', margin: '0 auto 15px' }}>
          اكتشف أفضل المتاجر وتسوّق منها مباشرة بجودة عالية وأسعار منافسة.
        </p>

        {/* حقل البحث */}
        <div style={{
          maxWidth: '450px', margin: '0 auto 15px', background: C.white,
          borderRadius: '50px', padding: '2px 12px', display: 'flex', alignItems: 'center',
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
        }}>
          <Search color={C.gray} size={15} style={{ marginLeft: '8px' }} />
          <input 
            type="text" 
            placeholder="ابحث عن متجر بالاسم أو المحافظة..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: 'none', outline: 'none', flex: 1, padding: '7px 0', fontSize: '14px' }}
          />
        </div>

        {/* فلاتر الأقسام */}
        <div style={{ 
          marginTop: '12px',
          maxWidth: '100%',
          overflow: 'hidden'
        }}>
          <div style={{ 
            fontSize: '12px', 
            color: `${C.white}90`, 
            fontWeight: 'bold', 
            marginBottom: '8px',
            textAlign: 'right',
            paddingRight: '15px'
          }}>
            تصفية حسب:
          </div>
          
          <div style={{ 
            display: 'flex', 
            gap: '8px', 
            overflowX: 'auto', 
            padding: '2px 15px 10px', 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none'
          }}>
            <style>{`div::-webkit-scrollbar { display: none; }`}</style>
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => setSelectedCat(cat.key)}
                style={{
                  padding: '5px 18px',
                  borderRadius: '50px',
                  border: `1.5px solid ${selectedCat === cat.key ? C.gold : 'rgba(255,255,255,0.15)'}`,
                  background: selectedCat === cat.key ? C.gold : 'rgba(255,255,255,0.05)',
                  color: selectedCat === cat.key ? C.primary : C.white,
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap',
                  boxShadow: selectedCat === cat.key ? `0 4px 12px ${C.gold}40` : 'none',
                  transform: selectedCat === cat.key ? 'scale(1.02)' : 'scale(1)',
                  backdropFilter: 'blur(5px)'
                }}
              >
                {cat.icon && <span style={{ fontSize: '14px' }}>{cat.icon}</span>}
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <div style={{
              width: '40px', height: '40px', border: `3px solid ${C.gold}40`,
              borderTopColor: C.gold, borderRadius: '50%', margin: '0 auto 20px',
              animation: 'spin 1s linear infinite'
            }} />
            <style>{"@keyframes spin { 100% { transform: rotate(360deg); } }"}</style>
            <span style={{ color: C.gray }}>جاري تحميل المتاجر...</span>
          </div>
        ) : filteredStores.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', background: C.card, borderRadius: '20px', border: `1px solid ${C.border}` }}>
            <Shop size={50} color={`${C.gold}50`} style={{ marginBottom: '15px' }} />
            <h3 style={{ color: C.primary, marginBottom: '10px' }}>لا توجد متاجر حالياً</h3>
            <p style={{ color: C.gray }}>لم نتمكن من العثور على متاجر مطابقة لبحثك.</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            gap: isMobile ? '12px' : '30px'
          }}>
            {filteredStores.map(store => (
              <div key={store.id} style={{
                background: C.card, borderRadius: '20px', overflow: 'hidden',
                boxShadow: '0 5px 20px rgba(0,0,0,0.04)', border: `1px solid ${C.border}`,
                transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.04)';
              }}>
                {/* Banner */}
                <div style={{
                  height: isMobile ? '80px' : '120px',
                  background: store.banner ? "url(" + store.banner + ") center/cover" : "linear-gradient(135deg, " + C.primary + ", " + C.gold + ")",
                  position: 'relative'
                }}>
                  {store.isVacationMode && (
                    <div style={{ position: 'absolute', top: '8px', left: '8px', background: C.red, color: 'white', fontSize: '10px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '20px' }}>
                      في إجازة
                    </div>
                  )}
                </div>
                
                {/* Info */}
                <div style={{ padding: isMobile ? '0 12px 12px' : '0 20px 20px', position: 'relative', marginTop: isMobile ? '-25px' : '-35px' }}>
                  <div style={{
                    width: isMobile ? '50px' : '70px', height: isMobile ? '50px' : '70px', borderRadius: isMobile ? '12px' : '16px', background: C.white,
                    padding: '3px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', marginBottom: isMobile ? '8px' : '15px'
                  }}>
                    {store.logo ? (
                      <img src={store.logo} alt={store.storeName} style={{ width: '100%', height: '100%', borderRadius: isMobile ? '10px' : '12px', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: C.bg, borderRadius: isMobile ? '10px' : '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Shop size={isMobile ? 22 : 28} color={C.gold} />
                      </div>
                    )}
                  </div>
                  
                  <h3 style={{ fontSize: isMobile ? '14px' : '18px', fontWeight: 'bold', color: C.text, marginBottom: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {store.storeName}
                  </h3>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: C.gray, fontSize: isMobile ? '11px' : '13px', marginBottom: isMobile ? '8px' : '15px' }}>
                    <GeoAlt size={12} /> {store.address?.state || 'اليمن'}
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: "1px solid " + C.border, paddingTop: isMobile ? '8px' : '15px' }}>
                    <div style={{ fontSize: isMobile ? '10px' : '12px', color: C.gray, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Shop size={isMobile ? 12 : 14} /> {(store.products || []).length} صنف
                    </div>
                    
                    <Link to={"/store/" + store.storeUrl} style={{
                      background: C.gold + "15", color: C.goldDark, padding: isMobile ? '5px 10px' : '8px 16px', borderRadius: '8px',
                      textDecoration: 'none', fontSize: isMobile ? '11px' : '13px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = C.gold + "30"}
                    onMouseLeave={e => e.currentTarget.style.background = C.gold + "15"}>
                      {isMobile ? 'زيارة' : 'زيارة المتجر'} <ChevronLeft size={isMobile ? 10 : 12} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Stores;
