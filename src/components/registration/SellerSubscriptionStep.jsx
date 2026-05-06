import React, { useState } from 'react';
import {
  CheckCircle, Gift, Award, Trophy,
  Star, Gem,
} from 'react-bootstrap-icons';
import { UIButton } from '../../shared/components/ui';
const SellerSubscriptionStep = ({ 
  onSubmit, 
  onBack, 
  colors,
  loading: externalLoading,
  selectedPlan: externalPlan,
  setSelectedPlan: externalSetPlan,
  selectedDuration: externalDuration,
  setSelectedDuration: externalSetDuration,
}) => {
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

  const getPlanIcon = (type, color) => {
    const props = { size: 32, color: color };
    switch(type) {
      case 'gift': return <Gift {...props} />;
      case 'award': return <Award {...props} />;
      case 'trophy': return <Trophy {...props} />;
      case 'crown': return <Gem {...props} />;
      default: return <Star {...props} />;
    }
  };

  const [internalPlan, setInternalPlan] = useState('trial');
  const [internalDuration, setInternalDuration] = useState('monthly');

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
    <div
      style={{
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        paddingLeft: 'clamp(10px, 3.5vw, 20px)',
        paddingRight: 'clamp(10px, 3.5vw, 20px)',
        direction: 'rtl',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: colors.primary, fontSize: '26px', fontWeight: '900', marginBottom: '10px' }}>اختر باقة الاشتراك</h2>
        <p style={{ color: '#666', fontSize: '15px' }}>ابدأ رحلة نجاحك مع توريد نت</p>
      </div>

      <div style={{ 
        display: 'flex', gap: '5px', marginBottom: '30px', 
        background: '#f1f1f1', padding: '5px', borderRadius: '16px', 
        maxWidth: '320px', margin: '0 auto 30px'
      }}>
        {['monthly', '6months', 'yearly'].map(d => (
          <UIButton key={d} type="button" onClick={() => setSelectedDuration(d)} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', background: selectedDuration === d ? colors.white : 'transparent', color: colors.primary, fontWeight: '800', cursor: 'pointer', transition: '0.3s', fontSize: '13px' }}>
            {d === 'monthly' ? 'شهري' : d === '6months' ? '6 أشهر' : 'سنوي'}
          </UIButton>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '35px' }}>
        {PLANS_DATA.map(plan => (
          <div key={plan.key} onClick={() => setSelectedPlan(plan.key)} style={{
            padding: '15px 20px', // العودة للشكل الأكثر اختصاراً
            borderRadius: '20px', 
            border: `2px solid ${selectedPlan === plan.key ? colors.gold : '#f1f5f9'}`,
            background: colors.white, 
            cursor: 'pointer', 
            position: 'relative', 
            transition: '0.3s',
            boxShadow: selectedPlan === plan.key ? `0 10px 25px ${colors.gold}15` : '0 4px 12px rgba(0,0,0,0.03)',
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            textAlign: 'right'
          }}>
            {plan.popular && (
              <div style={{ 
                position: 'absolute', top: '10px', left: '20px', 
                background: colors.gold, color: colors.primary, padding: '2px 10px', 
                borderRadius: '50px', fontSize: '10px', fontWeight: '900', zIndex: 10
              }}>
                الأكثر طلباً
              </div>
            )}

            <div style={{ 
              width: '50px', height: '50px', borderRadius: '15px', 
              background: `${plan.color}15`, display: 'flex', 
              alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              {getPlanIcon(plan.iconType, plan.color)}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '17px', fontWeight: '800', color: colors.primary }}>{plan.name}</div>
              <div style={{ fontSize: '15px', fontWeight: '900', color: colors.gold }}>{calculatePrice(plan.basePrice)}</div>
              
              <div style={{ display: 'flex', gap: '15px', marginTop: '5px' }}>
                <span style={{ fontSize: '12px', color: '#777', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle size={12} color={colors.gold} /> {plan.products}
                </span>
                <span style={{ fontSize: '12px', color: '#777', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle size={12} color={colors.gold} /> {plan.images}
                </span>
              </div>
            </div>

            <div style={{
              width: '24px', height: '24px', borderRadius: '50%', 
              border: `2px solid ${selectedPlan === plan.key ? colors.gold : '#e2e8f0'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: selectedPlan === plan.key ? colors.gold : 'transparent',
              flexShrink: 0
            }}>
              {selectedPlan === plan.key && <CheckCircle color="white" size={14} />}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
        <UIButton type="button" onClick={onSubmit} disabled={externalLoading} style={{ flex: 2, padding: '18px', background: colors.gold, border: 'none', borderRadius: '15px', color: colors.primary, fontWeight: '900', fontSize: '18px', cursor: externalLoading ? 'not-allowed' : 'pointer' }}>
          {externalLoading ? 'جاري التحميل...' : 'تأكيد الاشتراك والمتابعة'}
        </UIButton>
        <UIButton type="button" onClick={onBack} style={{ flex: 1, padding: '18px', background: 'transparent', border: `2px solid ${colors.gold}`, borderRadius: '15px', color: colors.gold, fontWeight: '900', fontSize: '16px', cursor: 'pointer' }}>
          رجوع
        </UIButton>
      </div>
    </div>
  );
};

export default SellerSubscriptionStep;
