// src/components/sections/SaleProducts.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Star, Cart, ChevronLeft, ChevronRight, Clock, Fire, Share } from 'react-bootstrap-icons';

const SaleProducts = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(5);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [autoplay, setAutoplay] = useState(true);
  const [timeLeft, setTimeLeft] = useState({});
  const autoplayRef = useRef(null);

  const colors = {
    primary: '#0a1a3a',
    gold: '#c88c23',
    goldLight: '#e5a847',
    goldDark: '#b37a1e',
    red: '#dc3545',
    redDark: '#c82333',
    white: '#ffffff',
    lightGray: '#f8f9fa',
    darkGray: '#343a40',
    gray: '#6c757d'
  };

  // تحديد عدد العناصر حسب حجم الشاشة
  useEffect(() => {
    const updateItemsToShow = () => {
      const width = window.innerWidth;
      if (width >= 1400) setItemsToShow(5);
      else if (width >= 1200) setItemsToShow(4);
      else if (width >= 992) setItemsToShow(3);
      else if (width >= 768) setItemsToShow(2);
      else setItemsToShow(1);
      setIsMobile(width <= 768);
    };
    
    updateItemsToShow();
    window.addEventListener('resize', updateItemsToShow);
    return () => window.removeEventListener('resize', updateItemsToShow);
  }, []);

  // حساب الوقت المتبقي
  useEffect(() => {
    const calculateTimeLeft = () => {
      const newTimeLeft = {};
      products.forEach(product => {
        if (product.endDate) {
          const end = new Date(product.endDate);
          const now = new Date();
          const diff = end - now;
          
          if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            newTimeLeft[product.id] = { days, hours, minutes, seconds };
          } else {
            newTimeLeft[product.id] = { days: 0, hours: 0, minutes: 0, seconds: 0 };
          }
        }
      });
      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [products]);

  // Auto-play
  useEffect(() => {
    if (autoplay && products && products.length > 0) {
      autoplayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % Math.ceil(products.length / itemsToShow));
      }, 5000);
    }
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [autoplay, products, itemsToShow]);

  if (!products || products.length === 0) return null;

  const totalPages = Math.ceil(products.length / itemsToShow);
  const startIndex = currentIndex * itemsToShow;
  const displayedProducts = products.slice(startIndex, startIndex + itemsToShow);

  const formatPrice = (price) => price.toLocaleString() + ' ريال';

  const nextSlide = () => {
    setAutoplay(false);
    setCurrentIndex((prev) => (prev + 1) % totalPages);
    setTimeout(() => setAutoplay(true), 10000);
  };

  const prevSlide = () => {
    setAutoplay(false);
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
    setTimeout(() => setAutoplay(true), 10000);
  };

  return (
    <section style={{
      padding: '50px 20px',
      background: `linear-gradient(135deg, ${colors.red} 0%, ${colors.redDark} 100%)`,
      direction: 'rtl',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* زخارف خلفية */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: '300px',
        height: '300px',
        background: `radial-gradient(circle, ${colors.white}20 0%, transparent 70%)`,
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-100px',
        left: '-100px',
        width: '300px',
        height: '300px',
        background: `radial-gradient(circle, ${colors.white}20 0%, transparent 70%)`,
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* عنوان القسم */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: `${colors.white}20`,
            padding: '6px 20px',
            borderRadius: '50px',
            marginBottom: '10px'
          }}>
            <Fire size={18} color={colors.white} />
            <span style={{ color: colors.white, fontSize: '14px', fontWeight: '600' }}>
              عروض وتخفيضات
            </span>
          </div>
          <h2 style={{
            color: colors.white,
            fontSize: isMobile ? '28px' : '36px',
            fontWeight: 'bold',
            marginBottom: '10px'
          }}>
            خصومات <span style={{ color: colors.white, textDecoration: 'underline' }}>تصل إلى 50%</span>
          </h2>
          <p style={{
  color: `${colors.white}cc`,
  fontSize: isMobile ? '13px' : '15px',
  maxWidth: '500px',
  margin: '0 auto'
}}>
  فرصة لا تعوض! احصل على أفضل المنتجات بأسعار مخفضة
</p>
        </div>

        {/* سلايدر المنتجات */}
        <div style={{ position: 'relative' }}>
          {/* أزرار التنقل */}
          {totalPages > 1 && (
            <>
              <button
                onClick={prevSlide}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: -15,
                  transform: 'translateY(-50%)',
                  background: colors.white,
                  border: 'none',
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10,
                  boxShadow: '0 3px 12px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = colors.gold;
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = colors.white;
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                }}
              >
                <ChevronRight size={20} color={colors.primary} />
              </button>
              <button
                onClick={nextSlide}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: -15,
                  transform: 'translateY(-50%)',
                  background: colors.white,
                  border: 'none',
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10,
                  boxShadow: '0 3px 12px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = colors.gold;
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = colors.white;
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                }}
              >
                <ChevronLeft size={20} color={colors.primary} />
              </button>
            </>
          )}

          {/* المنتجات */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${itemsToShow}, 1fr)`,
            gap: '15px',
            transition: 'all 0.3s ease'
          }}>
            {displayedProducts.map((product) => {
              const time = timeLeft[product.id];
              return (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  style={{ textDecoration: 'none' }}
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div style={{
                    background: colors.white,
                    borderRadius: '16px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    transform: hoveredProduct === product.id ? 'translateY(-3px)' : 'translateY(0)',
                    boxShadow: hoveredProduct === product.id 
                      ? `0 8px 20px ${colors.red}60` 
                      : '0 2px 8px rgba(0,0,0,0.08)'
                  }}>
                    {/* صورة المنتج */}
                    <div style={{
                      position: 'relative',
                      height: isMobile ? '140px' : '160px',
                      overflow: 'hidden',
                      background: colors.lightGray
                    }}>
                      <img
                        src={product.images?.[0] || product.image}
                        alt={product.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.4s',
                          transform: hoveredProduct === product.id ? 'scale(1.05)' : 'scale(1)'
                        }}
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&auto=format';
                        }}
                      />

                      {/* Share Button Overlay - Only on Hover */}
                      {hoveredProduct === product.id && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const url = `${window.location.origin}/product/${product.id}`;
                            if (navigator.share) {
                              navigator.share({ title: product.name, url });
                            } else {
                              navigator.clipboard.writeText(url);
                              alert('تم نسخ رابط المنتج!');
                            }
                          }}
                          style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.95)',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: colors.primary,
                            cursor: 'pointer',
                            zIndex: 5,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            animation: 'fadeIn 0.2s ease-in-out'
                          }}
                        >
                          <Share size={14} />
                          <style>{`@keyframes fadeIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }`}</style>
                        </button>
                      )}
                      
                      {/* شارة الخصم الكبيرة */}
                      <div style={{
                        position: 'absolute',
                        top: '8px',
                        left: '8px',
                        background: `linear-gradient(135deg, ${colors.red}, ${colors.redDark})`,
                        color: colors.white,
                        padding: '6px 10px',
                        borderRadius: '30px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px'
                      }}>
                        <Fire size={12} />
                        {product.discount}% OFF
                      </div>
                      
                      {/* شارة الوقت المتبقي */}
                      {time && (time.days > 0 || time.hours > 0 || time.minutes > 0 || time.seconds > 0) && (
                        <div style={{
                          position: 'absolute',
                          bottom: '8px',
                          left: '8px',
                          background: 'rgba(0,0,0,0.7)',
                          backdropFilter: 'blur(4px)',
                          color: colors.white,
                          padding: '4px 8px',
                          borderRadius: '20px',
                          fontSize: '10px',
                          fontWeight: 'bold',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}>
                          <Clock size={10} />
                          <span>
                            {time.days > 0 && `${time.days}ي `}
                            {time.hours > 0 && `${time.hours}س `}
                            {time.minutes > 0 && `${time.minutes}د `}
                            {time.seconds > 0 && `${time.seconds}ث`}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* معلومات المنتج */}
                    <div style={{ padding: '10px 12px' }}>
                      <h3 style={{
                        color: colors.primary,
                        fontSize: isMobile ? '12px' : '13px',
                        fontWeight: 'bold',
                        marginBottom: '5px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {product.name}
                      </h3>

                      {/* التقييم */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                        <div style={{ display: 'flex', gap: '2px' }}>
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star
                              key={star}
                              size={10}
                              fill={star <= (product.rating || 4) ? colors.gold : 'none'}
                              color={star <= (product.rating || 4) ? colors.gold : '#ddd'}
                            />
                          ))}
                        </div>
                        <span style={{ color: colors.gray, fontSize: '9px' }}>
                          ({product.reviews || 0})
                        </span>
                      </div>

                      {/* السعر */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px', flexWrap: 'wrap' }}>
                        <span style={{
                          color: colors.red,
                          fontSize: isMobile ? '14px' : '16px',
                          fontWeight: 'bold'
                        }}>
                          {formatPrice(product.price)}
                        </span>
                        <span style={{
                          color: colors.gray,
                          fontSize: '10px',
                          textDecoration: 'line-through'
                        }}>
                          {formatPrice(product.oldPrice || product.originalPrice)}
                        </span>
                      </div>

                      {/* زر التفاصيل */}
                      <button
                        style={{
                          width: '100%',
                          padding: '6px',
                          background: `linear-gradient(135deg, ${colors.red}, ${colors.redDark})`,
                          border: 'none',
                          borderRadius: '10px',
                          color: colors.white,
                          fontWeight: 'bold',
                          fontSize: '11px',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-1px)';
                          e.currentTarget.style.opacity = '0.95';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.opacity = '1';
                        }}
                      >
                        <Cart size={11} />
                        اشتر الآن
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* نقاط التنقل */}
        {totalPages > 1 && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '25px'
          }}>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setAutoplay(false);
                  setCurrentIndex(index);
                  setTimeout(() => setAutoplay(true), 10000);
                }}
                style={{
                  width: currentIndex === index ? '24px' : '6px',
                  height: '6px',
                  borderRadius: '6px',
                  background: currentIndex === index ? colors.white : `${colors.white}50`,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SaleProducts;