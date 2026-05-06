// src/components/sections/FeaturedProducts.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Share } from 'react-bootstrap-icons';
import { UIButton } from '../../shared/components/ui';

const FeaturedProducts = ({ products, title = 'منتجات مميزة' }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef(null);
  const animationRef = useRef(null);

  const colors = {
    primary: '#0a1a3a',
    gold: '#c88c23',
    white: '#ffffff',
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // منطق الحركة التلقائية (Auto-scroll)
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isPaused) return;

    const animate = () => {
      if (!scrollContainer) return;
      
      // في RTL، التحرك لليسار يعني نقص القيمة أو زيادتها حسب المتصفح
      // الحركة الافتراضية هنا هي التحرك المستمر
      // سنقوم بتحريك scrollLeft بمقدار بسيط
      scrollContainer.scrollLeft -= 0.8; // سرعة الحركة

      const maxScroll = scrollContainer.scrollWidth / 3;
      
      // إعادة التعيين لضمان الاستمرارية (Infinite Loop)
      // في RTL، قد تكون القيمة موجبة وتقل أو سالبة وتزيد
      if (Math.abs(scrollContainer.scrollLeft) >= maxScroll) {
        scrollContainer.scrollLeft = 0;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPaused, products]);

  if (!products || products.length === 0) return null;

  const formatPrice = (price) => (price ? price.toLocaleString() + ' ريال' : '');

  // مضاعفة المنتجات لضمان استمرارية الحركة
  const extendedProducts = [...products, ...products, ...products];

  return (
    <section style={{
      padding: '0',
      background: `linear-gradient(135deg, ${colors.primary} 0%, #0f2a4a 100%)`,
      direction: 'rtl',
      position: 'relative',
      overflow: 'hidden',
      minHeight: isMobile ? '170px' : '220px'
    }}>
      {/* زخارف خلفية */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: '200px',
        height: '200px',
        background: `radial-gradient(circle, ${colors.gold}15 0%, transparent 70%)`,
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      <div style={{ width: '100%', position: 'relative', zIndex: 2 }}>
        {/* عنوان القسم */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '5px',
          padding: '5px 20px 0'
        }}>
          <h2 style={{
            color: colors.gold,
            fontSize: isMobile ? '16px' : '20px',
            fontWeight: 'bold',
            marginBottom: '0',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            letterSpacing: '1px'
          }}>
            {title}
          </h2>
          <Link
            to="/featured-products"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              color: colors.gold,
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: isMobile ? '11px' : '13px',
              transition: 'all 0.3s ease',
              background: 'rgba(200, 140, 35, 0.1)',
              padding: '4px 10px',
              borderRadius: '20px'
            }}
          >
            <span>عرض الكل</span>
            <ArrowLeft size={isMobile ? 12 : 14} />
          </Link>
        </div>

        {/* حزام الحركة المستمرة (Marquee) القابل للسحب */}
        <div 
          ref={scrollRef}
          style={{
            width: '100%',
            overflowX: 'auto',
            overflowY: 'hidden',
            position: 'relative',
            padding: '5px 15px',
            whiteSpace: 'nowrap',
            display: 'flex',
            gap: '12px',
            cursor: 'grab',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE/Edge
            maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => {
            setTimeout(() => setIsPaused(false), 2000);
          }}
        >
          {extendedProducts.map((product, index) => {
            const resolvedId = product?.id ?? product?.productId ?? product?._id;
            if (!resolvedId) return null;
            return (
            <div
              key={`${resolvedId}-${index}`}
              style={{
                minWidth: isMobile ? '110px' : '140px',
                width: isMobile ? '110px' : '140px',
                flexShrink: 0,
                display: 'inline-block',
                scrollSnapAlign: 'start',
                scrollSnapStop: 'always'
              }}
            >
              <Link
                to={`/product/${resolvedId}`}
                style={{ textDecoration: 'none' }}
                onMouseEnter={() => setHoveredProduct(`${resolvedId}-${index}`)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div style={{
                  background: colors.white,
                  borderRadius: '10px',
                  overflow: 'hidden',
                  transition: 'all 0.4s ease',
                  cursor: 'pointer',
                  transform: hoveredProduct === `${resolvedId}-${index}` ? 'translateY(-3px)' : 'translateY(0)',
                  boxShadow: hoveredProduct === `${resolvedId}-${index}` 
                    ? `0 8px 15px ${colors.gold}20` 
                    : '0 3px 8px rgba(0,0,0,0.2)',
                  border: hoveredProduct === `${resolvedId}-${index}` ? `1px solid ${colors.gold}40` : '1px solid transparent'
                }}>
                  {/* صورة المنتج */}
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    height: isMobile ? '80px' : '110px',
                    overflow: 'hidden',
                    background: '#f0f0f0'
                  }}>
                    <img
                      src={product.images?.[0]?.url || product.images?.[0] || product.image}
                      alt={product.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                        transform: hoveredProduct === `${resolvedId}-${index}` ? 'scale(1.1)' : 'scale(1)'
                      }}
                    />
                    {/* Share Button Overlay - Only on Hover */}
                    {hoveredProduct === `${resolvedId}-${index}` && (
                      <UIButton
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const url = `${window.location.origin}/product/${resolvedId}`;
                          if (navigator.share) {
                            navigator.share({ title: product.name, url });
                          } else {
                            navigator.clipboard.writeText(url);
                            alert('تم نسخ رابط المنتج!');
                          }
                        }}
                        style={{
                          position: 'absolute',
                          top: '5px',
                          left: '5px',
                          width: '25px',
                          height: '25px',
                          borderRadius: '50%',
                          background: 'rgba(255,255,255,0.95)',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: colors.primary,
                          cursor: 'pointer',
                          zIndex: 5,
                          boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                          animation: 'fadeIn 0.2s ease-in-out'
                        }}
                      >
                        <Share size={12} />
                      </UIButton>
                    )}
                  </div>

                  {/* معلومات المنتج */}
                  <div style={{ padding: '6px' }}>
                    <h3 style={{
                      color: colors.primary,
                      fontSize: '11px',
                      fontWeight: 'bold',
                      marginBottom: '3px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {product.name}
                    </h3>

                    <div style={{ marginBottom: '5px' }}>
                      <span style={{
                        color: colors.gold,
                        fontSize: '13px',
                        fontWeight: 'bold'
                      }}>
                        {formatPrice(product.price)}
                      </span>
                    </div>

                    <UIButton
                      style={{
                        width: '100%',
                        padding: '4px',
                        background: hoveredProduct === `${resolvedId}-${index}` ? colors.gold : `${colors.gold}10`,
                        border: `1px solid ${colors.gold}30`,
                        borderRadius: '4px',
                        color: hoveredProduct === `${resolvedId}-${index}` ? colors.primary : colors.gold,
                        fontWeight: 'bold',
                        fontSize: '9px',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}
                    >
                      تسوق الآن
                    </UIButton>
                  </div>
                </div>
              </Link>
            </div>
          )})}
        </div>

        <style>
          {`
            /* إخفاء شريط التمرير */
            div::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
      </div>
    </section>
  );
};

export default FeaturedProducts;