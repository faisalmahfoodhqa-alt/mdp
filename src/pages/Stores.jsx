// src/pages/Stores.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shop, Search, GeoAlt, ChevronLeft, ArrowRight } from 'react-bootstrap-icons';
import { UIButton } from '../shared/components/ui';
// Removed firebaseService import

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
    const fetchStores = async () => {
      try {
        let users = [];
        try {
           users = JSON.parse(localStorage.getItem('all_users')) || [];
        } catch(e) {}
        const activeSellers = users.filter(u => u.role === 'seller' && !u.isLocked && u.isVerified);
        setStores(activeSellers);
      } catch (err) {
        console.error("Error fetching stores:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: '8px' }}>
          <UIButton onClick={() => navigate(-1)} style={{ position: 'absolute', right: '0', background: 'transparent', border: `1px solid ${C.white}`, color: C.white, width: isMobile ? '28px' : '32px', height: isMobile ? '28px' : '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ArrowRight size={isMobile ? 12 : 14} /></UIButton>
          <h1 style={{ fontSize: isMobile ? '22px' : '28px', fontWeight: 'bold', margin: '0' }}>المتاجر الشريكة</h1>
        </div>
        <p style={{ fontSize: isMobile ? '13px' : '14px', opacity: 0.8, maxWidth: '500px', margin: '0 auto 15px' }}>اكتشف أفضل المتاجر وتسوّق منها مباشرة بجودة عالية وأسعار منافسة.</p>
        <div style={{ maxWidth: '450px', margin: '0 auto 15px', background: C.white, borderRadius: '50px', padding: '2px 12px', display: 'flex', alignItems: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
          <Search color={C.gray} size={15} style={{ marginLeft: '8px' }} />
          <input type="text" placeholder="ابحث عن متجر بالاسم أو المحافظة..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ border: 'none', outline: 'none', flex: 1, padding: '7px 0', fontSize: '14px' }} />
        </div>
        <div style={{ marginTop: '12px', maxWidth: '100%', overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '2px 15px 10px', scrollbarWidth: 'none' }}>
            {CATEGORIES.map(cat => (
              <UIButton key={cat.key} onClick={() => setSelectedCat(cat.key)} style={{ padding: '5px 18px', borderRadius: '50px', border: `1.5px solid ${selectedCat === cat.key ? C.gold : 'rgba(255,255,255,0.15)'}`, background: selectedCat === cat.key ? C.gold : 'rgba(255,255,255,0.05)', color: selectedCat === cat.key ? C.primary : C.white, fontSize: '12px', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap' }}>{cat.name}</UIButton>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>جاري التحميل...</div>
        ) : filteredStores.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', background: C.card, borderRadius: '20px', border: `1px solid ${C.border}` }}>
            <Shop size={50} color={`${C.gold}50`} style={{ marginBottom: '15px' }} />
            <h3 style={{ color: C.primary, marginBottom: '10px' }}>لا توجد متاجر حالياً</h3>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: isMobile ? '12px' : '30px' }}>
            {filteredStores.map(store => (
              <div key={store.id} style={{ background: C.card, borderRadius: '20px', overflow: 'hidden', boxShadow: '0 5px 20px rgba(0,0,0,0.04)', border: `1px solid ${C.border}` }}>
                <div style={{ height: isMobile ? '80px' : '120px', background: store.banner ? "url(" + store.banner + ") center/cover" : "linear-gradient(135deg, " + C.primary + ", " + C.gold + ")", position: 'relative' }} />
                <div style={{ padding: isMobile ? '0 12px 12px' : '0 20px 20px', position: 'relative', marginTop: isMobile ? '-25px' : '-35px' }}>
                  <div style={{ width: isMobile ? '50px' : '70px', height: isMobile ? '50px' : '70px', borderRadius: '12px', background: C.white, padding: '3px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', marginBottom: '10px' }}>
                    {store.logo ? <img src={store.logo} alt={store.storeName} style={{ width: '100%', height: '100%', borderRadius: '10px', objectFit: 'cover' }} /> : <Shop size={isMobile ? 22 : 28} color={C.gold} />}
                  </div>
                  <h3 style={{ fontSize: isMobile ? '14px' : '18px', fontWeight: 'bold', color: C.text }}>{store.storeName}</h3>
                  <div style={{ color: C.gray, fontSize: isMobile ? '11px' : '13px', marginBottom: '10px' }}><GeoAlt size={12} /> {store.address?.state || 'اليمن'}</div>
                  <Link to={"/store/" + store.storeUrl} style={{ background: C.gold + "15", color: C.gold, padding: '8px 16px', borderRadius: '8px', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold', display: 'inline-block' }}>زيارة المتجر</Link>
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
