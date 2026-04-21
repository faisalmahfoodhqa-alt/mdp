import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircleFill, Truck, GeoAlt, Wallet2, CurrencyExchange, CashStack, Clock, Calendar, Shop, X, Cash, ArrowRight, Whatsapp, InfoCircle } from 'react-bootstrap-icons';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import LocationPicker from '../components/common/LocationPicker';
import { DELIVERY_COMPANIES } from '../data/deliveryCompanies';
import WALLET_OPTIONS from '../data/walletOptions';

const CheckoutPage = () => {
   const { cartItems, clearCart, clearCartBySeller } = useCart();
   const { user, updateUser } = useAuth();
   const navigate = useNavigate();
   const location = useLocation();

   const queryParams = new URLSearchParams(window.location.search);
   const sellerFilter = queryParams.get('seller');
   const itemsToBuy = sellerFilter
      ? cartItems.filter(item => (item.storeName || item.seller?.name || item.seller || 'متجر غير معروف') === sellerFilter)
      : cartItems;

   const colors = {
      primary: '#0a1a3a',
      gold: '#c88c23',
      goldLight: '#f4e9d5',
      white: '#ffffff',
      border: '#c88c2344',
      text: '#ffffff',
      gray: '#ffffffaa',
      red: '#e74c3c'
   };

   // State
   const [deliveryDay, setDeliveryDay] = useState('اليوم');
   const [deliveryTimeSlot, setDeliveryTimeSlot] = useState('');
   const [deliveryType, setDeliveryType] = useState('delivery');
   const [showAddressForm, setShowAddressForm] = useState(false);
   const [hasSavedAddress, setHasSavedAddress] = useState(false);
   const [saveAsDefault, setSaveAsDefault] = useState(false);
   const [shippingInfo, setShippingInfo] = useState({
      name: '',
      phone: '',
      address: '',
      details: '',
      lat: null,
      lng: null
   });

   const [paymentMethod, setPaymentMethod] = useState('cash');
   const [selectedWallet, setSelectedWallet] = useState(null);
   const [walletDropdownOpen, setWalletDropdownOpen] = useState(false);
   const [couponInput, setCouponInput] = useState('');
   const [discount, setDiscount] = useState(0);
   const [appliedCode, setAppliedCode] = useState('');
   const [couponError, setCouponError] = useState('');
   const [orderNotes, setOrderNotes] = useState('');
   const [loading, setLoading] = useState(false);
   const [orderSuccess, setOrderSuccess] = useState(false);
   const [orderDetails, setOrderDetails] = useState(null);
   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

   useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth <= 768);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
   }, []);

   const [showPaymentModal, setShowPaymentModal] = useState(false);
   const [paymentCode, setPaymentCode] = useState('');
   const [paymentError, setPaymentError] = useState('');
   const [sellerPaymentMethods, setSellerPaymentMethods] = useState([]);

   useEffect(() => {
      if (!user) {
         if (window.showToast) window.showToast('يرجى تسجيل الدخول لإتمام الطلب', 'info');
         navigate('/login?redirect=/checkout' + (sellerFilter ? `?seller=${encodeURIComponent(sellerFilter)}` : ''));
         return;
      }

      setShippingInfo({
         name: user.fullName || user.username || '',
         phone: user.phone || '',
         address: '',
         details: user.detailedAddress || user.address?.details || '',
         lat: user.storeLocation?.lat || null,
         lng: user.storeLocation?.lng || null
      });

      if (user.storeLocation?.lat) {
         setHasSavedAddress(true);
      }

      // تحديد البائع بشكل ذكي: إما من الرابط أو من المنتج الأول في السلة
      const firstItem = itemsToBuy[0];
      const targetSellerName = (sellerFilter || firstItem?.storeName || firstItem?.seller?.name || firstItem?.seller || '').toString().trim();
      const targetSellerId = firstItem?.sellerId || firstItem?.seller?.id;

      console.log("🔍 Debug - targetSellerName:", targetSellerName);
      console.log("🔍 Debug - targetSellerId:", targetSellerId);

      if (targetSellerId || targetSellerName) {
         const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
         let sellerObj = null;

         // 1. حاول البحث بالـ ID أولاً
         if (targetSellerId) {
            sellerObj = allUsers.find(u => u.id == targetSellerId || u.id?.toString() === targetSellerId?.toString());
         }

         // 2. إذا لم يتم العثور، حاول البحث باسم المتجر
         if (!sellerObj && targetSellerName) {
            sellerObj = allUsers.find(u =>
               u.storeName?.trim().toLowerCase() === targetSellerName.toLowerCase() ||
               u.username?.trim().toLowerCase() === targetSellerName.toLowerCase()
            );
         }

         // 3. إذا كان itemsToBuy فيه sellerId في كل item
         if (!sellerObj && firstItem?.sellerId) {
            sellerObj = allUsers.find(u => u.id == firstItem.sellerId);
         }

         console.log("🔍 Debug - sellerObj found:", sellerObj);

         if (!sellerObj && targetSellerName) {
            sellerObj = allUsers.find(u =>
               (u.storeName?.trim() === targetSellerName.trim()) ||
               (u.username?.trim() === targetSellerName.trim())
            );
         }

         if (sellerObj && sellerObj.paymentMethods) {
            setSellerPaymentMethods(sellerObj.paymentMethods);
         } else {
            setSellerPaymentMethods([]);
         }
      }
   }, [user, navigate, sellerFilter, itemsToBuy]);

   const productTotal = itemsToBuy.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
   const deliveryFee = deliveryType === 'delivery' ? 1000 : 0;
   const grandTotal = productTotal + deliveryFee - discount;

   const handleApplyCoupon = () => {
      if (!couponInput.trim()) return;
      let totalDiscount = 0;
      let found = false;
      itemsToBuy.forEach(item => {
         if (item.couponCode && item.couponCode.toUpperCase() === couponInput.toUpperCase()) {
            const itemTotal = parseFloat(item.price) * item.quantity;
            const itemDiscount = itemTotal * (parseFloat(item.couponDiscount) / 100);
            totalDiscount += itemDiscount;
            found = true;
         }
      });

      if (found) {
         setDiscount(totalDiscount);
         setAppliedCode(couponInput.toUpperCase());
         setCouponError('');
      } else {
         setDiscount(0);
         setAppliedCode('');
         setCouponError('كود الخصم غير صحيح أو غير مخصص لهذه المنتجات');
      }
   };

   const handleLocationSelect = (data) => {
      setShippingInfo(prev => ({
         ...prev,
         lat: data.lat,
         lng: data.lng,
         address: data.address
      }));
   };

   const saveAddressAndClose = () => {
      if (!shippingInfo.lat) {
         alert("يرجى تحديد موقع التوصيل على الخريطة");
         return;
      }
      if (!shippingInfo.name || !shippingInfo.phone) {
         alert("يرجى إكمال بيانات الاتصال");
         return;
      }
      setHasSavedAddress(true);
      setShowAddressForm(false);

      if (saveAsDefault && user) {
         updateUser({
            ...user,
            phone: shippingInfo.phone,
            detailedAddress: shippingInfo.details,
            storeLocation: { lat: shippingInfo.lat, lng: shippingInfo.lng }
         });
      }
   };

   const groupedItems = itemsToBuy.reduce((acc, item) => {
      const seller = item.storeName || item.seller?.name || item.seller || 'متجر غير معروف';
      if (!acc[seller]) acc[seller] = [];
      acc[seller].push(item);
      return acc;
   }, {});

   const handleCompleteOrder = () => {
      if (deliveryType === 'delivery' && !hasSavedAddress) {
         alert("يرجى إضافة عنوان التوصيل");
         return;
      }
      if (paymentMethod === 'wallet') {
         if (!selectedWallet) {
            alert("يرجى اختيار المحفظة أو الحوالة المناسبة");
            return;
         }
         setShowPaymentModal(true);
         setPaymentCode('');
         setPaymentError('');
         return;
      }
      processOrder();
   };

   const handleVerifyPayment = () => {
      const walletName = typeof selectedWallet === 'string' ? selectedWallet : selectedWallet?.type || '';
      const isTransfer = walletName.includes('حوالة') || walletName.includes('بنك') || walletName.includes('كريمي');
      if (!isTransfer) {
         if (paymentCode.trim().length < 6) {
            setPaymentError(`الكود المدخل غير صحيح. تأكد من إدخال رقم العملية او كود الشراء لتطبيق ${walletName} بشكل صحيح.`);
            return;
         }
      } else {
         if (!paymentCode.trim()) {
            setPaymentError('يرجى إدخال رقم الإيداع أو الحوالة.');
            return;
         }
      }
      setShowPaymentModal(false);
      processOrder(paymentCode);
   }

   const processOrder = (verificationCode = null) => {
      setLoading(true);
      setTimeout(() => {
         const orderId = 'ORD-' + Math.floor(Math.random() * 1000000);
         const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
         const vendorsInOrder = Object.keys(groupedItems);
         const sellerNotifications = vendorsInOrder.map(vendorName => {
            const sellerObj = allUsers.find(u => u.storeName === vendorName || u.username === vendorName);
            return {
               vendorName,
               sellerPhone: sellerObj?.phone || '',
               deliveryCompany: sellerObj?.deliveryService || 'merchant',
               items: groupedItems[vendorName]
            };
         });

         const order = {
            id: orderId,
            items: itemsToBuy.map(item => ({
               ...item,
               image: item.image || (item.images?.[0]?.url || item.images?.[0]) || 'https://via.placeholder.com/80'
            })),
            subTotal: productTotal,
            deliveryFee,
            total: grandTotal,
            discount,
            appliedCoupon: appliedCode,
            deliveryType,
            deliveryTime: { day: deliveryDay, time: deliveryTimeSlot },
            payment: { method: paymentMethod, wallet: selectedWallet, verificationCode },
            shipping: deliveryType === 'delivery' ? shippingInfo : null,
            notes: orderNotes,
            date: new Date().toISOString(),
            status: 'pending',
            sellerName: sellerFilter || 'متعدد المتاجر',
            sellerNotifications
         };

         // Send a notification directly to the specific sellers' accounts
         vendorsInOrder.forEach(vendorName => {
            const vendorIndex = allUsers.findIndex(u => u.storeName === vendorName || u.username === vendorName);
            if (vendorIndex !== -1) {
               if (!allUsers[vendorIndex].notifications) allUsers[vendorIndex].notifications = [];
               const totalObj = groupedItems[vendorName].reduce((sum, it) => sum + (parseFloat(it.price) * it.quantity), 0);
               allUsers[vendorIndex].notifications.unshift({
                  id: Date.now() + Math.random(),
                  title: `طلب جديد بقيمة ${totalObj} ريال 📦`,
                  message: `طلب من العميل: ${shippingInfo.name} | الجوال: ${shippingInfo.phone} | المنتجات: ${groupedItems[vendorName].map(it => `${it.name}(${it.quantity})`).join('، ')}`,
                  type: 'success',
                  date: new Date().toISOString(),
                  read: false
               });
            }
         });
         localStorage.setItem('users', JSON.stringify(allUsers));

         const currentOrders = user?.orders || [];
         updateUser({ orders: [order, ...currentOrders] });

         if (sellerFilter) {
            clearCartBySeller(sellerFilter);
         } else {
            clearCart();
         }

         setOrderDetails({
            id: orderId,
            sellerNotifications,
            customerName: shippingInfo.name,
            customerPhone: shippingInfo.phone,
            location: deliveryType === 'pickup' 
              ? (() => {
                  const firstVendor = vendorsInOrder[0];
                  const sellerObj = allUsers.find(u => u.storeName === firstVendor || u.username === firstVendor);
                  const loc = sellerObj?.storeLocation;
                  return loc?.lat ? `https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=${loc.lat},${loc.lng}` : 'استلام من المحل';
                })()
              : (shippingInfo.lat ? `https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=${shippingInfo.lat},${shippingInfo.lng}` : 'توصيل للموقع')
         });

         setOrderSuccess(true);
         setLoading(false);
         window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1500);
   };

   const boxStyles = {
      background: '#162343',
      borderRadius: '20px',
      padding: '24px',
      marginBottom: '20px',
      boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
      border: `1px solid ${colors.gold}22`
   };

   const headerStyles = {
      fontSize: '18px',
      fontWeight: '900',
      color: colors.gold,
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: isMobile ? 'center' : 'flex-start',
      gap: '10px'
   };

   if (orderSuccess && orderDetails) {
      return (
         <div style={{ direction: 'rtl', minHeight: '60vh', background: colors.primary, padding: '40px 15px' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto', background: '#162343', borderRadius: '25px', padding: '40px 30px', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.3)', border: `1px solid ${colors.gold}30` }}>
               <div style={{ width: '80px', height: '80px', background: `${colors.gold}15`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 25px' }}>
                  <CheckCircleFill size={45} color={colors.gold} />
               </div>
               <h2 style={{ fontSize: '28px', color: 'white', marginBottom: '15px', fontWeight: 'bold' }}>تم التأكيد!</h2>
               <p style={{ color: 'white', marginBottom: '30px', lineHeight: '1.6', fontSize: '16px', opacity: 0.8 }}>
                  تم استلام طلبك بنجاح. رقم الطلب هو: <br />
                  <strong style={{ color: colors.gold, fontSize: '20px' }}>{orderDetails.id}</strong>
               </p>

               <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px' }}>
                  {/* ... (WhatsApp buttons commented out) ... */}

                  <button onClick={() => navigate(`/track-order/${orderDetails.id}`)} style={{ width: '100%', padding: '16px', background: colors.gold, color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', marginTop: '10px' }}>
                     تتبع الطلب
                  </button>
                  <button onClick={() => navigate('/')} style={{ width: '100%', padding: '16px', background: 'transparent', color: colors.gold, border: `2px solid ${colors.gold}`, borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}>
                     العودة للرئيسية
                  </button>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div style={{ direction: 'rtl', minHeight: '100vh', background: colors.primary, padding: '0 0 120px 0' }}>

         <div style={{
            padding: '15px 20px',
            maxWidth: '600px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            justifyContent: isMobile ? 'center' : 'flex-start',
            gap: '15px'
         }}>
            <button
               onClick={() => navigate(-1)}
               style={{
                  background: 'transparent',
                  border: `1px solid ${colors.gold}40`,
                  cursor: 'pointer',
                  padding: '10px',
                  display: 'flex',
                  borderRadius: '12px',
                  position: isMobile ? 'absolute' : 'relative',
                  right: isMobile ? '15px' : 'auto',
                  zIndex: 2
               }}
            >
               <ArrowRight size={22} color={colors.gold} />
            </button>
            <span style={{
               fontSize: '22px',
               fontWeight: '900',
               color: 'white',
               textAlign: 'center'
            }}>إتمام الطلب</span>
         </div>

         <div style={{ maxWidth: '600px', margin: '0 auto', padding: '15px' }}>

            <div style={boxStyles}>
               <h3 style={headerStyles}><Calendar color={colors.gold} /> وقت التوصيل</h3>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                  <button
                     onClick={() => { setDeliveryDay('اليوم'); setDeliveryTimeSlot(''); }}
                     style={{ padding: '14px', borderRadius: '14px', border: `2px solid ${deliveryDay === 'اليوم' ? colors.gold : colors.gold + '22'}`, background: deliveryDay === 'اليوم' ? `${colors.gold}15` : 'transparent', fontWeight: 'bold', color: deliveryDay === 'اليوم' ? colors.gold : '#ffffff88', cursor: 'pointer' }}
                  >
                     اليوم
                  </button>
                  <button
                     onClick={() => setDeliveryDay('غداً')}
                     style={{ padding: '14px', borderRadius: '14px', border: `2px solid ${deliveryDay === 'غداً' ? colors.gold : colors.gold + '22'}`, background: deliveryDay === 'غداً' ? `${colors.gold}15` : 'transparent', fontWeight: 'bold', color: deliveryDay === 'غداً' ? colors.gold : '#ffffff88', cursor: 'pointer' }}
                  >
                     غداً
                  </button>
               </div>

               {deliveryDay === 'اليوم' ? (
                  <div style={{ display: 'flex', alignItems: 'center', background: `${colors.gold}15`, padding: '15px', borderRadius: '15px', border: `1px solid ${colors.gold}30`, gap: '12px' }}>
                     <Clock style={{ color: colors.gold, flexShrink: 0 }} size={20} />
                     <span style={{ fontSize: '14px', color: 'white', fontWeight: 'bold' }}>سيتم التوصيل في أقرب وقت ممكن اليوم</span>
                  </div>
               ) : (
                  <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '12px 18px', borderRadius: '15px', border: `1px solid #ffffff15` }}>
                     <Clock style={{ marginLeft: '12px', color: '#ffffff88' }} />
                     <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '14px', color: '#ffffff88' }}>اختر الوقت المفضل:</span>
                        <input
                           type="time"
                           value={deliveryTimeSlot}
                           onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                           style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '16px', fontWeight: 'bold', color: 'white', cursor: 'pointer', fontFamily: 'inherit' }}
                        />
                     </div>
                  </div>
               )}
            </div>

            <div style={boxStyles}>
               <h3 style={headerStyles}><Truck color={colors.gold} /> نوع التوصيل</h3>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '15px' }}>
                  <button
                     onClick={() => setDeliveryType('delivery')}
                     style={{ padding: '14px', borderRadius: '14px', border: `2px solid ${deliveryType === 'delivery' ? colors.gold : '#ffffff15'}`, background: deliveryType === 'delivery' ? colors.gold : 'transparent', fontWeight: 'bold', color: 'white', cursor: 'pointer' }}
                  >
                     توصيل للموقع
                  </button>
                  <button
                     onClick={() => setDeliveryType('pickup')}
                     style={{ padding: '14px', borderRadius: '14px', border: `2px solid ${deliveryType === 'pickup' ? colors.gold : '#ffffff15'}`, background: deliveryType === 'pickup' ? colors.gold : 'transparent', fontWeight: 'bold', color: 'white', cursor: 'pointer' }}
                  >
                     استلام من المحل
                  </button>
               </div>

               {deliveryType === 'delivery' && (
                  <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: `1px dashed #ffffff22` }}>
                     {hasSavedAddress ? (
                        <div style={{ padding: '20px', borderRadius: '18px', background: 'rgba(255,255,255,0.03)', border: `1px solid #ffffff10` }}>
                           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: colors.gold, fontWeight: '900' }}>
                                 <GeoAlt size={20} /> تفاصيل العنوان
                              </div>
                              <button
                                 onClick={() => setShowAddressForm(true)}
                                 style={{ padding: '6px 15px', fontSize: '13px', fontWeight: 'bold', color: colors.gold, background: 'transparent', border: `1px solid ${colors.gold}40`, borderRadius: '20px', cursor: 'pointer' }}
                              >
                                 تعديل
                              </button>
                           </div>
                           <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                                 <span style={{ color: '#ffffff88', width: '70px', flexShrink: 0 }}>المستلم:</span>
                                 <span style={{ color: 'white', fontWeight: 'bold' }}>{shippingInfo.name}</span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                                 <span style={{ color: '#ffffff88', width: '70px', flexShrink: 0 }}>الجوال:</span>
                                 <span style={{ color: 'white', fontWeight: 'bold', direction: 'ltr' }}>{shippingInfo.phone}</span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px' }}>
                                 <span style={{ color: '#ffffff88', width: '70px', flexShrink: 0 }}>العنوان:</span>
                                 <span style={{ color: 'white', fontWeight: '600', lineHeight: '1.4' }}>{shippingInfo.details || 'تم التحديد عبر الخريطة'}</span>
                              </div>
                           </div>
                        </div>
                     ) : (
                        <button
                           onClick={() => setShowAddressForm(true)}
                           style={{ width: '100%', padding: '18px', borderRadius: '15px', border: `2px dashed ${colors.gold}`, background: 'transparent', color: colors.gold, fontWeight: 'bold', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer' }}
                        >
                           <GeoAlt /> أضف عنوان التوصيل
                        </button>
                     )}
                  </div>
               )}

               {deliveryType === 'pickup' && (
                  <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: `1px dashed #ffffff22` }}>
                     {(() => {
                        const sellerName = sellerFilter || Object.keys(groupedItems)[0];
                        const allUsers = JSON.parse(localStorage.getItem('users') || '[]');

                        let currentCartItem = itemsToBuy.find(item => (item.storeName || item.seller?.name || item.seller || 'متجر غير معروف') === sellerName);
                        let sellerObj = null;

                        if (currentCartItem && currentCartItem.sellerId) {
                           sellerObj = allUsers.find(u => u.id === currentCartItem.sellerId);
                        }

                        if (!sellerObj) {
                           sellerObj = allUsers.find(u => u.storeName?.trim() === sellerName?.trim() || u.username?.trim() === sellerName?.trim());
                        }

                        const finalStoreName = sellerObj?.storeName || sellerObj?.username || currentCartItem?.storeName || currentCartItem?.seller?.name || sellerName || 'متجر غير معروف';
                        
                        // الربط المباشر بحقل تفاصيل العنوان الذي يكتبه البائع
                        const displayAddress = sellerObj?.addressDetails || 
                                              currentCartItem?.seller?.addressDetails || 
                                              currentCartItem?.addressDetails ||
                                              'سيتواصل معك التاجر لتحديد موقع الاستلام';

                        const finalLocation = sellerObj?.storeLocation || currentCartItem?.seller?.location || null;
                        const DEFAULT_LAT = 15.352;
                        const DEFAULT_LNG = 44.207;
                        
                        const hasRealLocation = finalLocation &&
                           finalLocation.lat &&
                           finalLocation.lng &&
                           (Math.abs(Number(finalLocation.lat) - DEFAULT_LAT) > 0.001 || Math.abs(Number(finalLocation.lng) - DEFAULT_LNG) > 0.001);

                        return (
                           <div style={{ padding: '18px 20px', borderRadius: '18px', background: 'rgba(255,255,255,0.03)', border: `1px solid #ffffff10`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '15px' }}>
                              <div style={{ flex: 1 }}>
                                 <div style={{ fontSize: '13px', color: colors.gold, fontWeight: 'bold', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Shop size={16} /> استلم طلبك بنفسك من مقر التاجر:
                                 </div>

                                 <div style={{ fontSize: '15px', color: 'white', fontWeight: 'bold', lineHeight: '1.4', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                                    <GeoAlt size={18} color={colors.gold} style={{ marginTop: '2px', flexShrink: 0 }} />
                                    <span>{displayAddress}</span>
                                 </div>

                                 {/* تم حذف اسم المتجر من هنا بناءً على طلبك */}
                              </div>

                              {hasRealLocation && (
                                 <a
                                    href={`https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=${finalLocation.lat},${finalLocation.lng}`}
                                    target="_blank" rel="noopener noreferrer"
                                    style={{ padding: '12px 18px', background: colors.gold, color: 'white', borderRadius: '12px', fontSize: '14px', textDecoration: 'none', fontWeight: 'bold', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap', boxShadow: `0 5px 15px ${colors.gold}40`, flexShrink: 0 }}
                                 >
                                    <GeoAlt size={18} /> فتح الخريطة
                                 </a>
                              )}
                           </div>
                        );
                     })()}
                  </div>
               )}
            </div>

            <div style={boxStyles}>
               <h3 style={headerStyles}><Wallet2 color={colors.gold} /> طريقة الدفع</h3>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '18px', borderRadius: '15px', border: `2px solid ${paymentMethod === 'cash' ? colors.gold : '#ffffff15'}`, background: paymentMethod === 'cash' ? `${colors.gold}15` : 'transparent', cursor: 'pointer' }}>
                     <input type="radio" name="payment" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} style={{ width: '22px', height: '22px', accentColor: colors.gold }} />
                     <CashStack size={22} color={colors.gold} />
                     <div style={{ fontWeight: 'bold', fontSize: '16px', color: 'white' }}>الدفع عند الاستلام</div>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '18px', borderRadius: '15px', border: `2px solid ${paymentMethod === 'wallet' ? colors.gold : '#ffffff15'}`, background: paymentMethod === 'wallet' ? `${colors.gold}15` : 'transparent', cursor: 'pointer' }}>
                     <input type="radio" name="payment" checked={paymentMethod === 'wallet'} onChange={() => setPaymentMethod('wallet')} style={{ width: '22px', height: '22px', accentColor: colors.gold }} />
                     <CurrencyExchange size={22} color={colors.gold} />
                     <div style={{ fontWeight: 'bold', fontSize: '16px', color: 'white' }}>المحافظ الإلكترونية / حوالات</div>
                  </label>

                  {paymentMethod === 'wallet' && (
                     <div style={{ marginTop: '15px' }}>
                        <div style={{ borderRadius: '18px', border: `1.5px solid ${colors.gold}30`, background: '#1a2b4b', overflow: 'hidden', boxShadow: '0 5px 20px rgba(0,0,0,0.2)' }}>
                           {sellerPaymentMethods && sellerPaymentMethods.length > 0 ? (
                              sellerPaymentMethods.map((method, idx) => (
                                 <div key={idx} onClick={() => setSelectedWallet(method)} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 20px', cursor: 'pointer', borderBottom: idx < sellerPaymentMethods.length - 1 ? `1px solid #ffffff10` : 'none', background: selectedWallet === method ? 'rgba(255,255,255,0.08)' : 'transparent', transition: 'all 0.2s' }}>
                                    {(() => {
                                       const wOpt = WALLET_OPTIONS.find(w => w.name === method.type);
                                       return wOpt?.image ? (
                                          <img src={wOpt.image} alt={method.type} style={{ width: '35px', height: '35px', objectFit: 'contain', borderRadius: '8px' }} />
                                       ) : (
                                          <span style={{ fontSize: '26px' }}>{wOpt?.icon || '💰'}</span>
                                       );
                                    })()}
                                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                       <span style={{ fontWeight: 'bold', fontSize: '15px', color: 'white' }}>{method.type}</span>
                                       <span style={{ fontSize: '13px', color: colors.gold, fontWeight: 'bold' }}>{method.number}</span>
                                    </div>
                                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: `2px solid ${selectedWallet === method ? colors.gold : '#ffffff30'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                       {selectedWallet === method && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: colors.gold }} />}
                                    </div>
                                 </div>
                              ))
                           ) : (
                              <div style={{ padding: '30px 20px', textAlign: 'center', color: '#ffffff88' }}>
                                 <InfoCircle size={35} color={colors.gold} style={{ marginBottom: '12px', opacity: 0.6 }} />
                                 <div style={{ fontSize: '15px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>لا توجد محافظ إلكترونية لهذا التاجر</div>
                                 <div style={{ fontSize: '12px', padding: '0 10px', lineHeight: '1.6' }}>
                                    عذراً، هذا التاجر لم يقم بإضافة وسيلة دفع إلكترونية حتى الآن. يمكنك اختيار "الدفع عند الاستلام".
                                 </div>
                              </div>
                           )}
                        </div>
                     </div>
                  )}
               </div>
            </div>

            <div style={boxStyles}>
               <div style={{ marginBottom: '20px' }}>
                  <textarea placeholder="ملاحظات إضافية على الطلب..." value={orderNotes} onChange={(e) => setOrderNotes(e.target.value)} style={{ width: '100%', padding: '15px', border: `1.5px solid #ffffff15`, borderRadius: '15px', background: 'rgba(255,255,255,0.03)', resize: 'none', height: '90px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', color: 'white' }} />
               </div>

               <div style={{ marginBottom: '25px', position: 'relative' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                     <div style={{ flex: 1, position: 'relative' }}>
                        <input
                           type="text"
                           placeholder="هل لديك كود خصم؟"
                           value={couponInput}
                           onChange={(e) => setCouponInput(e.target.value)}
                           disabled={!!appliedCode}
                           style={{ width: '100%', padding: '14px 18px', borderRadius: '15px', border: `1.5px solid ${appliedCode ? '#27ae60' : colors.gold + '44'}`, background: 'rgba(255,255,255,0.03)', color: 'white', outline: 'none', fontSize: '14px' }}
                        />
                        {appliedCode && <CheckCircleFill style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} color="#27ae60" size={18} />}
                     </div>
                     {appliedCode ? (
                        <button onClick={() => { setAppliedCode(''); setDiscount(0); setCouponInput(''); }} style={{ padding: '0 20px', borderRadius: '15px', border: `1px solid ${colors.red}`, background: 'transparent', color: colors.red, fontWeight: 'bold', cursor: 'pointer' }}>إزالة</button>
                     ) : (
                        <button onClick={handleApplyCoupon} style={{ padding: '0 25px', borderRadius: '15px', border: 'none', background: colors.gold, color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>تطبيق</button>
                     )}
                  </div>
                  {appliedCode && <div style={{ fontSize: '12px', color: '#27ae60', marginTop: '6px', paddingRight: '10px' }}>تم تطبيق خصم الكوبون بنجاح! 🎉</div>}
               </div>

               <h3 style={{ ...headerStyles, marginTop: '10px' }}><Cash color={colors.gold} /> تفاصيل التكلفة</h3>

               <div style={{ borderTop: `1px dashed #ffffff22`, paddingTop: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '15px' }}>
                     <span style={{ color: '#ffffff88' }}>قيمة المنتجات:</span>
                     <span style={{ fontWeight: 'bold', color: 'white' }}>{productTotal.toLocaleString()} ريال</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '15px' }}>
                     <span style={{ color: '#ffffff88' }}>تكلفة التوصيل:</span>
                     <span style={{ fontWeight: 'bold', color: deliveryType === 'delivery' ? colors.red : colors.gold }}>{deliveryType === 'delivery' ? `+${deliveryFee.toLocaleString()} ريال` : 'مجاناً'}</span>
                  </div>
                  {discount > 0 && (
                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '15px', color: '#27ae60' }}>
                        <span>خصم الكوبون:</span>
                        <span style={{ fontWeight: 'bold' }}>-{discount.toLocaleString()} ريال</span>
                     </div>
                  )}
               </div>
            </div>

         </div>

         <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#162343', padding: '20px', boxShadow: '0 -10px 40px rgba(0,0,0,0.3)', zIndex: 100, borderTop: `1px solid ${colors.gold}30` }}>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '0 5px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff88' }}>الإجمالي الصافي:</span>
                  <span style={{ fontSize: '26px', fontWeight: '900', color: colors.gold }}>{grandTotal.toLocaleString()} <span style={{ fontSize: '14px' }}>ريال</span></span>
               </div>
               <button onClick={handleCompleteOrder} disabled={loading} style={{ width: '100%', padding: '18px', borderRadius: '15px', background: colors.gold, color: 'white', border: 'none', fontWeight: 'bold', fontSize: '19px', cursor: 'pointer', boxShadow: '0 10px 25px rgba(200, 140, 35, 0.3)' }}>
                  {loading ? 'جاري إرسال طلبك...' : 'تأكيد الطلب الآن'}
               </button>
            </div>
         </div>

         {showAddressForm && (
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: colors.primary, zIndex: 900, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
               <div style={{ padding: '15px 20px', borderBottom: `1px solid #ffffff15`, display: 'flex', alignItems: 'center', gap: '15px', background: '#162343', position: 'sticky', top: 0, zIndex: 10 }}>
                  <button onClick={() => setShowAddressForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px' }}><ArrowRight size={24} color={colors.gold} /></button>
                  <h3 style={{ margin: 0, fontSize: '18px', color: 'white', fontWeight: 'bold' }}>تحديث موقع التوصيل</h3>
               </div>

               <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ background: '#162343', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                     <LocationPicker onLocationSelect={handleLocationSelect} label="تحديد موقعك" />
                  </div>

                  <div style={{ padding: '25px 20px', background: colors.primary, borderRadius: '30px 30px 0 0', marginTop: '-30px', position: 'relative', zIndex: 10, border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 -10px 30px rgba(0,0,0,0.3)' }}>
                     <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '10px', color: colors.gold, background: 'rgba(200, 140, 35, 0.1)', padding: '5px 12px', borderRadius: '8px', display: 'inline-block' }}>📍 تفاصيل الموقع (يتم تحديثه تلقائياً)</label>
                        <textarea value={shippingInfo.details} onChange={(e) => setShippingInfo({ ...shippingInfo, details: e.target.value })} placeholder="مثلاً: حي الروضة، شارع الأمير، بجوار صيدلية الأمل..." style={{ width: '100%', padding: '15px', borderRadius: '15px', border: `1.5px solid ${colors.gold}30`, fontSize: '14px', minHeight: '100px', outline: 'none', background: 'rgba(255,255,255,0.03)', color: 'white', lineHeight: '1.6' }} />
                     </div>

                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                        <div>
                           <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', color: 'white' }}>الاسم الكامل</label>
                           <input type="text" value={shippingInfo.name} onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: `1.5px solid #ffffff15`, fontSize: '14px', outline: 'none', background: 'rgba(255,255,255,0.03)', color: 'white' }} />
                        </div>
                        <div>
                           <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', color: 'white' }}>رقم التواصل</label>
                           <input type="text" value={shippingInfo.phone} onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: `1.5px solid #ffffff15`, fontSize: '14px', outline: 'none', background: 'rgba(255,255,255,0.03)', color: 'white' }} />
                        </div>
                     </div>

                     <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: 'white' }}>
                        <input type="checkbox" checked={saveAsDefault} onChange={() => setSaveAsDefault(!saveAsDefault)} />
                        <span style={{ fontSize: '14px' }}>تعيين كعنوان افتراضي للمرات القادمة</span>
                     </label>

                     <button onClick={saveAddressAndClose} style={{ width: '100%', padding: '18px', background: colors.gold, color: 'white', border: 'none', borderRadius: '15px', marginTop: '30px', fontWeight: 'bold', fontSize: '18px', boxShadow: `0 10px 20px ${colors.gold}30` }}>اعتمد هذا العنوان</button>
                  </div>
               </div>
            </div>
         )}

         {showPaymentModal && (
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(10,26,58,0.85)', zIndex: 950, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(10px)' }}>
               <div style={{ background: '#162343', padding: '30px', borderRadius: '25px', width: '100%', maxWidth: '420px', textAlign: 'center', position: 'relative', border: `2px solid ${colors.gold}44` }}>
                  <button onClick={() => setShowPaymentModal(false)} style={{ position: 'absolute', top: '15px', right: '15px', background: '#ffffff10', border: 'none', borderRadius: '50%', width: '35px', height: '35px', cursor: 'pointer' }}><X size={24} color="white" /></button>
                  <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: `${colors.gold}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}><Wallet2 size={35} color={colors.gold} /></div>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', color: 'white' }}>تأكيد التحويل</h3>
                  <p style={{ fontSize: '14px', color: '#ffffff88', marginBottom: '25px' }}>
                     يرجى التحويل إلى حساب البائع: <br />
                     <strong style={{ color: colors.gold, fontSize: '18px' }}>
                        {typeof selectedWallet === 'object' ? `${selectedWallet.type}: ${selectedWallet.number}` : selectedWallet}
                     </strong>
                     <br />
                     ثم أدخل رقم العملية أو كود الشراء لإتمام الطلب.
                  </p>
                  <input type="text" value={paymentCode} onChange={(e) => { setPaymentCode(e.target.value); setPaymentError(''); }} placeholder="رقم العملية أو الكود" style={{ width: '100%', padding: '16px', borderRadius: '15px', border: `2px solid ${paymentError ? colors.red : colors.gold + '44'}`, textAlign: 'center', fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', outline: 'none', background: 'rgba(255,255,255,0.03)', color: 'white' }} />
                  {paymentError && <div style={{ fontSize: '13px', color: colors.red, marginBottom: '15px' }}>{paymentError}</div>}
                  <button onClick={handleVerifyPayment} style={{ width: '100%', padding: '16px', background: colors.gold, color: 'white', border: 'none', borderRadius: '15px', fontWeight: 'bold' }}>تأكيد وإرسال الطلب</button>
               </div>
            </div>
         )}
      </div>
   );
};

export default CheckoutPage;
