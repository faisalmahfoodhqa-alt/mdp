import React, { useState } from 'react';
import { MegaphoneFill, Megaphone } from 'react-bootstrap-icons';
import { C } from './constants';
import { UIButton } from '../../../shared/components/ui';
import { useBackend } from '../../../config/backend';
import { backendApi } from '../../../api/backendApi';

const AD_TYPES = [
  { key: 'featured', label: 'منتج مميز ⭐', desc: 'يظهر في قسم المنتجات المميزة في الصفحة الرئيسية', color: '#f1c40f' },
  { key: 'slider',   label: 'إعلان في السلايدر الرئيسي 📢', desc: 'يظهر كبانر إعلاني في السلايدر الرئيسي بالصفحة الرئيسية', color: '#e74c3c' },
];

export const AdsSection = ({ user, products, updateUser }) => {
  const [selProduct, setSelProduct] = useState('');
  const [adType, setAdType]         = useState('featured');
  const [duration, setDuration]     = useState(1);
  const [note, setNote]             = useState('');
  const [sent, setSent]             = useState(false);
  
  // جلب الأسعار من إعدادات الموقع
  const settings = JSON.parse(localStorage.getItem('siteSettings') || '{}');
  const pricePerDay = adType === 'featured' 
    ? parseInt(settings.adPriceFeatured || 500) 
    : parseInt(settings.adPriceOffer || 1000);
  
  const totalPrice = duration * pricePerDay;

  const [myRequests, setMyRequests] = useState(() =>
    JSON.parse(localStorage.getItem('adRequests') || '[]').filter(r => r.sellerId === user.id)
  );

  const reload = () =>
    setMyRequests(JSON.parse(localStorage.getItem('adRequests') || '[]').filter(r => r.sellerId === user.id));

  const submitRequest = async () => {
    if (!selProduct) { alert('اختر منتجاً'); return; }
    const product = products.find(p => String(p.id) === String(selProduct));
    if (!product) return;
    const all = JSON.parse(localStorage.getItem('adRequests') || '[]');
    if (all.find(r => r.productId === product.id && r.sellerId === user.id && r.status === 'pending')) {
      alert('لديك طلب معلق لهذا المنتج، انتظر حتى يتم مراجعته.'); return;
    }
    const req = {
      id: Date.now(),
      sellerId: user.id,
      sellerName: user.storeName || user.fullName,
      sellerPhone: user.phone,
      productId: product.id,
      productName: product.name,
      productImage: product.images?.[0]?.url || '',
      productPrice: product.price,
      adType,
      duration,
      totalPrice,
      note,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    if (useBackend) {
      try {
        await backendApi.sellerAdRequest(req);
      } catch (e) {
        alert(e.message || 'تعذر إرسال الطلب');
        return;
      }
    }
    all.push(req);
    localStorage.setItem('adRequests', JSON.stringify(all));
    reload();
    setSent(true);
    setSelProduct(''); setNote('');
    setTimeout(() => setSent(false), 3000);
  };

  const statusInfo = {
    pending:  { label: 'قيد المراجعة', color: '#fd7e14', bg: '#fd7e1412' },
    approved: { label: 'مقبول ✅',       color: '#27ae60', bg: '#27ae6012' },
    rejected: { label: 'مرفوض ❌',       color: '#e74c3c', bg: '#e74c3c12' },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* نموذج الطلب */}
      <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
        <h3 style={{ color: C.text, fontSize: 17, fontWeight: 700, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
          <MegaphoneFill size={20} color={C.gold} /> روج منتجاتك في الإعلانات
        </h3>
        <p style={{ color: C.gray, fontSize: 13, marginBottom: 20 }}>
          اختر منتجًا وأرسل طلبًا للإدارة لعرضه في المنتجات المميزة أو عروض اليوم بالصفحة الرئيسية.
        </p>

        {sent && (
          <div style={{ background: '#27ae6015', border: '1px solid #27ae6040', borderRadius: 10, padding: 14, marginBottom: 16, color: '#27ae60', fontWeight: 700, textAlign: 'center' }}>
            ✅ تم إرسال الطلب بنجاح! سيتم مراجعته من قبل الإدارة.
          </div>
        )}

        {/* نوع الإعلان */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
          {AD_TYPES.map(t => (
            <div key={t.key} onClick={() => setAdType(t.key)} style={{
              flex: 1, minWidth: 180, padding: '14px 18px', borderRadius: 14,
              border: `2px solid ${adType === t.key ? t.color : C.border}`,
              background: adType === t.key ? t.color + '10' : C.bg,
              cursor: 'pointer', transition: 'all 0.2s'
            }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: C.text, marginBottom: 4 }}>{t.label}</div>
              <div style={{ fontSize: 12, color: C.gray }}>{t.desc}</div>
            </div>
          ))}
        </div>

        {/* اختيار المنتج */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12, marginBottom: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, color: C.gray, marginBottom: 6 }}>اختر المنتج *</label>
            <select value={selProduct} onChange={e => setSelProduct(e.target.value)}
              style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 14, outline: 'none', background: C.white }}>
              <option value="">-- اختر منتجًا --</option>
              {products.filter(p => p.isVisible).map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, color: C.gray, marginBottom: 6 }}>المدة (أيام)</label>
            <input type="number" min={1} max={30} value={duration} onChange={e => setDuration(Math.max(1, e.target.value))}
              style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 14, outline: 'none', background: C.white }} />
          </div>
        </div>

        {/* عرض السعر */}
        <div style={{ background: C.bg, padding: 16, borderRadius: 12, marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, color: C.gray }}>سعر الإعلان اليومي: {pricePerDay} ريال</div>
            <div style={{ fontSize: 14, fontWeight: 'bold', color: C.text }}>إجمالي التكلفة: <span style={{ color: C.gold }}>{totalPrice} ريال</span></div>
          </div>
          <div style={{ fontSize: 11, color: C.gray, textAlign: 'left' }}>يتم الدفع عبر المحافظ <br/> الإلكترونية (كريمي/ون كاش)</div>
        </div>

        {/* ملاحظة */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 13, color: C.gray, marginBottom: 6 }}>ملاحظة للإدارة (اختياري)</label>
          <textarea value={note} onChange={e => setNote(e.target.value)} rows={3} placeholder="أي معلومات إضافية تريد إخبار الإدارة بها..."
            style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 13, outline: 'none', resize: 'none', boxSizing: 'border-box' }} />
        </div>

        <UIButton onClick={submitRequest} style={{
          padding: '13px 32px', background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
          border: 'none', borderRadius: 12, color: C.sidebar, fontWeight: 700, fontSize: 15, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 8
        }}>
          <Megaphone size={16} /> إرسال الطلب للإدارة
        </UIButton>
      </div>

      {/* الطلبات السابقة */}
      <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
        <h3 style={{ color: C.text, fontSize: 16, fontWeight: 700, marginBottom: 16 }}>📋 طلباتي السابقة</h3>
        {myRequests.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px', color: C.gray }}>
            <Megaphone size={40} color={`${C.gold}30`} style={{ display: 'block', margin: '0 auto 12px' }} />
            <p>لم ترسل أي طلب بعد</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[...myRequests].reverse().map(req => {
              const info = statusInfo[req.status] || statusInfo.pending;
              return (
                <div key={req.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 12, border: `1px solid ${info.color}30`, background: info.bg, flexWrap: 'wrap' }}>
                  {req.productImage && <img src={req.productImage} style={{ width: 52, height: 52, borderRadius: 10, objectFit: 'cover', border: `1px solid ${C.border}` }} alt="" />}
                  <div style={{ flex: 1, minWidth: 140 }}>
                    <div style={{ fontWeight: 700, color: C.text, fontSize: 14 }}>{req.productName}</div>
                    <div style={{ fontSize: 12, color: C.gray }}>
                      {req.adType === 'featured' ? '⭐ منتج مميز' : '📢 إعلان سلايدر'}
                      {' · '}{new Date(req.createdAt).toLocaleDateString('ar-YE')}
                    </div>
                    {req.adminNote && <div style={{ fontSize: 12, color: info.color, marginTop: 4 }}>💬 {req.adminNote}</div>}
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: info.color, background: C.white, padding: '4px 12px', borderRadius: 20, border: `1px solid ${info.color}30` }}>
                    {info.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
