// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Telephone, Lock, Eye, EyeSlash } from 'react-bootstrap-icons';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const redirectPath = searchParams.get('redirect') || '/';
  
  const { login } = useAuth();

  const colors = {
    primary: '#0a1a3a',
    gold: '#c88c23',
    goldLight: '#e5a847',
    white: '#ffffff',
    lightGray: '#f8f9fa',
    red: '#dc3545',
    gray: '#6c757d'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    // تنظيف رقم الجوال (إزالة المسافات والأحرف غير الرقمية)
    const cleanPhone = phone.replace(/\D/g, '');
    
    // التحقق من صحة رقم الجوال
    const phoneRegex = /^(77|78|71|70|73)[0-9]{7}$/;
    if (!phoneRegex.test(cleanPhone)) {
      setError('يجب أن يتكون رقم الجوال من 9 أرقام ويبدأ بـ 77، 78، 71، 70 أو 73');
      return;
    }
    
    setLoading(true);
    
    const result = await login(cleanPhone, password);
    
    if (result.success) {
      // إذا كان هناك رابط توجيه محدد (مثلاً من صفحة الشحن)، نذهب إليه
      if (searchParams.get('redirect')) {
        navigate(redirectPath, { replace: true });
      } else {
        // توجيه افتراضي بناءً على النوع
        if (result.user.role === 'seller') navigate('/seller/dashboard', { replace: true });
        else if (result.user.role === 'admin') navigate('/admin/dashboard', { replace: true });
        else navigate('/', { replace: true });
      }
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

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
        @keyframes spinner {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div style={{
        maxWidth: '450px',
        width: '100%',
        background: colors.white,
        borderRadius: '24px',
        padding: '40px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
      }}>
        {/* عنوان */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ color: colors.primary, fontSize: '28px', marginBottom: '10px' }}>
            مرحباً بعودتك
          </h2>
          <p style={{ color: '#666', fontSize: '14px' }}>
            سجل دخولك للوصول إلى حسابك
          </p>
        </div>

        {/* نموذج تسجيل الدخول */}
        <form onSubmit={handleSubmit}>
          {/* رقم الجوال */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: colors.primary,
              fontWeight: '500'
            }}>
              رقم الجوال
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: `1px solid ${colors.gold}30`,
              borderRadius: '12px',
              padding: '12px 15px',
              background: colors.white,
              transition: 'border 0.2s'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = colors.gold;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = `${colors.gold}30`;
            }}>
              <Telephone size={20} color={colors.gold} style={{ marginLeft: '10px' }} />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder=""
                maxLength={9}
                required
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  padding: '0 10px',
                  fontSize: '14px',
                  background: 'transparent',
                  color: colors.primary
                }}
              />
            </div>
            <div style={{ marginTop: '5px', fontSize: '11px', color: colors.gray }}>
              أدخل رقم الجوال بدون (0) مثال: 776981756
            </div>
          </div>

          {/* كلمة المرور */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: colors.primary,
              fontWeight: '500'
            }}>
              كلمة المرور
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: `1px solid ${colors.gold}30`,
              borderRadius: '12px',
              padding: '12px 15px',
              background: colors.white
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = colors.gold;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = `${colors.gold}30`;
            }}>
              <Lock size={20} color={colors.gold} style={{ marginLeft: '10px' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  padding: '0 10px',
                  fontSize: '14px',
                  background: 'transparent',
                  color: colors.primary
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: colors.gray
                }}
              >
                {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* رابط نسيت كلمة المرور */}
          <div style={{ textAlign: 'left', marginBottom: '20px' }}>
            <Link to="/forgot-password" style={{
              color: colors.gold,
              fontSize: '13px',
              textDecoration: 'none'
            }}>
              نسيت كلمة المرور؟
            </Link>
          </div>

          {/* رسالة الخطأ */}
          {error && (
            <div style={{
              background: `${colors.red}15`,
              color: colors.red,
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '13px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          {/* زر تسجيل الدخول */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldLight})`,
              border: 'none',
              borderRadius: '12px',
              color: colors.primary,
              fontWeight: 'bold',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? (
              <div style={{ 
                display: 'inline-block', 
                width: '20px', 
                height: '20px', 
                border: `3px solid ${colors.primary}40`, 
                borderTopColor: colors.primary, 
                borderRadius: '50%', 
                animation: 'spinner 0.8s linear infinite',
                verticalAlign: 'middle'
              }} />
            ) : 'تسجيل الدخول'}
          </button>
        </form>

        {/* رابط التسجيل */}
        <div style={{
          textAlign: 'center',
          marginTop: '25px',
          paddingTop: '20px',
          borderTop: `1px solid ${colors.gold}20`
        }}>
          <p style={{ color: '#666', fontSize: '14px' }}>
            ليس لديك حساب؟{' '}
            <Link to="/register" style={{
              color: colors.gold,
              textDecoration: 'none',
              fontWeight: 'bold'
            }}>
              إنشاء حساب جديد
            </Link>
          </p>
        </div>

        {/* ملاحظة */}
        <div style={{
          textAlign: 'center',
          marginTop: '15px',
          fontSize: '12px',
          color: colors.gray
        }}>
          <p>باستمرارك، فإنك توافق على شروط الاستخدام وسياسة الخصوصية</p>
        </div>
      </div>
    </div>
  );
};

export default Login;