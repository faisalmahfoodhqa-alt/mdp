import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Lock, Telephone, Eye, EyeSlash, 
  Shop, CheckCircle, Envelope, Truck, GeoAlt, Heart, PersonBadge
} from 'react-bootstrap-icons';
import { DELIVERY_COMPANIES } from '../data/deliveryCompanies';
import SellerLocationStep from '../components/registration/SellerLocationStep';
import SellerSubscriptionStep from '../components/registration/SellerSubscriptionStep';

const Register = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const redirectPath = searchParams.get('redirect') || '/';
  const userType = searchParams.get('type') === 'seller' ? 'seller' : 'customer';
  const [step, setStep] = useState(() => {
    const saved = localStorage.getItem('reg_step');
    if (!saved) return 1;
    return isNaN(saved) ? saved : parseInt(saved);
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [selectedPlan, setSelectedPlan] = useState('trial');
  const [selectedDuration, setSelectedDuration] = useState('monthly');
  const [showTransition, setShowTransition] = useState(false);
  const [transitionMsg, setTransitionMsg] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [timerCount, setTimerCount] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const { registerCustomer, registerSeller, checkUserExists, updateUser } = useAuth();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [step, userType]);

  useEffect(() => {
    let interval;
    if (step === 'otp' && timerCount > 0) {
      setCanResend(false);
      interval = setInterval(() => setTimerCount(prev => prev - 1), 1000);
    } else if (timerCount === 0) {
      setCanResend(true);
      if (interval) clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [step, timerCount]);

  const [customerData, setCustomerData] = useState(() => {
    const saved = localStorage.getItem('reg_customerData');
    return saved ? JSON.parse(saved) : { fullName: '', phone: '', password: '', confirmPassword: '' };
  });

  const [sellerData, setSellerData] = useState(() => {
    const saved = localStorage.getItem('reg_sellerData');
    return saved ? JSON.parse(saved) : {
      fullName: '', phone: '', email: '', password: '', confirmPassword: '',
      storeName: '', storeUrl: '', businessActivity: '',
      address: { street: '', street2: '', state: '', country: 'اليمن' },
      addressDetails: '', storeLocation: { lat: 15.352, lng: 44.207 }
    };
  });

  // حفظ البيانات والخطوة عند كل تغيير
  useEffect(() => {
    if (step !== 'onboarding' && step !== 'seller-onboarding') {
      localStorage.setItem('reg_step', step);
      localStorage.setItem('reg_sellerData', JSON.stringify(sellerData));
      localStorage.setItem('reg_customerData', JSON.stringify(customerData));
    }
  }, [step, sellerData, customerData]);

  const [onboardingData, setOnboardingData] = useState({ city: '', interests: [] });

  const colors = {
    primary: '#0a1a3a', 
    gold: '#c88c23', 
    goldLight: '#e5a847',
    white: '#ffffff', 
    pageBackground: '#f8f9fa', // Same lightGray as Login.jsx
    cardBackground: '#ffffff', // Same white card as Login.jsx
    red: '#dc3545', 
    green: '#28a745', 
    border: '#c88c2380' 
  };

  const yemenStates = [
    'صنعاء', 'عدن', 'تعز', 'الحديدة', 'إب', 'المكلا', 'سيئون', 'البيضاء', 'ذمار', 'عمران', 'صعدة', 'حجة', 'المحويت', 'ريمة', 'لحج', 'أبين', 'شبوة', 'حضرموت', 'المهرة', 'سقطرى'
  ];

  const ONBOARDING_CATEGORIES = [
    { id: 'mens', name: 'ملابس رجالية', image: '/images/daily-main.jpg' },
    { id: 'womens', name: 'ملابس نسائية', image: '/images/abaya-main.jpg' },
    { id: 'kids', name: 'ملابس أطفال', image: '/images/kids-clothes.jpg' },
    { id: 'electronics', name: 'إلكترونيات', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&auto=format' },
    { id: 'food', name: 'مواد غذائية', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&auto=format' },
    { id: 'vehicles', name: 'السيارات والمركبات', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&auto=format' },
    { id: 'realestate', name: 'العقارات', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&auto=format' },
    { id: 'construction', name: 'مواد البناء', image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?w=400&auto=format' }
  ];

  const generateStoreUrl = (name) => {
    if (!name) return '';
    const map = { 'ا':'a','أ':'a','إ':'a','آ':'a','ب':'b','ت':'t','ث':'th','ج':'j','ح':'h','خ':'kh','د':'d','ذ':'dh','ر':'r','ز':'z','س':'s','ش':'sh','ص':'s','ض':'d','ط':'t','ظ':'z','ع':'a','غ':'gh','ف':'f','ق':'q','ك':'k','ل':'l','م':'m','ن':'n','ه':'h','و':'w','ي':'y','ى':'a','ة':'h','ء':'a','ئ':'y','ؤ':'w',' ':'-','لا':'la'};
    return name.toLowerCase().split('').map(c => map[c] || c).join('').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
  };

  const validateAll = () => {
    const errs = {};
    const data = userType === 'customer' ? customerData : sellerData;
    if (!data.fullName) errs.fullName = 'الاسم الكامل مطلوب';
    if (!/^(77|78|71|70|73)[0-9]{7}$/.test(data.phone)) errs.phone = 'رقم الجوال غير صحيح';
    if (data.password.length < 6) errs.password = 'كلمة المرور قصيرة جداً';
    if (data.password !== (data.confirmPassword || data.password)) errs.confirmPassword = 'تأكيد كلمة المرور غير متطابق';
    
    if (userType === 'seller') {
      if (!sellerData.storeName) errs.storeName = 'اسم المتجر مطلوب';
      if (!sellerData.businessActivity) errs.businessActivity = 'اختيار التخصص مطلوب';
      if (!agreedToTerms) errs.terms = 'يجب الموافقة على الشروط والأحكام';
    }
    
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const isFormValid = () => {
    if (userType === 'customer') {
      return (
        customerData.fullName && 
        customerData.phone && 
        customerData.password && 
        customerData.password.length >= 6 &&
        customerData.password === customerData.confirmPassword
      );
    } else {
      return (
        sellerData.fullName && 
        sellerData.phone && 
        sellerData.password && 
        sellerData.password.length >= 6 &&
        sellerData.password === sellerData.confirmPassword &&
        sellerData.storeName &&
        sellerData.businessActivity &&
        agreedToTerms
      );
    }
  };

  const handleUserTypeChange = (type) => {
    setSearchParams({ type });
    setStep(1);
    setError('');
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (loading || showTransition) return;
    setError('');

    if (step === 1) {
      setTouched({ fullName: true, phone: true, password: true, confirmPassword: true, storeName: true, businessActivity: true, terms: true });
      if (!validateAll()) return;
      
      setLoading(true);
      setShowTransition(true);
      setTransitionMsg('جاري إرسال رمز التحقق...');
      setTimeout(() => {
        setShowTransition(false);
        setLoading(false);
        setStep('otp');
      }, 2500);
    } else if (step === 'otp') {
      if (!otpInput || otpInput.length < 4) {
        setError('كود التحقق غير صحيح');
        return;
      }
      setLoading(true);
      if (userType === 'customer') {
        const res = await registerCustomer(customerData);
        if (res.success) setStep('onboarding');
        else setError(res.error);
        setLoading(false);
      } else {
        setLoading(false);
        setStep('seller-location');
      }
    } else if (step === 'seller-location') {
      if (!sellerData.address.state) {
        setError('يرجى اختيار المحافظة');
        return;
      }
      setStep(2);
    } else {
      setLoading(true);
      setShowTransition(true);
      setTimeout(async () => {
        const res = await registerSeller({ ...sellerData, plan: selectedPlan });
        setShowTransition(false);
        if (res.success) {
          localStorage.removeItem('reg_step');
          localStorage.removeItem('reg_sellerData');
          localStorage.removeItem('reg_customerData');
          setStep('seller-onboarding');
        } else {
          setError(res.error);
        }
        setLoading(false);
      }, 3000);
    }
  };

  const toggleInterest = (id) => {
    const interests = [...onboardingData.interests];
    if (interests.includes(id)) {
      setOnboardingData({ ...onboardingData, interests: interests.filter(i => i !== id) });
    } else {
      setOnboardingData({ ...onboardingData, interests: [...interests, id] });
    }
  };

  const handleFinishCustomerOnboarding = () => {
    if (!onboardingData.city) {
      setError('يرجى اختيار المدينة');
      return;
    }
    if (onboardingData.interests.length < 3) {
      setError('يرجى اختيار 3 اهتمامات على الأقل');
      return;
    }
    updateUser({ ...onboardingData, hasCompletedOnboarding: true });
    navigate('/');
  };

  const handleFinishSellerOnboarding = (deliveryId) => {
    updateUser({ deliveryService: deliveryId, hasCompletedSellerOnboarding: true });
    navigate('/seller/welcome');
  };

  const inpSty = (f) => ({
    display:'flex', 
    alignItems:'center', 
    gap:'10px',
    border:`1.5px solid ${(fieldErrors[f] && touched[f]) ? colors.red : (focusedField === f ? colors.gold : colors.border)}`,
    borderRadius:'14px', 
    padding:'14px 15px', 
    background:'transparent', 
    transition:'all 0.3s ease', 
    boxShadow: focusedField === f ? `0 0 0 4px ${colors.gold}15` : 'none',
    width:'100%', 
    boxSizing:'border-box'
  });

  return (
    <div style={{ minHeight:'100vh', background: colors.pageBackground, direction:'rtl', padding:'40px 20px', fontFamily: 'inherit', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <style>{`
        @keyframes spinner { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        /* Style for the select dropdown to match input styling */
        select.custom-select {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background: transparent;
        }
      `}</style>

      {showTransition && (
        <div style={{ position:'fixed', inset:0, zIndex:9999, background:'rgba(10,26,58,0.95)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'30px', animation:'fadeIn 0.5s ease' }}>
          <div style={{ position:'relative', width:'90px', height:'90px' }}>
            <div style={{ position:'absolute', inset:0, border:'4px solid rgba(200,140,35,0.2)', borderTopColor:'#c88c23', borderRadius:'50%', animation:'spinner 1s linear infinite' }} />
            <div style={{ position:'absolute', inset:'14px', border:'4px solid rgba(200,140,35,0.15)', borderBottomColor:'#e5a847', borderRadius:'50%', animation:'spinner 0.7s linear infinite reverse' }} />
            <div style={{ position:'absolute', inset:'28px', background:'#c88c23', borderRadius:'50%', animation:'pulse 1s ease-in-out infinite' }} />
          </div>
          <div style={{ color:'#ffffff', fontSize:'22px', fontWeight:'700', letterSpacing:'1px' }}>{transitionMsg}</div>
          <div style={{ color:'rgba(200,140,35,0.8)', fontSize:'14px', marginTop:'-15px' }}>يرجى الانتظار...</div>
        </div>
      )}

      {/* Main card spanning to show the rounded bottoms over page background */}
      <div style={{ maxWidth: '550px', width: '100%', transition:'all 0.4s ease', paddingBottom: '30px' }}>
        
          {step === 1 && (
            <div style={{ background: colors.cardBackground, padding: '40px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
              <div style={{ textAlign:'center', marginBottom:'30px' }}>
                <h2 style={{ color:colors.primary, fontSize:'28px', marginBottom: '10px' }}>
                  إنشاء حساب جديد
                </h2>
                <p style={{ color:'#666', fontSize:'14px' }}>
                  {userType === 'customer' ? 'سجل كعميل للتسوق' : 'سجل كبائع لعرض منتجاتك'}
                </p>
              </div>

              <div style={{ display:'flex', padding:'5px', borderRadius:'50px', background:'#dbdde0', width: 'fit-content', margin: '0 auto 35px' }}>
                <button type="button" onClick={()=>handleUserTypeChange('customer')} style={{ display:'flex', alignItems:'center', justifyContent: 'center', gap:'8px', padding:'12px 28px', borderRadius:'40px', border:'none', background:userType==='customer'?colors.gold:'transparent', color:colors.primary, fontWeight:'bold', cursor:'pointer', fontSize: '15px', transition: '0.3s' }}>
                   أنا عميل <PersonBadge size={18}/>
                </button>
                <button type="button" onClick={()=>handleUserTypeChange('seller')} style={{ display:'flex', alignItems:'center', justifyContent: 'center', gap:'8px', padding:'12px 28px', borderRadius:'40px', border:'none', background:userType==='seller'?colors.gold:'transparent', color:colors.primary, fontWeight:'bold', cursor:'pointer', fontSize: '15px', transition: '0.3s' }}>
                   أنا بائع <Shop size={18}/>
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom:'22px' }}>
                  <label style={{ display:'block', marginBottom:'8px', fontSize:'14px', fontWeight:'bold', color:colors.primary, textAlign: 'right' }}>
                    الاسم الكامل <span style={{ color: colors.red }}>*</span>
                  </label>
                  <div style={inpSty('fullName')}>
                    <PersonBadge color={colors.gold} size={20}/>
                    <input type="text" placeholder="الاسم الرباعي الكامل (كما في الهوية)" style={{ flex:1, border:'none', outline:'none', background:'transparent', fontSize: '14.5px', color: colors.primary }} value={userType==='customer'?customerData.fullName : sellerData.fullName} onChange={e => userType==='customer'?setCustomerData({...customerData, fullName:e.target.value}):setSellerData({...sellerData, fullName:e.target.value})} onFocus={()=>setFocusedField('fullName')} onBlur={()=>setFocusedField(null)}/>
                  </div>
                  {fieldErrors.fullName && touched.fullName && <div style={{ color:colors.red, fontSize:'12px', marginTop:'4px' }}>{fieldErrors.fullName}</div>}
                </div>

                <div style={{ marginBottom:'22px' }}>
                  <label style={{ display:'block', marginBottom:'8px', fontSize:'14px', fontWeight:'bold', color:colors.primary, textAlign: 'right' }}>
                    رقم الجوال <span style={{ color: colors.red }}>*</span>
                  </label>
                  <div style={inpSty('phone')}>
                    <Telephone color={colors.gold} size={20}/>
                    <input type="tel" placeholder="" maxLength={9} style={{ flex:1, border:'none', outline:'none', background:'transparent', fontSize: '14.5px', color: colors.primary }} value={userType==='customer'?customerData.phone : sellerData.phone} onChange={e => { const val=e.target.value.replace(/\D/g, '').slice(0,9); userType==='customer'?setCustomerData({...customerData, phone:val}):setSellerData({...sellerData, phone:val}); }} onFocus={()=>setFocusedField('phone')} onBlur={()=>setFocusedField(null)}/>
                  </div>
                  {fieldErrors.phone && touched.phone && <div style={{ color:colors.red, fontSize:'12px', marginTop:'4px' }}>{fieldErrors.phone}</div>}
                </div>

                <div style={{ marginBottom:'22px' }}>
                  <label style={{ display:'block', marginBottom:'8px', fontSize:'14px', fontWeight:'bold', color:colors.primary, textAlign: 'right' }}>
                    كلمة المرور <span style={{ color: colors.red }}>*</span>
                  </label>
                  <div style={inpSty('password')}>
                    <Lock color={colors.gold} size={20}/>
                    <input type={showPassword?'text':'password'} placeholder="******" style={{ flex:1, border:'none', outline:'none', background:'transparent', fontSize: '14.5px', color: colors.primary }} value={userType==='customer'?customerData.password : sellerData.password} onChange={e => userType==='customer'?setCustomerData({...customerData, password:e.target.value}):setSellerData({...sellerData, password:e.target.value})} onFocus={()=>setFocusedField('password')} onBlur={()=>setFocusedField(null)}/>
                    <button type="button" onClick={()=>setShowPassword(!showPassword)} style={{ background:'none', border:'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>{showPassword ? <EyeSlash size={18} color={colors.primary}/> : <Eye size={18} color={colors.primary}/>}</button>
                  </div>
                  {fieldErrors.password && touched.password && <div style={{ color:colors.red, fontSize:'12px', marginTop:'4px' }}>{fieldErrors.password}</div>}
                </div>

                <div style={{ marginBottom:'22px' }}>
                  <label style={{ display:'block', marginBottom:'8px', fontSize:'14px', fontWeight:'bold', color:colors.primary, textAlign: 'right' }}>
                    تأكيد كلمة المرور <span style={{ color: colors.red }}>*</span>
                  </label>
                  <div style={inpSty('confirmPassword')}>
                    <Lock color={colors.gold} size={20}/>
                    <input type={showPassword?'text':'password'} placeholder="******" style={{ flex:1, border:'none', outline:'none', background:'transparent', fontSize: '14.5px', color: colors.primary }} value={userType==='customer'?customerData.confirmPassword : sellerData.confirmPassword} onChange={e => userType==='customer'?setCustomerData({...customerData, confirmPassword:e.target.value}):setSellerData({...sellerData, confirmPassword:e.target.value})} onFocus={()=>setFocusedField('confirmPassword')} onBlur={()=>setFocusedField(null)}/>
                  </div>
                  {fieldErrors.confirmPassword && touched.confirmPassword && <div style={{ color:colors.red, fontSize:'12px', marginTop:'4px' }}>{fieldErrors.confirmPassword}</div>}
                </div>

                {userType === 'seller' && (
                  <>
                    <div style={{ marginBottom:'22px' }}>
                      <label style={{ display:'block', marginBottom:'8px', fontSize:'14px', fontWeight:'bold', color:colors.primary, textAlign: 'right' }}>البريد الإلكتروني (اختياري)</label>
                      <div style={inpSty('email')}>
                        <Envelope color={colors.gold} size={20}/>
                        <input type="email" placeholder="example@gmail.com" style={{ flex:1, border:'none', outline:'none', background:'transparent', fontSize: '14.5px', color: colors.primary }} value={sellerData.email} onChange={e => setSellerData({...sellerData, email:e.target.value})} onFocus={()=>setFocusedField('email')} onBlur={()=>setFocusedField(null)}/>
                      </div>
                    </div>

                    <div style={{ marginBottom:'22px' }}>
                      <label style={{ display:'block', marginBottom:'8px', fontSize:'14px', fontWeight:'bold', color:colors.primary, textAlign: 'right' }}>
                        اسم المتجر <span style={{ color: colors.red }}>*</span>
                      </label>
                      <div style={inpSty('storeName')}>
                        <Shop color={colors.gold} size={20}/>
                        <input type="text" placeholder="اسم متجرك" style={{ flex:1, border:'none', outline:'none', background:'transparent', fontSize: '14.5px', color: colors.primary }} value={sellerData.storeName} onChange={e => setSellerData({...sellerData, storeName:e.target.value, storeUrl:generateStoreUrl(e.target.value)})} onFocus={()=>setFocusedField('storeName')} onBlur={()=>setFocusedField(null)}/>
                      </div>
                      {fieldErrors.storeName && touched.storeName && <div style={{ color:colors.red, fontSize:'12px', marginTop:'4px' }}>{fieldErrors.storeName}</div>}
                    </div>

                    <div style={{ marginBottom:'22px' }}>
                      <label style={{ display:'block', marginBottom:'8px', fontSize:'14px', fontWeight:'bold', color:colors.primary, textAlign: 'right' }}>
                        تخصص النشاط الرئيسي <span style={{ color: colors.red }}>*</span>
                      </label>
                      <div style={{ position: 'relative' }}>
                        <select className="custom-select" style={{ ...inpSty('businessActivity'), paddingLeft: '35px', color: sellerData.businessActivity ? colors.primary : '#999', fontSize: '14.5px' }} value={sellerData.businessActivity} onChange={e => setSellerData({...sellerData, businessActivity:e.target.value})} onFocus={()=>setFocusedField('businessActivity')} onBlur={()=>setFocusedField(null)}>
                          <option value="" disabled hidden>اختر التخصص</option>
                          <option value="ملابس">ملابس (رجالي، نسائي، أطفال)</option>
                          <option value="الإلكترونيات">الإلكترونيات</option>
                          <option value="المركبات">المركبات</option>
                          <option value="العقارات">العقارات</option>
                          <option value="مواد البناء">مواد البناء</option>
                          <option value="المواد الغذائية">المواد الغذائية</option>
                        </select>
                        {/* Custom chevron to match dropdown styling */}
                        <div style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1.5L6 6.5L11 1.5" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                      {fieldErrors.businessActivity && touched.businessActivity && <div style={{ color:colors.red, fontSize:'12px', marginTop:'4px' }}>{fieldErrors.businessActivity}</div>}
                    </div>

                    <div style={{ marginBottom:'22px', display:'flex', alignItems:'center', gap:'10px' }}>
                      <input 
                        type="checkbox" 
                        id="terms"
                        checked={agreedToTerms} 
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setAgreedToTerms(isChecked);
                          if (isChecked) {
                            setShowTermsModal(true);
                          }
                        }} 
                        style={{ width:'18px', height:'18px', accentColor: colors.gold, cursor: 'pointer' }}
                      />
                      <label htmlFor="terms" style={{ fontSize:'14px', color:colors.primary, fontWeight: '500', cursor: 'pointer' }}>
                        أوافق على <button type="button" onClick={(e) => { e.preventDefault(); setShowTermsModal(true); }} style={{ background:'none', border:'none', color:colors.gold, fontWeight:'bold', textDecoration:'underline', cursor:'pointer', padding: 0 }}>شروط وأحكام فتح المتجر</button> *
                      </label>
                    </div>
                    {fieldErrors.terms && touched.terms && <div style={{ color:colors.red, fontSize:'12px', marginTop:'-15px', marginBottom:'15px' }}>{fieldErrors.terms}</div>}
                  </>
                )}

                {error && <div style={{ color:colors.red, textAlign:'center', marginBottom:'20px', padding:'10px', background:`${colors.red}10`, borderRadius:'8px' }}>{error}</div>}
                
                <button 
                  type="submit" 
                  disabled={loading || !isFormValid()}
                  style={{ 
                    width:'100%', 
                    padding:'16px', 
                    background: isFormValid() ? colors.gold : '#ccc', 
                    border:'none', 
                    borderRadius:'14px', 
                    color: colors.primary, 
                    fontWeight:'bold', 
                    fontSize:'17px', 
                    cursor: isFormValid() ? 'pointer' : 'not-allowed', 
                    marginTop:'5px', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    gap: '8px',
                    opacity: isFormValid() ? 1 : 0.7,
                    transition: 'all 0.3s ease'
                  }}
                >
                  {userType === 'customer' ? 'إنشاء حساب عميل' : 'إنشاء حساب بائع ←'}
                </button>
              </form>

              <div style={{ textAlign:'center', marginTop:'35px' }}>
                <p style={{ color:'#666', fontSize: '14.5px', fontWeight: '500' }}>لديك حساب بالفعل؟ <Link to="/login" style={{ color:colors.gold, fontWeight:'bold', textDecoration:'none' }}>تسجيل الدخول</Link></p>
              </div>
            </div>
          )}

          {step === 'otp' && (
            <div style={{ background: colors.cardBackground, padding: '40px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', textAlign: 'center' }}>
              <h2 style={{ color:colors.primary, fontSize:'30px', fontWeight:'bold', marginBottom: '15px' }}>تأكيد رقم الجوال</h2>
              <p style={{ color:'#555', fontSize:'15px', lineHeight:'1.7', marginBottom: '8px', fontWeight: '500' }}>
                تم إرسال رمز تحقق صالح لمرة واحدة عبر رسالة<br/>نصية إلى الرقم:
              </p>
              <div style={{ color: colors.gold, fontSize: '18px', fontWeight: 'bold', marginBottom: '30px', direction: 'ltr' }}>
                {userType === 'customer' ? customerData.phone : sellerData.phone}
              </div>
              
              <div style={{ display:'flex', justifyContent:'center', gap:'12px', margin:'0 0 25px', direction: 'ltr' }}>
                {[0,1,2,3].map(i => (
                  <input 
                    key={i} 
                    id={`otp-${i}`} 
                    autoFocus={i === 0}
                    type="text" 
                    maxLength="1" 
                    style={{ width:'60px', height:'60px', textAlign:'center', fontSize:'24px', fontWeight:'bold', borderRadius:'14px', border:`1.5px solid ${otpInput[i] ? colors.gold : colors.border}`, outline:'none', background: 'transparent', transition: 'all 0.3s ease', color: colors.primary }} 
                    value={otpInput[i]||''} 
                    onChange={e => { 
                      const val=e.target.value.replace(/\D/g, ''); 
                      if(val){ 
                        const n=otpInput.split(''); n[i]=val; setOtpInput(n.join('')); 
                        if(i<3) document.getElementById(`otp-${i+1}`).focus(); 
                      } 
                    }}
                    onKeyDown={e => {
                      if(e.key === 'Backspace') {
                        const n = otpInput.split('');
                        if (n[i]) {
                          n[i] = '';
                          setOtpInput(n.join(''));
                        } else if (i > 0) {
                          document.getElementById(`otp-${i-1}`).focus();
                        }
                      }
                    }}
                    onFocus={(e) => { e.target.style.borderColor = colors.gold; e.target.style.boxShadow = `0 0 0 4px ${colors.gold}15`; }} 
                    onBlur={(e) => { e.target.style.borderColor = otpInput[i] ? colors.gold : colors.border; e.target.style.boxShadow = 'none'; }}  
                  />
                ))}
              </div>
              
              <p style={{ marginTop: '0', marginBottom: '40px', fontSize: '14.5px', color: '#666', fontWeight: '500' }}>
                {canResend ? (
                  <button onClick={() => { setTimerCount(60); setCanResend(false); }} style={{ color:colors.gold, background:'none', border:'none', fontWeight:'bold', cursor: 'pointer', padding: 0 }}>إعادة إرسال الرمز</button>
                ) : (
                  <>إعادة إرسال الرمز خلال <span style={{ color: colors.gold, fontWeight: 'bold' }}>{timerCount} ثانية</span></>
                )}
              </p>
              
              <div style={{ display: 'flex', gap: '15px' }}>
                 <button onClick={()=>setStep(1)} style={{ flex: 1, padding:'16px', background:'transparent', border:`1px solid ${colors.gold}`, borderRadius:'14px', color:colors.gold, fontWeight:'bold', fontSize:'16px', cursor: 'pointer' }}>
                  تعديل الرقم
                </button>
                <button onClick={handleSubmit} style={{ flex: 1.5, padding:'16px', background:colors.gold, border:'none', borderRadius:'14px', color:colors.primary, fontWeight:'bold', fontSize:'16px', cursor: 'pointer' }}>
                  تأكيد الرمز والمتابعة
                </button>
              </div>
            </div>
          )}

          {step === 'seller-location' && (
             <div style={{ background: colors.white, padding: '40px', borderRadius: '30px' }}>
              <SellerLocationStep sellerData={sellerData} setSellerData={setSellerData} yemenStates={yemenStates} colors={colors} onSubmit={handleSubmit} onBack={()=>setStep('otp')} />
            </div>
          )}

          {step === 2 && (
             <div style={{ background: colors.white, padding: '40px', borderRadius: '30px' }}>
               <SellerSubscriptionStep colors={colors} onSubmit={handleSubmit} onBack={()=>setStep('seller-location')} loading={loading} selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} selectedDuration={selectedDuration} setSelectedDuration={setSelectedDuration} />
             </div>
          )}

          {step === 'onboarding' && (
            <div style={{ background: colors.cardBackground, padding: '40px 30px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
              {/* Progress bar */}
              <div style={{ width: '100%', height: '4px', background: `${colors.gold}30`, borderRadius: '2px', marginBottom: '30px', position: 'relative' }}>
                <div style={{ position: 'absolute', right: 0, top: 0, height: '100%', width: '40%', background: colors.gold, borderRadius: '2px' }} />
              </div>
              
              <div style={{ textAlign:'center', marginBottom: '35px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', borderRadius: '22px', background: `${colors.gold}15`, marginBottom: '15px' }}>
                  <CheckCircle size={30} color={colors.gold} />
                </div>
                <h2 style={{ color:colors.primary, fontSize: '26px', fontWeight: 'bold', marginBottom: '10px' }}>أهلاً بك في توريد نت!</h2>
                <p style={{ color:'#666', fontSize: '15px', lineHeight: '1.6', maxWidth: '80%', margin: '0 auto' }}>لنميز تجربتك ونعرض لك ما يهمك فقط، أخبرنا عن اختياراتك</p>
              </div>

              {/* Step 1: City */}
              <div style={{ marginBottom: '35px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: colors.gold, color: colors.white, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '15px' }}>1</div>
                  <h3 style={{ margin: 0, fontSize: '18px', color: colors.primary, fontWeight: 'bold' }}>في أي مدينة تقيم؟</h3>
                </div>
                <div style={{ position: 'relative' }}>
                  <select className="custom-select" style={{ ...inpSty('city'), paddingLeft: '35px', color: onboardingData.city ? colors.primary : '#999', fontSize: '15px', padding: '16px 15px' }} value={onboardingData.city} onChange={e => setOnboardingData({...onboardingData, city:e.target.value})}>
                    <option value="" disabled hidden>اختر المدينة...</option>
                    {yemenStates.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <div style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Step 2: Interests */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: colors.gold, color: colors.white, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '15px' }}>2</div>
                  <h3 style={{ margin: 0, fontSize: '18px', color: colors.primary, fontWeight: 'bold' }}>اختر اهتماماتك المفضلة</h3>
                  {onboardingData.interests.length < 3 && (
                    <span style={{ fontSize: '12px', background: '#ffebee', color: '#d32f2f', padding: '4px 12px', borderRadius: '15px', fontWeight: 'bold', marginRight: '5px' }}>
                      اختر {3 - onboardingData.interests.length} أكثر
                    </span>
                  )}
                </div>
                {error && <div style={{ color:colors.red, textAlign:'center', marginBottom:'15px', padding:'10px', background:`${colors.red}10`, borderRadius:'8px' }}>{error}</div>}
                <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:'15px' }}>
                  {ONBOARDING_CATEGORIES.map(cat => (
                    <div key={cat.id} onClick={()=>toggleInterest(cat.id)} style={{ position:'relative', height:'125px', borderRadius:'20px', overflow:'hidden', cursor:'pointer', border:onboardingData.interests.includes(cat.id)?`3px solid ${colors.gold}`:'none', boxShadow: onboardingData.interests.includes(cat.id)?`0 0 0 2px ${colors.gold}40`:'none', transition:'all 0.2s' }}>
                      <img src={cat.image} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', position: 'absolute', inset: 0, zIndex: 0 }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,26,58,0.3) 0%, rgba(10,26,58,0.7) 100%)', zIndex: 1 }} />
                      <div style={{ position:'absolute', inset:0, zIndex: 2, display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontWeight:'bold', textAlign:'center', padding:'10px', fontSize: '15px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{cat.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={handleFinishCustomerOnboarding} style={{ width:'100%', padding:'18px', background:colors.gold, border:'none', borderRadius:'14px', color:colors.primary, fontWeight:'bold', marginTop:'40px', fontSize:'18px', cursor: 'pointer', transition: '0.3s' }}>ابدأ التسوق الآن</button>
            </div>
          )}

          {step === 'seller-onboarding' && (
            <div style={{ background: colors.white, padding: '40px', borderRadius: '30px' }}>
              <div style={{ textAlign:'center' }}>
                <Truck size={60} color={colors.gold} />
                <h2 style={{ color:colors.primary, fontSize:'28px', marginTop:'20px' }}>خيارات التوصيل</h2>
                <div style={{ display:'flex', flexDirection:'column', gap:'20px', marginTop:'35px' }}>
                  {DELIVERY_COMPANIES.map(company => (
                    <button key={company.id} onClick={()=>handleFinishSellerOnboarding(company.id)} style={{ padding:'25px', borderRadius:'20px', border:`2px solid ${colors.gold}15`, background:'white', display:'flex', alignItems:'center', gap:'20px', cursor:'pointer', transition:'0.3s' }}>
                      {company.logo 
                        ? <img src={company.logo} alt="" style={{ width:'55px', height:'55px', objectFit:'contain' }} />
                        : <div style={{ width:'55px', height:'55px', borderRadius:'14px', background:`${colors.gold}15`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}><Truck size={30} color={colors.gold} /></div>
                      }
                      <div style={{ fontWeight:'bold', fontSize:'20px', color:colors.primary }}>{company.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

      </div>

      {showTermsModal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', zIndex:10000, display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }} onClick={() => setShowTermsModal(false)}>
          <div style={{ background:colors.white, borderRadius:'24px', padding:'40px 30px', maxWidth:'500px', width:'100%', maxHeight:'80vh', overflowY:'auto', boxShadow:'0 20px 40px rgba(0,0,0,0.1)' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ textAlign:'center', marginBottom:'30px', color:colors.primary, fontSize: '22px', fontWeight: 'bold' }}>شروط وأحكام فتح متجر</h3>
            <div style={{ color:'#444', lineHeight:'2.2', fontSize:'15px', fontWeight: '500' }}>
              <ol style={{ paddingRight: '20px', margin: 0 }}>
                <li style={{ marginBottom: '15px' }}>يجب أن تكون جميع البيانات المدخلة صحيحة ومطابقة للهوية الوطنية.</li>
                <li style={{ marginBottom: '15px' }}>يلتزم البائع بجودة المنتجات المعروضة ومطابقتها للوصف.</li>
                <li style={{ marginBottom: '15px' }}>يمنع عرض أي منتجات مخالفة للقوانين أو الأخلاق العامة.</li>
                <li style={{ marginBottom: '15px' }}>عمولة المنصة يتم تحديدها بناءً على الاتفاق في عقد الوثيق.</li>
                <li style={{ marginBottom: '15px' }}>للمنصة الحق في إغلاق أي متجر يثبت تلاعبه أو كثرة الشكاوى ضده.</li>
              </ol>
            </div>
            <button onClick={()=>setShowTermsModal(false)} style={{ width:'100%', padding:'16px', background:colors.primary, color:'white', border:'none', borderRadius:'14px', marginTop:'35px', fontWeight:'bold', fontSize: '16px', cursor: 'pointer' }}>فهمت وموافق</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
