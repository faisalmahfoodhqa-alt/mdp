import React, { useState, useRef, useEffect } from 'react';
import { PencilSquare, PlusCircle, Trash, XCircle, BoxSeam, CloudUpload, Eye, EyeSlash, Grid3x2Gap } from 'react-bootstrap-icons';
import { C, compressImage, hasSubGroups, getSubGroups, getSubCategories, getDetailedItems, MAIN_CATS } from './constants';
import { UIButton } from '../../../shared/components/ui';

export const ProductForm = ({ user, status, editProduct, onSave, onCancel, isMobile }) => {
  const fileInputRef = useRef();
  const businessActivity = user?.businessActivity || MAIN_CATS[0];
  const isNested = hasSubGroups(businessActivity);

  const [form, setForm] = useState(editProduct ? {
    name: editProduct.name || '',
    description: editProduct.description || '',
    price: editProduct.price || '',
    originalPrice: editProduct.originalPrice || '',
    mainCategory: editProduct.mainCategory || businessActivity,
    subGroup: editProduct.subGroup || '',
    category: editProduct.category || '',
    subItem: editProduct.subItem || '',
    images: editProduct.images || [],
    isVisible: editProduct.isVisible !== undefined ? editProduct.isVisible : true,
    isOffer: editProduct.isOffer || false,
    sizes: editProduct.sizes || [],
    colors: editProduct.colors || [],
    stock: editProduct.stock || '',
    couponCode: editProduct.couponCode || '',
    couponDiscount: editProduct.couponDiscount || ''
  } : {
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    mainCategory: businessActivity,
    subGroup: '',
    category: '',
    subItem: '',
    images: [],
    isVisible: true,
    isOffer: false,
    sizes: [],
    colors: [],
    stock: '',
    couponCode: '',
    couponDiscount: ''
  });

  const availableCategories = getSubCategories(businessActivity, form.subGroup);
  
  const [sizeInput, setSizeInput] = useState('');
  const [colorInput, setColorInput] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  // Clear error when user fills in the field
  useEffect(() => {
    const newErrors = { ...fieldErrors };
    if (form.name && newErrors.name) delete newErrors.name;
    if (form.description && newErrors.description) delete newErrors.description;
    if (form.price && newErrors.price) delete newErrors.price;
    if (form.category && newErrors.category) delete newErrors.category;
    if (form.stock && newErrors.stock) delete newErrors.stock;
    if (form.images.length > 0 && newErrors.images) delete newErrors.images;
    setFieldErrors(newErrors);
  }, [form.name, form.description, form.price, form.category, form.stock, form.images.length]);

  const errorBorder = (field) => fieldErrors[field] ? '#ef4444' : null;
  const ErrorMsg = ({ field }) => fieldErrors[field] ? (
    <div style={{ color: '#ef4444', fontSize: '12px', fontWeight: '600', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
      <span style={{ fontSize: '14px' }}>⚠</span> {fieldErrors[field]}
    </div>
  ) : null;

  const addVariant = (type, val) => {
    const value = val.trim();
    if (!value) return;
    if (!form[type].includes(value)) {
      setForm(prev => ({ ...prev, [type]: [...prev[type], value] }));
    }
    if (type === 'sizes') setSizeInput('');
    else setColorInput('');
  };

  const removeVariant = (type, val) => {
    setForm(prev => ({ ...prev, [type]: prev[type].filter(v => v !== val) }));
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const maxImg = status?.maxImagesPerProduct || 2;
    if (form.images.length + files.length > maxImg) {
      alert(`عذراً، باقتك الحالية تسمح بـ ${maxImg} صور فقط لكل منتج.`);
      e.target.value = '';
      return;
    }
    for (const file of files) {
      try {
        const compressed = await compressImage(file, {
          maxWidth: 1024,
          maxHeight: 1024,
          maxBytes: 340 * 1024,
        });
        setForm(prev => ({ ...prev, images: [...prev.images, { url: compressed }] }));
      } catch (err) {
        alert(err?.message || 'تعذّر ضغط الصورة، جرّب صورة أخرى.');
      }
    }
    e.target.value = '';
  };

  const removeImage = (index) => {
    setForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  return (
    <div style={{background:C.card, borderRadius:'20px', padding:isMobile ? '15px' : '30px', border:`1px solid ${C.border}`, boxShadow:'0 10px 30px rgba(0,0,0,0.08)'}}>
       {/* Header */}
       <div style={{display:'flex', alignItems:'center', gap:'15px', marginBottom:'30px', borderBottom:`1px solid ${C.border}`, paddingBottom:'15px'}}>
         <div style={{width:'45px', height:'45px', borderRadius:'12px', background:`linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, display:'flex', alignItems:'center', justifyContent:'center', color:C.sidebar, fontSize:'20px'}}>
           {editProduct ? <PencilSquare /> : <PlusCircle />}
         </div>
         <div>
           <h3 style={{color:C.text, fontSize:'20px', fontWeight:'800', margin:0}}>{editProduct ? 'تعديل بيانات المنتج' : 'إضافة منتج جديد لمتجرك'}</h3>
           <p style={{color:C.gray, fontSize:'12px', margin:0}}>املأ البيانات التالية بدقة لجذب المشترين</p>
         </div>
       </div>

       <div style={{display:'grid', gridTemplateColumns:isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))', gap:isMobile ? '20px' : '30px'}}>
         {/* Column 1 - Basic Info & Category */}
         <div style={{display:'flex', flexDirection:'column', gap:'25px'}}>
           
           <section data-field="name">
             <label style={{display:'block', marginBottom:'10px', fontSize:'14px', fontWeight:'700', color:C.text}}>1. اسم المنتج والوصف</label>
             <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} 
               style={{width:'100%', padding:'14px', borderRadius:'12px', border:`2px solid ${errorBorder('name') || C.border}`, outline:'none', boxSizing:'border-box', fontSize:'15px', transition:'0.3s', ...(fieldErrors.name && {background:'#fef2f2'})}} 
               placeholder="اسم المنتج (مثلاً: عباية خليجية مطرزة)"/>
             <ErrorMsg field="name" />
             <textarea value={form.description} onChange={e=>setForm({...form, description:e.target.value})} 
               style={{width:'100%', padding:'14px', borderRadius:'12px', border:`2px solid ${errorBorder('description') || C.border}`, outline:'none', height:'100px', boxSizing:'border-box', marginTop:'12px', fontSize:'14px', resize:'none', ...(fieldErrors.description && {background:'#fef2f2'})}} 
               placeholder="وصف تفصيلي للمنتج (المميزات، الخامة، إلخ)..."/>
             <ErrorMsg field="description" />
           </section>

           <section data-field="price">
             <label style={{display:'block', marginBottom:'10px', fontSize:'14px', fontWeight:'700', color:C.text}}>2. السعر (الحالي والسعر القديم)</label>
             <div style={{display:'grid', gridTemplateColumns:isMobile ? '1fr' : '1fr 1fr', gap:'15px'}}>
               <div style={{position:'relative'}}>
                 <span style={{position:'absolute', left:'15px', top:'50%', transform:'translateY(-50%)', color:C.gold, fontWeight:'bold', fontFamily:'system-ui, -apple-system, sans-serif'}}>ر.ي</span>
                 <input type="number" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} 
                   style={{width:'100%', padding:'14px 45px 14px 15px', borderRadius:'12px', border:`2px solid ${errorBorder('price') || `${C.gold}40`}`, outline:'none', boxSizing:'border-box', fontSize:'16px', fontWeight:'700', ...(fieldErrors.price && {background:'#fef2f2'})}} 
                   placeholder="السعر الحالي"/>
                 <ErrorMsg field="price" />
               </div>
               <div style={{position:'relative'}}>
                 <span style={{position:'absolute', left:'15px', top:'50%', transform:'translateY(-50%)', color:C.gray, fontFamily:'system-ui, -apple-system, sans-serif'}}>ر.ي</span>
                 <input type="number" value={form.originalPrice} onChange={e=>setForm({...form, originalPrice:e.target.value})} 
                   style={{width:'100%', padding:'14px 45px 14px 15px', borderRadius:'12px', border:`2px solid ${C.border}`, outline:'none', boxSizing:'border-box', fontSize:'15px', color:C.gray}} 
                   placeholder="السعر قبل التخفيض"/>
               </div>
             </div>
             <div style={{ marginTop: '15px', display: 'flex', alignItems: 'center', gap: '10px', background: `${C.gold}08`, padding: '12px 15px', borderRadius: '12px', border:`1px dashed ${C.gold}30` }}>
               <input type="checkbox" id="isOffer" checked={form.isOffer} onChange={e => setForm({...form, isOffer: e.target.checked})} style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
               <label htmlFor="isOffer" style={{ fontSize: '14px', fontWeight: '700', color: C.text, cursor: 'pointer' }}>تفعيل "عرض اليوم" لهذا المنتج 🔥</label>
             </div>
           </section>

           <section style={{background: `${C.sidebar}05`, padding: '15px', borderRadius: '15px', border: `1px solid ${C.border}`, marginBottom: '25px'}}>
              <label style={{display:'block', marginBottom:'10px', fontSize:'14px', fontWeight:'700', color:C.text}}>3. كوبون خصم خاص بالمنتج (اختياري)</label>
              <div style={{display:'grid', gridTemplateColumns:isMobile ? '1fr' : '1.5fr 1fr', gap:'15px'}}>
                <div>
                  <input type="text" value={form.couponCode} onChange={e=>setForm({...form, couponCode:e.target.value.toUpperCase()})} 
                    style={{width:'100%', padding:'12px', borderRadius:'10px', border:`1px solid ${C.border}`, outline:'none', boxSizing:'border-box', fontSize:'14px'}} 
                    placeholder="كود الخصم (مثال: SALE20)"/>
                </div>
                <div style={{position:'relative'}}>
                  <span style={{position:'absolute', left:'15px', top:'50%', transform:'translateY(-50%)', color:C.text, fontWeight: 'bold'}}>%</span>
                  <input type="number" min="1" max="99" value={form.couponDiscount} onChange={e=>setForm({...form, couponDiscount:e.target.value})} 
                    style={{width:'100%', padding:'12px 40px 12px 12px', borderRadius:'10px', border:`1px solid ${C.border}`, outline:'none', boxSizing:'border-box', fontSize:'14px'}} 
                    placeholder="نسبة التخفيض"/>
                </div>
              </div>
            </section>

            {!form.isOffer && (
              <section data-field="category">
                <label style={{display:'block', marginBottom:'10px', fontSize:'14px', fontWeight:'700', color:C.text}}>4. اختيار التصنيف</label>
               <div style={{ background: C.bg, padding: '20px', borderRadius: '15px' }}>
                 <div style={{ fontSize: '13px', color: C.gold, fontWeight: '700', marginBottom: '15px', display:'flex', alignItems:'center', gap:'5px' }}>
                   <Grid3x2Gap size={14}/> نشاطك: {businessActivity}
                 </div>
                 {isNested && (
                   <div style={{ marginBottom: '20px' }}>
                     <label style={{ display: 'block', fontSize: '12px', color: C.gray, marginBottom: '10px' }}>الفئة المستهدفة</label>
                     <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '5px' }}>
                       {getSubGroups(businessActivity).map(group => (
                         <UIButton key={group} type="button" onClick={() => setForm({ ...form, subGroup: group, category: '', subItem: '' })}
                           style={{ 
                             padding: '12px 5px', 
                             borderRadius: '12px', 
                             border: `2px solid ${form.subGroup === group ? C.gold : C.border}`, 
                             background: form.subGroup === group ? `${C.gold}10` : C.white, 
                             color: form.subGroup === group ? C.gold : C.text, 
                             fontWeight: '800', 
                             fontSize: '14px', 
                             cursor: 'pointer', 
                             transition: '0.3s',
                             boxShadow: form.subGroup === group ? `0 4px 12px ${C.gold}20` : 'none',
                             whiteSpace: 'nowrap',
                             minWidth: 'fit-content',
                             flex: 1
                           }}>
                           {group}
                         </UIButton>
                       ))}
                     </div>
                   </div>
                 )}
                 {(!isNested || form.subGroup) && (
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                     <div>
                       <label style={{ display: 'block', fontSize: '12px', color: C.gray, marginBottom: '8px' }}>التصنيف الفرعي</label>
                       <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value, subItem: '' })}
                         style={{ width: '100%', padding: '14px', borderRadius: '12px', border: `2px solid ${errorBorder('category') || C.border}`, outline: 'none', background: fieldErrors.category ? '#fef2f2' : C.white, fontSize: '14px', fontWeight: 'bold' }}>
                         <option value="">-- اختر القسم --</option>
                         {availableCategories.map(cat => (<option key={cat} value={cat}>{cat}</option>))}
                       </select>
                       <ErrorMsg field="category" />
                     </div>

                     {getDetailedItems(businessActivity, form.subGroup, form.category).length > 0 && (
                       <div style={{ animation: 'fadeIn 0.3s' }}>
                         <label style={{ display: 'block', fontSize: '12px', color: C.gray, marginBottom: '8px' }}>القسم التفصيلي (النوع)</label>
                         <select value={form.subItem} onChange={e => setForm({ ...form, subItem: e.target.value })}
                           style={{ width: '100%', padding: '14px', borderRadius: '12px', border: `2px solid ${C.gold}50`, outline: 'none', background: C.white, fontSize: '14px', fontWeight: 'bold' }}>
                           <option value="">-- اختر النوع --</option>
                           {getDetailedItems(businessActivity, form.subGroup, form.category).map(item => (
                             <option key={item} value={item}>{item}</option>
                           ))}
                         </select>
                         <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
                       </div>
                     )}
                   </div>
                 )}
               </div>
              </section>
            )}
         </div>

         {/* Column 2 - Variants, Stock & Images */}
         <div style={{display:'flex', flexDirection:'column', gap:'25px'}}>
            
            <section style={{background:C.white, border:`1px solid ${C.border}`, padding:'20px', borderRadius:'20px'}}>
              <div style={{marginBottom:'20px'}}>
                <label style={{display:'block', marginBottom:'12px', fontSize:'14px', fontWeight:'700'}}>5. المقاسات / الخيارات المتاحة</label>
                <div style={{display:'flex', gap:'10px', marginBottom:'12px'}}>
                  <input 
                    value={sizeInput} 
                    onChange={e => setSizeInput(e.target.value)} 
                    onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addVariant('sizes', sizeInput))}
                    placeholder="أضف مقاس أو خيار (مثلاً: XL أو 100مل)" 
                    style={{flex:1, padding:'10px 14px', borderRadius:'10px', border:`1px solid ${C.border}`, fontSize:'13px', outline:'none'}}
                  />
                  <UIButton type="button" onClick={() => addVariant('sizes', sizeInput)} style={{padding:'0 15px', background:C.gold, color:'white', border:'none', borderRadius:'10px', cursor:'pointer', fontWeight:'bold'}}>+</UIButton>
                </div>
                <div style={{display:'flex', gap:'8px', flexWrap:'wrap'}}>
                  {form.sizes?.map(size => (
                    <div key={size} style={{
                      display:'flex', alignItems:'center', gap:'6px', padding:'6px 12px', borderRadius:'8px', 
                      background:`${C.gold}10`, color:C.gold, fontSize:'12px', fontWeight:'700', border:`1px solid ${C.gold}30`
                    }}>
                      {size}
                      <XCircle size={14} style={{cursor:'pointer'}} onClick={() => removeVariant('sizes', size)}/>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label style={{display:'block', marginBottom:'12px', fontSize:'14px', fontWeight:'700'}}>6. الألوان المتوفرة</label>
                <div style={{display:'flex', gap:'10px', marginBottom:'12px'}}>
                  <input 
                    value={colorInput} 
                    onChange={e => setColorInput(e.target.value)} 
                    onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addVariant('colors', colorInput))}
                    placeholder="أضف لون المنتج..." 
                    style={{flex:1, padding:'10px 14px', borderRadius:'10px', border:`1px solid ${C.border}`, fontSize:'13px', outline:'none'}}
                  />
                  <UIButton type="button" onClick={() => addVariant('colors', colorInput)} style={{padding:'0 15px', background:C.gold, color:'white', border:'none', borderRadius:'10px', cursor:'pointer', fontWeight:'bold'}}>+</UIButton>
                </div>
                <div style={{display:'flex', gap:'8px', flexWrap:'wrap'}}>
                  {form.colors?.map(color => (
                    <div key={color} style={{
                      display:'flex', alignItems:'center', gap:'6px', padding:'6px 12px', borderRadius:'8px', 
                      background:`${C.sidebar}10`, color:C.sidebar, fontSize:'12px', fontWeight:'700', border:`1px solid ${C.sidebar}30`
                    }}>
                      {color}
                      <XCircle size={14} style={{cursor:'pointer'}} onClick={() => removeVariant('colors', color)}/>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section data-field="stock">
              <label style={{display:'block', marginBottom:'10px', fontSize:'14px', fontWeight:'700', color:C.text}}>7. المخزون والكمية</label>
              <div style={{display:'flex', alignItems:'center', gap:'12px', background: fieldErrors.stock ? '#fef2f2' : C.white, border:`2px solid ${errorBorder('stock') || C.border}`, padding:'12px 15px', borderRadius:'15px'}}>
                <div style={{background:`${C.green}10`, width:'40px', height:'40px', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', color:C.green}}>
                  <BoxSeam size={20}/>
                </div>
                <input type="number" value={form.stock} onChange={e=>setForm({...form, stock:e.target.value})} 
                  style={{flex:1, border:'none', outline:'none', fontSize:'15px', fontWeight:'600', background:'transparent'}} 
                  placeholder="الكمية المتوفرة (مثلاً: 50 قطعة)"/>
              </div>
              <ErrorMsg field="stock" />
            </section>

            <section data-field="images">
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px'}}>
                 <label style={{fontSize:'14px', fontWeight:'700', color:C.text}}>8. صور المنتج</label>
                 <span style={{fontSize:'12px', color:C.gray}}>{form.images.length} / {status?.maxImagesPerProduct || 2} صور</span>
              </div>
              <div style={{display:'flex', gap:'12px', flexWrap:'wrap', background: fieldErrors.images ? '#fef2f2' : C.bg, padding:'15px', borderRadius:'20px', border:`2px dashed ${errorBorder('images') || C.border}`}}>
                 {form.images.map((img, i) => (
                   <div key={i} style={{position:'relative', width:'85px', height:'85px', borderRadius:'15px', overflow:'hidden', boxShadow:'0 4px 10px rgba(0,0,0,0.1)'}}>
                     <img src={img.url} style={{width:'100%', height:'100%', objectFit:'cover'}} alt=""/>
                     <UIButton onClick={()=>removeImage(i)} style={{position:'absolute', top:'5px', right:'5px', background:C.red, color:C.white, border:'none', width:'24px', height:'24px', borderRadius:'50%', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'}}><Trash size={12}/></UIButton>
                   </div>
                 ))}
                 {form.images.length < (status?.maxImagesPerProduct || 2) && (
                   <div onClick={()=>fileInputRef.current.click()} style={{width:'85px', height:'85px', borderRadius:'15px', border:`2px dashed ${errorBorder('images') || C.gold}`, background:C.white, color: fieldErrors.images ? '#ef4444' : C.gold, cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'5px', transition:'0.3s'}}>
                     <CloudUpload size={24}/>
                     <span style={{fontSize:'10px', fontWeight:'bold'}}>رفع صورة</span>
                   </div>
                 )}
              </div>
              <ErrorMsg field="images" />
              <input type="file" ref={fileInputRef} hidden multiple accept="image/*" onChange={handleFileChange}/>
            </section>
         </div>
       </div>

       {/* Actions */}
       <div style={{display:'flex', flexDirection:isMobile ? 'column' : 'row', gap:'15px', marginTop:'40px', borderTop:`1px solid ${C.border}`, paddingTop:'30px', justifyContent:'center'}}>
         <UIButton onClick={onCancel} style={{padding:isMobile ? '12px' : '14px 40px', background:'transparent', border:`2px solid ${C.border}`, borderRadius:'15px', color:C.gray, fontWeight:'700', cursor:'pointer', transition:'0.3s'}}>إلغاء</UIButton>
         <UIButton onClick={() => {
           const errors = {};
           if (!form.name) errors.name = 'يرجى إدخال اسم المنتج';
           if (!form.description) errors.description = 'يرجى إدخال وصف المنتج';
           if (!form.price) errors.price = 'يرجى إدخال سعر المنتج';
           if (!form.isOffer && !form.category) errors.category = 'يرجى اختيار تصنيف المنتج';
           if (!form.stock) errors.stock = 'يرجى إدخال كمية المخزون';
           if (form.images.length === 0) errors.images = 'يرجى رفع صورة واحدة على الأقل';
           if (Object.keys(errors).length > 0) {
             setFieldErrors(errors);
             // Scroll to first error
             const firstErrorKey = Object.keys(errors)[0];
             const el = document.querySelector(`[data-field="${firstErrorKey}"]`);
             if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
             return;
           }
           setFieldErrors({});
           onSave(form);
         }} style={{padding:'14px 60px', background:`linear-gradient(135deg, ${C.sidebar}, #1a3a6a)`, border:'none', borderRadius:'15px', color:C.gold, fontWeight:'800', fontSize:'16px', cursor:'pointer', boxShadow:`0 10px 20px ${C.sidebar}40`, transition:'0.3s'}}>
           {editProduct ? 'تحديث المنتج' : 'نشر المنتج الآن 🚀'}
         </UIButton>
       </div>
    </div>
  );
};

export const ProductCard = ({ product, onEdit, onDelete, onToggleVisibility }) => (
  <div style={{background:C.card, borderRadius:'12px', border:`1px solid ${C.border}`, overflow:'visible', transition:'transform 0.2s', position: 'relative'}}>
    {product.isOffer && (
      <div style={{ position: 'absolute', top: '8px', left: '8px', background: C.red, color: 'white', fontSize: '10px', fontWeight: 'bold', padding: '2px 8px', borderRadius: '50px', zIndex: 2 }}>عرض اليوم 🔥</div>
    )}
    <div style={{position:'relative', height:'140px', borderRadius:'12px 12px 0 0', overflow:'hidden'}}>
      <img src={product.images?.[0]?.url || 'https://via.placeholder.com/150'} style={{width:'100%', height:'100%', objectFit:'cover', opacity:product.isVisible?1:0.5}} alt=""/>
      {!product.isVisible && <div style={{position:'absolute', inset:0, background:'rgba(0,0,0,0.4)', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontSize:'12px'}}>مخفي</div>}
    </div>
    <div style={{padding:'12px'}}>
      <h4 style={{fontSize:'14px', fontWeight:'700', marginBottom:'6px', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{product.name}</h4>
      <div style={{fontSize:'15px', color:C.gold, fontWeight:'800'}}>{product.price} ريال</div>
      
      <div style={{display:'flex', gap:'6px', marginTop:'15px'}}>
        <UIButton onClick={()=>onEdit(product)} style={{flex:1, padding:'6px', background:`${C.gold}15`, border:'none', borderRadius:'6px', color:C.gold, cursor:'pointer'}}><PencilSquare size={14}/></UIButton>
        <UIButton onClick={()=>onToggleVisibility(product)} style={{flex:1, padding:'6px', background:`${C.gray}15`, border:'none', borderRadius:'6px', color:C.gray, cursor:'pointer'}}>{product.isVisible ? <EyeSlash size={14}/> : <Eye size={14}/>}</UIButton>
        <UIButton onClick={()=>onDelete(product.id)} style={{flex:1, padding:'6px', background:`${C.red}15`, border:'none', borderRadius:'6px', color:C.red, cursor:'pointer'}}><Trash size={14}/></UIButton>
      </div>
    </div>
  </div>
);
