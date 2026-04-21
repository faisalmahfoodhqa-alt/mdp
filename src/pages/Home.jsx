// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/sections/HeroSlider';
import CategorySection from '../components/sections/CategorySection';
import FeaturedProducts from '../components/sections/FeaturedProducts';
import { useAuth } from '../context/AuthContext';

import { 
  mensCategories, 
  womensCategories, 
  kidsCategories, 
  electronicsCategories,
  foodCategories,
  vehiclesCategories,
  constructionCategories,
  realEstateCategories
} from '../data/categories';
import { featuredProducts as staticFeatured } from '../data/featuredProducts';

const Home = () => {
  const { allProducts, user, isCustomer } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const colors = {
    lightGray: '#f5f5f5',
    white: '#ffffff',
    gold: '#c88c23',
    goldLight: '#e5a847',
    primary: '#0a1a3a'
  };

  // خريطة الأقسام لسهولة الوصول إليها أثناء التخصيص
  const SECTION_CONFIGS = {
    mens: { title: "الأزياء الرجالية", desc: "اكتشف أحدث صيحات الموضة الرجالية", data: mensCategories },
    womens: { title: "الأزياء النسائية", desc: "أحدث تشكيلات الأزياء النسائية", data: womensCategories },
    kids: { title: "أزياء الأطفال", desc: "ملابس مريحة وأنيقة لأطفالك الصغار", data: kidsCategories },
    electronics: { title: "الإلكترونيات", desc: "أحدث الأجهزة والتقنيات المتطورة", data: electronicsCategories },
    food: { title: "المواد الغذائية", desc: "أجود أنواع المواد الغذائية الطازجة", data: foodCategories },
    vehicles: { title: "المركبات ومستلزماتها", desc: "سيارات جديدة ومستعملة وخدمات متكاملة", data: vehiclesCategories },
    construction: { title: "مواد البناء والتشييد", desc: "أفضل مواد البناء والمعدات لمشاريعك", data: constructionCategories },
    realestate: { title: "العقارات", desc: "منازل، شقق للبيع والإيجار", data: realEstateCategories }
  };

  // الأقسام الافتراضية (للضيوف)
  const defaultSectionKeys = ['mens', 'womens', 'kids', 'electronics', 'food', 'vehicles', 'construction', 'realestate'];

  // تحديد الأقسام المطلوب عرضها
  const userInterests = (user && isCustomer && user.interests && user.interests.length > 0) ? user.interests : null;
  const sectionsToDisplay = userInterests ? userInterests : defaultSectionKeys;

  // دالة للتحقق من انتهاء صلاحية الإعلان
  const isAdActive = (expiryStr) => {
    if (!expiryStr) return false;
    return new Date(expiryStr) > new Date();
  };

  // تصفية المنتجات المضافة من البائعين
  const sellerProducts = (allProducts || []).filter(p => p.isVisible !== false);
  const todayOffers = sellerProducts.filter(p => p.isOffer && isAdActive(p.offerExpiry));
  const paidFeatured = sellerProducts.filter(p => p.isFeatured && isAdActive(p.featuredExpiry));
  const allFeatured = [...paidFeatured, ...staticFeatured];

  // منتجات المتاجر المتابعة
  const followedStoreNames = user?.followedStores?.map(s => s.name) || [];
  const followedStoresProducts = sellerProducts.filter(p => {
    const sName = p.seller?.name || p.seller;
    return followedStoreNames.includes(sName);
  });

  return (
    <div>
      <HeroSlider />
      
      {/* قسم عروض اليوم */}
      {todayOffers.length > 0 && (
        <div style={{ background: colors.primary, padding: '20px 0' }}>
          <div style={{ 
            maxWidth: '1200px', margin: '0 auto', padding: '0 20px',
            display: 'flex', flexDirection: isMobile ? 'column' : 'row', 
            justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center',
            gap: '15px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '24px' }}>🔥</span>
              <h2 style={{ color: colors.white, fontSize: '22px', fontWeight: '800', margin: 0 }}>ضع منتجاتك في مقدمة المتجر</h2>
            </div>
            
            <Link to="/register?type=seller" style={{
              background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldLight})`,
              color: colors.primary,
              padding: '8px 20px',
              borderRadius: '50px',
              fontSize: '13px',
              fontWeight: '800',
              textDecoration: 'none',
              boxShadow: `0 4px 15px ${colors.gold}40`,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
               ضع منتجاتك هنا في مقدمة المتجر 🚀
            </Link>
          </div>
          <FeaturedProducts products={todayOffers} />
        </div>
      )}

      {/* المنتجات المميزة */}
      {allFeatured.length > 0 && (
        <FeaturedProducts products={allFeatured} />
      )}

      {/* جديد المتاجر المتابعة */}
      {user && isCustomer && followedStoresProducts.length > 0 && (
        <div style={{ background: '#fef9f0', padding: '10px 0', borderBottom: `1px solid ${colors.gold}30` }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: colors.primary, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: colors.gold }}>⭐</span> جديد المتاجر التي تتابعها
            </h2>
            <FeaturedProducts products={followedStoresProducts.slice(0, 8)} />
          </div>
        </div>
      )}
      
      {/* عرض الأقسام بناءً على اهتمامات المستخدم أو الإعداد الافتراضي */}
      {sectionsToDisplay.map((key, index) => {
        const config = SECTION_CONFIGS[key];
        if (!config) return null;
        
        return (
          <CategorySection
            key={key}
            title={config.title}
            description={config.desc}
            categories={config.data}
            bgColor={index % 2 === 0 ? colors.lightGray : colors.white}
          />
        );
      })}

      {/* إذا كان المستخدم مسجلاً، قد نرغب في عرض باقي الأقسام في الأسفل بعنوان "استكشف المزيد" */}
      {userInterests && (
        <div style={{ padding: '40px 20px', textAlign: 'center', background: colors.lightGray }}>
          <h3 style={{ color: colors.primary, marginBottom: '10px' }}>هل تبحث عن شيء آخر؟</h3>
          <p style={{ color: '#666', marginBottom: '20px' }}>استكشف جميع الأقسام والمنتجات المتوفرة في توريد نت</p>
          <Link to="/categories" style={{ 
            display: 'inline-block', padding: '12px 30px', borderRadius: '30px', 
            background: colors.primary, color: 'white', textDecoration: 'none', fontWeight: 'bold' 
          }}>
            تصفح كل الأقسام
          </Link>
        </div>
      )}
      
    </div>
  );
};

export default Home;