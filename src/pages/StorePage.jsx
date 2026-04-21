// src/pages/StorePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/products/ProductCard';
import {
  Shop, GeoAlt, Telephone, Envelope, Search,
  Grid3x2Gap, ListUl, BoxSeam, Eye, XCircle, Whatsapp,
  Facebook, Instagram, Tiktok, ClockFill, Share, ArrowRight
} from 'react-bootstrap-icons';
import { CATEGORY_MAP } from '../components/dashboard/seller/constants';
import { Fire } from 'react-bootstrap-icons'; 

const C = {
  primary: '#0a1a3a', gold: '#c88c23', goldLight: '#e5a847',
  white: '#ffffff', bg: '#f0f2f7', card: '#ffffff',
  green: '#27ae60', gray: '#6c757d', border: '#e8ecf0',
  text: '#1a2a4a', textLight: '#8896a5', red: '#e74c3c'
};

// ========== نافذة تفاصيل المنتج ==========
const ProductModal = ({ product, seller, onClose }) => (
  <div style={{
    position: 'fixed', inset: 0, zIndex: 9999,
    background: 'rgba(0,0,0,0.65)', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    padding: '20px', direction: 'rtl'
  }} onClick={onClose}>
    <div style={{
      background: C.white, borderRadius: '20px', maxWidth: '600px',
      width: '100%', maxHeight: '90vh', overflowY: 'auto',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
    }} onClick={e => e.stopPropagation()}>

      {product.images?.length > 0 && (
        <div style={{ position: 'relative' }}>
          <img src={product.images[0].url} alt={product.name} style={{
            width: '100%', height: '280px', objectFit: 'cover',
            borderRadius: '20px 20px 0 0',
            opacity: seller?.isVacationMode ? 0.7 : 1
          }} />
          <button onClick={onClose} style={{
            position: 'absolute', top: '12px', left: '12px',
            background: 'rgba(0,0,0,0.5)', border: 'none',
            borderRadius: '50%', width: '36px', height: '36px',
            color: C.white, cursor: 'pointer', fontSize: '18px',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>✕</button>
          
          {product.isOffer && (
            <div style={{ position: 'absolute', top: '15px', right: '15px', background: C.red, color: 'white', padding: '5px 15px', borderRadius: '50px', fontWeight: 'bold', fontSize: '14px', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>عرض اليوم 🔥</div>
          )}

          {product.images.length > 1 && (
            <div style={{ display: 'flex', gap: '8px', padding: '12px', background: C.bg }}>
              {product.images.map((img, i) => (
                <img key={i} src={img.url} alt="" style={{
                  width: '60px', height: '60px', objectFit: 'cover',
                  borderRadius: '8px', border: `2px solid ${C.gold}30`
                }} />
              ))}
            </div>
          )}
        </div>
      )}

      <div style={{ padding: '24px' }}>
        {!product.images?.length && (
          <button onClick={onClose} style={{
            float: 'left', background: 'none', border: 'none',
            fontSize: '22px', cursor: 'pointer', color: C.gray
          }}>✕</button>
        )}
        {product.category && (
          <div style={{
            display: 'inline-block', background: `${C.gold}15`, color: C.gold,
            fontSize: '11px', padding: '3px 10px', borderRadius: '20px',
            marginBottom: '10px', fontWeight: '700'
          }}>{product.category}</div>
        )}
        <h2 style={{ color: C.primary, marginBottom: '10px', fontSize: '22px' }}>{product.name}</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '16px' }}>
          <div style={{ color: C.gold, fontWeight: '800', fontSize: '26px' }}>
            {Number(product.price).toLocaleString()} ﷼
          </div>
          {product.originalPrice && (
            <div style={{ color: C.textLight, fontSize: '16px', textDecoration: 'line-through' }}>
              {Number(product.originalPrice).toLocaleString()} ﷼
            </div>
          )}
        </div>
        {product.description && (
          <p style={{ color: C.gray, lineHeight: '1.7', marginBottom: '20px', fontSize: '14px' }}>
            {product.description}
          </p>
        )}

        {seller && (
          <div style={{
            background: seller.isVacationMode ? `${C.red}05` : C.bg, 
            borderRadius: '14px', padding: '16px', border: `1px solid ${seller.isVacationMode ? C.red + '20' : C.border}`
          }}>
            {seller.isVacationMode ? (
              <div style={{ textAlign: 'center', padding: '10px' }}>
                <ClockFill size={30} color={C.red} style={{ marginBottom: '10px' }} />
                <div style={{ color: C.red, fontWeight: '800', fontSize: '16px' }}>المتجر في إجازة حالياً</div>
                <p style={{ fontSize: '13px', color: C.gray, marginTop: '5px' }}>نعتذر، لا يمكن استقبال الطلبات في الوقت الحالي.</p>
              </div>
            ) : (
              <>
                <div style={{ fontWeight: '700', color: C.primary, marginBottom: '15px', fontSize: '14px' }}>
                  📞 اطلب الآن عبر الواتساب:
                </div>
                
                <a 
                  href={`https://wa.me/${seller.phone}?text=${encodeURIComponent(`السلام عليكم، أريد شراء منتج: ${product.name}\nمن متجر: ${seller.storeName}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                    background: '#25D366', color: C.white, textDecoration: 'none',
                    padding: '12px', borderRadius: '12px', fontWeight: '800', fontSize: '15px',
                    boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)', marginBottom: '12px'
                  }}
                >
                  <Whatsapp size={20} /> شراء عبر الواتساب
                </a>

                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <a href={`tel:${seller.phone}`} style={{
                    display: 'flex', alignItems: 'center', gap: '5px',
                    textDecoration: 'none', color: C.primary, fontSize: '13px', fontWeight: '600'
                  }}>
                    <Telephone size={14} /> {seller.phone}
                  </a>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
);

// ========== الصفحة الرئيسية ==========
const StorePage = () => {
  const { storeUrl } = useParams();
  const navigate = useNavigate();
  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const [sortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const found = users.find(u =>
      u.role === 'seller' && (
        (u.storeUrl && u.storeUrl.toLowerCase() === storeUrl.toLowerCase()) ||
        (u.storeName && u.storeName.toLowerCase() === decodeURIComponent(storeUrl).toLowerCase())
      )
    );

    if (found) {
      setSeller(found);
      const allProds = JSON.parse(localStorage.getItem('allProducts') || '[]');
      const sellerProds = allProds.filter(p =>
        p.sellerId === found.id && p.isVisible !== false
      );
      setProducts(sellerProds);
    } else {
      setNotFound(true);
    }
    setLoading(false);
  }, [storeUrl]);

  const filtered = products
    .filter(p => {
      const q = search.toLowerCase();
      const matchQ = !q || p.name?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q);
      const matchCat = !filterCat || p.category === filterCat;
      return matchQ && matchCat;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return b.id - a.id;
      if (sortBy === 'oldest') return a.id - b.id;
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      return 0;
    });

  const getValidLabels = (obj) => {
    let labels = [];
    if (Array.isArray(obj)) {
      labels = [...obj];
    } else if (typeof obj === 'object' && obj !== null) {
      Object.keys(obj).forEach(key => {
        labels.push(key);
        labels = [...labels, ...getValidLabels(obj[key])];
      });
    }
    return labels;
  };
  const allValidLabels = getValidLabels(CATEGORY_MAP);

  const usedCats = [...new Set(products.map(p => p.category).filter(Boolean))].filter(c => 
    allValidLabels.some(l => l.trim() === c.trim())
  );

  if (loading) return null;

  if (notFound) {
    return (
      <div style={{ minHeight: '100vh', direction: 'rtl' }}>
        <Header />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', padding: '40px', textAlign: 'center' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: `${C.gold}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
            <Shop size={48} color={`${C.gold}60`} />
          </div>
          <h2 style={{ color: C.primary, marginBottom: '12px' }}>المتجر غير موجود</h2>
          <Link to="/" style={{ padding: '12px 28px', background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, color: C.primary, fontWeight: '700', borderRadius: '50px', textDecoration: 'none' }}>العودة للرئيسية</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', direction: 'rtl', background: C.bg }}>
      
      {/* شريط علوي للمتجر */}
      <div style={{ background: C.white, padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <Link to="/stores" style={{ color: C.sidebar, textDecoration: 'none', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <ArrowRight size={18} /> المتاجر
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {seller?.logo ? (
            <img src={seller.logo} style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} alt=""/>
          ) : (
            <Shop size={20} color={C.gold} />
          )}
          <span style={{ fontWeight: '800', color: C.primary, fontSize: '14px' }}>{seller?.storeName}</span>
        </div>

        <Link to="/" style={{ color: C.gold, textDecoration: 'none', fontSize: '11px', fontWeight: '800', background: `${C.gold}15`, padding: '5px 10px', borderRadius: '8px' }}>الرئيسية</Link>
      </div>

      {/* غلاف المتجر */}
      <div style={{
        height: '250px',
        background: seller?.banner ? `url(${seller.banner}) center/cover no-repeat` : `linear-gradient(135deg, ${C.primary} 0%, #1a3a6a 50%, ${C.primary} 100%)`,
        position: 'relative', display: 'flex', alignItems: 'flex-end', padding: '30px 24px'
      }}>
        {/* Overlay if banner exists */}
        {seller?.banner && <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />}
        
        <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{
              width: '100px', height: '100px', borderRadius: '25px',
              background: C.white, padding: '5px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', flexShrink: 0
            }}>
              {seller?.logo ? (
                 <img src={seller.logo} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }} alt=""/>
              ) : (
                <div style={{ width: '100%', height: '100%', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '20px' }}>
                   <Shop size={40} color={C.gold} />
                </div>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <h1 style={{ color: C.white, fontSize: '32px', fontWeight: '800', marginBottom: '8px', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                {seller.storeName}
              </h1>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ color: 'white', opacity: 0.9, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <GeoAlt size={14} /> {seller.address?.state || 'اليمن'}
                </span>
                {/* Social Links */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  {seller.socialLinks?.facebook && <a href={seller.socialLinks.facebook} target="_blank" rel="noreferrer" style={{ color: 'white' }}><Facebook size={18}/></a>}
                  {seller.socialLinks?.instagram && <a href={seller.socialLinks.instagram} target="_blank" rel="noreferrer" style={{ color: 'white' }}><Instagram size={18}/></a>}
                  {seller.socialLinks?.tiktok && <a href={seller.socialLinks.tiktok} target="_blank" rel="noreferrer" style={{ color: 'white' }}><Tiktok size={18}/></a>}
                </div>
              </div>
            </div>
            {seller.isVacationMode && (
              <div style={{ background: C.red, color: 'white', padding: '10px 20px', borderRadius: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ClockFill/> في إجازة حالياً
              </div>
            )}
        </div>
      </div>

      {/* المحتوى */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '28px 16px' }}>
        
        {/* قسم سلايدر عروض اليوم للتاجر */}
        {products.filter(p => p.isOffer).length > 0 && (
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: C.primary, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
               <Fire color={C.red}/> عروض اليوم الحصرية 🔥
            </h2>
            <div style={{ 
              display: 'flex', gap: '20px', overflowX: 'auto', padding: '10px 5px 25px',
              scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none'
            }}>
              {products.filter(p => p.isOffer).map(offProd => (
                <div key={offProd.id} style={{ 
                  flex: '0 0 280px', scrollSnapAlign: 'start', background: C.white, 
                  borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                  border: `1px solid ${C.gold}30`, position: 'relative'
                }}>
                   <div style={{ position: 'absolute', top: '12px', right: '12px', background: C.red, color: 'white', padding: '4px 12px', borderRadius: '50px', fontSize: '11px', fontWeight: 'bold', zIndex: 5 }}>عرض خاص</div>
                   <div style={{ height: '180px', overflow: 'hidden' }}>
                      <img src={offProd.images?.[0]?.url || offProd.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt=""/>
                   </div>
                   <div style={{ padding: '15px' }}>
                      <h3 style={{ fontSize: '15px', fontWeight: '800', color: C.primary, marginBottom: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{offProd.name}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                         <span style={{ fontSize: '20px', fontWeight: '900', color: C.gold }}>{Number(offProd.price).toLocaleString()} ﷼</span>
                         {offProd.originalPrice && <span style={{ fontSize: '14px', color: C.gray, textDecoration: 'line-through' }}>{Number(offProd.originalPrice).toLocaleString()} ﷼</span>}
                      </div>
                      <button 
                        onClick={() => setSelectedProduct(offProd)}
                        style={{ width: '100%', marginTop: '12px', padding: '10px', background: C.primary, color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}
                      >
                         تفاصيل العرض
                      </button>
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {products.length === 0 ? (
          <div style={{ background: C.card, borderRadius: '20px', padding: '60px', textAlign: 'center', border: `1px solid ${C.border}` }}>
            <BoxSeam size={60} color={`${C.gold}40`} style={{ marginBottom: '16px' }} />
            <h3 style={{ color: C.primary, marginBottom: '8px' }}>لا توجد منتجات بعد</h3>
          </div>
        ) : (
          <>
            {/* شريط الأدوات */}
            <div style={{ background: C.card, borderRadius: '14px', padding: '14px 18px', marginBottom: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', border: `1px solid ${C.border}` }}>
              <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', alignItems: 'center', gap: '8px', border: `2px solid ${C.border}`, borderRadius: '10px', padding: '8px 14px', flex: 1, minWidth: '180px' }}>
                <Search size={14} color={C.gray} />
                <input placeholder="ابحث في المنتجات..." value={search} onChange={e => setSearch(e.target.value)} style={{ border: 'none', outline: 'none', flex: 1, fontSize: '13px', background: 'transparent' }} />
              </form>
              <select value={filterCat} onChange={e => setFilterCat(e.target.value)} style={{ padding: '8px 14px', border: `2px solid ${C.border}`, borderRadius: '10px', fontSize: '13px', outline: 'none', background: C.white, cursor: 'pointer' }}>
                <option value="">كل الفئات</option>
                {usedCats.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <div style={{ display: 'flex', gap: '4px' }}>
                {[['grid', <Grid3x2Gap key="g" size={16} />], ['list', <ListUl key="l" size={16} />]].map(([mode, icon]) => (
                  <button key={mode} onClick={() => setViewMode(mode)} style={{ padding: '8px 12px', border: `2px solid ${viewMode === mode ? C.gold : C.border}`, borderRadius: '8px', background: viewMode === mode ? `${C.gold}15` : C.white, color: viewMode === mode ? C.gold : C.gray, cursor: 'pointer' }}>{icon}</button>
                ))}
              </div>
            </div>

            {/* عرض المنتجات */}
            <div style={{ display: viewMode === 'grid' ? 'grid' : 'flex', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(220px, 1fr))', flexDirection: 'column', gap: isMobile ? '10px' : '18px' }}>
              {filtered.map(product => (
                <ProductCard
                  key={product.id}
                  product={{ ...product, seller: seller?.storeName || 'متجر' }}
                  viewMode={viewMode}
                  isMobile={isMobile}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          seller={seller} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

      <Footer />
    </div>
  );
};

export default StorePage;
