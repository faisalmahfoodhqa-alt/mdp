import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import { UIButton } from '../../shared/components/ui';

const HeroSlider = () => {
  const staticSlides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format',
      imageMobile: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format',
      title: 'مرحباً بكم في توريد نت',
      subtitle: 'المنصة الرقمية الأولى للتوريد في اليمن',
      buttonText: 'تسوق الآن',
      buttonLink: '/stores'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1600&auto=format',
      imageMobile: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&auto=format',
      title: 'تخفيضات الأزياء النسائية',
      subtitle: 'خصومات تصل إلى 50% على أحدث الصيحات',
      buttonText: 'تسوقي الآن',
      buttonLink: '/category/الأزياء-النسائية'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1600&auto=format',
      imageMobile: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format',
      title: 'تخفيضات الأزياء الرجالية',
      subtitle: 'أجمل التشكيلات بأسعار مخفضة',
      buttonText: 'تسوق الآن',
      buttonLink: '/category/الأزياء-الرجالية'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1600&auto=format',
      imageMobile: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&auto=format',
      title: 'أحدث الأجهزة الإلكترونية',
      subtitle: 'أفضل العروض على الجوالات والأجهزة',
      buttonText: 'تسوق الآن',
      buttonLink: '/category/الإلكترونيات'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format',
      imageMobile: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format',
      title: 'عروض العقارات',
      subtitle: 'أفضل العروض على الشقق والفلل',
      buttonText: 'عرض العقارات',
      buttonLink: '/category/العقارات'
    }
  ];

  // جلب إعلانات السلايدر المدفوعة من المنتجات
  const adSlides = React.useMemo(() => {
    try {
      const products = JSON.parse(localStorage.getItem('all_products') || '[]');
      const now = new Date();
      return products
        .filter(p => p.isSliderAd && p.sliderAdExpiry && new Date(p.sliderAdExpiry) > now)
        .map((p, i) => ({
          id: `ad-${p.id}`,
          image: p.images?.[0]?.url || p.images?.[0] || p.image || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format',
          imageMobile: p.images?.[0]?.url || p.images?.[0] || p.image || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format',
          title: p.name,
          subtitle: `${p.storeName || 'متجر'} — ${(p.price || 0).toLocaleString()} ريال`,
          buttonText: 'اطلب الآن',
          buttonLink: `/product/${p.id}`,
          isAd: true
        }));
    } catch { return []; }
  }, []);

  const slides = [...adSlides, ...staticSlides];

  const colors = {
    gold: '#c88c23',
    goldLight: '#e5a847',
    white: '#ffffff',
    black: '#000000'
  };

  // تفريغ السلايدات مرات كثيرة لتوفير سحب مستمر لا نهائي (Infinite Native Loop)
  const EXTENDED_SETS = 40;
  const extendedSlides = Array.from({ length: EXTENDED_SETS }).flatMap((_, i) => 
    slides.map(s => ({ ...s, uniqueId: `${s.id}-${i}` }))
  );
  
  // البدء من نقطة المنتصف تماماً (المجموعة 20)، وتحديداً الصورة الثالثة (+2) لتكون Active
  const START_INDEX = Math.floor(EXTENDED_SETS / 2) * slides.length + 2; 

  const [activeCardIndex, setActiveCardIndex] = useState(START_INDEX);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const scrollRef = React.useRef(null);

  // التحقق من حجم الشاشة
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // التنقل التلقائي ومرقبة التمرير اليدوي
  useEffect(() => {
    // Scroll to the center start slide initially without animation
    const timer = setTimeout(() => {
      const container = scrollRef.current;
      if (container && container.children[START_INDEX]) {
        const targetChild = container.children[START_INDEX];
        const targetLeft = targetChild.offsetLeft - (container.clientWidth / 2) + (targetChild.clientWidth / 2);
        container.scrollTo({ left: targetLeft, behavior: 'auto' });
      }
    }, 100);

    const interval = setInterval(() => {
      setActiveCardIndex((prev) => {
        let next = prev + 1;
        const container = scrollRef.current;
        if (!container) return prev;
        
        // منع الاصطدام بالنهاية (Reset secretly if limits reached)
        if (next >= extendedSlides.length - 2) {
           next = START_INDEX;
           container.scrollTo({ left: container.children[next].offsetLeft - (container.clientWidth / 2) + (container.children[next].clientWidth / 2), behavior: 'auto' });
           return next;
        }

        const targetChild = container.children[next];
        if (targetChild) {
          const targetLeft = targetChild.offsetLeft - (container.clientWidth / 2) + (targetChild.clientWidth / 2);
          container.scrollTo({ left: targetLeft, behavior: 'smooth' });
        }
        return next;
      });
    }, 6000); 
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [slides.length]);

  const scrollToSlide = (index, behavior = 'smooth') => {
    const container = scrollRef.current;
    if (container && container.children[index]) {
      const targetChild = container.children[index];
      const targetLeft = targetChild.offsetLeft - (container.clientWidth / 2) + (targetChild.clientWidth / 2);
      container.scrollTo({ left: targetLeft, behavior });
    }
  };

  const nextSlide = () => {
    setActiveCardIndex((prev) => {
      let next = prev + 1;
      if (next >= extendedSlides.length - 2) {
        next = START_INDEX;
        scrollToSlide(next, 'auto');
        return next;
      }
      scrollToSlide(next, 'smooth');
      return next;
    });
  };

  const prevSlide = () => {
    setActiveCardIndex((prev) => {
      let prevIndex = prev - 1;
      if (prevIndex < 2) {
        prevIndex = extendedSlides.length - 3;
        scrollToSlide(prevIndex, 'auto');
        return prevIndex;
      }
      scrollToSlide(prevIndex, 'smooth');
      return prevIndex;
    });
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    
    const containerCenter = container.getBoundingClientRect().left + (container.clientWidth / 2);
    let closestIndex = activeCardIndex;
    let minDistance = Infinity;

    Array.from(container.children).forEach((child, index) => {
      const childCenter = child.getBoundingClientRect().left + (child.clientWidth / 2);
      const distance = Math.abs(containerCenter - childCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeCardIndex) {
      setActiveCardIndex(closestIndex);
    }
  };

  return (
    <div 
      className="hero-slider-main"
      style={{
        position: 'relative',
        width: '100%',
        padding: isMobile ? '15px 0' : '20px 0',
        direction: 'rtl',
        boxSizing: 'border-box',
        background: 'transparent',
        minHeight: isMobile ? '165px' : '290px'
      }}
    >
      <style>{`
        .hide-scroll::-webkit-scrollbar {
          display: none;
        }
        .hide-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .nav-btn {
          opacity: 0;
          transition: 0.3s ease;
        }
        .hero-slider-main:hover .nav-btn {
          opacity: 0.8;
        }
        .nav-btn:hover {
          opacity: 1 !important;
          transform: translateY(-50%) scale(1.1);
        }
      `}</style>
      
      {/* Navigation Arrows */}
      {!isMobile && (
        <>
          <UIButton
            onClick={prevSlide}
            className="nav-btn"
            style={{
              position: 'absolute',
              top: '50%',
              right: '30px',
              transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.5)',
              border: 'none',
              borderRadius: '50%',
              width: '45px',
              height: '45px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: colors.gold,
              zIndex: 20,
              backdropFilter: 'blur(5px)',
            }}
          >
            <ChevronRight size={24} />
          </UIButton>
          <UIButton
            onClick={nextSlide}
            className="nav-btn"
            style={{
              position: 'absolute',
              top: '50%',
              left: '30px',
              transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.5)',
              border: 'none',
              borderRadius: '50%',
              width: '45px',
              height: '45px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: colors.gold,
              zIndex: 20,
              backdropFilter: 'blur(5px)',
            }}
          >
            <ChevronLeft size={24} />
          </UIButton>
        </>
      )}

      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="hide-scroll"
        style={{
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          paddingRight: isMobile ? '10px' : '20px',
          paddingLeft: isMobile ? '10px' : '20px',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {extendedSlides.map((slide, index) => (
          <div
            key={slide.uniqueId}
            style={{
              flex: '0 0 auto',
              width: '100%',
              height: isMobile ? '135px' : '250px',
              scrollSnapAlign: 'center',
              scrollSnapStop: 'always',
              borderRadius: isMobile ? '15px' : '30px',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
              backgroundImage: `url(${isMobile ? slide.imageMobile : slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'flex-end',
            }}
          >
            {/* Gradient Overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to top, rgba(10, 26, 58, 0.95) 0%, rgba(10, 26, 58, 0.2) 60%, transparent 100%)',
              zIndex: 1
            }} />
          
            {/* Text Layer */}
            <div style={{
              position: 'relative',
              zIndex: 2,
              padding: isMobile ? '15px 20px' : '25px 40px',
              paddingBottom: isMobile ? '25px' : '35px', // Extra padding for dots
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              textAlign: 'right'
            }}>
              <h2 style={{ 
                color: '#fff', 
                fontSize: isMobile ? '18px' : '32px', 
                fontWeight: '900', 
                margin: 0, 
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                lineHeight: 1.2
              }}>
                {slide.title}
              </h2>
              <p style={{ 
                color: colors.goldLight, 
                margin: 0, 
                fontSize: isMobile ? '12px' : '18px', 
                fontWeight: '600',
                opacity: 0.9,
                textShadow: '0 1px 3px rgba(0,0,0,0.3)'
              }}>
                {slide.subtitle}
              </p>
            </div>

            <Link to={slide.buttonLink} style={{ position: 'absolute', inset: 0, zIndex: 3 }} />
          </div>
        ))}
      </div>

      {/* Dots Overlay (Now Absolute inside the component) */}
      <div style={{
        position: 'absolute',
        bottom: isMobile ? '25px' : '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        justifyContent: 'center',
        gap: '6px',
        zIndex: 10,
        pointerEvents: 'none' // Allow clicks through to the link
      }}>
         {slides.map((_, dotIdx) => (
            <div key={dotIdx} style={{
              width: (activeCardIndex % slides.length) === dotIdx ? (isMobile ? '16px' : '24px') : '6px',
              height: '6px',
              borderRadius: '3px',
              background: (activeCardIndex % slides.length) === dotIdx ? colors.gold : 'rgba(255,255,255,0.5)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
              transition: 'all 0.3s ease'
            }} />
         ))}
      </div>
    </div>
  );
};

export default HeroSlider;