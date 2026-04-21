import React, { useState, useRef } from 'react';
import { PersonBadge, CheckCircleFill, CloudUpload, ShieldExclamation, Clock, XCircle } from 'react-bootstrap-icons';
import { C, compressImage } from './constants';

export const VerificationPage = ({ user, submitVerification }) => {
  const [files, setFiles] = useState(user.verificationDocs?.files || []);
  const [docType, setDocType] = useState(user.verificationDocs?.docType || 'id');
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();
  const activeUpload = useRef(null);

  const colors = { border: '#e8ecf0', gray: '#888', primary: '#0a1a3a' };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const base64 = await compressImage(file, { maxWidth: 1200, maxHeight: 1200, quality: 0.8 });
    const type = activeUpload.current;
    setFiles(prev => {
      const filtered = prev.filter(f => f.type !== type);
      return [...filtered, { name: file.name, url: base64, date: new Date().toISOString(), type }];
    });
    setUploading(false);
  };

  const removeFile = (index) => setFiles(prev => prev.filter((_, i) => i !== index));

  const status = user.verificationStatus || 'unverified';

  return (
    <div style={{ background: C.card, borderRadius: '20px', padding: '30px', border: `1px solid ${C.border}`, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={{ width: '70px', height: '70px', background: `${C.gold}15`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px' }}>
          <PersonBadge size={35} color={C.gold} />
        </div>
        <h2 style={{ color: C.text, margin: 0 }}>توثيق حساب البائع</h2>
        <p style={{ color: C.gray, fontSize: '14px', marginTop: '10px' }}>قم برفع وثيقة إثبات الهوية (بطاقة شخصية أو جواز سفر) لتوثيق متجرك.</p>
      </div>

      <div style={{ background: C.bg, padding: '20px', borderRadius: '15px', marginBottom: '25px', border: `1px solid ${C.border}` }}>
        <h4 style={{ margin: '0 0 10px', fontSize: '14px', color: C.primary }}>لماذا يجب التوثيق؟</h4>
        <ul style={{ margin: 0, paddingRight: '20px', fontSize: '13px', color: C.gray, lineHeight: '1.8' }}>
          <li>لضمان موثوقية المتجر أمام العملاء.</li>
          <li>لتتمكن من إضافة المنتجات والبدء في البيع.</li>
          <li>لحماية حقوقك كبائع وحقوق المشترين.</li>
        </ul>
      </div>

      {status === 'verified' ? (
        <div style={{ textAlign: 'center', padding: '40px', background: '#27ae6010', borderRadius: '15px', border: '1px solid #27ae6030' }}>
          <CheckCircleFill size={50} color={C.green} style={{ marginBottom: '15px' }} />
          <h3 style={{ color: C.green, margin: 0 }}>حسابك موثق بنجاح ✅</h3>
          <p style={{ color: C.gray, marginTop: '10px' }}>شكراً لك، لقد تم التحقق من هويتك بنجاح. سيتم تفعيل كافة صلاحيات متجرك الآن.</p>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>نوع الوثيقة</label>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
               <button 
                  onClick={() => { setDocType('id'); setFiles([]); }} 
                  style={{ flex: 1, padding: '10px', borderRadius: '10px', border: `2px solid ${docType === 'id' ? C.gold : colors.border}`, background: docType === 'id' ? `${C.gold}10` : 'transparent', color: docType === 'id' ? C.primary : colors.gray, fontWeight: 'bold', cursor: 'pointer' }}
               >بطاقة شخصية</button>
               <button 
                  onClick={() => { setDocType('passport'); setFiles([]); }} 
                  style={{ flex: 1, padding: '10px', borderRadius: '10px', border: `2px solid ${docType === 'passport' ? C.gold : colors.border}`, background: docType === 'passport' ? `${C.gold}10` : 'transparent', color: docType === 'passport' ? C.primary : colors.gray, fontWeight: 'bold', cursor: 'pointer' }}
               >جواز سفر</button>
            </div>

            {docType === 'id' ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: C.gray, display: 'block', marginBottom: '5px' }}>صورة الوجه الامامي</label>
                  <div 
                    onClick={() => status !== 'pending' && (activeUpload.current = 'front', fileRef.current.click())} 
                    style={{ border: `2px dashed ${C.gold}30`, borderRadius: '12px', padding: '20px', textAlign: 'center', cursor: 'pointer', background: C.white }}>
                    {files.find(f => f.type === 'front') ? <img src={files.find(f => f.type === 'front').url} style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '8px' }} alt=""/> : <CloudUpload size={24} color={C.gold} />}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: C.gray, display: 'block', marginBottom: '5px' }}>صورة الوجه الخلفي</label>
                  <div 
                    onClick={() => status !== 'pending' && (activeUpload.current = 'back', fileRef.current.click())} 
                    style={{ border: `2px dashed ${C.gold}30`, borderRadius: '12px', padding: '20px', textAlign: 'center', cursor: 'pointer', background: C.white }}>
                    {files.find(f => f.type === 'back') ? <img src={files.find(f => f.type === 'back').url} style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '8px' }} alt=""/> : <CloudUpload size={24} color={C.gold} />}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <label style={{ fontSize: '12px', color: C.gray, display: 'block', marginBottom: '5px' }}>صورة جواز السفر</label>
                <div 
                  onClick={() => status !== 'pending' && (activeUpload.current = 'passport', fileRef.current.click())} 
                  style={{ border: `2px dashed ${C.gold}30`, borderRadius: '12px', padding: '30px', textAlign: 'center', cursor: 'pointer', background: C.white }}>
                  {files.find(f => f.type === 'passport') ? <img src={files.find(f => f.type === 'passport').url} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px' }} alt=""/> : <CloudUpload size={30} color={C.gold} />}
                </div>
              </div>
            )}
            <input type="file" ref={fileRef} hidden accept="image/*" onChange={handleFile} />
          </div>

          {status === 'pending' ? (
            <div style={{ textAlign: 'center', padding: '20px', background: `${C.orange}10`, borderRadius: '12px', border: `1px solid ${C.orange}30`, color: C.orange, fontWeight: 'bold' }}>
              ⏳ طلبك قيد المراجعة حالياً، سنقوم بإبلاغك فور اعتماد حسابك.
            </div>
          ) : (
            <button 
              onClick={() => {
                const required = docType === 'id' ? ['front', 'back'] : ['passport'];
                const hasAll = required.every(r => files.find(f => f.type === r));
                if (!hasAll) { alert('يرجى رفع جميع الصور المطلوبة أولاً'); return; }
                submitVerification({ docType, files });
              }}
              style={{
                width: '100%', padding: '15px', background: C.sidebar, color: C.gold, border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', boxShadow: `0 5px 15px ${C.sidebar}40`
              }}>
              إرسال طلب التوثيق للإدارة
            </button>
          )}

          {status === 'rejected' && (
            <div style={{ marginTop: '20px', padding: '15px', background: `${C.red}10`, borderRadius: '12px', border: `1px solid ${C.red}30`, color: C.red }}>
              <b>سبب الرفض:</b> {user.verificationNote || 'المستندات غير واضحة، يرجى إعادة الرفع بصورة أدق.'}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export const VerificationBanner = ({ user, setPage }) => {
  if (user.verificationStatus === 'verified') return null;
  
  const config = {
    unverified: {
      bg: `linear-gradient(135deg, ${C.red}, #c0392b)`,
      icon: <ShieldExclamation size={24} />,
      title: 'حسابك غير موثق',
      desc: 'يجب توثيق هويتك لتتمكن من إضافة المنتجات والبيع.',
      btn: 'وثق الآن'
    },
    pending: {
      bg: `linear-gradient(135deg, ${C.orange}, #e67e22)`,
      icon: <Clock size={24} />,
      title: 'التوثيق قيد المراجعة',
      desc: 'لقد استلمنا مستنداتك، جاري مراجعتها من قبل الإدارة.',
      btn: 'عرض التفاصيل'
    },
    rejected: {
      bg: `linear-gradient(135deg, ${C.red}, #922b21)`,
      icon: <XCircle size={24} />,
      title: 'تم رفض التوثيق',
      desc: 'لم يتم قبول المستندات المرفوعة. يرجى إعادة المحاولة.',
      btn: 'تعديل التوثيق'
    }
  };

  const current = config[user.verificationStatus] || config.unverified;

  return (
    <div style={{
      background: current.bg,
      color: C.white, padding: '16px 24px', borderRadius: '14px',
      marginBottom: '22px', display: 'flex', alignItems: 'center', gap: '16px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
    }}>
      <div style={{ flexShrink: 0 }}>{current.icon}</div>
      <div style={{ flex: 1 }}>
        <b style={{ fontSize: '15px', display: 'block' }}>{current.title}</b>
        <div style={{ fontSize: '12px', opacity: 0.9 }}>{current.desc}</div>
      </div>
      <button 
        onClick={() => setPage('verification')}
        style={{
          background: C.white, color: C.text, padding: '8px 16px',
          borderRadius: '10px', fontWeight: '700', fontSize: '12px', border: 'none', cursor: 'pointer'
        }}>
        {current.btn}
      </button>
    </div>
  );
};
