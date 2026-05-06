import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';
import { useAuth } from '../context/AuthContext';
import { Tag, Fire, ClockFill, Search, SortDown, XLg } from 'react-bootstrap-icons';
import { UIButton } from '../shared/components/ui';

const Offers = () => {
  const { allProducts } = useAuth();
  const [loading, setLoading] = useState(true);
  
  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [sortBy, setSortBy] = useState('highest-discount'); // 'highest-discount', 'price-low', 'price-high', 'newest'
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);

  const MAIN_CATEGORY_META = [
    { key: 'الكل', label: 'الكل', icon: '✨' },
    { key: 'ملابس', label: 'الأزياء', icon: '👔' },
    { key: 'الإلكترونيات', label: 'الإلكترونيات', icon: '📱' },
    { key: 'المركبات', label: 'المركبات', icon: '🚗' },
    { key: 'العقارات', label: 'العقارات', icon: '🏠' },
    { key: 'مواد البناء', label: 'مواد البناء', icon: '🧱' },
    { key: 'المواد الغذائية', label: 'المواد الغذائية', icon: '🍎' },
    { key: 'أخرى', label: 'أخرى', icon: '🛍️' }
  ];

  const colors = {
    primary: '#0a1a3a',
    gold: '#c88c23',
    white: '#ffffff',
    bg: '#f8f9fa',
    red: '#e74c3c'
  };

  const offerProducts = useMemo(() => {
    return (allProducts || []).filter(p => p.isOffer && p.isVisible !== false);
  }, [allProducts]);

  const resolveMainCategory = (product) => {
    const source = `${product.mainCategory || ''} ${product.categoryTitle || ''} ${product.category || ''} ${product.subItem || ''}`.toLowerCase();
    if (source.includes('ملابس') || source.includes('ازياء') || source.includes('رجالي') || source.includes('نسائي') || source.includes('أطفال')) return 'ملابس';
    if (source.includes('الكترون') || source.includes('إلكترون')) return 'الإلكترونيات';
    if (source.includes('مركب') || source.includes('سيار')) return 'المركبات';
    if (source.includes('عقار')) return 'العقارات';
    if (source.includes('بناء')) return 'مواد البناء';
    if (source.includes('غذائ') || source.includes('اغذية')) return 'المواد الغذائية';
    return 'أخرى';
  };

  const categories = useMemo(() => {
    // التصنيفات الكاملة دائمًا حتى لو بعضها بدون منتجات
    return MAIN_CATEGORY_META.map((m) => m.key);
  }, []);

  const normalize = (text) =>
    String(text || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[أإآ]/g, 'ا')
      .replace(/ة/g, 'ه')
      .replace(/ى/g, 'ي')
      .replace(/\s+/g, ' ')
      .trim();

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...offerProducts];

    // Smart Search: الاسم + الوصف + التصنيف + المتجر
    if (searchTerm) {
      const query = normalize(searchTerm);
      result = result.filter(p => 
        normalize(p.name).includes(query) ||
        normalize(p.description).includes(query) ||
        normalize(p.mainCategory).includes(query) ||
        normalize(p.categoryTitle).includes(query) ||
        normalize(p.category).includes(query) ||
        normalize(p.subItem).includes(query) ||
        normalize(p.storeName || p.seller?.name || p.seller).includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== 'الكل') {
      result = result.filter(p => resolveMainCategory(p) === selectedCategory);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'highest-discount') {
        const discountA = a.discount || (a.oldPrice ? Math.round(((a.oldPrice - a.price) / a.oldPrice) * 100) : 0);
        const discountB = b.discount || (b.oldPrice ? Math.round(((b.oldPrice - b.price) / b.oldPrice) * 100) : 0);
        return discountB - discountA;
      }
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'newest') return (b.id || 0) - (a.id || 0);
      return 0;
    });

    return result;
  }, [offerProducts, searchTerm, selectedCategory, sortBy]);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (allProducts) setLoading(false);
  }, [allProducts]);

  const heroSlides = [
    { title: 'عروض وتخفيضات 🔥', subtitle: 'أفضل الأسعار والتخفيضات على منتجات مختارة.' },
    { title: 'خصومات قوية اليوم', subtitle: 'استفد من العروض قبل انتهاء الكمية.' },
    { title: 'تسوق بسعر أقل', subtitle: 'منتجات متنوعة بعروض حصرية يومية.' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>جاري تحميل العروض...</div>;

  return (
    <div style={{ direction: 'rtl', background: colors.bg, minHeight: '100vh', padding: isMobile ? '20px 10px' : '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Filters & Search Controls */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '12px', 
          marginBottom: '20px', 
          background: 'white', 
          padding: isMobile ? '15px' : '20px', 
          borderRadius: '16px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
          alignItems: 'stretch'
        }}>
          <div style={{ display: 'flex', gap: '10px', flexDirection: isMobile ? 'column' : 'row' }}>
            {/* Search Input */}
            <div style={{ flex: '1', position: 'relative' }}>
              <Search style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
              <input 
                type="text" 
                placeholder="ابحث بذكاء: اسم المنتج، التصنيف، المتجر..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 45px 10px 15px',
                  borderRadius: '50px',
                  border: '1px solid #eee',
                  fontSize: '13px',
                  outline: 'none',
                  background: '#f9f9f9',
                  transition: 'all 0.3s'
                }}
              />
              {searchTerm && (
                <XLg 
                  onClick={() => setSearchTerm('')}
                  style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#888', cursor: 'pointer' }} 
                />
              )}
            </div>

            {/* Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <SortDown color={colors.primary} size={18} />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '12px',
                  border: '1px solid #eee',
                  fontSize: '13px',
                  background: 'white',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="highest-discount">الأعلى خصماً</option>
                <option value="price-low">السعر: من الأقل</option>
                <option value="price-high">السعر: من الأعلى</option>
                <option value="newest">العروض الأحدث</option>
              </select>
            </div>
          </div>
        </div>

        {/* Offers Hero Slider (fixed and always visible) */}
        {offerProducts.length > 0 && (
          <div style={{
            background: `linear-gradient(135deg, ${colors.primary}, #1a3a6a)`,
            borderRadius: isMobile ? '16px' : '24px',
            padding: isMobile ? '25px 20px' : '40px',
            marginBottom: isMobile ? '20px' : '30px',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(10, 26, 58, 0.15)'
          }}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <span style={{ background: colors.gold, padding: '4px 12px', borderRadius: '50px', fontSize: '10px', fontWeight: 'bold' }}>تخفيضات حصرية</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px', color: '#ccc' }}><ClockFill size={10} /> محدثة اليوم</span>
              </div>
              <h1 style={{ fontSize: isMobile ? '24px' : '36px', fontWeight: '900', marginBottom: '12px' }}>
                {heroSlides[heroSlideIndex].title}
              </h1>
              <p style={{ fontSize: isMobile ? '13px' : '16px', opacity: 0.8, maxWidth: '600px', lineHeight: '1.5' }}>
                {heroSlides[heroSlideIndex].subtitle}
              </p>
            </div>
            <Fire size={isMobile ? 120 : 200} style={{ position: 'absolute', left: '-20px', bottom: '-20px', opacity: 0.1, color: colors.gold }} />
          </div>
        )}

        {/* Categories Tabs */}
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          marginBottom: '20px', 
          overflowX: 'auto', 
          padding: '8px 2px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}>
          {categories.map(cat => {
            const meta = MAIN_CATEGORY_META.find((m) => m.key === cat) || { label: cat, icon: '🛍️' };
            return (
            <UIButton
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '9px 18px',
                borderRadius: '50px',
                whiteSpace: 'nowrap',
                background: selectedCategory === cat
                  ? `linear-gradient(135deg, ${colors.gold}, #dca646)`
                  : 'rgba(255, 255, 255, 0.95)',
                color: selectedCategory === cat ? '#fff' : colors.primary,
                border: selectedCategory === cat ? '1px solid transparent' : '1px solid rgba(10, 26, 58, 0.12)',
                fontSize: '12px',
                boxShadow: selectedCategory === cat
                  ? '0 8px 18px rgba(200, 140, 35, 0.28)'
                  : '0 3px 10px rgba(10, 26, 58, 0.08)',
                fontWeight: selectedCategory === cat ? 'bold' : 'normal',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                transform: selectedCategory === cat ? 'translateY(-1px)' : 'none'
              }}
            >
              <span style={{ marginLeft: '6px' }}>{meta.icon}</span>
              {meta.label}
            </UIButton>
          )})}
        </div>

        {/* Products Grid */}
        {filteredAndSortedProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', background: 'white', borderRadius: '16px' }}>
            <Tag size={50} color={colors.gold} style={{ opacity: 0.3, marginBottom: '15px' }} />
            <h3 style={{ color: colors.primary, fontSize: '18px' }}>لا توجد عروض مطابقة</h3>
            <UIButton 
              onClick={() => { setSearchTerm(''); setSelectedCategory('الكل'); }}
              style={{ background: 'none', border: 'none', color: colors.gold, fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', fontSize: '14px' }}
            >
              عرض الكل
            </UIButton>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(220px, 1fr))', 
            gap: isMobile ? '12px' : '25px' 
          }}>
            {filteredAndSortedProducts.map(product => (
              <ProductCard 
                key={product.id} 
                isMobile={isMobile}
                product={{
                  ...product,
                  seller: product.seller?.name || product.storeName || 'متجر'
                }} 
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Offers;
