// src/pages/StorePage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';
import {
  Shop, GeoAlt, Search, Grid3x2Gap, ListUl, ArrowRight,
  Facebook, Instagram, Tiktok, Whatsapp, HouseDoor, TagFill,
  ChevronLeft, ChevronRight, Fire, StarFill, Clock, ChevronDown
} from 'react-bootstrap-icons';
import { UIButton } from '../shared/components/ui';

const C = {
  primary: '#0a1a3a', gold: '#c88c23', goldLight: '#e5a847',
  white: '#ffffff', bg: '#f4f6fa', card: '#ffffff',
  green: '#27ae60', gray: '#6c757d', border: '#e8ecf0',
  text: '#1a2a4a', red: '#e74c3c'
};

const StorePage = () => {
  const { storeUrl } = useParams();
  const navigate = useNavigate();
  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth > 768 && window.innerWidth <= 1024);
  const saleScrollRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setIsMobile(w <= 768);
      setIsTablet(w > 768 && w <= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    try {
      let users = [];
      try { users = JSON.parse(localStorage.getItem('all_users')) || []; } catch(e) {}
      const found = users.find(u =>
        u.role === 'seller' && (
          (u.storeUrl && u.storeUrl.toLowerCase() === storeUrl.toLowerCase()) ||
          (u.storeName && u.storeName.toLowerCase() === decodeURIComponent(storeUrl).toLowerCase())
        )
      );
      if (found) {
        setSeller(found);
        let allProds = [];
        try { allProds = JSON.parse(localStorage.getItem('all_products')) || []; } catch(e) {}
        setProducts(allProds.filter(p => p.sellerId === found.id && p.isVisible !== false));
      } else {
        setNotFound(true);
      }
    } catch (err) {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }, [storeUrl]);

  const saleProducts = products.filter(p => p.oldPrice && p.oldPrice > p.price);
  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];

  const filtered = products.filter(p => {
    const q = search.toLowerCase();
    const matchQ = !q || p.name?.toLowerCase().includes(q);
    const matchCat = !filterCat || p.category === filterCat;
    return matchQ && matchCat;
  });

  const scrollSale = (dir) => {
    if (saleScrollRef.current) {
      saleScrollRef.current.scrollBy({ left: dir * 250, behavior: 'smooth' });
    }
  };

  const socialLinks = seller?.socialLinks || {};
  const hasSocial = socialLinks.facebook || socialLinks.instagram || socialLinks.tiktok;
  const currentYear = new Date().getFullYear();

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.bg, direction: 'rtl' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '50px', height: '50px', border: `4px solid ${C.gold}30`, borderTopColor: C.gold, borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 15px' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ color: C.gray }}>جاري تحميل المتجر...</p>
      </div>
    </div>
  );

  if (notFound) return (
    <div style={{ minHeight: '100vh', direction: 'rtl', background: C.bg }}>
      <StickyNav isMobile={isMobile} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', padding: '40px', textAlign: 'center' }}>
        <Shop size={48} color={C.gold} />
        <h2 style={{ color: C.primary, marginTop: '20px' }}>المتجر غير موجود</h2>
        <Link to="/" style={{ color: C.gold, marginTop: '10px' }}>العودة للرئيسية</Link>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', direction: 'rtl', background: C.bg, display: 'flex', flexDirection: 'column', flex: 1 }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .sale-scroll::-webkit-scrollbar { display: none; }
        .store-social-btn:hover { transform: translateY(-3px) scale(1.1) !important; }
        .store-cat-chip:hover { background: ${C.gold} !important; color: ${C.primary} !important; }
      `}</style>

      {/* Sticky Nav */}
      <StickyNav seller={seller} isMobile={isMobile} />

      {/* Vacation Mode Banner */}
      {seller?.isVacationMode && (
        <div style={{
          background: '#dc3545', color: 'white', padding: '14px 20px',
          textAlign: 'center', fontSize: '15px', fontWeight: '800',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
        }}>
          🔴 هذا المتجر مغلق مؤقتاً (وضع الإجازة) — لا يمكن الشراء حالياً
        </div>
      )}

      {/* Hero Banner */}
      <div style={{
        height: isMobile ? '220px' : '280px',
        background: seller?.banner
          ? `linear-gradient(to bottom, rgba(10,26,58,0.3), rgba(10,26,58,0.85)), url(${seller.banner}) center/cover`
          : `linear-gradient(135deg, ${C.primary} 0%, #1a3a6a 50%, ${C.gold}40 100%)`,
        display: 'flex', alignItems: 'flex-end', padding: isMobile ? '25px 20px' : '35px 50px',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '15px' : '20px', zIndex: 2, animation: 'fadeUp 0.6s ease' }}>
          <div style={{
            width: isMobile ? '75px' : '95px', height: isMobile ? '75px' : '95px',
            borderRadius: '18px', background: C.white, padding: '4px',
            boxShadow: '0 8px 25px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            {seller?.logo
              ? <img src={seller.logo} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '14px' }} alt="" />
              : <Shop size={isMobile ? 35 : 45} color={C.gold} />}
          </div>
          <div>
            <h1 style={{ color: C.white, fontSize: isMobile ? '22px' : '30px', fontWeight: '900', margin: 0, textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
              {seller.storeName}
            </h1>
            {seller.businessActivity && (
              <span style={{ color: C.goldLight, fontSize: isMobile ? '13px' : '15px', fontWeight: '600', marginTop: '4px', display: 'block' }}>
                {seller.businessActivity}
              </span>
            )}
            {seller.address?.state && (
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '5px' }}>
                <GeoAlt size={13} /> {seller.address.state}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Social Links Bar */}
      {hasSocial && (
        <div style={{ background: C.white, padding: '12px 20px', display: 'flex', justifyContent: 'center', gap: '12px', borderBottom: `1px solid ${C.border}`, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          {socialLinks.facebook && <SocialIcon href={socialLinks.facebook} bg="#1877F2" icon={<Facebook size={16} />} />}
          {socialLinks.instagram && <SocialIcon href={socialLinks.instagram} bg="#E4405F" icon={<Instagram size={16} />} />}
          {socialLinks.tiktok && <SocialIcon href={socialLinks.tiktok} bg="#000" icon={<Tiktok size={16} />} />}
        </div>
      )}

      {/* Working Hours */}
      {seller?.workingHoursData && Object.keys(seller.workingHoursData).length > 0 && (() => {
        const DAYS = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        const todayName = DAYS[new Date().getDay()];
        const todayVal = (seller.workingHoursData || {})[todayName] || '';
        const isClosed = !todayVal || todayVal === 'إجازة';

        let isOpenNow = false;
        if (!isClosed && todayVal.includes('-')) {
          const [from, to] = todayVal.split('-').map(s => s.trim());
          const now = new Date();
          const nowMins = now.getHours() * 60 + now.getMinutes();
          const [fh, fm] = from.split(':').map(Number);
          const [th, tm] = to.split(':').map(Number);
          if (!isNaN(fh) && !isNaN(th)) {
            isOpenNow = nowMins >= (fh * 60 + (fm || 0)) && nowMins <= (th * 60 + (tm || 0));
          }
        }

        const formatTime = (t) => {
          if (!t) return '—';
          let [h, m] = t.split(':').map(Number);
          if (isNaN(h)) return t;
          const per = h >= 12 ? 'م' : 'ص';
          h = h % 12 || 12;
          return `${h}:${(m || 0).toString().padStart(2, '0')} ${per}`;
        };

        return (
          <WorkingHoursBar
            seller={seller}
            todayName={todayName}
            todayVal={todayVal}
            isClosed={isClosed}
            isOpenNow={isOpenNow}
            formatTime={formatTime}
            DAYS={DAYS}
            isMobile={isMobile}
          />
        );
      })()}

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '20px 15px' : '30px 20px' }}>

        {/* Sale Products Section */}
        {saleProducts.length > 0 && (
          <div style={{ marginBottom: '35px', animation: 'fadeUp 0.5s ease 0.1s both' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: `${C.red}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Fire size={22} color={C.red} />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: isMobile ? '18px' : '22px', fontWeight: '900', color: C.text }}>عروض المتجر</h2>
                  <p style={{ margin: 0, fontSize: '12px', color: C.gray }}>خصومات حصرية من {seller.storeName}</p>
                </div>
              </div>
              {!isMobile && saleProducts.length > 4 && (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <UIButton onClick={() => scrollSale(1)} style={scrollBtnStyle}><ChevronRight size={18} /></UIButton>
                  <UIButton onClick={() => scrollSale(-1)} style={scrollBtnStyle}><ChevronLeft size={18} /></UIButton>
                </div>
              )}
            </div>
            <div ref={saleScrollRef} className="sale-scroll" style={{
              display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '10px', scrollSnapType: 'x mandatory'
            }}>
              {saleProducts.map(p => {
                const discountPct = Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
                return (
                  <Link to={`/product/${p.id}`} key={p.id} style={{
                    textDecoration: 'none', minWidth: isMobile ? '160px' : '200px', maxWidth: isMobile ? '160px' : '200px',
                    scrollSnapAlign: 'start', flexShrink: 0
                  }}>
                    <div style={{ background: C.white, borderRadius: '16px', overflow: 'hidden', boxShadow: '0 3px 15px rgba(0,0,0,0.08)', border: `1px solid ${C.border}`, transition: '0.3s' }}>
                      <div style={{ position: 'relative', height: isMobile ? '140px' : '170px' }}>
                        <img src={p.images?.[0]?.url || p.images?.[0] || p.image || ''} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span style={{
                          position: 'absolute', top: '8px', right: '8px',
                          background: C.red, color: C.white, padding: '3px 10px',
                          borderRadius: '20px', fontSize: '12px', fontWeight: '800'
                        }}>
                          -{discountPct}%
                        </span>
                      </div>
                      <div style={{ padding: '10px 12px' }}>
                        <h4 style={{ margin: '0 0 6px', fontSize: '13px', fontWeight: '700', color: C.text, lineHeight: '1.3', height: '2.6em', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{p.name}</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                          <span style={{ color: C.gold, fontWeight: '900', fontSize: '15px' }}>{(p.price || 0).toLocaleString()} ر</span>
                          <span style={{ color: '#aaa', textDecoration: 'line-through', fontSize: '12px' }}>{(p.oldPrice).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* All Products Section */}
        <div style={{ animation: 'fadeUp 0.5s ease 0.2s both' }}>
          <div style={{ marginBottom: '18px' }}>
            <h2 style={{ margin: 0, fontSize: isMobile ? '18px' : '22px', fontWeight: '900', color: C.text }}>جميع المنتجات</h2>
          </div>

          {/* Search + Filter */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '180px', position: 'relative' }}>
              <Search style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: C.gray }} size={16} />
              <input placeholder="ابحث في المتجر..." value={search} onChange={e => setSearch(e.target.value)} style={{
                width: '100%', padding: '12px 40px 12px 15px', borderRadius: '12px',
                border: `1px solid ${C.border}`, outline: 'none', fontSize: '14px', background: C.white
              }} />
            </div>
            <UIButton onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')} style={{
              padding: '12px', borderRadius: '12px', border: `1px solid ${C.border}`,
              background: C.white, cursor: 'pointer', display: 'flex', alignItems: 'center'
            }}>
              {viewMode === 'grid' ? <ListUl size={18} /> : <Grid3x2Gap size={18} />}
            </UIButton>
          </div>

          {/* Category Chips */}
          {categories.length > 1 && (
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '18px', paddingBottom: '5px' }}>
              <UIButton className="store-cat-chip" onClick={() => setFilterCat('')} style={{
                ...chipStyle, background: !filterCat ? C.gold : `${C.gold}10`,
                color: !filterCat ? C.primary : C.gold
              }}>الكل</UIButton>
              {categories.map(cat => (
                <UIButton key={cat} className="store-cat-chip" onClick={() => setFilterCat(cat)} style={{
                  ...chipStyle, background: filterCat === cat ? C.gold : `${C.gold}10`,
                  color: filterCat === cat ? C.primary : C.gold
                }}>{cat}</UIButton>
              ))}
            </div>
          )}

          {/* Products Grid */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: C.gray }}>
              <Search size={40} style={{ opacity: 0.15, marginBottom: '15px' }} />
              <p>لا توجد منتجات{search ? ' تطابق بحثك' : ' حالياً'}</p>
            </div>
          ) : (
            <div style={{
              display: viewMode === 'grid' ? 'grid' : 'flex',
              gridTemplateColumns: isMobile
                ? 'repeat(2, 1fr)'
                : isTablet
                  ? 'repeat(3, 1fr)'
                  : 'repeat(4, 1fr)',
              flexDirection: 'column', gap: '15px'
            }}>
              {filtered.map(p => <ProductCard key={p.id} product={p} viewMode={viewMode} isMobile={isMobile} />)}
            </div>
          )}
        </div>
      </div>

      {/* Store Footer */}
      <footer style={{ background: C.primary, color: C.white, marginTop: 'auto', borderTop: `3px solid ${C.gold}` }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: isMobile ? '35px 20px 20px' : '45px 30px 25px', textAlign: 'center' }}>
          {/* Store Logo */}
          <div style={{
            width: isMobile ? '65px' : '80px', height: isMobile ? '65px' : '80px',
            borderRadius: '18px', background: C.white, padding: '4px',
            margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(200,140,35,0.3)'
          }}>
            {seller?.logo
              ? <img src={seller.logo} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '14px' }} alt="" />
              : <Shop size={isMobile ? 30 : 40} color={C.gold} />}
          </div>
          <h3 style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: '900', color: C.gold, margin: '0 0 8px' }}>{seller.storeName}</h3>
          {seller.businessActivity && <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', margin: '0 0 20px' }}>{seller.businessActivity}</p>}

          {/* Social Links */}
          {hasSocial && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '25px' }}>
              {socialLinks.facebook && <SocialIcon href={socialLinks.facebook} bg="#1877F2" icon={<Facebook size={18} />} />}
              {socialLinks.instagram && <SocialIcon href={socialLinks.instagram} bg="#E4405F" icon={<Instagram size={18} />} />}
              {socialLinks.tiktok && <SocialIcon href={socialLinks.tiktok} bg="#000" icon={<Tiktok size={18} />} />}
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '25px', flexWrap: 'wrap' }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px', fontWeight: '600' }}>الرئيسية</Link>
            <Link to="/stores" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px', fontWeight: '600' }}>المتاجر</Link>
            <Link to="/offers" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px', fontWeight: '600' }}>العروض</Link>
          </div>

          {/* Copyright */}
          <div style={{ borderTop: `1px solid ${C.gold}30`, paddingTop: '18px' }}>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>
              حقوق الطبع والنشر © {currentYear} محفوظة لمنصة توريد نت TawreedNet
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

/* ── Helper Components ── */

const StickyNav = ({ seller, isMobile }) => (
  <div style={{
    background: C.white, padding: isMobile ? '10px 15px' : '12px 30px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    position: 'sticky', top: 0, zIndex: 1000,
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)', borderBottom: `1px solid ${C.border}`
  }}>
    <Link to="/stores" style={{
      color: C.primary, textDecoration: 'none', display: 'flex', alignItems: 'center',
      gap: '5px', fontSize: '14px', fontWeight: '700'
    }}>
      <ArrowRight size={16} /> المتاجر
    </Link>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {seller?.logo && (
        <div style={{ width: '28px', height: '28px', borderRadius: '8px', overflow: 'hidden' }}>
          <img src={seller.logo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
        </div>
      )}
      <span style={{ fontWeight: '800', fontSize: '15px', color: C.primary }}>{seller?.storeName || ''}</span>
    </div>
    <Link to="/" style={{
      color: C.gold, textDecoration: 'none', display: 'flex', alignItems: 'center',
      gap: '5px', fontSize: '14px', fontWeight: '700'
    }}>
      الرئيسية <HouseDoor size={16} />
    </Link>
  </div>
);

const SocialIcon = ({ href, bg, icon }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="store-social-btn" style={{
    width: '38px', height: '38px', borderRadius: '50%', background: bg,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: C.white, transition: 'all 0.3s', boxShadow: '0 3px 10px rgba(0,0,0,0.15)'
  }}>
    {icon}
  </a>
);

const scrollBtnStyle = {
  width: '36px', height: '36px', borderRadius: '50%', border: `1px solid ${C.border}`,
  background: C.white, cursor: 'pointer', display: 'flex', alignItems: 'center',
  justifyContent: 'center', color: C.primary, transition: '0.2s'
};

const WorkingHoursBar = ({ seller, todayName, todayVal, isClosed, isOpenNow, formatTime, DAYS, isMobile }) => {
  const [expanded, setExpanded] = React.useState(false);
  const allDays = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];

  return (
    <div style={{ background: C.white, borderBottom: `1px solid ${C.border}` }}>
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          maxWidth: '1100px', margin: '0 auto',
          padding: isMobile ? '12px 15px' : '14px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          cursor: 'pointer', gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '10px', height: '10px', borderRadius: '50%',
            background: isClosed ? C.red : (isOpenNow ? C.green : '#fd7e14'),
            boxShadow: isClosed ? `0 0 8px ${C.red}60` : (isOpenNow ? `0 0 8px ${C.green}60` : `0 0 8px #fd7e1460`)
          }} />
          <span style={{ fontWeight: '800', fontSize: '14px', color: isClosed ? C.red : (isOpenNow ? C.green : '#fd7e14') }}>
            {isClosed ? 'مغلق اليوم' : (isOpenNow ? 'مفتوح الآن' : 'مغلق حالياً')}
          </span>
          {!isClosed && todayVal.includes('-') && (() => {
            const [from, to] = todayVal.split('-').map(s => s.trim());
            return (
              <span style={{ fontSize: '13px', color: C.gray, display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Clock size={13} /> {formatTime(from)} - {formatTime(to)}
              </span>
            );
          })()}
        </div>
        <ChevronDown size={14} color={C.gray} style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: '0.3s' }} />
      </div>

      {expanded && (
        <div style={{
          maxWidth: '1100px', margin: '0 auto',
          padding: isMobile ? '0 15px 15px' : '0 20px 18px',
          display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '8px'
        }}>
          {allDays.map(day => {
            const val = (seller.workingHoursData || {})[day] || '';
            const dayIsClosed = !val || val === 'إجازة';
            const isToday = day === todayName;
            const [from, to] = val.includes('-') ? val.split('-').map(s => s.trim()) : ['', ''];
            return (
              <div key={day} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 14px', borderRadius: '10px',
                background: isToday ? `${C.gold}12` : C.bg,
                border: isToday ? `1.5px solid ${C.gold}40` : `1px solid ${C.border}`
              }}>
                <span style={{
                  fontWeight: isToday ? '800' : '600', fontSize: '13px',
                  color: isToday ? C.gold : (dayIsClosed ? C.red : C.text)
                }}>
                  {day} {isToday && '(اليوم)'}
                </span>
                <span style={{
                  fontSize: '13px', fontWeight: '700',
                  color: dayIsClosed ? C.red : C.text
                }}>
                  {dayIsClosed ? 'مغلق' : `${formatTime(from)} - ${formatTime(to)}`}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const chipStyle = {
  padding: '7px 16px', borderRadius: '20px', border: 'none',
  fontSize: '13px', fontWeight: '700', cursor: 'pointer',
  whiteSpace: 'nowrap', transition: '0.2s'
};

export default StorePage;
