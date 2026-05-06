// src/pages/SellerWelcome.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Shop, ArrowLeft, ArrowRight, CheckCircle, 
  Map, PinMap, GeoAlt, Globe, Envelope,
  House, Grid
} from 'react-bootstrap-icons';
import { UIButton } from '../shared/components/ui';

const SellerWelcome = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [showSetup, setShowSetup] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showOpening, setShowOpening] = useState(true);
  const [openingStep, setOpeningStep] = useState(0); 
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [storeData, setStoreData] = useState({
    street: user?.addressDetails || user?.address?.street || '',
    state: user?.address?.state || '',
    country: 'اليمن'
  });

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const colors = {
    primary: '#0a1a3a',
    gold: '#c88c23',
    goldLight: '#e5a847',
    goldDark: '#b37a1e',
    white: '#ffffff',
    lightGray: '#f8f9fa',
    darkGray: '#343a40',
    gray: '#6c757d',
    green: '#28a745',
    red: '#dc3545'
  };

  const yemenStates = [
    'صنعاء', 'عدن', 'تعز', 'الحديدة', 'إب', 'المكلا', 'سيئون', 'البيضاء',
    'ذمار', 'عمران', 'صعدة', 'حجة', 'المحويت', 'ريمة', 'لحج', 'أبين',
    'شبوة', 'حضرموت', 'المهرة', 'سقطرى'
  ];

  const handleStart = () => setShowSetup(true);
  const handleLater = () => navigate('/seller/dashboard');
  const handleSkip = () => navigate('/seller/dashboard');
  const handleGoToDashboard = () => navigate('/seller/dashboard');
  const handleBackToMarket = () => navigate('/');

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({ 
      address: { 
        ...user?.address, 
        street: storeData.street, 
        street2: storeData.street2, 
        state: storeData.state 
      }
    });
    setShowSuccess(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStoreData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // === أنيميشن افتتاح المتجر ===
  React.useEffect(() => {
    const t1 = setTimeout(() => setOpeningStep(1), 1200);
    const t2 = setTimeout(() => setOpeningStep(2), 2400);
    const t3 = setTimeout(() => setShowOpening(false), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (showOpening) {
    const msgs = [
      { icon: '🔧', text: 'جاري تجهيز متجرك...' },
      { icon: '📊', text: 'جاري تـحميل بياناتك...' },
      { icon: '✨', text: 'متجرك جاهز، أهلاً بك!' },
    ];
    const current = msgs[openingStep] || msgs[0];
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'linear-gradient(135deg, #0a1a3a 0%, #1a3a6a 60%, #0a1a3a 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '32px',
        direction: 'rtl'
      }}>
        <style>{`
          @keyframes spin   { to { transform: rotate(360deg); } }
          @keyframes pop    { 0%,100%{transform:scale(1)} 50%{transform:scale(1.15)} }
          @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
          @keyframes shimmer{ 0%{opacity:.4} 50%{opacity:1} 100%{opacity:.4} }
        `}</style>

        {/* دوامة ثلاثية */}
        <div style={{ position: 'relative', width: '110px', height: '110px' }}>
          <div style={{ position:'absolute', inset:0, border:'4px solid rgba(200,140,35,.15)', borderTopColor:'#c88c23', borderRadius:'50%', animation:'spin 1.2s linear infinite' }}/>
          <div style={{ position:'absolute', inset:'16px', border:'4px solid rgba(200,140,35,.1)', borderBottomColor:'#e5a847', borderRadius:'50%', animation:'spin .8s linear infinite reverse' }}/>
          <div style={{ position:'absolute', inset:'32px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px', animation:'pop 1.5s ease-in-out infinite' }}>
            {current.icon}
          </div>
        </div>

        {/* النص */}
        <div key={openingStep} style={{ textAlign: 'center', animation: 'fadeUp 0.5s ease' }}>
          <div style={{ color: '#ffffff', fontSize: '22px', fontWeight: '700', marginBottom: '8px' }}>
            {current.text}
          </div>
          <div style={{ color: 'rgba(200,140,35,0.7)', fontSize: '13px', animation: 'shimmer 1.5s ease infinite' }}>
            {openingStep < 2 ? 'يرجى الانتظار...' : 'مرحباً بك في توريد نت 🎉'}
          </div>
        </div>

        {/* شريط تقدم */}
        <div style={{ width: '200px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: '2px',
            background: 'linear-gradient(90deg, #c88c23, #e5a847)',
            width: openingStep === 0 ? '33%' : openingStep === 1 ? '66%' : '100%',
            transition: 'width 0.8s ease'
          }}/>
        </div>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: colors.lightGray,
        direction: 'rtl',
        padding: '20px'
      }}>
        <div style={{
          maxWidth: '500px',
          width: '100%',
          background: colors.white,
          borderRadius: '24px',
          padding: isMobile ? '30px 20px' : '40px',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: `${colors.green}20`,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px'
          }}>
            <CheckCircle size={50} color={colors.green} />
          </div>
          <h1 style={{ color: colors.primary, fontSize: isMobile ? '24px' : '28px', fontWeight: 'bold', marginBottom: '10px' }}>متجرك جاهز! 🎉</h1>
          <p style={{ color: colors.gray, fontSize: '15px', marginBottom: '30px' }}>تم إعداد متجرك بنجاح. يمكنك الآن البدء بإضافة المنتجات.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <UIButton onClick={handleGoToDashboard} style={{ width: '100%', padding: '14px', background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldLight})`, border: 'none', borderRadius: '12px', color: colors.primary, fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Grid size={18} /> لوحة التحكم
            </UIButton>
            <UIButton onClick={handleBackToMarket} style={{ width: '100%', padding: '14px', background: 'transparent', border: `2px solid ${colors.gold}`, borderRadius: '12px', color: colors.gold, fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <House size={18} /> الرجوع للرئيسية
            </UIButton>
          </div>
        </div>
      </div>
    );
  }

  if (showSetup) {
    return (
      <div style={{
        minHeight: '100vh',
        background: colors.lightGray,
        direction: 'rtl',
        padding: isMobile ? '20px 15px' : '40px 20px'
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{
            background: colors.white,
            borderRadius: '24px',
            padding: isMobile ? '30px 20px' : '40px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.05)'
          }}>
            <div style={{ marginBottom: '30px' }}>
              <h1 style={{ color: colors.primary, fontSize: '24px', marginBottom: '10px' }}>إعداد المتجر</h1>
              <p style={{ color: colors.gray, fontSize: '14px' }}>أكمل بيانات متجرك لتظهر للعملاء بشكل احترافي</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: colors.primary }}>الشارع *</label>
                <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${colors.gold}30`, borderRadius: '12px', padding: '12px 15px' }}>
                  <Map size={18} color={colors.gold} style={{ marginLeft: '10px' }} />
                  <input type="text" name="street" value={storeData.street} onChange={handleChange} placeholder="شملان" style={{ flex: 1, border: 'none', outline: 'none', fontSize: '14px' }} required />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: colors.primary }}>المحافظة *</label>
                <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${colors.gold}30`, borderRadius: '12px', padding: '12px 15px' }}>
                  <GeoAlt size={18} color={colors.gold} style={{ marginLeft: '10px' }} />
                  <select name="state" value={storeData.state} onChange={handleChange} style={{ flex: 1, border: 'none', outline: 'none', fontSize: '14px' }} required>
                    <option value="">اختر المحافظة</option>
                    {yemenStates.map(state => <option key={state} value={state}>{state}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px' }}>
                <UIButton type="submit" style={{ flex: 1, padding: '14px', background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldLight})`, border: 'none', borderRadius: '12px', color: colors.primary, fontWeight: 'bold', cursor: 'pointer' }}>متابعة</UIButton>
                <UIButton type="button" onClick={handleSkip} style={{ flex: 1, padding: '14px', background: 'transparent', border: `2px solid ${colors.gold}`, borderRadius: '12px', color: colors.gold, fontWeight: 'bold', cursor: 'pointer' }}>تخطي</UIButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.lightGray,
      direction: 'rtl',
      padding: isMobile ? '30px 15px' : '40px 20px'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>


        <div style={{
          background: colors.white,
          borderRadius: '24px',
          padding: isMobile ? '35px 20px' : '40px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
          textAlign: 'center'
        }}>
          <div style={{ width: '80px', height: '80px', background: `${colors.gold}20`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <Shop size={40} color={colors.gold} />
          </div>
          
          <h1 style={{ color: colors.primary, fontSize: isMobile ? '24px' : '28px', fontWeight: 'bold', marginBottom: '15px' }}>مرحباً بك كبائع في <span style={{ color: colors.gold }}>توريد نت</span>!</h1>
          <p style={{ color: colors.gray, fontSize: isMobile ? '14px' : '16px', marginBottom: '30px', lineHeight: '1.6' }}>خطوات بسيطة وتبدأ رحلة نجاحك معنا. سنقوم بإعداد متجرك الآن ليسهل على عملائك العثور عليك.</p>
          
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '15px', justifyContent: 'center' }}>
            <UIButton onClick={handleStart} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 40px', background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldLight})`, border: 'none', borderRadius: '50px', color: colors.primary, fontWeight: 'bold', cursor: 'pointer', justifyContent: 'center' }}>لنبدأ الآن <ArrowLeft size={18} /></UIButton>
            <UIButton onClick={handleLater} style={{ padding: '14px 40px', background: 'transparent', border: `2px solid ${colors.gold}`, borderRadius: '50px', color: colors.gold, fontWeight: 'bold', cursor: 'pointer', justifyContent: 'center' }}>لاحقاً</UIButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerWelcome;