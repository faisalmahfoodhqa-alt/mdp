import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CreditCard, Wallet2, CheckCircleFill, ArrowRight, ShieldCheck, Whatsapp } from 'react-bootstrap-icons';

const C = {
  primary: '#0a1a3a',
  gold: '#c88c23',
  goldLight: '#e5a847',
  white: '#ffffff',
  bg: '#f0f2f7',
  card: '#ffffff',
  green: '#27ae60',
  gray: '#6c757d',
  border: '#e8ecf0',
  text: '#1a2a4a',
  red: '#dc3545'
};

const PlanPaymentPage = () => {
  const { user, PLANS } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const planKey = queryParams.get('plan') || 'bronze';
  const plan = PLANS[planKey];

  const [paymentMethod, setPaymentMethod] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [receiptImage, setReceiptImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [wallets, setWallets] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem('siteSettings') || '{}');
    const adminWallets = settings.adminWallets || [
      { id: 1, name: 'كريمي إكسبرس', number: '1234567', type: 'wallet' },
      { id: 2, name: 'النجم موبايل', number: '776981756', type: 'wallet' },
      { id: 3, name: 'إم فلوس', number: '776981756', type: 'wallet' }
    ];
    setWallets(adminWallets);
  }, []);

  if (!user || user.role !== 'seller') {
    return <div style={{ textAlign: 'center', padding: '100px' }}>يرجى تسجيل الدخول كبائع للوصول لهذه الصفحة.</div>;
  }

  if (!plan) {
    return <div style={{ textAlign: 'center', padding: '100px' }}>الباقة المختارة غير صالحة.</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!paymentMethod || !transactionId) {
      alert('يرجى اختيار وسيلة الدفع وإدخال رقم العملية.');
      return;
    }

    setLoading(true);
    
    // محاكاة إرسال الطلب وحفظه في localStorage
    setTimeout(() => {
      const requests = JSON.parse(localStorage.getItem('planUpgradeRequests') || '[]');
      const newRequest = {
        id: Date.now(),
        sellerId: user.id,
        storeName: user.storeName,
        planName: plan.name,
        planKey: planKey,
        price: plan.basePrice || 0,
        paymentMethod,
        transactionId,
        receiptImage,
        status: 'pending',
        date: new Date().toISOString()
      };
      
      requests.push(newRequest);
      localStorage.setItem('planUpgradeRequests', JSON.stringify(requests));
      
      // إضافة إشعار للأدمن
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const adminIndex = users.findIndex(u => u.role === 'admin');
      if (adminIndex !== -1) {
        if (!users[adminIndex].notifications) users[adminIndex].notifications = [];
        users[adminIndex].notifications.unshift({
          id: Date.now() + 1,
          title: '💰 طلب ترقية باقة جديد',
          message: `قدم البائع "${user.storeName}" طلب ترقية لباقة ${plan.name} عبر ${paymentMethod}.`,
          type: 'warning',
          date: new Date().toISOString(),
          read: false
        });
        localStorage.setItem('users', JSON.stringify(users));
      }

      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.bg, direction: 'rtl', padding: '20px' }}>
        <div style={{ background: C.white, padding: '40px', borderRadius: '30px', boxShadow: '0 15px 40px rgba(0,0,0,0.1)', textAlign: 'center', maxWidth: '500px', width: '100%' }}>
          <div style={{ width: '80px', height: '80px', background: `${C.green}15`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 25px' }}>
            <CheckCircleFill size={40} color={C.green} />
          </div>
          <h2 style={{ color: C.text, marginBottom: '15px', fontWeight: '800' }}>تم إرسال الطلب بنجاح!</h2>
          <p style={{ color: C.gray, lineHeight: '1.6', marginBottom: '30px' }}>
            تم استلام تفاصيل عملية الدفع الخاصة بك لترقية الحساب إلى الباقة <strong>{plan.name}</strong>. يرجى الانتظار حتى يتم مراجعة العملية من قبل الإدارة وتفعيل الحساب (عادة ما يستغرق 10-30 دقيقة).
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <button onClick={() => navigate('/seller/dashboard')} style={{ width: '100%', padding: '15px', background: C.primary, color: 'white', border: 'none', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer' }}>العودة للوحة التحكم</button>
            <a href={`https://wa.me/967776981756?text=أهلاً الإدارة، لقد قمت دفع رسوم اشتراك باقة ${plan.name} لمتجري: ${user.storeName}. رقم العملية: ${transactionId}`} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', padding: '15px', background: '#25D366', color: 'white', textDecoration: 'none', borderRadius: '15px', fontWeight: 'bold' }}>
              <Whatsapp size={20} /> تأكيد عبر واتساب
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: C.bg, direction: 'rtl', padding: '40px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
          <button onClick={() => navigate(-1)} style={{ background: C.white, border: 'none', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            <ArrowRight size={20} color={C.primary} />
          </button>
          <h1 style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: '800', color: C.primary, margin: 0 }}>تأكيد الاشتراك والدفع</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.5fr 1fr', gap: '30px' }}>
          
          {/* Main Payment Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            
            <div style={{ background: C.white, padding: '30px', borderRadius: '25px', boxShadow: '0 8px 30px rgba(0,0,0,0.05)', border: `1px solid ${C.border}` }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: C.primary }}>
                <Wallet2 color={C.gold} /> الخطوة 1: التحويل لإحدى المحافظ
              </h3>
              
              <p style={{ fontSize: '14px', color: C.gray, marginBottom: '20px' }}>يرجى تحويل مبلغ الاشتراك <strong>({plan.basePrice} ر.ي)</strong> لأحد الحسابات التالية، ثم قم بإدخال رقم العملية في الأسفل:</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {wallets.map(w => (
                  <div key={w.id} style={{ background: `${C.bg}80`, padding: '15px 20px', borderRadius: '15px', border: `1px solid ${C.border}`, position: 'relative', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ width: '50px', height: '50px', background: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: `1px solid ${C.border}`, flexShrink: 0 }}>
                      {w.logo ? <img src={w.logo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt=""/> : <Wallet2 size={24} color={C.gold} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '12px', color: C.gray, marginBottom: '2px' }}>{w.name}</div>
                      <div style={{ fontSize: '18px', fontWeight: '800', color: C.primary, letterSpacing: '0.5px' }}>{w.number}</div>
                    </div>
                    <button 
                      onClick={() => { navigator.clipboard.writeText(w.number); alert(`تم نسخ رقم ${w.name}`); }}
                      style={{ background: C.primary, color: 'white', border: 'none', padding: '8px 15px', borderRadius: '10px', fontSize: '11px', cursor: 'pointer', fontWeight: 'bold' }}
                    >نسخ</button>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: C.white, padding: '30px', borderRadius: '25px', boxShadow: '0 8px 30px rgba(0,0,0,0.05)', border: `1px solid ${C.border}` }}>
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: C.primary }}>
                  <ShieldCheck color={C.green} /> الخطوة 2: تأكيد عملية الدفع
                </h3>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '10px' }}>وسيلة الدفع المستخدمة</label>
                  <select 
                    value={paymentMethod} 
                    onChange={e => setPaymentMethod(e.target.value)}
                    style={{ width: '100%', padding: '14px', borderRadius: '12px', border: `2px solid ${C.border}`, outline: 'none', background: C.white, fontSize: '14px', fontWeight: 'bold' }}
                  >
                    <option value="">-- اختر المحفظة --</option>
                    {wallets.map(w => <option key={w.id} value={w.name}>{w.name}</option>)}
                    <option value="حوالة صرافة أخرى">حوالة صرافة أخرى</option>
                  </select>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '10px' }}>رقم المرجع / عملية التحويل (Reference ID)</label>
                  <input 
                    type="text" 
                    value={transactionId}
                    onChange={e => setTransactionId(e.target.value)}
                    placeholder="أدخل الرقم الموجود في سند التحويل..."
                    style={{ width: '100%', padding: '14px', borderRadius: '12px', border: `2px solid ${C.border}`, outline: 'none', fontSize: '15px', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ marginBottom: '25px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '10px' }}>صورة سند التحويل (اختياري)</label>
                  <div 
                    onClick={() => document.getElementById('receiptInput').click()}
                    style={{ width: '100%', height: '150px', border: `2px dashed ${C.border}`, borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', overflow: 'hidden', background: '#fcfcfc' }}
                  >
                    {receiptImage ? (
                      <img src={receiptImage} style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt="Receipt" />
                    ) : (
                      <>
                        <ShieldCheck size={30} color={C.gray} style={{ marginBottom: '10px' }} />
                        <span style={{ fontSize: '13px', color: C.gray }}>اضغط لرفع صورة السند أو لقطة الشاشة</span>
                      </>
                    )}
                  </div>
                  <input 
                    type="file" 
                    id="receiptInput" 
                    hidden 
                    accept="image/*" 
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (ev) => setReceiptImage(ev.target.result);
                        reader.readAsDataURL(file);
                      }
                    }} 
                  />
                </div>

                <button 
                  disabled={loading}
                  type="submit"
                  style={{ 
                    width: '100%', padding: '18px', background: `linear-gradient(135deg, ${C.primary}, #1a3a6a)`, color: C.gold, 
                    border: 'none', borderRadius: '15px', fontWeight: '800', fontSize: '16px', cursor: 'pointer',
                    boxShadow: `0 10px 20px ${C.primary}30`, opacity: loading ? 0.7 : 1
                  }}
                >
                  {loading ? 'جاري إرسال الطلب...' : 'تأكيد عملية الدفع الآن ✅'}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar - Package Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', order: isMobile ? -1 : 1 }}>
            <div style={{ background: C.white, padding: '25px', borderRadius: '25px', boxShadow: '0 8px 30px rgba(0,0,0,0.05)', border: `2px solid ${plan.color}50` }}>
              <div style={{ fontSize: '30px', marginBottom: '10px' }}>{plan.badge}</div>
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: C.primary, marginBottom: '5px' }}>باقة {plan.name}</h2>
              <div style={{ fontSize: '24px', fontWeight: '900', color: C.gold, marginBottom: '20px' }}>{plan.basePrice} <span style={{ fontSize: '14px' }}>ر.ي</span></div>
              
              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: '20px' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <li style={{ fontSize: '14px', color: C.text, display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircleFill color={C.green} size={14}/> رفع حتى {plan.maxProducts} منتج</li>
                  <li style={{ fontSize: '14px', color: C.text, display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircleFill color={C.green} size={14}/> {plan.maxImagesPerProduct} صور لكل منتج</li>
                  <li style={{ fontSize: '14px', color: C.text, display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircleFill color={C.green} size={14}/> دعم فني وأولوية العرض</li>
                  <li style={{ fontSize: '14px', color: C.text, display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircleFill color={C.green} size={14}/> مدة الاشتراك: شهر واحد</li>
                </ul>
              </div>
            </div>

            <div style={{ background: `${C.gold}10`, padding: '20px', borderRadius: '20px', border: `1px dashed ${C.gold}` }}>
              <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: C.primary, margin: '0 0 10px' }}>💡 ملاحظة هامة:</h4>
              <p style={{ fontSize: '12px', color: C.text, margin: 0, lineHeight: '1.6' }}>
                يرجى التأكد من الرقم والمبلغ قبل التحويل. في حال وجود أي مشكلة، يمكنك دائماً مراسلتنا عبر الواتساب برقم العملية واسم المتجر.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PlanPaymentPage;
