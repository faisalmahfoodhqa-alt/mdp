// src/pages/SellerPlans.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, PLANS } from '../context/AuthContext';
import {
  CheckCircleFill, StarFill, ArrowRight, ShieldCheck,
  BoxArrowRight, Shop
} from 'react-bootstrap-icons';
import { UIButton } from '../shared/components/ui';

const colors = {
  primary: '#0a1a3a',
  gold: '#c88c23',
  goldLight: '#e5a847',
  white: '#ffffff',
  lightGray: '#f8f9fa',
  red: '#dc3545',
  green: '#28a745',
  gray: '#6c757d'
};

const planCards = [
  {
    key: 'trial',
    features: ['20 منتج بحد أقصى', '2 صورة لكل منتج', 'متاحة لمدة 90 يوم مجاناً', 'رابط متجر خاص باسمك']
  },
  {
    key: 'bronze',
    features: ['40 منتج بحد أقصى', '5 صور لكل منتج', 'رابط متجر خاص باسمك', 'دعم فني جاهز']
  },
  {
    key: 'silver',
    popular: true,
    features: ['90 منتج بحد أقصى', '5 صور لكل منتج', 'أولوية في نتائج البحث', 'دعم فني متقدم']
  },
  {
    key: 'gold',
    features: ['منتجات غير محدودة', '5 صور لكل منتج', 'أعلى أولوية في النتائج', 'دعم فني مخصص']
  }
];

const SellerPlans = () => {
  const { user, getAccountStatus, upgradePlan, logout } = useAuth();
  const navigate = useNavigate();
  const [upgrading, setUpgrading] = useState('');
  const [done, setDone] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const status = getAccountStatus();

  const handleUpgrade = (planKey) => {
    if (planKey === 'trial') {
      navigate('/seller/dashboard');
      return;
    }
    // التوجه لصفحة الدفع وتأكيد العملية
    navigate(`/seller/payment?plan=${planKey}`);
  };

  return (
    <div style={{ minHeight: '100vh', background: colors.lightGray, direction: 'rtl' }}>

      {/* الرأس */}
      <div style={{
        background: `linear-gradient(135deg, ${colors.primary}, #1a3a6a)`,
        padding: isMobile ? '15px 15px' : '20px 24px',
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'stretch' : 'center', 
        justifyContent: 'space-between',
        gap: isMobile ? '15px' : '0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: isMobile ? 'center' : 'flex-start' }}>
          <Shop size={isMobile ? 18 : 22} color={colors.gold} />
          <span style={{ color: colors.white, fontWeight: 'bold', fontSize: isMobile ? '16px' : '18px' }}>
            {user?.storeName || 'متجري'}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <Link to="/seller/dashboard" style={{
            color: `${colors.white}bb`, fontSize: '13px', textDecoration: 'none',
            padding: '7px 14px', borderRadius: '8px',
            border: `1px solid ${colors.white}20`,
            flex: isMobile ? 1 : 'none',
            textAlign: 'center'
          }}>
            ← لوحة التحكم
          </Link>
          <UIButton onClick={logout} style={{
            background: `${colors.red}20`, color: '#ff6b6b',
            border: 'none', padding: '7px 14px', borderRadius: '8px',
            cursor: 'pointer', fontSize: '13px',
            flex: isMobile ? 1 : 'none'
          }}>
            خروج
          </UIButton>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '25px 15px' : '40px 24px' }}>

        {/* العنوان */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: `${colors.gold}15`, color: colors.gold,
            padding: '6px 18px', borderRadius: '50px', marginBottom: '16px', fontSize: '13px'
          }}>
            <ShieldCheck size={16} /> باقات المتاجر
          </div>
          <h1 style={{ color: colors.primary, fontSize: isMobile ? '24px' : '30px', marginBottom: '12px', fontWeight: '900' }}>
            اختر باقة الاشتراك
          </h1>
          <p style={{ color: colors.gray, fontSize: '14px', maxWidth: '500px', margin: '0 auto' }}>
            {status?.isLocked
              ? '⚠️ انتهت فترتك التجريبية — اختر باقة لاستعادة وصولك الكامل'
              : `أنت على باقة ${status?.planInfo?.name} حالياً`}
          </p>
        </div>

        {/* بطاقات الباقات */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(260px, 1fr))', 
          gap: isMobile ? '25px' : '20px' 
        }}>
          {planCards.map(({ key, features, popular }) => {
            const plan = PLANS[key];
            const isCurrent = status?.plan === key && status?.isPaid;
            const isDone = done === key;

            return (
              <div key={key} style={{
                background: colors.white, borderRadius: '24px',
                padding: isMobile ? '24px' : '28px',
                boxShadow: popular
                  ? `0 12px 35px rgba(200,140,35,0.15)`
                  : '0 4px 20px rgba(0,0,0,0.05)',
                border: popular
                  ? `2px solid ${colors.gold}`
                  : isCurrent ? `2px solid ${colors.green}` : '2px solid transparent',
                position: 'relative',
                transform: (!isMobile && popular) ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.2s',
                marginTop: (isMobile && popular) ? '10px' : '0'
              }}>
                {popular && (
                  <div style={{
                    position: 'absolute', top: '-14px', right: '50%', transform: 'translateX(50%)',
                    background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldLight})`,
                    color: colors.primary, padding: '5px 20px', borderRadius: '50px',
                    fontSize: '12px', fontWeight: 'bold', whiteSpace: 'nowrap',
                    boxShadow: '0 4px 10px rgba(200,140,35,0.3)'
                  }}>
                    ⭐ الباقة المميزة
                  </div>
                )}

                {isCurrent && (
                  <div style={{
                    position: 'absolute', top: '-14px', left: '20px',
                    background: colors.green, color: colors.white,
                    padding: '5px 15px', borderRadius: '50px', fontSize: '11px', fontWeight: 'bold',
                    boxShadow: '0 4px 10px rgba(40,167,69,0.3)'
                  }}>
                    ✓ باقتك الحالية
                  </div>
                )}

                {/* الأيقونة والاسم */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '18px',
                    background: `${plan.color}12`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '28px'
                  }}>
                    {plan.badge}
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold', color: colors.primary, fontSize: '18px' }}>
                      {plan.name}
                    </div>
                    <div style={{ color: plan.color, fontWeight: 'bold', fontSize: '16px' }}>
                      {plan.price === 0 ? 'مجاناً' : `${plan.price.toLocaleString()} ريال`}
                      <span style={{ fontSize: '12px', opacity: 0.7, fontWeight: 'normal' }}> / شهرياً</span>
                    </div>
                  </div>
                </div>

                {/* الحدود */}
                <div style={{
                  background: colors.lightGray, borderRadius: '15px',
                  padding: '15px', marginBottom: '20px'
                }}>
                  <div style={{ fontSize: '14px', color: colors.primary, display: 'flex', justifyContent: 'space-between' }} >
                    <span>📦 عدد المنتجات:</span>
                    <strong>{plan.maxProducts === 999999 ? 'غير محدود' : plan.maxProducts}</strong>
                  </div>
                  <div style={{ fontSize: '14px', color: colors.primary, marginTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>🖼️ صور المنتج:</span>
                    <strong>{plan.maxImagesPerProduct} صور</strong>
                  </div>
                </div>

                {/* المزايا */}
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 25px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {features.map((f, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: colors.gray, lineHeight: '1.4' }}>
                      <CheckCircleFill size={14} color={colors.green} style={{ marginTop: '2px', flexShrink: 0 }} /> 
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* زر الاشتراك */}
                {isDone ? (
                  <div style={{
                    width: '100%', padding: '14px',
                    background: `${colors.green}15`, color: colors.green,
                    borderRadius: '15px', fontWeight: 'bold', textAlign: 'center', fontSize: '14px'
                  }}>
                    ✅ تم الاشتراك! جاري التوجيه...
                  </div>
                ) : isCurrent ? (
                  <div style={{
                    width: '100%', padding: '14px',
                    background: `${colors.green}10`, color: colors.green,
                    borderRadius: '15px', fontWeight: 'bold', textAlign: 'center', fontSize: '14px',
                    border: `1px solid ${colors.green}30`
                  }}>
                    باقتك الحالية ✓
                  </div>
                ) : (
                  <UIButton
                    onClick={() => handleUpgrade(key)}
                    disabled={upgrading === key}
                    style={{
                      width: '100%', padding: '14px',
                      background: popular
                        ? `linear-gradient(135deg, ${colors.gold}, ${colors.goldLight})`
                        : `${colors.primary}`,
                      color: popular ? colors.primary : colors.white,
                      border: 'none', borderRadius: '15px',
                      fontWeight: 'bold', fontSize: '15px',
                      cursor: upgrading === key ? 'not-allowed' : 'pointer',
                      opacity: upgrading === key ? 0.7 : 1,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                      boxShadow: popular ? '0 10px 20px rgba(200,140,35,0.2)' : 'none'
                    }}
                  >
                    {upgrading === key ? (
                      <><span style={{
                        display: 'inline-block', width: '14px', height: '14px',
                        border: '2px solid currentColor', borderTopColor: 'transparent',
                        borderRadius: '50%', animation: 'spin 0.8s linear infinite'
                      }} /> جاري المعالجة...</>
                    ) : (
                      <><StarFill size={14} /> اشترك الآن</>
                    )}
                  </UIButton>
                )}
              </div>
            );
          })}
        </div>

        {/* ضمان */}
        <div style={{ textAlign: 'center', marginTop: '40px', color: colors.gray, fontSize: '13px' }}>
          🔒 الدفع آمن ومشفور عبر بوابات معتمدة<br/>
          إلغاء الاشتراك متاح في أي وقت من لوحة التحكم
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};
export default SellerPlans;
