import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Facebook, 
  Twitter, 
  Instagram,
  Youtube,
  Tiktok
} from 'react-bootstrap-icons';

const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const { isAuthenticated, isSeller } = useAuth();

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
    secondary: '#3b537f',
    gold: '#c88c23',
    white: '#ffffff',
    facebook: '#1877F2',
    twitter: '#000000', // X (formerly Twitter) color
    instagram: '#E4405F',
    youtube: '#FF0000',
    tiktok: '#000000',
    whatsapp: '#25D366'
  };

  const currentYear = new Date().getFullYear();

  // تحديد عدد الأعمدة حسب حجم الشاشة
  const getGridColumns = () => {
    if (isMobile) {
      return '1fr'; // الجوال: عمود واحد
    }
    if (isTablet) {
      return 'repeat(2, 1fr)'; // التابلت: عمودين
    }
    return 'repeat(4, 1fr)'; // الديسكتوب: 4 أعمدة
  };

  return (
    <footer style={{ 
      direction: 'rtl',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* الجزء العلوي - أزرق غامق */}
      <div style={{ 
        background: colors.primary,
        color: colors.white,
        borderTop: `3px solid ${colors.gold}`,
        padding: isMobile ? '40px 15px' : '50px 20px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: getGridColumns(),
            gap: isMobile ? '25px' : '30px',
            alignItems: 'start'
          }}>
            {/* العمود الأول - الشعار والوصف */}
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'center' : 'flex-start', textAlign: isMobile ? 'center' : 'right' }}>
              <Link to="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
                <img 
                  src="/images/logo.png" 
                  alt="توريد نت - شعار الموقع" 
                  style={{
                    height: isMobile ? '60px' : '80px',
                    width: 'auto',
                    maxWidth: isMobile ? '150px' : '200px',
                    objectFit: 'contain',
                    marginBottom: '15px'
                  }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200x80/0a1a3a/c88c23?text=توريد+نت';
                  }}
                />
              </Link>
              
              <p style={{
                fontSize: isMobile ? '13px' : '14px',
                lineHeight: '1.7',
                color: colors.white,
                opacity: 0.9,
                margin: '15px 0 0 0',
                textAlign: isMobile ? 'center' : 'justify'
              }}>
                المنصة الرقمية الأولى لتوريد الموارد والخدمات في اليمن. هي منصة رقمية رائدة متعددة النشاطات، تهدف إلى ربط التجار، المصانع، الموردين، وتجار الجملة بمختلف شرائح العملاء في السوق اليمني، لتسهيل عمليات التوريد والوصول إلى المنتجات والخدمات بأسرع وأسهل الطرق.
              </p>
            </div>

            {/* العمود الثاني - اعرف المزيد عنا */}
            <div style={{ height: '100%', textAlign: isMobile ? 'center' : 'right' }}>
              <h3 style={{ 
                color: colors.gold, 
                fontSize: isMobile ? '16px' : '18px', 
                marginBottom: isMobile ? '15px' : '20px' 
              }}>
                اعرف المزيد عنا
              </h3>
              <h4 style={{ 
                color: colors.gold, 
                fontSize: isMobile ? '13px' : '14px', 
                marginBottom: isMobile ? '12px' : '15px', 
                opacity: 0.8 
              }}>
                معلومات عن توريد نت
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: isMobile ? '8px' : '10px' }}>
                  <Link to="/about" style={{ color: colors.white, textDecoration: 'none', fontSize: isMobile ? '13px' : '14px' }}>
                    من نحن
                  </Link>
                </li>
                <li style={{ marginBottom: isMobile ? '8px' : '10px' }}>
                  <Link to="/terms" style={{ color: colors.white, textDecoration: 'none', fontSize: isMobile ? '13px' : '14px' }}>
                    شروط الاستخدام
                  </Link>
                </li>
                <li style={{ marginBottom: isMobile ? '8px' : '10px' }}>
                  <Link to="/privacy" style={{ color: colors.white, textDecoration: 'none', fontSize: isMobile ? '13px' : '14px' }}>
                    سياسة الخصوصية
                  </Link>
                </li>
                <li style={{ marginBottom: isMobile ? '8px' : '10px' }}>
                  <Link to="/news" style={{ color: colors.white, textDecoration: 'none', fontSize: isMobile ? '13px' : '14px' }}>
                    مركز الأخبار
                  </Link>
                </li>
              </ul>
            </div>

            {/* العمود الثالث - كن شريكاً معنا - يظهر فقط في الشاشات الكبيرة */}
            {!isMobile && !isTablet && (
              <div style={{ height: '100%' }}>
                <h3 style={{ 
                  color: colors.gold, 
                  fontSize: isMobile ? '16px' : '18px', 
                  marginBottom: isMobile ? '15px' : '20px' 
                }}>
                  كن شريكاً معنا
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: isMobile ? '8px' : '10px' }}>
                    <Link to="/register-seller" style={{ color: colors.white, textDecoration: 'none', fontSize: isMobile ? '13px' : '14px' }}>
                      سجل كبائع على توريد نت
                    </Link>
                  </li>
                  <li style={{ marginBottom: isMobile ? '8px' : '10px' }}>
                    <Link to="/upgrade-store" style={{ color: colors.white, textDecoration: 'none', fontSize: isMobile ? '13px' : '14px' }}>
                      ترقية المتجر
                    </Link>
                  </li>
                  <li style={{ marginBottom: isMobile ? '8px' : '10px' }}>
                    <Link to="/affiliate" style={{ color: colors.white, textDecoration: 'none', fontSize: isMobile ? '13px' : '14px' }}>
                      انظم الان في نظام التسويق بالعمولة وحقق ارباحك
                    </Link>
                  </li>
                </ul>
              </div>
            )}

            {/* العمود الرابع - دعنا نساعدك - يظهر فقط في الشاشات الكبيرة */}
            {!isMobile && !isTablet && (
              <div style={{ height: '100%' }}>
                <h3 style={{ 
                  color: colors.gold, 
                  fontSize: isMobile ? '16px' : '18px', 
                  marginBottom: isMobile ? '15px' : '20px' 
                }}>
                  دعنا نساعدك
                </h3>
                <h4 style={{ 
                  color: colors.gold, 
                  fontSize: isMobile ? '13px' : '14px', 
                  marginBottom: isMobile ? '12px' : '15px', 
                  opacity: 0.8 
                }}>
                  المساعدة
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {isAuthenticated && !isSeller && (
                    <li style={{ marginBottom: isMobile ? '8px' : '10px' }}>
                      <Link to="/orders" style={{ color: colors.white, textDecoration: 'none', fontSize: isMobile ? '13px' : '14px' }}>
                        طلباتي
                      </Link>
                    </li>
                  )}
                  <li style={{ marginBottom: isMobile ? '8px' : '10px' }}>
                    <Link to="/disputes" style={{ color: colors.white, textDecoration: 'none', fontSize: isMobile ? '13px' : '14px' }}>
                      سياسة النزاعات والاسترجاع
                    </Link>
                  </li>
                  <li style={{ marginBottom: isMobile ? '8px' : '10px' }}>
                    <Link to="/faq" style={{ color: colors.white, textDecoration: 'none', fontSize: isMobile ? '13px' : '14px' }}>
                      الأسئلة الشائعة
                    </Link>
                  </li>
                  <li style={{ marginBottom: isMobile ? '8px' : '10px' }}>
                    <Link to="/user-guide" style={{ color: colors.white, textDecoration: 'none', fontSize: isMobile ? '13px' : '14px' }}>
                      دليل المستخدم
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* للجوال والتابلت - إضافة العمودين الآخرين في صف جديد */}
          {(isMobile || isTablet) && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '25px',
              marginTop: '30px',
              alignItems: 'start'
            }}>
              <div style={{ height: '100%', textAlign: isMobile ? 'center' : 'right' }}>
                <h3 style={{ 
                  color: colors.gold, 
                  fontSize: isMobile ? '16px' : '18px', 
                  marginBottom: isMobile ? '15px' : '20px' 
                }}>
                  كن شريكاً معنا
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: isMobile ? '8px' : '10px' }}>
                    <Link to="/register-seller" style={{ color: colors.white, textDecoration: 'none', fontSize: isMobile ? '13px' : '14px' }}>
                      سجل كبائع على توريد نت
                    </Link>
                  </li>
                  <li style={{ marginBottom: isMobile ? '8px' : '10px' }}>
                    <Link to="/upgrade-store" style={{ color: colors.white, textDecoration: 'none', fontSize: isMobile ? '13px' : '14px' }}>
                      ترقية المتجر
                    </Link>
                  </li>
                  <li style={{ marginBottom: isMobile ? '8px' : '10px' }}>
                    <Link to="/affiliate" style={{ color: colors.white, textDecoration: 'none', fontSize: isMobile ? '13px' : '14px' }}>
                      انظم الان في نظام التسويق بالعمولة وحقق ارباحك
                    </Link>
                  </li>
                </ul>
              </div>

              <div style={{ height: '100%', textAlign: isMobile ? 'center' : 'right' }}>
                <h3 style={{ 
                  color: colors.gold, 
                  fontSize: isMobile ? '16px' : '18px', 
                  marginBottom: isMobile ? '15px' : '20px' 
                }}>
                  دعنا نساعدك
                </h3>
                <h4 style={{ 
                  color: colors.gold, 
                  fontSize: isMobile ? '13px' : '14px', 
                  marginBottom: isMobile ? '12px' : '15px', 
                  opacity: 0.8 
                }}>
                  المساعدة
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {isAuthenticated && !isSeller && (
                    <li style={{ marginBottom: isMobile ? '8px' : '10px' }}>
                      <Link to="/orders" style={{ color: colors.white, textDecoration: 'none', fontSize: isMobile ? '13px' : '14px' }}>
                        طلباتي
                      </Link>
                    </li>
                  )}
                  <li style={{ marginBottom: isMobile ? '8px' : '10px' }}>
                    <Link to="/disputes" style={{ color: colors.white, textDecoration: 'none', fontSize: isMobile ? '13px' : '14px' }}>
                      سياسة النزاعات والاسترجاع
                    </Link>
                  </li>
                  <li style={{ marginBottom: isMobile ? '8px' : '10px' }}>
                    <Link to="/faq" style={{ color: colors.white, textDecoration: 'none', fontSize: isMobile ? '13px' : '14px' }}>
                      الأسئلة الشائعة
                    </Link>
                  </li>
                  <li style={{ marginBottom: isMobile ? '8px' : '10px' }}>
                    <Link to="/user-guide" style={{ color: colors.white, textDecoration: 'none', fontSize: isMobile ? '13px' : '14px' }}>
                      دليل المستخدم
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* الجزء السفلي - أيقونات التواصل في شريط واحد */}
      <div style={{ 
        background: colors.secondary,
        color: colors.white,
        padding: isMobile ? '25px 15px 15px 15px' : '30px 20px 20px 20px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* أيقونات التواصل - شريط واحد */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: isMobile ? '10px' : '15px',
            marginBottom: '20px'
          }}>
            <a 
              href="https://www.facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: colors.white,
                background: colors.facebook,
                width: isMobile ? '35px' : '40px',
                height: isMobile ? '35px' : '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: isMobile ? '18px' : '20px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.1)';
                e.currentTarget.style.boxShadow = `0 6px 15px ${colors.facebook}60`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
              }}
            >
              <Facebook />
            </a>
            <a 
              href="https://www.twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: colors.white,
                background: colors.twitter,
                width: isMobile ? '35px' : '40px',
                height: isMobile ? '35px' : '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: isMobile ? '18px' : '20px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.1)';
                e.currentTarget.style.boxShadow = `0 6px 15px ${colors.twitter}60`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
              }}
            >
              <Instagram />
            </a>
            <a 
              href="https://www.twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: colors.white,
                background: colors.twitter,
                width: isMobile ? '35px' : '40px',
                height: isMobile ? '35px' : '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: isMobile ? '18px' : '20px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.1)';
                e.currentTarget.style.boxShadow = `0 6px 15px ${colors.twitter}60`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
              }}
            >
              <Twitter />
            </a>
            <a 
              href="https://www.tiktok.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: colors.white,
                background: colors.tiktok,
                width: isMobile ? '35px' : '40px',
                height: isMobile ? '35px' : '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: isMobile ? '18px' : '20px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.1)';
                e.currentTarget.style.boxShadow = `0 6px 15px ${colors.tiktok}60`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
              }}
            >
              <Tiktok />
            </a>
            <a 
              href="https://www.youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: colors.white,
                background: colors.youtube,
                width: isMobile ? '35px' : '40px',
                height: isMobile ? '35px' : '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: isMobile ? '18px' : '20px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.1)';
                e.currentTarget.style.boxShadow = `0 6px 15px ${colors.youtube}60`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
              }}
            >
              <Youtube />
            </a>
          </div>

          {/* حقوق النشر */}
          <div style={{ 
            textAlign: 'center', 
            borderTop: `1px solid ${colors.gold}40`, 
            paddingTop: '20px' 
          }}>
            <p style={{ fontSize: isMobile ? '11px' : '13px', margin: 0 }}>
              حقوق الطبع والنشر © {currentYear} محفوظة لمنصة توريد نت TawreedNet
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;