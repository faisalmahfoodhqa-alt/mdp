import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircleFill, Truck, GeoAlt, Wallet2, CurrencyExchange, CashStack, Clock, Calendar, Shop, X, Cash, ArrowRight, Whatsapp, InfoCircle } from 'react-bootstrap-icons';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import LocationPicker from '../components/common/LocationPicker';
import { DELIVERY_COMPANIES } from '../data/deliveryCompanies';
import WALLET_OPTIONS from '../data/walletOptions';
import { haversineKm } from '../utils/geo';
import { UIButton } from '../shared/components/ui';
import { useBackend } from '../config/backend';
import { backendApi } from '../api/backendApi';

const CheckoutPage = () => {
   const { cartItems, clearCart, clearCartBySeller } = useCart();
   const { user, updateUser, refreshOrders } = useAuth();
   const navigate = useNavigate();
   const location = useLocation();

   const queryParams = new URLSearchParams(window.location.search);
   const sellerFilter = queryParams.get('seller');
   const itemsToBuy = React.useMemo(() => {
      return sellerFilter
         ? cartItems.filter(item => (item.storeName || item.seller?.name || item.seller || 'متجر غير معروف') === sellerFilter)
         : cartItems;
   }, [cartItems, sellerFilter]);

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

   const getUsers = () => {
      try {
         const allUsers = JSON.parse(localStorage.getItem('all_users') || '[]');
         if (Array.isArray(allUsers) && allUsers.length > 0) return allUsers;
         const legacyUsers = JSON.parse(localStorage.getItem('users') || '[]');
         return Array.isArray(legacyUsers) ? legacyUsers : [];
      } catch {
         return [];
      }
   };

   const saveUsers = (users) => {
      localStorage.setItem('all_users', JSON.stringify(users));
      // Keep legacy key synced for backward compatibility
      localStorage.setItem('users', JSON.stringify(users));
   };

   const getAllOrders = () => {
      try {
         const orders = JSON.parse(localStorage.getItem('all_orders') || '[]');
         return Array.isArray(orders) ? orders : [];
      } catch {
         return [];
      }
   };

   const saveAllOrders = (orders) => {
      localStorage.setItem('all_orders', JSON.stringify(orders));
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
   const [paymentReceipt, setPaymentReceipt] = useState(null);
   const [paymentReceiptPreview, setPaymentReceiptPreview] = useState('');
   const [sellerPaymentMethods, setSellerPaymentMethods] = useState([]);
   const [checkoutSeller, setCheckoutSeller] = useState(null);

   // تهيئة بيانات العميل فقط مرة واحدة لتجنب إعادة مسح الحقول أثناء الكتابة
   useEffect(() => {
      if (!user) {
         if (window.showToast) window.showToast('يرجى تسجيل الدخول لإتمام الطلب', 'info');
         navigate('/login?redirect=/checkout' + (sellerFilter ? `?seller=${encodeURIComponent(sellerFilter)}` : ''));
         return;
      }

      setShippingInfo(prev => ({
         ...prev,
         name: user.fullName || user.username || '',
         phone: user.phone || '',
         address: user.savedDeliveryAddress?.address || prev.address,
         details: user.savedDeliveryAddress?.details || user.detailedAddress || user.address?.details || prev.details,
         lat: user.savedDeliveryAddress?.lat || prev.lat,
         lng: user.savedDeliveryAddress?.lng || prev.lng
      }));

      if (user.savedDeliveryAddress?.lat) {
         setHasSavedAddress(true);
      }
   }, [user, navigate, sellerFilter]);

   /* جلب بيانات البائع (محافظ + إعدادات التوصيل) لنفس المتجر الذي يُشترى منه */
   useEffect(() => {
      if (itemsToBuy.length === 0) {
         setCheckoutSeller(null);
         setSellerPaymentMethods([]);
         return;
      }

      const firstItem = itemsToBuy[0];
      const targetSellerName = (sellerFilter || firstItem?.storeName || firstItem?.seller?.name || firstItem?.seller || '').toString().trim();
      const targetSellerId = firstItem?.sellerId || firstItem?.seller?.id;

      let sellerObj = null;
      if (targetSellerId || targetSellerName) {
         const allUsers = getUsers();

         if (targetSellerId) {
            sellerObj = allUsers.find(u => u.id == targetSellerId || u.id?.toString() === targetSellerId?.toString());
         }
         if (!sellerObj && targetSellerName) {
            sellerObj = allUsers.find(u =>
               u.storeName?.trim().toLowerCase() === targetSellerName.toLowerCase() ||
               u.username?.trim().toLowerCase() === targetSellerName.toLowerCase()
            );
         }
         if (!sellerObj && firstItem?.sellerId) {
            sellerObj = allUsers.find(u => u.id == firstItem.sellerId);
         }
         if (!sellerObj && targetSellerName) {
            sellerObj = allUsers.find(u =>
               (u.storeName?.trim() === targetSellerName.trim()) ||
               (u.username?.trim() === targetSellerName.trim())
            );
         }
      }

      setCheckoutSeller(sellerObj || null);
      setSellerPaymentMethods(sellerObj?.paymentMethods && Array.isArray(sellerObj.paymentMethods) ? sellerObj.paymentMethods : []);
   }, [itemsToBuy, sellerFilter]);

   const PLATFORM_DELIVERY_RATE_PER_KM = 500;

   const buildSellerFulfillmentSnapshot = (seller) => {
      if (!seller) return null;
      const addr = seller.address;
      const addressLine =
         typeof addr === 'string'
            ? addr
            : [addr?.city, addr?.street, addr?.district, addr?.building].filter(Boolean).join('، ') ||
              seller.addressDetails ||
              '';
      return {
         sellerId: seller.id,
         storeName: seller.storeName || seller.username || '',
         phone: seller.phone || '',
         addressLine,
         addressDetails: seller.addressDetails || '',
         storeLocation: seller.storeLocation || null,
         storeFrontPhotoUrl: seller.storeFrontPhotoUrl || '',
         deliveryMode: seller.deliveryMode === 'platform' ? 'platform' : 'seller'
      };
   };

   const deliveryQuote = React.useMemo(() => {
      if (deliveryType !== 'delivery') {
         return { fee: 0, distanceKm: null, detailLabel: '', blocking: false, blockingMessage: '' };
      }
      const seller = checkoutSeller;
      if (!seller?.hasDelivery) {
         return {
            fee: 0,
            distanceKm: null,
            detailLabel: '',
            blocking: true,
            blockingMessage: 'هذا المتجر لم يفعّل التوصيل للموقع. اختر «استلام من المحل» أو تواصل مع المتجر.'
         };
      }
      const dm = seller.deliveryMode === 'platform' ? 'platform' : 'seller';
      if (dm === 'platform') {
         const slat = seller.storeLocation?.lat;
         const slng = seller.storeLocation?.lng;
         const clat = shippingInfo.lat;
         const clng = shippingInfo.lng;
         const hasStore = typeof slat === 'number' && typeof slng === 'number' && !Number.isNaN(slat) && !Number.isNaN(slng);
         const hasCustomer = typeof clat === 'number' && typeof clng === 'number' && !Number.isNaN(clat) && !Number.isNaN(clng);
         if (!hasStore || !hasCustomer) {
            return {
               fee: null,
               distanceKm: null,
               detailLabel: '',
               blocking: true,
               blockingMessage:
                  'توصيل توريد نت يحتاج موقع المتجر على الخريطة (من إعدادات البائع) وموقع التوصيل. جرّب اختيار موقعك بدقة.'
            };
         }
         const dist = haversineKm(slat, slng, clat, clng);
         const fee = Math.max(0, Math.round(dist * PLATFORM_DELIVERY_RATE_PER_KM));
         return {
            fee,
            distanceKm: dist,
            detailLabel: `≈ ${dist.toFixed(1)} كم × ${PLATFORM_DELIVERY_RATE_PER_KM} ر.ي/كم (توريد نت)`,
            blocking: false,
            blockingMessage: ''
         };
      }
      const perKm = Number(seller.deliveryPricePerKm);
      const slat = seller.storeLocation?.lat;
      const slng = seller.storeLocation?.lng;
      const clat = shippingInfo.lat;
      const clng = shippingInfo.lng;
      const hasStore = typeof slat === 'number' && typeof slng === 'number' && !Number.isNaN(slat) && !Number.isNaN(slng);
      const hasCustomer = typeof clat === 'number' && typeof clng === 'number' && !Number.isNaN(clat) && !Number.isNaN(clng);

      if (!(perKm > 0)) {
         return {
            fee: null,
            distanceKm: null,
            detailLabel: '',
            blocking: true,
            blockingMessage: 'التاجر لم يحدّد بعد سعر التوصيل بالكيلومتر. راجع لاحقاً أو اختر الاستلام من المحل أو تواصل مع المتجر.'
         };
      }
      if (!hasStore) {
         return {
            fee: null,
            distanceKm: null,
            detailLabel: '',
            blocking: true,
            blockingMessage: 'لم يُضبط موقع متجر التاجر على الخريطة، فلا يمكن حساب التوصيل. تواصل مع المتجر أو استخدم خيار الاستلام.'
         };
      }
      if (!hasCustomer) {
         return {
            fee: null,
            distanceKm: null,
            detailLabel: '',
            blocking: true,
            blockingMessage: 'يرجى فتح عنوان التوصيل وتحديد موقعك على الخريطة لمعرفة تكلفة التوصيل وإتمام الطلب.'
         };
      }

      const distanceKm = haversineKm(slat, slng, clat, clng);
      const fee = Math.max(0, Math.ceil(distanceKm * perKm));
      return {
         fee,
         distanceKm,
         detailLabel: `≈ ${distanceKm.toFixed(1)} كم × ${perKm} ر.س للكيلومتر`,
         blocking: false,
         blockingMessage: ''
      };
   }, [deliveryType, checkoutSeller, shippingInfo.lat, shippingInfo.lng]);

   const productTotal = itemsToBuy.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
   const deliveryFee = deliveryType === 'delivery' && !deliveryQuote.blocking && deliveryQuote.fee != null ? deliveryQuote.fee : 0;
   const grandTotal = productTotal + deliveryFee - discount;
   const platformWalletBalance = Math.max(0, Number(user?.walletBalance) || 0);
   const platformWalletOption = WALLET_OPTIONS.find(w => w.name === 'محفظتي');

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
            savedDeliveryAddress: {
               name: shippingInfo.name,
               phone: shippingInfo.phone,
               address: shippingInfo.address,
               details: shippingInfo.details,
               lat: shippingInfo.lat,
               lng: shippingInfo.lng
            }
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
      if (deliveryType === 'delivery' && deliveryQuote.blocking) {
         alert(deliveryQuote.blockingMessage || 'تعذر حساب التوصيل للموقع.');
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
      if (paymentMethod === 'platform_wallet') {
         if (platformWalletBalance < grandTotal) {
            alert('رصيد محفظتك غير كافٍ لتغطية قيمة الطلب.');
            return;
         }
      }
      processOrder();
   };

   const handleReceiptUpload = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) {
         setPaymentError('حجم الصورة كبير جداً. الحد الأقصى 5 ميجابايت.');
         return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
         setPaymentReceipt(ev.target.result);
         setPaymentReceiptPreview(ev.target.result);
         setPaymentError('');
      };
      reader.readAsDataURL(file);
   };

   const handleVerifyPayment = () => {
      if (!paymentCode.trim()) {
         setPaymentError('يرجى إدخال رقم مرجع العملية أو كود الشراء.');
         return;
      }
      if (!paymentReceipt) {
         setPaymentError('يرجى رفع صورة إيصال التحويل للتحقق.');
         return;
      }
      setShowPaymentModal(false);
      processOrder(paymentCode);
   }

   const processOrder = (verificationCode = null) => {
      setLoading(true);

      if (useBackend) {
         (async () => {
            try {
               const orderId = 'ORD-' + Math.floor(Math.random() * 1000000);
               const allUsers = getUsers();

               let walletBalanceBefore = Math.max(0, Number(user?.walletBalance) || 0);
               if (paymentMethod === 'platform_wallet') {
                  if (walletBalanceBefore < grandTotal) {
                     alert('رصيد محفظتك غير كافٍ لتغطية قيمة الطلب.');
                     return;
                  }
               }
               const vendorsInOrder = Object.keys(groupedItems);
               const sellerNotifications = vendorsInOrder.map((vendorName) => {
                  const sellerObj = allUsers.find((u) => u.storeName === vendorName || u.username === vendorName);
                  const sellerDeliveryMode = sellerObj?.deliveryMode === 'platform' ? 'platform' : 'seller';
                  return {
                     vendorName,
                     sellerPhone: sellerObj?.phone || '',
                     deliveryCompany: sellerObj?.deliveryService || 'merchant',
                     deliveryMode: sellerDeliveryMode,
                     items: groupedItems[vendorName]
                  };
               });

               const firstSellerName = vendorsInOrder[0];
               const firstSeller = allUsers.find((u) => u.storeName === firstSellerName || u.username === firstSellerName);
               const sellerDeliveryMode = firstSeller?.deliveryMode === 'platform' ? 'platform' : 'seller';
               const customerDeliveryChoice = deliveryType === 'pickup' ? 'PICKUP' : 'DELIVERY';
               const fulfillmentModeResolved = customerDeliveryChoice === 'PICKUP' ? 'pickup' : sellerDeliveryMode;
               const sellerFulfillmentSnapshot = buildSellerFulfillmentSnapshot(firstSeller);

               const order = {
                  id: orderId,
                  customerId: user?.id || user?.phone,
                  customerName: shippingInfo.name || user?.fullName || user?.username || '',
                  customerPhone: shippingInfo.phone || user?.phone || '',
                  items: itemsToBuy.map((item) => ({
                     ...item,
                     sellerId: item.sellerId || item.seller?.id,
                     image: item.image || (item.images?.[0]?.url || item.images?.[0]) || 'https://via.placeholder.com/80'
                  })),
                  subTotal: productTotal,
                  deliveryFee,
                  deliveryDistanceKm: deliveryQuote.distanceKm,
                  deliveryPricingNote: deliveryQuote.detailLabel || '',
                  platformDeliveryRatePerKmYer:
                     fulfillmentModeResolved === 'platform' ? PLATFORM_DELIVERY_RATE_PER_KM : undefined,
                  total: grandTotal,
                  discount,
                  appliedCoupon: appliedCode,
                  deliveryType,
                  deliveryTime: { day: deliveryDay, time: deliveryTimeSlot },
                  payment:
                     paymentMethod === 'platform_wallet'
                        ? {
                             method: 'platform_wallet',
                             walletPaid: grandTotal,
                             walletBalanceBefore,
                             walletBalanceAfter: walletBalanceBefore - grandTotal,
                             paymentVerified: true
                          }
                        : {
                             method: paymentMethod,
                             wallet: selectedWallet,
                             verificationCode,
                             receipt: paymentReceipt || null,
                             paymentVerified: paymentMethod === 'cash'
                          },
                  shipping: deliveryType === 'delivery' ? shippingInfo : null,
                  notes: orderNotes,
                  date: new Date().toISOString(),
                  status: paymentMethod === 'wallet' ? 'pending_payment' : 'pending',
                  sellerName: sellerFilter || 'متعدد المتاجر',
                  sellerNotifications,
                  customerDeliveryChoice,
                  fulfillmentModeResolved,
                  platformDeliveryPending: fulfillmentModeResolved === 'platform',
                  sellerFulfillmentSnapshot
               };

               const created = await backendApi.createOrder(order);
               const resolvedId = created?.id || orderId;

               let newWalletBalance = walletBalanceBefore;
               if (paymentMethod === 'platform_wallet') {
                  newWalletBalance = walletBalanceBefore - grandTotal;
                  await updateUser({ walletBalance: newWalletBalance });
               }

               await refreshOrders();

               if (sellerFilter) clearCartBySeller(sellerFilter);
               else clearCart();

               setOrderDetails({
                  id: resolvedId,
                  sellerNotifications,
                  customerName: shippingInfo.name,
                  customerPhone: shippingInfo.phone,
                  location:
                     deliveryType === 'pickup'
                        ? (() => {
                             const firstVendor = vendorsInOrder[0];
                             const sellerObj = allUsers.find((u) => u.storeName === firstVendor || u.username === firstVendor);
                             const loc = sellerObj?.storeLocation;
                             return loc?.lat
                                ? `https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=${loc.lat},${loc.lng}`
                                : 'استلام من المحل';
                          })()
                        : shippingInfo.lat
                          ? `https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=${shippingInfo.lat},${shippingInfo.lng}`
                          : 'توصيل للموقع'
               });

               setOrderSuccess(true);
               window.scrollTo({ top: 0, behavior: 'smooth' });
            } catch (e) {
               alert(e.message || 'تعذر إنشاء الطلب');
            } finally {
               setLoading(false);
            }
         })();
         return;
      }

      setTimeout(() => {
         const orderId = 'ORD-' + Math.floor(Math.random() * 1000000);
         const allUsers = getUsers();

         let walletBalanceBefore = Math.max(0, Number(user?.walletBalance) || 0);
         if (paymentMethod === 'platform_wallet') {
            if (walletBalanceBefore < grandTotal) {
               setLoading(false);
               alert('رصيد محفظتك غير كافٍ لتغطية قيمة الطلب.');
               return;
            }
         }
         const vendorsInOrder = Object.keys(groupedItems);
         const sellerNotifications = vendorsInOrder.map(vendorName => {
            const sellerObj = allUsers.find(u => u.storeName === vendorName || u.username === vendorName);
            const sellerDeliveryMode = sellerObj?.deliveryMode === 'platform' ? 'platform' : 'seller';
            return {
               vendorName,
               sellerPhone: sellerObj?.phone || '',
               deliveryCompany: sellerObj?.deliveryService || 'merchant',
               deliveryMode: sellerDeliveryMode,
               items: groupedItems[vendorName]
            };
         });

         const firstSellerName = vendorsInOrder[0];
         const firstSeller = allUsers.find(u => u.storeName === firstSellerName || u.username === firstSellerName);
         const sellerDeliveryMode = firstSeller?.deliveryMode === 'platform' ? 'platform' : 'seller';
         const customerDeliveryChoice = deliveryType === 'pickup' ? 'PICKUP' : 'DELIVERY';
         const fulfillmentModeResolved = customerDeliveryChoice === 'PICKUP'
            ? 'pickup'
            : sellerDeliveryMode;
         const sellerFulfillmentSnapshot = buildSellerFulfillmentSnapshot(firstSeller);

         const order = {
            id: orderId,
            customerId: user?.id || user?.phone,
            customerName: shippingInfo.name || user?.fullName || user?.username || '',
            customerPhone: shippingInfo.phone || user?.phone || '',
            items: itemsToBuy.map(item => ({
               ...item,
               image: item.image || (item.images?.[0]?.url || item.images?.[0]) || 'https://via.placeholder.com/80'
            })),
            subTotal: productTotal,
            deliveryFee,
            deliveryDistanceKm: deliveryQuote.distanceKm,
            deliveryPricingNote: deliveryQuote.detailLabel || '',
            platformDeliveryRatePerKmYer:
               fulfillmentModeResolved === 'platform' ? PLATFORM_DELIVERY_RATE_PER_KM : undefined,
            total: grandTotal,
            discount,
            appliedCoupon: appliedCode,
            deliveryType,
            deliveryTime: { day: deliveryDay, time: deliveryTimeSlot },
            payment: paymentMethod === 'platform_wallet'
               ? {
                  method: 'platform_wallet',
                  walletPaid: grandTotal,
                  walletBalanceBefore,
                  walletBalanceAfter: walletBalanceBefore - grandTotal,
                  paymentVerified: true
               }
               : { method: paymentMethod, wallet: selectedWallet, verificationCode, receipt: paymentReceipt || null, paymentVerified: paymentMethod === 'cash' ? true : false },
            shipping: deliveryType === 'delivery' ? shippingInfo : null,
            notes: orderNotes,
            date: new Date().toISOString(),
            status: paymentMethod === 'wallet' ? 'pending_payment' : 'pending',
            sellerName: sellerFilter || 'متعدد المتاجر',
            sellerNotifications,
            customerDeliveryChoice,
            fulfillmentModeResolved,
            platformDeliveryPending: fulfillmentModeResolved === 'platform',
            sellerFulfillmentSnapshot
         };

         const allOrders = getAllOrders();
         saveAllOrders([order, ...allOrders]);

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
         const customerIndex = allUsers.findIndex((u) => String(u.id) === String(user?.id));
         let newWalletBalance = walletBalanceBefore;
         if (paymentMethod === 'platform_wallet') {
            newWalletBalance = walletBalanceBefore - grandTotal;
         }
         if (customerIndex !== -1) {
            const existingOrders = allUsers[customerIndex].orders || [];
            allUsers[customerIndex] = {
               ...allUsers[customerIndex],
               orders: [order, ...existingOrders],
               ...(paymentMethod === 'platform_wallet' ? { walletBalance: newWalletBalance } : {})
            };
         }
         saveUsers(allUsers);

         const currentOrders = user?.orders || [];
         const userUpdates = { orders: [order, ...currentOrders] };
         if (paymentMethod === 'platform_wallet') userUpdates.walletBalance = newWalletBalance;
         updateUser(userUpdates);

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
         <div style={{ direction: 'rtl', minHeight: '100vh', background: colors.primary, padding: '40px 15px' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto', background: '#162343', borderRadius: '25px', padding: '40px 30px', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.3)', border: `1px solid ${colors.gold}30` }}>
               <div style={{ width: '80px', height: '80px', background: `${colors.gold}15`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 25px' }}>
                  <CheckCircleFill size={45} color={colors.gold} />
               </div>
               <h2 style={{ fontSize: '28px', color: 'white', marginBottom: '15px', fontWeight: 'bold' }}>تم الطلب</h2>
               <p style={{ color: 'white', marginBottom: '30px', lineHeight: '1.6', fontSize: '16px', opacity: 0.8 }}>
                  {paymentMethod === 'wallet' ? 'تم إرسال طلبك وبانتظار تأكيد الدفع من البائع.' : paymentMethod === 'platform_wallet' ? 'تم خصم المبلغ من محفظتك واستلام الطلب بنجاح.' : 'تم استلام طلبك بنجاح.'} رقم الطلب هو: <br />
                  <strong style={{ color: colors.gold, fontSize: '20px' }}>{orderDetails.id}</strong>
               </p>

               <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px' }}>
                  {/* ... (WhatsApp buttons commented out) ... */}

                  <UIButton onClick={() => navigate(`/track-order/${orderDetails.id}`)} style={{ width: '100%', padding: '16px', background: colors.gold, color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', marginTop: '10px' }}>
                     تتبع الطلب
                  </UIButton>
                  <UIButton onClick={() => navigate('/')} style={{ width: '100%', padding: '16px', background: 'transparent', color: colors.gold, border: `2px solid ${colors.gold}`, borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}>
                     العودة للرئيسية
                  </UIButton>
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
            <UIButton
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
            </UIButton>
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
                  <UIButton
                     onClick={() => { setDeliveryDay('اليوم'); setDeliveryTimeSlot(''); }}
                     style={{ padding: '14px', borderRadius: '14px', border: `2px solid ${deliveryDay === 'اليوم' ? colors.gold : colors.gold + '22'}`, background: deliveryDay === 'اليوم' ? `${colors.gold}15` : 'transparent', fontWeight: 'bold', color: deliveryDay === 'اليوم' ? colors.gold : '#ffffff88', cursor: 'pointer' }}
                  >
                     اليوم
                  </UIButton>
                  <UIButton
                     onClick={() => setDeliveryDay('غداً')}
                     style={{ padding: '14px', borderRadius: '14px', border: `2px solid ${deliveryDay === 'غداً' ? colors.gold : colors.gold + '22'}`, background: deliveryDay === 'غداً' ? `${colors.gold}15` : 'transparent', fontWeight: 'bold', color: deliveryDay === 'غداً' ? colors.gold : '#ffffff88', cursor: 'pointer' }}
                  >
                     غداً
                  </UIButton>
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
                  <UIButton
                     onClick={() => setDeliveryType('delivery')}
                     style={{ padding: '14px', borderRadius: '14px', border: `2px solid ${deliveryType === 'delivery' ? colors.gold : '#ffffff15'}`, background: deliveryType === 'delivery' ? colors.gold : 'transparent', fontWeight: 'bold', color: 'white', cursor: 'pointer' }}
                  >
                     توصيل للموقع
                  </UIButton>
                  <UIButton
                     onClick={() => setDeliveryType('pickup')}
                     style={{ padding: '14px', borderRadius: '14px', border: `2px solid ${deliveryType === 'pickup' ? colors.gold : '#ffffff15'}`, background: deliveryType === 'pickup' ? colors.gold : 'transparent', fontWeight: 'bold', color: 'white', cursor: 'pointer' }}
                  >
                     استلام من المحل
                  </UIButton>
               </div>

               {deliveryType === 'delivery' && (
                  <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: `1px dashed #ffffff22` }}>
                     {hasSavedAddress ? (
                        <div style={{ padding: '20px', borderRadius: '18px', background: 'rgba(255,255,255,0.03)', border: `1px solid #ffffff10` }}>
                           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: colors.gold, fontWeight: '900' }}>
                                 <GeoAlt size={20} /> تفاصيل العنوان
                              </div>
                              <UIButton
                                 onClick={() => setShowAddressForm(true)}
                                 style={{ padding: '6px 15px', fontSize: '13px', fontWeight: 'bold', color: colors.gold, background: 'transparent', border: `1px solid ${colors.gold}40`, borderRadius: '20px', cursor: 'pointer' }}
                              >
                                 تعديل
                              </UIButton>
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
                        <UIButton
                           onClick={() => setShowAddressForm(true)}
                           style={{ width: '100%', padding: '18px', borderRadius: '15px', border: `2px dashed ${colors.gold}`, background: 'transparent', color: colors.gold, fontWeight: 'bold', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer' }}
                        >
                           <GeoAlt /> أضف عنوان التوصيل
                        </UIButton>
                     )}
                     {deliveryType === 'delivery' && deliveryQuote.blocking && (
                        <div style={{ marginTop: '14px', padding: '12px 14px', borderRadius: '12px', background: 'rgba(255, 159, 67, 0.12)', border: '1px solid rgba(255, 159, 67, 0.35)', fontSize: '13px', color: '#ffcc95', lineHeight: 1.55 }}>
                           {deliveryQuote.blockingMessage}
                        </div>
                     )}
                     {deliveryType === 'delivery' && !deliveryQuote.blocking && deliveryQuote.detailLabel && (
                        <div style={{ marginTop: '14px', padding: '12px 14px', borderRadius: '12px', background: `rgba(200, 140, 35, 0.12)`, border: `1px solid ${colors.gold}40`, fontSize: '13px', color: colors.goldLight, lineHeight: 1.55 }}>
                           {checkoutSeller?.deliveryMode === 'platform' ? 'تقدير توصيل المنصة: ' : 'تقدير التوصيل (حسب المسافة × سعر الكيلومتر الذي يحدده التاجر): '}
                           <strong style={{ color: 'white' }}>{deliveryQuote.detailLabel}</strong>
                           {' — '}<strong style={{ color: 'white' }}>{deliveryFee.toLocaleString()} ر.س</strong>
                        </div>
                     )}
                  </div>
               )}

               {deliveryType === 'pickup' && (
                  <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: `1px dashed #ffffff22` }}>
                     {(() => {
                        const sellerName = sellerFilter || Object.keys(groupedItems)[0];
                        const allUsers = getUsers();

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

                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '18px', borderRadius: '15px', border: `2px solid ${paymentMethod === 'platform_wallet' ? colors.gold : '#ffffff15'}`, background: paymentMethod === 'platform_wallet' ? `${colors.gold}15` : 'transparent', cursor: 'pointer' }}>
                     <input type="radio" name="payment" checked={paymentMethod === 'platform_wallet'} onChange={() => setPaymentMethod('platform_wallet')} style={{ width: '22px', height: '22px', accentColor: colors.gold }} />
                     {platformWalletOption?.image ? (
                        <img src={platformWalletOption.image} alt="محفظتي" style={{ width: '28px', height: '28px', objectFit: 'contain', borderRadius: '8px', flexShrink: 0 }} />
                     ) : (
                        <Wallet2 size={22} color={colors.gold} />
                     )}
                     <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 'bold', fontSize: '16px', color: 'white' }}>محفظتي</div>
                        <div style={{ fontSize: '13px', color: platformWalletBalance >= grandTotal ? colors.gold : colors.red, fontWeight: '600', marginTop: '4px' }}>
                           الرصيد: {platformWalletBalance.toLocaleString()} ريال
                           {grandTotal > 0 && platformWalletBalance < grandTotal ? ' — لا يغطي قيمة الطلب' : ''}
                        </div>
                     </div>
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
                        <UIButton onClick={() => { setAppliedCode(''); setDiscount(0); setCouponInput(''); }} style={{ padding: '0 20px', borderRadius: '15px', border: `1px solid ${colors.red}`, background: 'transparent', color: colors.red, fontWeight: 'bold', cursor: 'pointer' }}>إزالة</UIButton>
                     ) : (
                        <UIButton onClick={handleApplyCoupon} style={{ padding: '0 25px', borderRadius: '15px', border: 'none', background: colors.gold, color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>تطبيق</UIButton>
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '15px', alignItems: 'flex-start', gap: '10px' }}>
                     <span style={{ color: '#ffffff88' }}>تكلفة التوصيل:</span>
                     <span style={{ fontWeight: 'bold', color: deliveryType === 'delivery' ? colors.red : colors.gold, textAlign: 'left' }}>
                        {deliveryType !== 'delivery' ? 'مجاناً'
                           : deliveryQuote.blocking
                              ? <span style={{ fontSize: '13px', color: '#ff9f43', fontWeight: '700' }}>يُحدد بعد استكمال العنوان/إعدادات التاجر</span>
                              : `+${deliveryFee.toLocaleString()} ريال`}
                     </span>
                  </div>
                  {deliveryType === 'delivery' && deliveryQuote.detailLabel && !deliveryQuote.blocking && (
                     <div style={{ fontSize: '12px', color: '#ffffff88', marginBottom: '12px', lineHeight: 1.5 }}>{deliveryQuote.detailLabel}</div>
                  )}
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
               <UIButton onClick={handleCompleteOrder} disabled={loading || (deliveryType === 'delivery' && deliveryQuote.blocking)} style={{ width: '100%', padding: '18px', borderRadius: '15px', background: (deliveryType === 'delivery' && deliveryQuote.blocking) ? '#555' : colors.gold, color: 'white', border: 'none', fontWeight: 'bold', fontSize: '19px', cursor: (deliveryType === 'delivery' && deliveryQuote.blocking) ? 'not-allowed' : 'pointer', boxShadow: '0 10px 25px rgba(200, 140, 35, 0.3)', opacity: (deliveryType === 'delivery' && deliveryQuote.blocking) ? 0.75 : 1 }}>
                  {loading ? 'جاري إرسال طلبك...' : deliveryType === 'delivery' && deliveryQuote.blocking ? 'أكمل بيانات التوصيل أولاً' : 'تأكيد الطلب الآن'}
               </UIButton>
            </div>
         </div>

         {showAddressForm && (
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: colors.primary, zIndex: 900, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
               <div style={{ padding: '15px 20px', borderBottom: `1px solid #ffffff15`, display: 'flex', alignItems: 'center', gap: '15px', background: '#162343', position: 'sticky', top: 0, zIndex: 10 }}>
                  <UIButton onClick={() => setShowAddressForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px' }}><ArrowRight size={24} color={colors.gold} /></UIButton>
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

                     <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
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

                     <UIButton onClick={saveAddressAndClose} style={{ width: '100%', padding: '18px', background: colors.gold, color: 'white', border: 'none', borderRadius: '15px', marginTop: '30px', fontWeight: 'bold', fontSize: '18px', boxShadow: `0 10px 20px ${colors.gold}30` }}>اعتمد هذا العنوان</UIButton>
                  </div>
               </div>
            </div>
         )}

         {showPaymentModal && (
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(10,26,58,0.85)', zIndex: 950, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(10px)' }}>
               <div style={{ background: '#162343', padding: '30px', borderRadius: '25px', width: '100%', maxWidth: '420px', textAlign: 'center', position: 'relative', border: `2px solid ${colors.gold}44`, maxHeight: '90vh', overflowY: 'auto' }}>
                  <UIButton onClick={() => setShowPaymentModal(false)} style={{ position: 'absolute', top: '15px', right: '15px', background: '#ffffff10', border: 'none', borderRadius: '50%', width: '35px', height: '35px', cursor: 'pointer' }}><X size={24} color="white" /></UIButton>
                  <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: `${colors.gold}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}><Wallet2 size={35} color={colors.gold} /></div>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', color: 'white' }}>تأكيد التحويل</h3>
                  
                  {/* معلومات الحساب */}
                  <div style={{ background: `${colors.gold}12`, padding: '15px', borderRadius: '15px', marginBottom: '20px', border: `1px dashed ${colors.gold}40` }}>
                     <div style={{ fontSize: '13px', color: '#ffffff88', marginBottom: '5px' }}>حوّل المبلغ إلى:</div>
                     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '8px' }}>
                        {(() => {
                           const walletType = typeof selectedWallet === 'object' ? selectedWallet.type : selectedWallet;
                           const wOpt = WALLET_OPTIONS.find(w => w.name === walletType);
                           return wOpt?.image ? (
                              <img src={wOpt.image} alt={walletType} style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '10px', background: 'white', padding: '3px' }} />
                           ) : (
                              <span style={{ fontSize: '30px' }}>{wOpt?.icon || '💰'}</span>
                           );
                        })()}
                        <div style={{ color: colors.gold, fontSize: '18px', fontWeight: 'bold' }}>
                           {typeof selectedWallet === 'object' ? `${selectedWallet.type}: ${selectedWallet.number}` : selectedWallet}
                        </div>
                     </div>
                     <div style={{ fontSize: '22px', fontWeight: '900', color: 'white', marginTop: '8px' }}>{grandTotal.toLocaleString()} ريال</div>
                     {typeof selectedWallet === 'object' && selectedWallet.number && (
                        <UIButton onClick={() => { navigator.clipboard.writeText(selectedWallet.number); }} style={{ marginTop: '8px', padding: '5px 15px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: 'white', fontSize: '12px', cursor: 'pointer' }}>📋 نسخ الرقم</UIButton>
                     )}
                  </div>

                  {/* رقم مرجع العملية */}
                  <div style={{ textAlign: 'right', marginBottom: '15px' }}>
                     <label style={{ fontSize: '13px', color: '#ffffff88', marginBottom: '6px', display: 'block' }}>رقم مرجع العملية / كود الشراء *</label>
                     <input type="text" value={paymentCode} onChange={(e) => { setPaymentCode(e.target.value); setPaymentError(''); }} placeholder="أدخل رقم مرجع العملية" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: `1.5px solid ${paymentError && !paymentCode ? colors.red : colors.gold + '44'}`, fontSize: '16px', fontWeight: 'bold', outline: 'none', background: 'rgba(255,255,255,0.03)', color: 'white', boxSizing: 'border-box' }} />
                  </div>

                  {/* رفع صورة الإيصال */}
                  <div style={{ textAlign: 'right', marginBottom: '15px' }}>
                     <label style={{ fontSize: '13px', color: '#ffffff88', marginBottom: '6px', display: 'block' }}>📸 صورة إيصال التحويل *</label>
                     {paymentReceiptPreview ? (
                        <div style={{ position: 'relative', marginBottom: '10px' }}>
                           <img src={paymentReceiptPreview} alt="إيصال" style={{ width: '100%', maxHeight: '200px', objectFit: 'contain', borderRadius: '12px', border: `2px solid ${colors.gold}40` }} />
                           <UIButton onClick={() => { setPaymentReceipt(null); setPaymentReceiptPreview(''); }} style={{ position: 'absolute', top: '5px', left: '5px', background: colors.red, border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={16} color="white" /></UIButton>
                        </div>
                     ) : (
                        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '25px', borderRadius: '12px', border: `2px dashed ${paymentError && !paymentReceipt ? colors.red : colors.gold + '44'}`, background: 'rgba(255,255,255,0.02)', cursor: 'pointer', color: '#ffffff88', fontSize: '14px' }}>
                           <span style={{ fontSize: '30px' }}>📷</span>
                           <span>اضغط لرفع صورة الإيصال</span>
                           <input type="file" accept="image/*" onChange={handleReceiptUpload} style={{ display: 'none' }} />
                        </label>
                     )}
                  </div>

                  {paymentError && <div style={{ fontSize: '13px', color: colors.red, marginBottom: '15px', textAlign: 'right' }}>{paymentError}</div>}
                  <UIButton onClick={handleVerifyPayment} style={{ width: '100%', padding: '16px', background: colors.gold, color: 'white', border: 'none', borderRadius: '15px', fontWeight: 'bold', fontSize: '16px' }}>إرسال الطلب مع إثبات الدفع</UIButton>
                  <p style={{ fontSize: '11px', color: '#ffffff55', marginTop: '10px' }}>⚠️ سيتم مراجعة الإيصال من البائع قبل تأكيد الطلب</p>
               </div>
            </div>
         )}
      </div>
   );
};

export default CheckoutPage;
