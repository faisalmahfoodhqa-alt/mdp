import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, Gift, Award, Trophy, 
  Star, Gem, Lightning 
} from 'react-bootstrap-icons';

const SellerSubscriptionStep = ({ 
  onSubmit, 
  onBack, 
  colors,
  loading: externalLoading,
  selectedPlan: externalPlan,
  setSelectedPlan: externalSetPlan,
  selectedDuration: externalDuration,
  setSelectedDuration: externalSetDuration
}) => {
  // بيانات الباقات داخل المكون لضمان الاستقرار
  const PLANS_DATA = [
    {
      key: 'trial',
      name: 'المجانية',
      basePrice: 0,
      products: '20 منتج',
      images: '2 صور',
      validity: 'مجاناً لمدة 90 يوم',
      iconType: 'gift',
      color: '#6c757d'
    },
    {
      key: 'bronze',
      name: 'البرونزية',
      basePrice: 2900,
      products: '40 منتج',
      images: '5 صور',
      iconType: 'award',
      color: '#cd7f32'
    },
    {
      key: 'silver',
      name: 'الفضية',
      basePrice: 4900,
      products: '90 منتج',
      images: '5 صور',
      popular: true,
      iconType: 'trophy',
      color: '#52617a'
    },
    {
      key: 'gold',
      name: 'الذهبية',
      basePrice: 9900,
      products: 'منتجات غير محدودة',
      images: '5 صور',
      iconType: 'crown',
      color: '#c88c23'
    }
  ];

  // دالة لجلب الأيقونة المناسبة
  const getPlanIcon = (type, color) => {
    const props = { size: 32, color: color };
    switch(type) {
      case 'gift': return <Gift {...props} />;
      case 'award': return <Award {...props} />;
      case 'trophy': return <Trophy {...props} />;
      case 'crown': return <Gem {...props} />; // تم استبدال التاج بالجوهرة لضمان العمل
      default: return <Star {...props} />;
    }
  };

  const [internalPlan, setInternalPlan] = useState('trial');
  const [internalDuration, setInternalDuration] = useState('monthly');
  const [isMobile] = useState(window.innerWidth < 768);

  const selectedPlan = externalPlan !== undefined ? externalPlan : internalPlan;
  const setSelectedPlan = externalSetPlan || setInternalPlan;
  const selectedDuration = externalDuration !== undefined ? externalDuration : internalDuration;
  const setSelectedDuration = externalSetDuration || setInternalDuration;

  const calculatePrice = (basePrice) => {
    if (basePrice === 0) return 'مجاناً';
    let price = basePrice;
    let suffix = 'ريال / شهر';
    if (selectedDuration === '6months') {
      price = Math.round(basePrice * 6 * 0.9);
      suffix = 'ريال / 6 أشهر';
    } else if (selectedDuration === 'yearly') {
      price = Math.round(basePrice * 12 * 0.8);
      suffix = 'ريال / سنة';
    }
    return `${price.toLocaleString()} ${suffix}`;
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', direction: 'rtl' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ 
          color: colors.primary, 
          fontSize: isMobile ? '24px' : '34px', 
          fontWeight: '900', 
          marginBottom: '12px'
        }}>
          اختر باقة الاشتراك
        </h2>
        <p style={{ color: '#666', fontSize: '15px' }}>استثمر في نمو تجارتك مع باقات توريد نت الاحترافية</p>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '0', 
        marginBottom: '40px', 
        background: '#f1f1f1', 
        padding: '5px', 
        borderRadius: '16px', 
        maxWidth: '320px', 
        margin: '0 auto 40px'
      }}>
        <button type="button" onClick={() => setSelectedDuration('monthly')} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', background: selectedDuration === 'monthly' ? colors.white : 'transparent', color: colors.primary, fontWeight: '800', cursor: 'pointer', transition: '0.3s' }}>شهر</button>
        <button type="button" onClick={() => setSelectedDuration('6months')} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', background: selectedDuration === '6months' ? colors.white : 'transparent', color: colors.primary, fontWeight: '800', cursor: 'pointer', transition: '0.3s' }}>6 أشهر</button>
        <button type="button" onClick={() => setSelectedDuration('yearly')} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', background: selectedDuration === 'yearly' ? colors.white : 'transparent', color: colors.primary, fontWeight: '800', cursor: 'pointer', transition: '0.3s' }}>سنة</button>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', 
        gap: '20px', 
        marginBottom: '40px' 
      }}>
        {PLANS_DATA.map(plan => (
          <div key={plan.key} onClick={() => setSelectedPlan(plan.key)} style={{
            padding: '30px 20px', 
            borderRadius: '28px', 
            border: `2px solid ${selectedPlan === plan.key ? colors.gold : '#f1f5f9'}`,
            background: colors.white, 
            cursor: 'pointer', 
            position: 'relative', 
            transition: '0.3s',
            boxShadow: selectedPlan === plan.key ? `0 15px 30px ${colors.gold}20` : '0 4px 15px rgba(0,0,0,0.02)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            {plan.popular && (
              <div style={{ 
                position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', 
                background: colors.gold, color: colors.primary, padding: '5px 18px', 
                borderRadius: '50px', fontSize: '12px', fontWeight: '900', zIndex: 10
              }}>
                الأكثر طلباً
              </div>
            )}

            <div style={{ 
              width: '70px', height: '70px', borderRadius: '22px', 
              background: `${plan.color}15`, display: 'flex', 
              alignItems: 'center', justifyContent: 'center', marginBottom: '20px'
            }}>
              {getPlanIcon(plan.iconType, plan.color)}
            </div>

            <div style={{ fontSize: '20px', fontWeight: '800', color: colors.primary, marginBottom: '8px' }}>{plan.name}</div>
            <div style={{ fontSize: '22px', fontWeight: '900', color: colors.gold, marginBottom: '20px' }}>{calculatePrice(plan.basePrice)}</div>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'right', marginBottom: '25px' }}>
              <div style={{ fontSize: '13.5px', color: '#555', display: 'flex', alignItems: 'center', gap: '8px', direction: 'rtl' }}>
                <CheckCircle color={colors.gold} size={15} /> <span>{plan.products}</span>
              </div>
              <div style={{ fontSize: '13.5px', color: '#555', display: 'flex', alignItems: 'center', gap: '8px', direction: 'rtl' }}>
                <CheckCircle color={colors.gold} size={15} /> <span>{plan.images} لكل منتج</span>
              </div>
              {plan.validity && (
                <div style={{ fontSize: '13.5px', color: '#555', display: 'flex', alignItems: 'center', gap: '8px', direction: 'rtl' }}>
                  <Lightning color={colors.gold} size={15} /> <span>{plan.validity}</span>
                </div>
              )}
            </div>

            <div style={{
              marginTop: 'auto',
              width: '26px', height: '26px', borderRadius: '50%', 
              border: `2px solid ${selectedPlan === plan.key ? colors.gold : '#e2e8f0'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: selectedPlan === plan.key ? colors.gold : 'transparent'
            }}>
              {selectedPlan === plan.key && <CheckCircle color="white" size={16} />}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '15px', marginBottom: '30px' }}>
        <button 
          type="button"
          onClick={onSubmit} 
          disabled={externalLoading} 
          style={{ 
            flex: 2, padding: '18px', background: colors.gold, border: 'none', 
            borderRadius: '15px', color: colors.primary, fontWeight: '900', 
            fontSize: '18px', cursor: externalLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {externalLoading ? 'جاري التحميل...' : 'إكمال التسجيل والبدء'}
        </button>
        <button 
          type="button"
          onClick={onBack} 
          style={{ 
            flex: 1, padding: '18px', background: 'transparent', 
            border: `2px solid ${colors.gold}`, borderRadius: '15px', 
            color: colors.gold, fontWeight: '900', fontSize: '16px', cursor: 'pointer'
          }}
        >
          رجوع
        </button>
      </div>

      <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
        <p style={{ color: '#666', fontSize: '14px' }}>لديك حساب بالفعل؟ <Link to="/login" style={{ color: colors.gold, fontWeight: 'bold', textDecoration: 'none' }}>تسجيل الدخول</Link></p>
      </div>
    </div>
  );
};

export default SellerSubscriptionStep;
