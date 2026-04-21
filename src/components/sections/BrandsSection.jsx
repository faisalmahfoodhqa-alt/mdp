// src/components/sections/BrandsSection.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Chat, Percent, Mouse } from 'react-bootstrap-icons';

const BrandsSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth <= 768);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const colors = {
    primary: '#0a1a3a',
    gold: '#c88c23',
    goldLight: '#e5a847',
    white: '#ffffff',
    lightGray: '#f8f9fa',
    darkGray: '#343a40',
    gray: '#6c757d',
    whatsapp: '#25D366',
    red: '#dc3545',
    blue: '#007bff',
    green: '#28a745'
  };

  // العلامات التجارية - شعارات
  const brands = [
    { id: 1, name: 'مواد بناء', logo: 'https://placehold.co/120x60/e9ecef/495057?text=مواد+بناء', link: '/category/مواد-بناء' },
    { id: 2, name: 'غذاء', logo: 'https://placehold.co/120x60/e9ecef/495057?text=غذاء', link: '/category/مواد-غذائية' },
    { id: 3, name: 'إلكترونيات', logo: 'https://placehold.co/120x60/e9ecef/495057?text=إلكترونيات', link: '/category/إلكترونيات' },
    { id: 4, name: 'عقارات', logo: 'https://placehold.co/120x60/e9ecef/495057?text=عقارات', link: '/category/عقارات' },
    { id: 5, name: 'سيارات', logo: 'https://placehold.co/120x60/e9ecef/495057?text=سيارات', link: '/category/سيارات' },
    { id: 6, name: 'أزياء', logo: 'https://placehold.co/120x60/e9ecef/495057?text=أزياء', link: '/category/أزياء' },
    { id: 7, name: 'أثاث', logo: 'https://placehold.co/120x60/e9ecef/495057?text=أثاث', link: '/category/أثاث' },
    { id: 8, name: 'مكتبات', logo: 'https://placehold.co/120x60/e9ecef/495057?text=مكتبات', link: '/category/مكتبات' }
  ];

  // المميزات - 4 أعمدة
  const features = [
    {
      id: 1,
      title: 'كل الأنشطة في مكان واحد',
      description: 'مواد بناء، غذاء، إلكترونيات، عقارات، سيارات وأكثر – الكل في منصة واحدة.',
      icon: <Mouse size={36} />,
      bgColor: colors.blue
    },
    {
      id: 2,
      title: 'بدون وسطاء',
      description: 'تحدث مباشرة مع البائع عبر الواتساب وخذ التفاصيل بكل شفافية وسرعة.',
      icon: <Chat size={36} />,
      bgColor: colors.whatsapp
    },
    {
      id: 3,
      title: 'خصومات مستمرة',
      description: 'استفد من عروض وتخفيضات حصرية يقدمها الموردون عبر المنصة مباشرة.',
      icon: <Percent size={36} />,
      bgColor: colors.red
    },
    {
      id: 4,
      title: 'تدخل، تستعرض، تتواصل… في خطوات بسيطة!',
      description: 'سهولة الاستخدام تجعل كل شيء أقرب إليك بضغطة زر.',
      icon: <Mouse size={36} />,
      bgColor: colors.gold
    }
  ];



  return (
    <section style={{
      padding: '60px 20px',
      background: colors.white,
      direction: 'rtl'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* عنوان القسم */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'inline-block',
            background: `${colors.gold}15`,
            padding: '8px 24px',
            borderRadius: '50px',
            marginBottom: '15px'
          }}>
            <span style={{ color: colors.gold, fontSize: '14px', fontWeight: '600' }}>
              شركاؤنا
            </span>
          </div>
          <h2 style={{
            color: colors.primary,
            fontSize: isMobile ? '28px' : '36px',
            fontWeight: 'bold',
            marginBottom: '10px'
          }}>
            العلامات <span style={{ color: colors.gold }}>التجارية</span>
          </h2>
          <p style={{
            color: colors.gray,
            fontSize: isMobile ? '14px' : '16px',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            نعمل مع أفضل العلامات التجارية لتقديم منتجات عالية الجودة
          </p>
        </div>

        {/* شريط التمرير - تصميم أكثر أناقة */}
        <div style={{
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          marginBottom: '60px',
          padding: '25px 0',
          background: `linear-gradient(90deg, transparent, ${colors.lightGray}50, transparent)`,
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
        }}>
          <div
            style={{
              display: 'flex',
              animation: 'marqueeRTL 40s linear infinite',
              width: 'fit-content',
              gap: '20px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.animationPlayState = 'paused';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.animationPlayState = 'running';
            }}
          >
            {/* عرض مجموعتين لضمان استمرارية الحركة */}
            {[...brands, ...brands].map((brand, index) => (
              <Link
                key={`${brand.id}-${index}`}
                to={brand.link}
                style={{ 
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: colors.white,
                  minWidth: isMobile ? '130px' : '180px',
                  height: isMobile ? '70px' : '90px',
                  borderRadius: '16px',
                  padding: '10px 20px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                  border: `1px solid ${colors.gold}15`,
                  transition: 'all 0.4s ease',
                  flexShrink: 0
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                  e.currentTarget.style.borderColor = colors.gold;
                  e.currentTarget.style.boxShadow = `0 10px 25px ${colors.gold}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.borderColor = `${colors.gold}15`;
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.03)';
                }}
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  style={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'contain',
                    filter: 'grayscale(60%)',
                    transition: 'all 0.4s'
                  }}
                  onLoad={(e) => {
                    e.target.style.filter = 'grayscale(60%)';
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.filter = 'grayscale(0%)';
                  }}
                />
              </Link>
            ))}
          </div>
        </div>

        <style>
          {`
            @keyframes marqueeRTL {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(50%);
              }
            }
          `}
        </style>

        {/* المميزات - 4 أعمدة */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
          gap: '25px',
          marginTop: '40px'
        }}>
          {features.map((feature) => (
            <div
              key={feature.id}
              style={{
                background: colors.white,
                borderRadius: '24px',
                padding: '30px 20px',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                border: `1px solid ${colors.gold}20`,
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = `0 20px 40px ${colors.gold}30`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
              }}
            >
              {/* أيقونة */}
              <div style={{
                width: '80px',
                height: '80px',
                margin: '0 auto 20px',
                background: `linear-gradient(135deg, ${feature.bgColor}20, ${feature.bgColor}10)`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: feature.bgColor
              }}>
                {feature.icon}
              </div>
              
              {/* العنوان */}
              <h3 style={{
                color: colors.primary,
                fontSize: isMobile ? '18px' : '20px',
                fontWeight: 'bold',
                marginBottom: '12px'
              }}>
                {feature.title}
              </h3>
              
              {/* الوصف */}
              <p style={{
                color: colors.gray,
                fontSize: '14px',
                lineHeight: '1.6',
                marginBottom: 0
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;