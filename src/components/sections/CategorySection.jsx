// src/components/sections/CategorySection.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';

const CategorySection = ({ title, categories, bgColor }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // التحقق من حجم الشاشة
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const colors = {
    primary: '#0a1a3a',
    gold: '#c88c23',
    goldLight: '#e5a847',
    white: '#ffffff',
    lightGray: '#f5f5f5',
    darkGray: '#333333'
  };

  const backgroundColor = bgColor || colors.lightGray;

  // تحديد عدد الأعمدة حسب حجم الشاشة
  const getGridColumns = () => {
    if (isMobile) {
      return 'repeat(3, 1fr)'; // الجوال: 3 منتجات في السطر
    }
    if (isTablet) {
      return 'repeat(3, 1fr)'; // التابلت: 3 منتجات في السطر
    }
    return 'repeat(auto-fit, minmax(200px, 1fr))'; // الديسكتوب: حسب المساحة
  };

  return (
    <section style={{
      padding: isMobile ? '20px 15px' : '30px 20px',
      background: backgroundColor,
      direction: 'rtl'
    }}>
      {/* عنوان القسم */}
      <div style={{
        textAlign: 'center',
        marginBottom: isMobile ? '15px' : '25px'
      }}>
        <h2 style={{
          color: colors.primary,
          fontSize: isMobile ? '24px' : '30px',
          fontWeight: 'bold',
          marginBottom: '5px',
          position: 'relative',
          display: 'inline-block'
        }}>
          {title}
        </h2>
      </div>

      {/* شبكة الأقسام - متجاوبة */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: getGridColumns(),
        gap: isMobile ? '15px' : '25px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {categories && categories.map((category) => (
          <Link
            key={category.id}
            to={category.link}
            style={{ textDecoration: 'none' }}
          >
            <div style={{
              background: colors.white,
              borderRadius: isMobile ? '10px' : '12px',
              overflow: 'hidden',
              boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              height: '100%'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = `0 15px 30px ${colors.gold}30`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.08)';
            }}
            >
              {/* صورة القسم */}
              <div style={{
                height: isMobile ? '100px' : '160px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <img
                  src={category.image}
                  alt={category.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/300x200/${colors.primary.slice(1)}/${colors.gold.slice(1)}?text=${category.title}`;
                  }}
                />
              </div>

              {/* عنوان القسم */}
              <div style={{ padding: isMobile ? '10px' : '15px' }}>
                <h3 style={{
                  color: colors.primary,
                  fontSize: isMobile ? '12px' : '16px',
                  fontWeight: 'bold',
                  marginBottom: '5px',
                  textAlign: 'center',
                  whiteSpace: isMobile ? 'normal' : 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {category.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* زر عرض الكل - يظهر فقط إذا كان هناك أكثر من 4 أقسام */}
      {categories && categories.length > 4 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: isMobile ? '20px' : '30px',
          padding: '0 20px'
        }}>
          <Link
            to={`/category/all`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              color: colors.gold,
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: isMobile ? '14px' : '16px',
              transition: 'all 0.3s ease',
              padding: '10px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = colors.primary;
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = colors.gold;
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <span>عرض المزيد</span>
            <ArrowLeft size={isMobile ? 18 : 20} />
          </Link>
        </div>
      )}
    </section>
  );
};

export default CategorySection;