import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Lock, Telephone, Eye, EyeSlash, 
  CheckCircle, ShieldLock, ArrowRight, ArrowLeft
} from 'react-bootstrap-icons';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { resetPasswordByPhone, checkUserExists } = useAuth();
  
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP, 3: New Password, 4: Success
  const [phone, setPhone] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timerCount, setTimerCount] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const colors = {
    primary: '#0a1a3a',
    gold: '#c88c23',
    goldLight: '#e5a847',
    white: '#ffffff',
    lightGray: '#f8f9fa',
    red: '#dc3545',
    green: '#28a745',
    gray: '#6c757d',
    border: '#c88c2340'
  };

  useEffect(() => {
    let interval;
    if (step === 2 && timerCount > 0) {
      setCanResend(false);
      interval = setInterval(() => setTimerCount(prev => prev - 1), 1000);
    } else if (timerCount === 0) {
      setCanResend(true);
      if (interval) clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [step, timerCount]);

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const cleanPhone = phone.replace(/\D/g, '');
    if (!/^(77|78|71|70|73)[0-9]{7}$/.test(cleanPhone)) {
      setError('يرجى إدخال رقم جوال صحيح مكون من 9 أرقام');
      return;
    }

    setLoading(true);
    // التحقق من وجود الحساب
    const exists = checkUserExists(cleanPhone);
    
    setTimeout(() => {
      if (exists === 'phone') {
        setStep(2);
        setTimerCount(60);
      } else {
        setError('عذراً، هذا الرقم غير مسجل لدينا');
      }
      setLoading(false);
    }, 1500);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otpInput.length < 4) {
      setError('يرجى إدخال رمز التحقق كاملاً');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setStep(3);
      setLoading(false);
      setError('');
    }, 1000);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }
    if (password !== confirmPassword) {
      setError('كلمات المرور غير متطابقة');
      return;
    }

    setLoading(true);
    const result = await resetPasswordByPhone(phone.replace(/\D/g, ''), password);
    
    if (result.success) {
      setStep(4);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const inputStyle = (isFocused) => ({
    display: 'flex',
    alignItems: 'center',
    border: `1.5px solid ${isFocused ? colors.gold : colors.border}`,
    borderRadius: '14px',
    padding: '12px 15px',
    background: colors.white,
    transition: 'all 0.3s ease',
    boxShadow: isFocused ? `0 0 0 4px ${colors.gold}15` : 'none',
    marginBottom: '15px'
  });

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
      <style>{`
        @keyframes spinner { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 480px) {
          .forgot-card { padding: 30px 20px !important; }
          .otp-input { width: 50px !important; height: 50px !important; font-size: 20px !important; }
        }
      `}</style>

      <div 
        className="forgot-card"
        style={{
          maxWidth: '450px',
          width: '100%',
          background: colors.white,
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          animation: 'fadeIn 0.5s ease'
        }}
      >
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ 
            width: '60px', height: '60px', 
            background: `${colors.gold}15`, 
            borderRadius: '18px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '0 auto 20px'
          }}>
            <ShieldLock size={30} color={colors.gold} />
          </div>
          <h2 style={{ color: colors.primary, fontSize: '24px', marginBottom: '10px' }}>
            {step === 1 && 'استعادة كلمة المرور'}
            {step === 2 && 'تأكيد الحساب'}
            {step === 3 && 'كلمة مرور جديدة'}
            {step === 4 && 'تم بنجاح!'}
          </h2>
          <p style={{ color: colors.gray, fontSize: '14px', lineHeight: '1.6' }}>
            {step === 1 && 'أدخل رقم جوالك المسجل لنرسل لك رمز التحقق'}
            {step === 2 && `أدخل الرمز المرسل إلى الرقم ${phone}`}
            {step === 3 && 'قم بتعيين كلمة مرور قوية وسهلة التذكر'}
            {step === 4 && 'لقد تم تغيير كلمة المرور الخاصة بك بنجاح'}
          </p>
        </div>

        {error && (
          <div style={{
            background: `${colors.red}10`,
            color: colors.red,
            padding: '12px',
            borderRadius: '10px',
            marginBottom: '20px',
            fontSize: '13px',
            textAlign: 'center',
            fontWeight: '500'
          }}>
            {error}
          </div>
        )}

        {/* Step 1: Phone Input */}
        {step === 1 && (
          <form onSubmit={handlePhoneSubmit}>
            <div style={inputStyle(false)}>
              <Telephone size={20} color={colors.gold} style={{ marginLeft: '12px' }} />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
                placeholder="77XXXXXXX"
                maxLength={9}
                required
                style={{ flex: 1, border: 'none', outline: 'none', fontSize: '15px' }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '15px',
                background: colors.gold,
                color: colors.primary,
                border: 'none',
                borderRadius: '14px',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              {loading ? 'جاري التحقق...' : 'إرسال الرمز'}
            </button>
          </form>
        )}

        {/* Step 2: OTP Input */}
        {step === 2 && (
          <form onSubmit={handleOtpSubmit}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '25px', direction: 'ltr' }}>
              {[0, 1, 2, 3].map(i => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  className="otp-input"
                  type="text"
                  maxLength="1"
                  value={otpInput[i] || ''}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    if (val) {
                      const newOtp = otpInput.split('');
                      newOtp[i] = val;
                      setOtpInput(newOtp.join(''));
                      if (i < 3) document.getElementById(`otp-${i + 1}`).focus();
                    }
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Backspace' && !otpInput[i] && i > 0) {
                      document.getElementById(`otp-${i - 1}`).focus();
                    }
                  }}
                  style={{
                    width: '60px', height: '60px',
                    textAlign: 'center', fontSize: '24px', fontWeight: 'bold',
                    borderRadius: '14px', border: `1.5px solid ${otpInput[i] ? colors.gold : colors.border}`,
                    outline: 'none'
                  }}
                />
              ))}
            </div>
            <div style={{ textAlign: 'center', marginBottom: '25px' }}>
              {canResend ? (
                <button 
                  type="button" 
                  onClick={() => { setTimerCount(60); setCanResend(false); }}
                  style={{ background: 'none', border: 'none', color: colors.gold, fontWeight: 'bold', cursor: 'pointer' }}
                >
                  إعادة إرسال الرمز
                </button>
              ) : (
                <span style={{ color: colors.gray, fontSize: '13px' }}>إعادة الإرسال خلال {timerCount} ثانية</span>
              )}
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                type="button" 
                onClick={() => setStep(1)}
                style={{ flex: 1, padding: '14px', background: 'none', border: `1.5px solid ${colors.gold}`, borderRadius: '12px', color: colors.gold, fontWeight: 'bold' }}
              >
                رجوع
              </button>
              <button 
                type="submit"
                disabled={loading}
                style={{ flex: 2, padding: '14px', background: colors.gold, color: colors.primary, border: 'none', borderRadius: '12px', fontWeight: 'bold' }}
              >
                تأكيد الكود
              </button>
            </div>
          </form>
        )}

        {/* Step 3: New Password */}
        {step === 3 && (
          <form onSubmit={handlePasswordSubmit}>
            <div style={inputStyle(false)}>
              <Lock size={20} color={colors.gold} style={{ marginLeft: '12px' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="كلمة المرور الجديدة"
                required
                style={{ flex: 1, border: 'none', outline: 'none', fontSize: '15px' }}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                {showPassword ? <EyeSlash size={18} color={colors.gray} /> : <Eye size={18} color={colors.gray} />}
              </button>
            </div>
            <div style={inputStyle(false)}>
              <Lock size={20} color={colors.gold} style={{ marginLeft: '12px' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="تأكيد كلمة المرور"
                required
                style={{ flex: 1, border: 'none', outline: 'none', fontSize: '15px' }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '15px',
                background: colors.gold,
                color: colors.primary,
                border: 'none',
                borderRadius: '14px',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              حفظ كلمة المرور
            </button>
          </form>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '30px', animation: 'fadeIn 0.5s ease' }}>
              <CheckCircle size={70} color={colors.green} />
            </div>
            <button
              onClick={() => navigate('/login')}
              style={{
                width: '100%',
                padding: '15px',
                background: colors.primary,
                color: colors.white,
                border: 'none',
                borderRadius: '14px',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              تسجيل الدخول الآن
            </button>
          </div>
        )}

        {/* Footer Link */}
        {step < 4 && (
          <div style={{ textAlign: 'center', marginTop: '25px', paddingTop: '20px', borderTop: `1px solid ${colors.gold}15` }}>
            <Link to="/login" style={{ color: colors.gold, textDecoration: 'none', fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
               العودة لتسجيل الدخول <ArrowLeft size={16} />
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default ForgotPassword;
