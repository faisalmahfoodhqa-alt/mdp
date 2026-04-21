import React, { useState, useRef } from 'react';
import { 
  CheckCircleFill, FileText, Image, ChevronDown, CloudUpload, InfoCircle, 
  Clock, Truck, ToggleOn, ToggleOff, Person, Wallet2, Trash, PencilSquare,
  Facebook, Instagram, Tiktok
} from 'react-bootstrap-icons';
import { C, compressImage } from './constants';
import LocationPicker from '../../common/LocationPicker';
import { DELIVERY_COMPANIES } from '../../../data/deliveryCompanies';
import WALLET_OPTIONS from '../../../data/walletOptions';

export const ProfileSection = ({ user, status, updateUser, isMobile, setChangeReqModal }) => {
  const [newPayMethod, setNewPayMethod] = useState({ type: '', number: '' });
  const [copiedLink, setCopiedLink] = useState(false);
   const logoRef = useRef();
   const bannerRef = useRef();
   const paymentSectionRef = useRef();
   const locationSectionRef = useRef();
   const [openSection, setOpenSection] = useState(null);

   React.useEffect(() => {
     const handleFocus = (e) => {
       const section = e.detail;
       setOpenSection(section);
       setTimeout(() => {
         const ref = section === 'payment' ? paymentSectionRef : locationSectionRef;
         if (ref.current) {
           ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
           // Also open the details if it's a details element
           const details = ref.current.closest('details');
           if (details) details.open = true;
         }
       }, 300);
     };
     window.addEventListener('focus-section', handleFocus);
     return () => window.removeEventListener('focus-section', handleFocus);
   }, []);

  const copyStoreLink = () => {
    navigator.clipboard.writeText(`tawreednet.com/store/${user.storeUrl}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleBrandingChange = async (type, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const base64 = await compressImage(file, { maxWidth: type === 'logo' ? 400 : 1200, maxHeight: 1200, quality: 0.8 });
    updateUser({ [type]: base64 });
  };

  const handleSocialChange = (key, val) => {
    const social = { ...(user.socialLinks || {}), [key]: val };
    updateUser({ socialLinks: social });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* رابط المتجر بنمط مميز */}
      <div style={{ background: `linear-gradient(135deg, ${C.sidebar}, #1a3a6a)`, borderRadius: '16px', padding: '24px', border: `1px solid ${C.gold}50`, color: 'white', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
        <div style={{ textAlign: isMobile ? 'center' : 'right' }}>
          <div style={{ color: C.gold, fontSize: '14px', fontWeight: '700', marginBottom: '4px' }}>رابط متجرك المخصص</div>
          <div style={{ fontSize: isMobile ? '16px' : '20px', fontWeight: '800', fontFamily: 'monospace', letterSpacing: '1px' }}>tawreednet.com/store/{user.storeUrl}</div>
        </div>
        <div style={{ display: 'flex', gap: '10px', width: isMobile ? '100%' : 'auto' }}>
          <button onClick={copyStoreLink} style={{ background: C.gold, border: 'none', borderRadius: '10px', padding: '12px 24px', color: C.sidebar, fontWeight: '800', fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', flex: 1, justifyContent: 'center' }}>
            {copiedLink ? <CheckCircleFill size={18}/> : <FileText size={18}/>}
            {copiedLink ? 'تم!' : 'نسخ الرابط'}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* الهوية البصرية */}
        <details style={{ background: C.card, borderRadius: '16px', border: `1px solid ${C.border}`, overflow: 'hidden' }}>
          <summary style={{ padding: '20px 24px', fontSize: '17px', fontWeight: '700', color: C.text, cursor: 'pointer', background: C.bg + '50', display: 'flex', alignItems: 'center', gap: '10px', listStyle: 'none' }}>
             <Image size={20} color={C.gold}/> هوية المتجر (شعار وغلاف) <ChevronDown size={14} style={{ marginRight: 'auto' }}/>
          </summary>
          <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', gap: '24px' }}>
             <div>
                <label style={{ display: 'block', fontSize: '13px', color: C.gray, marginBottom: '10px' }}>شعار المتجر </label>
                <div onClick={()=>logoRef.current.click()} style={{ width: '120px', height: '120px', borderRadius: '20px', border: `2px dashed ${C.gold}50`, background: C.bg, cursor: 'pointer', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                   {user.logo ? <img src={user.logo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt=""/> : <CloudUpload size={30} color={C.gold}/>}
                   <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(200, 140, 35, 0.6)', color: 'white', fontSize: '10px', padding: '4px', textAlign: 'center' }}>تغيير الشعار</div>
                </div>
                <div style={{ fontSize: '10px', color: C.gold, marginTop: '5px', fontWeight: 'bold' }}>  مقاس الشعار (400x400)</div>
                <input type="file" ref={logoRef} hidden accept="image/*" onChange={(e)=>handleBrandingChange('logo', e)}/>
             </div>
             <div>
                <label style={{ display: 'block', fontSize: '13px', color: C.gray, marginBottom: '10px' }}>غلاف المتجر  </label>
                <div onClick={()=>bannerRef.current.click()} style={{ width: '100%', height: '120px', borderRadius: '20px', border: `2px dashed ${C.gold}50`, background: C.bg, cursor: 'pointer', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                   {user.banner ? <img src={user.banner} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt=""/> : <CloudUpload size={30} color={C.gold}/>}
                   <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(200, 140, 35, 0.6)', color: 'white', fontSize: '10px', padding: '4px', textAlign: 'center' }}>تغيير الغلاف</div>
                </div>
                <div style={{ fontSize: '10px', color: C.gold, marginTop: '5px', fontWeight: 'bold' }}> مقاس الغلاف(1200x400)</div>
                <input type="file" ref={bannerRef} hidden accept="image/*" onChange={(e)=>handleBrandingChange('banner', e)}/>
             </div>
          </div>
        </details>

        {/* معلومات العمل */}
        <details style={{ background: C.card, borderRadius: '16px', border: `1px solid ${C.border}`, overflow: 'hidden' }}>
          <summary style={{ padding: '20px 24px', fontSize: '17px', fontWeight: '700', color: C.text, cursor: 'pointer', background: C.bg + '50', display: 'flex', alignItems: 'center', gap: '10px', listStyle: 'none' }}>
             <InfoCircle size={20} color={C.gold}/> معلومات وتفاصيل المتجر <ChevronDown size={14} style={{ marginRight: 'auto' }}/>
          </summary>
          <div style={{ padding: '24px' }}>
              <div style={{ marginBottom: '20px' }}>
                 <label style={{ display: 'block', fontSize: '13px', color: C.gray, marginBottom: '8px' }}>نبذة عن المتجر (Store Memo)</label>
                 <textarea value={user.storeBio || ''} onChange={(e)=>updateUser({ storeBio: e.target.value })} placeholder="اكتب نبذة قصيرة عن نشاطك المتجري وما يميزك..." style={{ width: '100%', height: '100px', padding: '12px', borderRadius: '12px', border: `1px solid ${C.border}`, outline: 'none', resize: 'none', fontSize: '14px' }} />
              </div>
              <div>
                 <h4 style={{ fontSize: '14px', color: C.text, marginBottom: '12px' }}>روابط التواصل</h4>
                 <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '12px' }}>
                   <div style={{ border: `1px solid ${C.border}`, borderRadius: '10px', padding: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Facebook color="#1877F2" size={18}/>
                      <input value={user.socialLinks?.facebook || ''} onChange={(e)=>handleSocialChange('facebook', e.target.value)} placeholder="فيسبوك" style={{ border:'none', outline:'none', flex:1, fontSize:'12px' }}/>
                   </div>
                   <div style={{ border: `1px solid ${C.border}`, borderRadius: '10px', padding: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Instagram color="#E4405F" size={18}/>
                      <input value={user.socialLinks?.instagram || ''} onChange={(e)=>handleSocialChange('instagram', e.target.value)} placeholder="انستقرام" style={{ border:'none', outline:'none', flex:1, fontSize:'12px' }}/>
                   </div>
                   <div style={{ border: `1px solid ${C.border}`, borderRadius: '10px', padding: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Tiktok color="#000000" size={18}/>
                      <input value={user.socialLinks?.tiktok || ''} onChange={(e)=>handleSocialChange('tiktok', e.target.value)} placeholder="تيك توك" style={{ border:'none', outline:'none', flex:1, fontSize:'12px' }}/>
                   </div>
                </div>
             </div>
          </div>
        </details>

        {/* أوقات العمل */}
        <details style={{ background: C.card, borderRadius: '16px', border: `1px solid ${C.border}`, overflow: 'hidden' }}>
          <summary style={{ padding: '20px 24px', fontSize: '17px', fontWeight: '700', color: C.text, cursor: 'pointer', background: C.bg + '50', display: 'flex', alignItems: 'center', gap: '10px', listStyle: 'none' }}>
             <Clock size={20} color={C.gold}/> أوقات العمل والدوام <ChevronDown size={14} style={{ marginRight: 'auto' }}/>
          </summary>
          <div style={{ padding: '24px' }}>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'].map(day => {
                  const val = (user.workingHoursData || {})[day] || '';
                  const isClosed = val === 'إجازة';
                  const [fromTime, toTime] = val.includes('-') ? val.split('-').map(s=>s.trim()) : ['', ''];

                  const formatTimeArabic = (t) => {
                    if(!t) return '—';
                    let [h, m] = t.split(':').map(Number);
                    if(isNaN(h)) return t;
                    const per = h >= 12 ? 'م' : 'ص';
                    h = h % 12 || 12;
                    return `${h}:${m.toString().padStart(2,'0')} ${per}`;
                  };

                  const updateDay = (f, t) => {
                    const newData = { ...(user.workingHoursData || {}), [day]: `${f} - ${t}` };
                    updateUser({ workingHoursData: newData });
                  };

                  return (
                    <div key={day} style={{ 
                      display: 'flex', 
                      flexDirection: isMobile ? 'column' : 'row',
                      alignItems: isMobile ? 'stretch' : 'center', 
                      gap: isMobile ? '10px' : '15px', 
                      padding: '12px', 
                      borderRadius: '12px', 
                      background: isClosed ? `${C.red}05` : C.bg, 
                      border: `1px solid ${isClosed ? C.red + '20' : C.border}` 
                    }}>
                       <div style={{ minWidth: isMobile ? 'auto' : '80px', fontWeight: '800', color: isClosed ? C.red : C.text, fontSize: '14px' }}>{day}</div>
                       
                       {!isClosed ? (
                         <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1, flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: isMobile ? 1 : 'none' }}>
                               <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                 <span style={{ fontSize: '11px', color: C.gray }}>من:</span>
                                 <input type="time" value={fromTime} onChange={(e)=>updateDay(e.target.value, toTime)} style={{ padding: '6px', borderRadius: '8px', border: `1px solid ${C.border}`, outline: 'none', fontSize: '13px' }}/>
                               </div>
                               <div style={{ fontSize: '10px', color: C.gold, fontWeight: 'bold', textAlign: 'center' }}>{formatTimeArabic(fromTime)}</div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: isMobile ? 1 : 'none' }}>
                               <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                 <span style={{ fontSize: '11px', color: C.gray }}>إلى:</span>
                                 <input type="time" value={toTime} onChange={(e)=>updateDay(fromTime, e.target.value)} style={{ padding: '6px', borderRadius: '8px', border: `1px solid ${C.border}`, outline: 'none', fontSize: '13px' }}/>
                               </div>
                               <div style={{ fontSize: '10px', color: C.gold, fontWeight: 'bold', textAlign: 'center' }}>{formatTimeArabic(toTime)}</div>
                            </div>
                         </div>
                       ) : (
                         <div style={{ flex: 1, color: C.red, fontWeight: 'bold', fontSize: '13px', textAlign: isMobile ? 'center' : 'right' }}>مغلق (يوم إجازة)</div>
                       )}

                       <button 
                         onClick={() => {
                           const newData = { ...(user.workingHoursData || {}), [day]: isClosed ? '09:00 - 21:00' : 'إجازة' };
                           updateUser({ workingHoursData: newData });
                         }}
                         style={{ 
                           padding: '8px 14px', borderRadius: '8px', border: 'none', 
                           background: isClosed ? `${C.green}15` : `${C.red}15`, 
                           color: isClosed ? C.green : C.red, 
                           fontSize: '12px', fontWeight: '700', cursor: 'pointer',
                           width: isMobile ? '100%' : 'auto'
                         }}
                       >
                         {isClosed ? 'تفعيل الدوام لهذا اليوم' : 'إجازة'}
                       </button>
                    </div>
                  );
                })}
             </div>
             <div style={{ marginTop: '15px', padding: '10px', borderRadius: '10px', background: `${C.gold}10`, color: C.gold, fontSize: '12px', textAlign: 'center' }}>
                💡 يتم تعديل الوقت بمجرد اختياره من القائمة (الساعة والدقائق).
             </div>
          </div>
        </details>

         {/* الشحن والتوصيل */}
         <details ref={locationSectionRef} open={openSection === 'location'} style={{ background: C.card, borderRadius: '16px', border: `1px solid ${C.border}`, overflow: 'hidden' }}>
           <summary style={{ padding: '20px 24px', fontSize: '17px', fontWeight: '700', color: C.text, cursor: 'pointer', background: C.bg + '50', display: 'flex', alignItems: 'center', gap: '10px', listStyle: 'none' }}>
             <Truck size={20} color={C.gold}/> خدمات الشحن وموقع المتجر <ChevronDown size={14} style={{ marginRight: 'auto' }}/>
          </summary>
          <div style={{ padding: '24px' }}>
             <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', background: `${C.gold}10`, padding: '15px', borderRadius: '12px', border: `1px solid ${C.gold}30` }}>
                   <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 'bold', color: C.primary, fontSize: '14px' }}>التوصيل للعميل</div>
                      <div style={{ fontSize: '11px', color: C.gray }}>تفعيل خدمة الشحن للموقع</div>
                   </div>
                   <div onClick={() => updateUser({ hasDelivery: !user.hasDelivery })} style={{ cursor: 'pointer' }}>
                      {user.hasDelivery ? <ToggleOn size={30} color={C.gold} /> : <ToggleOff size={30} color={C.gray} />}
                   </div>
                </div>
             </div>

             <div style={{ marginBottom: '25px' }}>
  <label style={{ display: 'block', fontSize: '13px', color: C.gray, marginBottom: '10px' }}>🗺️ حدد موقع متجرك/مستودعك على الخريطة</label>
  <div style={{ margin: '0 -24px', borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, overflow: 'hidden' }}>
    <LocationPicker 
        initialLocation={user?.storeLocation || { lat: 15.3694, lng: 44.1910 }}
        onLocationSelect={(data) => {
            console.log("✅ تم اختيار موقع المتجر:", data);
            // حفظ الإحداثيات فقط ليبقى العنوان المكتوب يدوياً مستقلاً تماماً
            updateUser({ 
                storeLocation: { lat: data.lat, lng: data.lng }
            });
        }}
        label={null}
    />
  </div>
  {/* عرض الموقع المحفوظ */}
  {user?.storeLocation && user.storeLocation.lat !== 15.3694 && (
    <div style={{ 
      marginTop: '10px', 
      padding: '10px', 
      background: `${C.gold}10`,
      borderRadius: '8px',
      fontSize: '12px',
      color: C.gold,
      textAlign: 'center'
    }}>
      📍 تم حفظ موقع متجرك: {user.addressDetails || `${user.storeLocation.lat}, ${user.storeLocation.lng}`}
    </div>
  )}
</div>

              <div style={{ marginBottom: '25px' }}>
                 <label style={{ display: 'block', fontSize: '13px', color: C.gray, marginBottom: '8px' }}>تفاصيل العنوان (للاستلام من المحل)</label>
                 <textarea 
                    value={user.addressDetails || ''} 
                    onChange={(e) => updateUser({ addressDetails: e.target.value })} 
                    placeholder="مثال: شارع تعز - بجوار مطعم الأخضر - الدور الأرضي" 
                    style={{ width: '100%', height: '80px', padding: '12px', borderRadius: '12px', border: `1px solid ${C.border}`, outline: 'none', resize: 'none', fontSize: '14px' }} 
                 />
                 <div style={{ fontSize: '11px', color: C.gold, marginTop: '5px' }}>
                    💡 هذا النص هو ما سيظهر للعميل عند اختياره خيار "الاستلام من المحل" في صفحة الدفع.
                 </div>
              </div>

              <div style={{ marginBottom: '40px', borderTop: `1px solid ${C.border}`, paddingTop: '20px' }}>
                 <label style={{ display: 'block', fontSize: '15px', fontWeight: '700', color: C.text, marginBottom: '15px' }}>اختيار شركة التوصيل المتعاقد معها</label>
                 <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                    {DELIVERY_COMPANIES.map(company => (
                       <div 
                          key={company.id}
                          onClick={() => updateUser({ deliveryService: company.id })}
                          style={{
                             padding: '15px', borderRadius: '12px', cursor: 'pointer', transition: '0.2s',
                             border: `2px solid ${user.deliveryService === company.id ? C.gold : C.border}`,
                             background: user.deliveryService === company.id ? `${C.gold}10` : C.white,
                             display: 'flex', alignItems: 'center', gap: '10px'
                          }}
                       >
                          <div style={{ width: '35px', height: '35px', background: `${C.gold}15`, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.gold }}>
                              {company.id === 'merchant' ? <Person size={18}/> : <Truck size={18}/>}
                          </div>
                          <div style={{ flex: 1 }}>
                             <div style={{ fontSize: '13px', fontWeight: 'bold', color: C.text }}>{company.name}</div>
                             {user.deliveryService === company.id && <div style={{ fontSize: '10px', color: C.gold, fontWeight: 'bold' }}>نشط حالياً</div>}
                          </div>
                          {user.deliveryService === company.id && <CheckCircleFill size={16} color={C.gold}/>}
                       </div>
                    ))}
                 </div>
             </div>

             <div style={{ fontSize: '12px', color: C.gray, background: C.bg, padding: '10px', borderRadius: '8px' }}>
                💡 تحديد موقعك بدقة يساعد العملاء في العثور عليك وحساب تكلفة التوصيل بدقة أكبر.
             </div>
          </div>
        </details>

         {/* إعدادات الدفع */}
         <details ref={paymentSectionRef} open={openSection === 'payment'} style={{ background: C.card, borderRadius: '16px', border: `1px solid ${C.border}`, overflow: 'hidden' }}>
           <summary style={{ padding: '20px 24px', fontSize: '17px', fontWeight: '700', color: C.text, cursor: 'pointer', background: C.bg + '50', display: 'flex', alignItems: 'center', gap: '10px', listStyle: 'none' }}>
             <Wallet2 size={20} color={C.gold}/> إعدادات الدفع واستقبال الأموال <ChevronDown size={14} style={{ marginRight: 'auto' }}/>
          </summary>
          <div style={{ padding: '24px' }}>
             <div style={{ marginBottom: '20px', padding: '15px', background: `${C.gold}10`, borderRadius: '12px', border: `1px solid ${C.gold}30`, fontSize: '13px', color: C.text }}>
               💡 أضف وسائل الدفع التي تملكها (مثل محفظة جيب، ون كاش، أو حسابات الكريمي) ليتمكن العملاء من التحويل إليك مباشرة عند طلب منتجاتك.
             </div>

             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '25px' }}>
                {(user.paymentMethods || []).map((method, idx) => (
                   <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', borderRadius: '12px', background: C.bg, border: `1px solid ${C.border}` }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                         <div style={{ width: '40px', height: '40px', background: C.white, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', border: `1px solid ${C.border}`, overflow: 'hidden' }}>
                            {(() => {
                                const wOpt = WALLET_OPTIONS.find(w => w.name === method.type);
                                return wOpt?.image ? (
                                    <img src={wOpt.image} alt={method.type} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                ) : (
                                    <span>{wOpt?.icon || '💰'}</span>
                                );
                            })()}
                         </div>
                         <div>
                            <div style={{ fontWeight: '800', fontSize: '14px', color: C.text }}>{method.type}</div>
                            <div style={{ fontSize: '13px', color: C.gold, fontWeight: 'bold' }}>{method.number}</div>
                         </div>
                      </div>
                      <button 
                        onClick={() => {
                           const updated = user.paymentMethods.filter((_, i) => i !== idx);
                           updateUser({ paymentMethods: updated });
                        }}
                        style={{ background: 'none', border: 'none', color: C.red, cursor: 'pointer', padding: '5px' }}
                      >
                         <Trash size={18} />
                      </button>
                   </div>
                ))}
                {(user.paymentMethods || []).length === 0 && (
                   <div style={{ textAlign: 'center', padding: '20px', color: C.gray, fontSize: '13px', border: `1px dashed ${C.border}`, borderRadius: '12px' }}>
                      لا توجد وسائل دفع مضافة حالياً.
                   </div>
                )}
             </div>

             <div style={{ background: C.white, padding: '20px', borderRadius: '12px', border: `1.5px solid ${C.gold}40` }}>
                <div style={{ fontSize: '14px', fontWeight: '800', marginBottom: '15px', color: C.text }}>إضافة وسيلة دفع جديدة</div>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr auto', gap: '12px', alignItems: 'flex-end' }}>
                   <div>
                      <label style={{ display: 'block', fontSize: '13px', color: C.gray, marginBottom: '12px' }}>نوع المحفظة / البنك</label>
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)', 
                        gap: '10px',
                        marginBottom: '15px'
                      }}>
                         {WALLET_OPTIONS.map(w => {
                            const isSelected = newPayMethod.type === w.name;
                            return (
                               <div 
                                  key={w.name}
                                  onClick={() => setNewPayMethod({ ...newPayMethod, type: w.name })}
                                  style={{
                                     padding: '10px',
                                     borderRadius: '12px',
                                     border: `2px solid ${isSelected ? C.gold : C.border}`,
                                     background: isSelected ? `${C.gold}10` : C.white,
                                     cursor: 'pointer',
                                     display: 'flex',
                                     alignItems: 'center',
                                     gap: '8px',
                                     transition: '0.2s'
                                  }}
                               >
                                  <div style={{ width: '30px', height: '30px', borderRadius: '6px', overflow: 'hidden', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                     {w.image ? <img src={w.image} style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt=""/> : <span>{w.icon}</span>}
                                  </div>
                                  <span style={{ fontSize: '12px', fontWeight: isSelected ? '800' : '600', color: isSelected ? C.primary : C.gray }}>{w.name}</span>
                               </div>
                            );
                         })}
                      </div>
                   </div>
                   <div>
                      <label style={{ display: 'block', fontSize: '12px', color: C.gray, marginBottom: '6px' }}>رقم الحساب / الجوال</label>
                      <input 
                        type="text" 
                        placeholder="مثلاً: 777000000"
                        value={newPayMethod.number}
                        onChange={(e) => setNewPayMethod({ ...newPayMethod, number: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '10px', border: `1px solid ${C.border}`, outline: 'none', fontSize: '14px' }}
                      />
                   </div>
                   <button 
                      onClick={() => {
                         if (!newPayMethod.type || !newPayMethod.number) {
                            alert('يرجى اختيار النوع وإدخال الرقم');
                            return;
                         }
                         const current = user.paymentMethods || [];
                         updateUser({ paymentMethods: [...current, newPayMethod] });
                         setNewPayMethod({ type: '', number: '' });
                      }}
                      style={{ padding: '10px 20px', background: C.gold, color: C.white, border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}
                   >
                      إضافة
                   </button>
                </div>
             </div>
          </div>
        </details>

        {/* الحساب الشخصي */}
        <details style={{ background: C.card, borderRadius: '16px', border: `1px solid ${C.border}`, overflow: 'hidden' }}>
          <summary style={{ padding: '20px 24px', fontSize: '17px', fontWeight: '700', color: C.text, cursor: 'pointer', background: C.bg + '50', display: 'flex', alignItems: 'center', gap: '10px', listStyle: 'none' }}>
             <Person size={20} color={C.gold}/> تفاصيل الحساب والاشتراك <ChevronDown size={14} style={{ marginRight: 'auto' }}/>
          </summary>
          <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '16px' }}>
             {(() => {
               const changeRequests = JSON.parse(localStorage.getItem('accountChangeRequests') || '[]');
               const phoneRequest = changeRequests.find(r => r.sellerId === user.id && r.type === 'phone' && r.status === 'pending');

                return [
                   { label:'اسم المتجر', value:user.storeName, key: 'storeName' },
                   { label:'رقم الجوال', value:user.phone, key: 'phone', restricted: true },
                   { label:'النشاط الرئيسي', value:user.businessActivity || user.businessCategory || 'غير محدد', key: 'businessActivity' },
                   { label:'الباقة الحالية', value:status?.planInfo?.name },
                   { label:'تاريخ الانضمام', value:user.createdAt?new Date(user.createdAt).toLocaleDateString('ar-YE'):'—' },
                   { label:'المكان', value:user.address?.state||'—' }
                ].map((row,i) => {
                  const isPending = row.key === 'phone' && phoneRequest;
                  return (
                    <div key={i} style={{ padding:'12px', background:C.bg, borderRadius:'12px', border:`1px solid ${isPending ? C.gold + '50' : C.border}`, position: 'relative' }}>
                      <div style={{fontSize:'11px', color:C.gray, marginBottom:'4px', display: 'flex', justifyContent: 'space-between' }}>
                        {row.label}
                        {row.key === 'phone' && !isPending && (
                          <button 
                            onClick={() => setChangeReqModal({ show: true, type: 'phone', label: 'رقم الجوال', currentVal: user.phone })}
                            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: C.gold, display: 'flex', alignItems: 'center' }}
                            title="طلب تعديل رقم الجوال"
                          >
                            <PencilSquare size={14}/>
                          </button>
                        )}
                        {isPending && (
                          <span style={{ fontSize: '10px', color: C.gold, fontWeight: 'bold' }}>قيد المراجعة...</span>
                        )}
                      </div>
                      <div style={{fontSize:'14px', fontWeight:'700', color:C.text}}>{row.value}</div>
                    </div>
                  );
                });
              })()}
          </div>
        </details>
      </div>
    </div>
  );
};
