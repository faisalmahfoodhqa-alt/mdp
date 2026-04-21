// src/pages/CategoryPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid3x3Gap, List as ListIcon, Filter, ArrowRight } from 'react-bootstrap-icons';
import { getProductsByCategory } from '../data/products';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/products/ProductCard';
import ProductFilters from '../components/products/ProductFilters';
import { CATEGORY_MAP } from '../components/dashboard/seller/constants';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const { allProducts } = useAuth();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [filters, setFilters] = useState({});
  const [selectedSubCategory, setSelectedSubCategory] = useState('الكل');

  // استخراج الأقسام الفرعية ديناميكياً مع حمايتها من الأسماء العشوائية
  const subCategories = React.useMemo(() => {
    if (!products.length) return ['الكل'];
    
    // استخراج جميع التصنيفات الصحيحة من الخريطة المركزية للمقارنة
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

    const tags = new Set();
    products.forEach(p => {
      // نستخدم النوع التفصيلي إذا وجد، وإلا نستخدم التصنيف الفرعي
      const catLabel = p.subItem || p.category;
      
      // لا نضيف الوسم إلا إذا كان موجوداً في قائمة التصنيفات الرسمية
      if (catLabel && allValidLabels.some(l => l.trim() === catLabel.trim())) {
        tags.add(catLabel);
      }
    });
    return ['الكل', ...Array.from(tags)];
  }, [products]);

  // التحقق من حجم الشاشة
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth <= 768);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const colors = {
    primary: '#0a1a3a',
    gold: '#c88c23',
    white: '#ffffff',
    lightGray: '#f8f9fa'
  };

  // جلب المنتجات من البيانات المركزية ومنتجات البائعين المضافة
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      // 1. جلب المنتجات الثابتة
      const staticProducts = getProductsByCategory(categoryName) || [];
      
      // 2. جلب منتجات البائعين المضافة لهذا القسم
      const displayCategory = categoryName.replace(/-/g, ' ');
      const sellerProducts = (allProducts || []).filter(p => {
        const matchesMain = p.mainCategory && (displayCategory.includes(p.mainCategory) || p.mainCategory.includes(displayCategory));
        const matchesGroup = p.subGroup && (displayCategory.includes(p.subGroup) || p.subGroup.includes(displayCategory));
        const matchesCat = p.category && (displayCategory.includes(p.category) || p.category.includes(displayCategory));
        const matchesItem = p.subItem && (displayCategory.includes(p.subItem) || p.subItem.includes(displayCategory));
        
        return matchesMain || matchesGroup || matchesCat || matchesItem;
      });

      const combined = [...staticProducts, ...sellerProducts];
      setProducts(combined);
      setFilteredProducts(combined);
      setLoading(false);
    }, 500);
  }, [categoryName, allProducts]);

  // تطبيق الفلاتر
  useEffect(() => {
    let filtered = [...products];

    // فلتر السعر
    if (filters.priceRange) {
      filtered = filtered.filter(p => 
        p.price >= filters.priceRange.min && p.price <= filters.priceRange.max
      );
    }

    // فلتر التقييم
    if (filters.selectedRating && filters.selectedRating > 0) {
      filtered = filtered.filter(p => p.rating >= filters.selectedRating);
    }

    // فلتر التوفر
    if (filters.inStockOnly) {
      filtered = filtered.filter(p => p.inStock);
    }

    // فلتر التصنيف الفرعي
    if (selectedSubCategory !== 'الكل') {
      filtered = filtered.filter(p => (p.subItem === selectedSubCategory || p.category === selectedSubCategory));
    }

    // فلتر إعادة تعيين
    if (filters.reset) {
      setFilters({});
      setSelectedSubCategory('الكل');
      filtered = [...products];
    }

    // ترتيب المنتجات
    switch(sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        filtered.sort((a, b) => b.id - a.id);
    }

    setFilteredProducts(filtered);
  }, [products, sortBy, filters, selectedSubCategory]);

  
  // عرض اسم القسم بشكل جميل (إزالة الشرطات)
  const displayCategoryName = categoryName.replace(/-/g, ' ');

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: isMobile ? '40px' : '50px', 
            height: isMobile ? '40px' : '50px', 
            border: `3px solid ${colors.gold}`, 
            borderTop: '3px solid transparent', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite', 
            margin: '0 auto 20px' 
          }} />
          <p>جاري التحميل...</p>
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  return (
    <div style={{ direction: 'rtl', background: colors.lightGray, minHeight: '100vh', padding: isMobile ? '15px' : '30px 20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '280px 1fr', gap: isMobile ? '0' : '25px', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* شريط الفلاتر */}
        <ProductFilters 
          products={products}
          onFilterChange={handleFilterChange}
          isMobile={isMobile}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />

        {/* قسم المنتجات */}
        <div>
          {/* عنوان الصفحة */}
          <div style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.primary}dd)`, 
            color: colors.white, 
            padding: '8px 15px', 
            borderRadius: '12px', 
            marginBottom: isMobile ? '10px' : '15px' 
          }}>
            <div style={{ overflow: 'hidden' }}>
              <h1 style={{ 
                fontSize: isMobile ? '18px' : '22px', 
                marginBottom: '0', 
                color: colors.gold, 
                whiteSpace: 'nowrap', 
                overflow: 'hidden', 
                textOverflow: 'ellipsis' 
              }}>
                {displayCategoryName}
              </h1>
            </div>
            <button 
              onClick={() => navigate(-1)}
              style={{
                background: 'transparent',
                border: `1px solid ${colors.gold}`,
                color: colors.gold,
                width: isMobile ? '30px' : '36px',
                height: isMobile ? '30px' : '36px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s',
                flexShrink: 0
              }}
            >
              <ArrowRight size={isMobile ? 14 : 16} />
            </button>
          </div>

          {/* شريط البحث والترتيب */}
          <div style={{ 
            background: colors.white, 
            borderRadius: '12px', 
            padding: isMobile ? '12px' : '15px', 
            marginBottom: isMobile ? '15px' : '20px' 
          }}>
            <div style={{ 
              display: 'flex', 
              flexDirection: isMobile ? 'column' : 'row', 
              gap: isMobile ? '10px' : '15px', 
              alignItems: isMobile ? 'stretch' : 'center' 
            }}>


              {/* أزرار التحكم */}
              <div style={{ display: 'flex', gap: '10px' }}>
                {isMobile && (
                  <button 
                    onClick={() => setShowFilters(!showFilters)} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '5px', 
                      padding: '8px 15px', 
                      background: showFilters ? colors.gold : 'transparent', 
                      border: `1px solid ${colors.gold}`, 
                      borderRadius: '8px', 
                      color: showFilters ? colors.primary : colors.gold, 
                      cursor: 'pointer', 
                      fontSize: '13px' 
                    }}
                  >
                    <Filter size={14} /> فلتر
                  </button>
                )}
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)} 
                  style={{ 
                    padding: isMobile ? '6px 10px' : '8px 12px', 
                    borderRadius: '5px', 
                    border: `1px solid ${colors.gold}`, 
                    background: colors.white, 
                    color: colors.primary, 
                    cursor: 'pointer', 
                    fontSize: isMobile ? '12px' : '13px' 
                  }}
                >
                  <option value="default">ترتيب</option>
                  <option value="price-asc">السعر: الأقل أولاً</option>
                  <option value="price-desc">السعر: الأعلى أولاً</option>
                  <option value="rating">التقييم</option>
                </select>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <button 
                    onClick={() => setViewMode('grid')} 
                    style={{ 
                      padding: isMobile ? '6px' : '8px', 
                      background: viewMode === 'grid' ? colors.gold : 'transparent', 
                      border: `1px solid ${colors.gold}`, 
                      borderRadius: '5px', 
                      color: viewMode === 'grid' ? colors.primary : colors.gold, 
                      cursor: 'pointer' 
                    }}
                  >
                    <Grid3x3Gap size={isMobile ? 14 : 16} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')} 
                    style={{ 
                      padding: isMobile ? '6px' : '8px', 
                      background: viewMode === 'list' ? colors.gold : 'transparent', 
                      border: `1px solid ${colors.gold}`, 
                      borderRadius: '5px', 
                      color: viewMode === 'list' ? colors.primary : colors.gold, 
                      cursor: 'pointer' 
                    }}
                  >
                    <ListIcon size={isMobile ? 14 : 16} />
                  </button>
                </div>
              </div>
            </div>

            {/* شريط الأقسام الفرعية */}
            {subCategories.length > 1 && (
              <div className="hide-scrollbar" style={{
                display: 'flex',
                gap: '10px',
                overflowX: 'auto',
                paddingTop: '15px',
                marginTop: '15px',
                borderTop: `1px solid ${colors.lightGray}`,
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}>
                {subCategories.map((sub, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSubCategory(sub)}
                    style={{
                      padding: '6px 16px',
                      background: selectedSubCategory === sub ? colors.gold : colors.lightGray,
                      color: selectedSubCategory === sub ? colors.primary : colors.primary,
                      border: 'none',
                      borderRadius: '20px',
                      fontSize: '13px',
                      fontWeight: selectedSubCategory === sub ? 'bold' : 'normal',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
            <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
          </div>

          {/* عرض المنتجات */}
          {filteredProducts.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: isMobile ? '40px' : '60px', 
              background: colors.white, 
              borderRadius: '12px' 
            }}>
              <h3 style={{ fontSize: isMobile ? '18px' : '20px' }}>لا توجد منتجات</h3>
              <button 
                onClick={() => setFilters({ reset: true })} 
                style={{ 
                  marginTop: '20px', 
                  padding: '10px 20px', 
                  background: colors.gold, 
                  color: colors.primary, 
                  border: 'none', 
                  borderRadius: '5px', 
                  cursor: 'pointer' 
                }}
              >
                إعادة تعيين الفلاتر
              </button>
            </div>
          ) : (
            <div style={{ 
              display: viewMode === 'grid' ? 'grid' : 'block', 
              gridTemplateColumns: viewMode === 'grid' 
                ? (isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(220px, 1fr))') 
                : 'none', 
              gap: isMobile ? '10px' : '20px' 
            }}>
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  viewMode={viewMode} 
                  isMobile={isMobile} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;