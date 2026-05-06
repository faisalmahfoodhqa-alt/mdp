// src/pages/CategoryPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid3x3Gap, List as ListIcon, Filter, ArrowRight, Search } from 'react-bootstrap-icons';
import { getProductsByCategory } from '../data/products';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/products/ProductCard';
import ProductFilters from '../components/products/ProductFilters';
import { CATEGORY_MAP } from '../components/dashboard/seller/constants';
import { UIButton } from '../shared/components/ui';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [filters, setFilters] = useState({});
  const [selectedSubCategory, setSelectedSubCategory] = useState('الكل');

  // جلب الأقسام الفرعية الثابتة من خريطة التصنيفات
  const subCategories = React.useMemo(() => {
    const displayCategory = categoryName.replace(/-/g, ' ');
    let items = [];
    
    const findItems = (obj, currentKey = null) => {
      if (currentKey === displayCategory) {
        if (Array.isArray(obj)) {
          items = obj;
        } else if (typeof obj === 'object' && obj !== null) {
          items = Object.keys(obj);
        }
        return true;
      }
      if (Array.isArray(obj)) return false;
      for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          if (findItems(obj[key], key)) return true;
        }
      }
      return false;
    };
    
    if (CATEGORY_MAP[displayCategory]) {
       const val = CATEGORY_MAP[displayCategory];
       if (Array.isArray(val)) items = val;
       else items = Object.keys(val);
    } else {
       findItems(CATEGORY_MAP);
    }
    
    return items.length > 0 ? ['الكل', ...items] : ['الكل'];
  }, [categoryName]);

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

    // فلتر البحث بالاسم
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p => 
        (p.name && p.name.toLowerCase().includes(term)) ||
        (p.description && p.description.toLowerCase().includes(term))
      );
    }

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
      setSearchTerm('');
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
  }, [products, sortBy, filters, selectedSubCategory, searchTerm]);

  
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
        <div style={{ minWidth: 0 }}>
          {/* شريط العنوان والبحث */}
          <div style={{ 
            background: colors.white, 
            borderRadius: '12px', 
            padding: isMobile ? '12px' : '15px', 
            marginBottom: '15px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', position: 'relative', marginBottom: '15px' }}>
              <UIButton 
                onClick={() => navigate(-1)}
                style={{
                  background: colors.lightGray,
                  border: 'none',
                  color: colors.primary,
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  right: 0,
                  zIndex: 2
                }}
              >
                <ArrowRight size={18} />
              </UIButton>
              <h1 style={{ 
                flex: 1,
                textAlign: 'center',
                fontSize: isMobile ? '18px' : '22px', 
                margin: '0', 
                color: colors.primary, 
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                padding: '0 45px'
              }}>
                {displayCategoryName}
              </h1>
            </div>

            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                placeholder={`ابحث في ${displayCategoryName}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 15px',
                  paddingRight: '35px',
                  borderRadius: '50px',
                  border: `1px solid ${colors.gold}50`,
                  background: colors.lightGray,
                  outline: 'none',
                  fontSize: '14px',
                  color: colors.primary
                }}
              />
              <Search style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: colors.gray }} />
            </div>

            {/* الأقسام الفرعية (سطر واحد قابل للسحب مثل المتاجر) */}
            {subCategories.length > 1 && (
              <div style={{ marginTop: '15px', maxWidth: '100%', overflow: 'hidden' }}>
                <div className="hide-scrollbar" style={{ 
                  display: 'flex', 
                  gap: '8px', 
                  overflowX: 'auto', 
                  padding: '2px 5px 10px', 
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}>
                  {subCategories.map((sub, index) => (
                    <UIButton
                      key={index}
                      onClick={() => setSelectedSubCategory(sub)}
                      style={{
                        padding: '6px 20px',
                        borderRadius: '50px',
                        border: `1.5px solid ${selectedSubCategory === sub ? colors.gold : colors.gold}40`,
                        background: selectedSubCategory === sub ? colors.gold : colors.white,
                        color: selectedSubCategory === sub ? colors.primary : colors.primary,
                        fontSize: '13px',
                        fontWeight: selectedSubCategory === sub ? 'bold' : 'normal',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.2s ease',
                        boxShadow: selectedSubCategory === sub ? '0 4px 10px rgba(200, 140, 35, 0.2)' : 'none'
                      }}
                    >
                      {sub}
                    </UIButton>
                  ))}
                </div>
                <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
              </div>
            )}
          </div>

          {/* شريط الترتيب وعرض الشبكة/القائمة */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            background: colors.white, 
            borderRadius: '12px', 
            padding: isMobile ? '10px' : '15px', 
            marginBottom: '20px' 
          }}>
            {isMobile && (
              <UIButton 
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
              </UIButton>
            )}
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: isMobile ? 'auto' : '0' }}>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)} 
                style={{ 
                  padding: isMobile ? '6px 10px' : '8px 12px', 
                  borderRadius: '8px', 
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
                <UIButton 
                  onClick={() => setViewMode('grid')} 
                  style={{ 
                    padding: isMobile ? '6px' : '8px', 
                    background: viewMode === 'grid' ? colors.gold : 'transparent', 
                    border: `1px solid ${colors.gold}`, 
                    borderRadius: '8px', 
                    color: viewMode === 'grid' ? colors.primary : colors.gold, 
                    cursor: 'pointer' 
                  }}
                >
                  <Grid3x3Gap size={isMobile ? 14 : 16} />
                </UIButton>
                <UIButton 
                  onClick={() => setViewMode('list')} 
                  style={{ 
                    padding: isMobile ? '6px' : '8px', 
                    background: viewMode === 'list' ? colors.gold : 'transparent', 
                    border: `1px solid ${colors.gold}`, 
                    borderRadius: '8px', 
                    color: viewMode === 'list' ? colors.primary : colors.gold, 
                    cursor: 'pointer' 
                  }}
                >
                  <ListIcon size={isMobile ? 14 : 16} />
                </UIButton>
              </div>
            </div>
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
              <UIButton 
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
              </UIButton>
            </div>
          ) : (
            <div style={{ 
              display: viewMode === 'grid' ? 'grid' : 'block', 
              gridTemplateColumns: viewMode === 'grid' 
                ? (isMobile ? 'repeat(auto-fill, minmax(140px, 1fr))' : 'repeat(auto-fill, minmax(220px, 1fr))') 
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