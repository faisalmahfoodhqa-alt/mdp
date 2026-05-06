// src/pages/ProductPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star, Heart, HeartFill, ChevronLeft, ChevronRight,
  Whatsapp, Truck, Shield, Clock, Share, InfoCircle, GeoAlt
} from 'react-bootstrap-icons';
import { getProductById, getRelatedProducts } from '../data/products';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { UIButton } from '../shared/components/ui';

const ProductPage = () => {
  const { productId } = useParams();
  const { toggleWishlist, isInWishlist, user, isAuthenticated, toggleFollowStore, isFollowingStore } = useAuth();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [localAllProducts, setLocalAllProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  // Review states
  const [tempRating, setTempRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [productReviews, setProductReviews] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const colors = {
    primary: '#0a1a3a',
    gold: '#c88c23',
    goldLight: '#e5a847',
    white: '#ffffff',
    lightGray: '#f8f9fa',
    darkGray: '#343a40',
    whatsapp: '#25D366',
    green: '#28a745',
    red: '#dc3545',
    border: '#eee',
    gray: '#666'
  };

  const showSuccessToast = (message) => {
    if (window.showToast) {
      window.showToast(message, 'success');
      return;
    }
    const toast = document.createElement('div');
    toast.innerHTML = `<span style="margin-left: 8px;">✅</span> ${message}`;
    toast.style.cssText = `
      position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
      background: #28a745; color: white; padding: 12px 24px; border-radius: 8px;
      font-weight: bold; font-size: 14px; z-index: 99999;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: all 0.3s ease-in-out;
      opacity: 0; display: flex; align-items: center; direction: rtl;
    `;
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '1'; toast.style.top = '40px'; }, 10);
    setTimeout(() => {
      toast.style.opacity = '0'; toast.style.top = '20px';
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 2500);
  };

  useEffect(() => {
    setShowAllReviews(false);
    let allProds = [];
    try {
      allProds = JSON.parse(localStorage.getItem('all_products')) || [];
      setLocalAllProducts(allProds);
    } catch(e) {}

    const searchId = typeof productId === 'string' ? parseInt(productId) : productId;
    let productData = allProds.find(p =>
      String(p.id) === String(productId) ||
      String(p.productId) === String(productId) ||
      String(p._id) === String(productId) ||
      p.id === searchId
    );
    
    if (!productData) {
      productData = getProductById(productId);
    }

    if (productData) {
      // محاولة البحث عن بيانات التاجر الحقيقية في localStorage
      let sellerInfo = {
        name: productData.seller?.name || productData.storeName || 'متجر موثوق',
        whatsapp: productData.seller?.whatsapp || '776981756',
        rating: 4.8,
        totalSales: 150,
        hasDelivery: true,
        location: null
      };

      try {
        const allUsers = JSON.parse(localStorage.getItem('all_users') || '[]');
        const actualSeller = allUsers.find(u => u.storeName === sellerInfo.name || u.username === sellerInfo.name);
        if (actualSeller) {
          sellerInfo.hasDelivery = actualSeller.hasDelivery !== undefined ? actualSeller.hasDelivery : true;
          sellerInfo.location = actualSeller.storeLocation || null;
          sellerInfo.whatsapp = actualSeller.phone || sellerInfo.whatsapp;
          sellerInfo.bio = actualSeller.storeBio || null;
          sellerInfo.isVacationMode = actualSeller.isVacationMode || false;
        }
      } catch (e) { }

      const rawImages = productData.images?.length > 0 ? productData.images : [productData.image];
      const processedImages = rawImages.map(img => typeof img === 'object' && img !== null ? img.url : img).filter(Boolean);

      setProduct({
        ...productData,
        images: processedImages.length > 0 ? processedImages : ['https://via.placeholder.com/400'],
        seller: sellerInfo,
        longDescription: productData.description || ''
      });

      const savedReviews = JSON.parse(localStorage.getItem(`reviews_${productId}`) || '[]');
      setProductReviews(savedReviews.length > 0 ? savedReviews : []);
      // تتبع المنتجات المزارة مؤخراً
      if (productData) {
        try {
          const recentKey = 'recently_viewed_products';
          const recent = JSON.parse(localStorage.getItem(recentKey) || '[]');
          const filtered = recent.filter(p => String(p.id) !== String(productData.id));
          const entry = {
            id: productData.id,
            name: productData.name,
            price: productData.price,
            image: productData.image || productData.images?.[0]?.url || productData.images?.[0],
            storeName: productData.storeName,
            visitedAt: new Date().toISOString()
          };
          filtered.unshift(entry);
          localStorage.setItem(recentKey, JSON.stringify(filtered.slice(0, 20)));
        } catch(e) {}
      }
    }
    setLoading(false);
  }, [productId]);

  const relatedProducts = React.useMemo(() => {
    if (!product || !localAllProducts.length) return [];
    return localAllProducts
      .filter(p => String(p.id) !== String(product.id) && (
        p.categoryLink === product.categoryLink || 
        p.mainCategory === product.mainCategory ||
        p.categoryTitle === product.categoryTitle ||
        p.category === product.category ||
        p.subItem === product.subItem
      ))
      .slice(0, 4);
  }, [product, localAllProducts]);

  const handleAddReview = () => {
    if (!hasPurchasedProduct) {
      showSuccessToast('التقييم متاح فقط بعد شراء المنتج واستلامه');
      return;
    }
    if (!reviewText.trim()) return;
    const newReview = {
      name: user?.username || 'عميل مجهول',
      date: 'الآن',
      rating: tempRating,
      text: reviewText
    };
    const updated = [newReview, ...productReviews];
    setProductReviews(updated);
    localStorage.setItem(`reviews_${productId}`, JSON.stringify(updated));
    setReviewText('');
    showSuccessToast('شكراً لتقييمك!');
  };

  const formatPrice = (price) => (price || 0).toLocaleString() + ' ريال';
  const isWhatsAppFlow = product?.mainCategory === 'المركبات' || product?.mainCategory === 'العقارات';
  const requiresSizeSelection = product?.sizes?.length > 0;
  const requiresColorSelection = product?.colors?.length > 0;
  const hasPurchasedProduct = React.useMemo(() => {
    if (!user || !product) return false;
    return (user.orders || []).some(
      (order) =>
        order.status === 'delivered' &&
        (order.items || []).some((item) => String(item.id) === String(product.id))
    );
  }, [user, product]);
  const sellerNameSafe = product?.seller?.name || product?.storeName || 'متجر';
  const sellerWhatsappSafe = product?.seller?.whatsapp || product?.seller?.phone || '776981756';
  const sellerBioSafe = product?.seller?.bio;

  if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>جاري التحميل...</div>;
  if (!product) return <div style={{ padding: '100px', textAlign: 'center' }}>المنتج غير موجود</div>;

  const avgRating = (productReviews.reduce((acc, r) => acc + r.rating, 0) / (productReviews.length || 1)).toFixed(1);
  const displayedReviews = showAllReviews ? productReviews : productReviews.slice(0, 3);

  return (
    <div style={{ direction: 'rtl', background: colors.lightGray, minHeight: '100vh', padding: isMobile ? '15px' : '30px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Breadcrumbs */}
        <div style={{ marginBottom: '20px', fontSize: '14px' }}>
          <Link to="/" style={{ color: colors.gold, textDecoration: 'none' }}>الرئيسية</Link> / <span>{product.name}</span>
        </div>

        {/* Hero Section */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '30px', background: 'white', borderRadius: '20px', padding: isMobile ? '15px' : '30px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', marginBottom: '30px' }}>

          {/* Images */}
          <div>
            <div style={{ height: isMobile ? '300px' : '450px', background: '#f9f9f9', borderRadius: '15px', overflow: 'hidden', border: '1px solid #eee', position: 'relative' }}>
              <img src={product.images[selectedImage]} style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt="" />
              {product.images.length > 1 && (
                <>
                  <UIButton onClick={() => setSelectedImage(s => (s + 1) % product.images.length)} style={{ position: 'absolute', left: '10px', top: '50%', background: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}><ChevronLeft /></UIButton>
                  <UIButton onClick={() => setSelectedImage(s => (s - 1 + product.images.length) % product.images.length)} style={{ position: 'absolute', right: '10px', top: '50%', background: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}><ChevronRight /></UIButton>
                </>
              )}
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px', overflowX: 'auto', paddingBottom: '5px' }}>
              {product.images.map((img, i) => (
                <img key={i} src={img} onClick={() => setSelectedImage(i)} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover', cursor: 'pointer', border: selectedImage === i ? `2px solid ${colors.gold}` : '1px solid #eee' }} alt="" />
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <h1 style={{ fontSize: '28px', color: colors.primary, marginBottom: '10px', fontWeight: 'bold' }}>{product.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', color: colors.gold }}>{[1, 2, 3, 4, 5].map(s => <Star key={s} fill={s <= avgRating ? 'currentColor' : 'none'} />)}</div>
              <span style={{ fontSize: '13px', color: '#666' }}>({productReviews.length} تقييم من العملاء)</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
              <div style={{ fontSize: '36px', color: colors.gold, fontWeight: '900' }}>{formatPrice(product.price)}</div>
              {(product.oldPrice || product.originalPrice) && <div style={{ textDecoration: 'line-through', color: '#999', fontSize: '20px' }}>{formatPrice(product.oldPrice || product.originalPrice)}</div>}
            </div>

            {/* Sizes Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', fontSize: '15px', color: colors.primary, marginBottom: '10px' }}>المقاس:</label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {product.sizes.map(size => (
                    <UIButton
                      key={size}
                      onClick={() => setSelectedSize(selectedSize === size ? '' : size)}
                      style={{
                        padding: '10px 20px',
                        borderRadius: '10px',
                        border: `2px solid ${selectedSize === size ? colors.gold : '#ddd'}`,
                        background: selectedSize === size ? `${colors.gold}15` : 'white',
                        color: selectedSize === size ? colors.gold : colors.darkGray,
                        fontWeight: 'bold',
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        minWidth: '50px',
                        textAlign: 'center'
                      }}
                    >
                      {size}
                    </UIButton>
                  ))}
                </div>
              </div>
            )}

            {/* Colors Selector */}
            {product.colors && product.colors.length > 0 && (
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', fontSize: '15px', color: colors.primary, marginBottom: '10px' }}>اللون:</label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {product.colors.map(color => (
                    <UIButton
                      key={color}
                      onClick={() => setSelectedColor(selectedColor === color ? '' : color)}
                      style={{
                        padding: '10px 20px',
                        borderRadius: '10px',
                        border: `2px solid ${selectedColor === color ? colors.gold : '#ddd'}`,
                        background: selectedColor === color ? `${colors.gold}15` : 'white',
                        color: selectedColor === color ? colors.gold : colors.darkGray,
                        fontWeight: 'bold',
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {color}
                    </UIButton>
                  ))}
                </div>
              </div>
            )}

            {/* Vacation Mode Banner */}
            {product?.seller?.isVacationMode && (
              <div style={{ padding: '15px 18px', background: '#dc354515', border: '1.5px solid #dc354540', borderRadius: '12px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '22px' }}>🔴</span>
                <div>
                  <div style={{ fontWeight: '800', fontSize: '14px', color: colors.red }}>المتجر مغلق مؤقتاً (وضع الإجازة)</div>
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>لا يمكن الشراء حالياً. يرجى المحاولة لاحقاً.</div>
                </div>
              </div>
            )}

            {/* Buy Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', opacity: product?.seller?.isVacationMode ? 0.5 : 1, pointerEvents: product?.seller?.isVacationMode ? 'none' : 'auto' }}>
              {!isWhatsAppFlow && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <label style={{ fontWeight: 'bold' }}>الكمية:</label>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '10px', padding: '5px' }}>
                    <UIButton onClick={() => setQuantity(q => q + 1)} style={{ border: 'none', background: 'none', padding: '5px 15px', cursor: 'pointer', fontWeight: 'bold' }}>+</UIButton>
                    <span style={{ width: '40px', textAlign: 'center', fontWeight: 'bold' }}>{quantity}</span>
                    <UIButton onClick={() => setQuantity(q => Math.max(1, q - 1))} style={{ border: 'none', background: 'none', padding: '5px 15px', cursor: 'pointer', fontWeight: 'bold' }}>-</UIButton>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                {isWhatsAppFlow ? (
                  <UIButton onClick={() => window.open(`https://wa.me/${sellerWhatsappSafe}?text=أنا مهتم بـ ${product.name}`, '_blank')} style={{ flex: 1, padding: '18px', background: colors.whatsapp, color: 'white', border: 'none', borderRadius: '15px', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <Whatsapp size={24} /> تواصل واطلب
                  </UIButton>
                ) : (
                  <>
                    {/* زر أضف للسلة */}
                    <UIButton onClick={() => {
                      const productWithSeller = {
                        ...product,
                        storeName: product.storeName || product.seller?.name || product.seller,
                        sellerId: product.sellerId || product.seller?.id,
                        seller: {
                          ...product.seller,
                          name: product.storeName || product.seller?.name,
                          id: product.sellerId || product.seller?.id
                        }
                      };
                      addToCart(productWithSeller, quantity, { size: selectedSize, color: selectedColor });
                      showSuccessToast('تم الإضافة للسلة');
                    }}
                      style={{ flex: 1, padding: '15px', background: '#f0f4f8', color: colors.primary, border: `1px solid ${colors.primary}`, borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer' }}>
                      أضف للسلة
                    </UIButton>

                    {/* زر اشتري الآن (المعدل) */}
                    <UIButton onClick={() => {
                      if (requiresSizeSelection && !selectedSize) {
                        showSuccessToast('يرجى اختيار المقاس قبل الشراء');
                        return;
                      }
                      if (requiresColorSelection && !selectedColor) {
                        showSuccessToast('يرجى اختيار اللون قبل الشراء');
                        return;
                      }
                      const productWithSeller = {
                        ...product,
                        storeName: product.storeName || product.seller?.name || product.seller,
                        sellerId: product.sellerId || product.seller?.id,
                        seller: {
                          ...product.seller,
                          name: product.storeName || product.seller?.name,
                          id: product.sellerId || product.seller?.id
                        }
                      };
                      addToCart(productWithSeller, quantity, { size: selectedSize, color: selectedColor });
                      navigate(`/checkout?seller=${encodeURIComponent(productWithSeller.storeName)}`);
                    }}
                      style={{ flex: 2, padding: '15px', background: colors.primary, color: 'white', border: 'none', borderRadius: '15px', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer' }}>
                      اشتري الآن
                    </UIButton>
                  </>
                )}
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <UIButton onClick={() => toggleWishlist(product)} style={{ flex: 1, padding: '12px', background: 'none', border: '1px solid #eee', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  {isInWishlist(product.id) ? <HeartFill color={colors.red} /> : <Heart />} {isInWishlist(product.id) ? 'في المفضلة' : 'للمفضلة'}
                </UIButton>
                <UIButton onClick={() => { navigator.share({ title: product.name, url: window.location.href }).catch(() => { navigator.clipboard.writeText(window.location.href); showSuccessToast('تم نسخ الرابط'); }); }} style={{ flex: 1, padding: '12px', background: 'none', border: '1px solid #eee', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Share /> مشاركة
                </UIButton>
              </div>
            </div>

            {/* Seller Section */}
            <div style={{ marginTop: '30px', padding: '20px', borderRadius: '15px', background: '#f8f9fa', border: '1px solid #eee' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: colors.gold, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '20px' }}>{String(sellerNameSafe).charAt(0)}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', color: colors.primary }}>{sellerNameSafe}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>⭐ {product?.seller?.rating || 0} تقييم التاجر | مبيعات {product?.seller?.totalSales || 0}+</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'flex-end' }}>
                  <Link to={`/store/${String(sellerNameSafe).replace(/\s+/g, '-')}`} style={{ color: colors.gold, textDecoration: 'none', fontSize: '13px', fontWeight: 'bold' }}>المتجر ←</Link>
                  <UIButton
                    onClick={() => {
                      toggleFollowStore({
                        id: product.sellerId || sellerNameSafe,
                        name: sellerNameSafe
                      });
                    }}
                    style={{ background: isFollowingStore(product.sellerId || sellerNameSafe) ? colors.border : colors.primary, color: isFollowingStore(product.sellerId || sellerNameSafe) ? colors.primary : 'white', border: 'none', padding: '5px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                    {isFollowingStore(product.sellerId || sellerNameSafe) ? 'متابع ✓' : '+ متابعة'}
                  </UIButton>
                </div>
              </div>

              {/* نبذة المتجر */}
              {sellerBioSafe && (
                <div style={{ 
                  fontSize: '13px', 
                  color: '#555', 
                  background: 'white', 
                  padding: '12px', 
                  borderRadius: '10px', 
                  marginBottom: '10px',
                  borderRight: `4px solid ${colors.gold}`,
                  lineHeight: '1.5'
                }}>
                  {sellerBioSafe}
                </div>
              )}

            </div>
          </div>
        </div>


        {/* Content Tabs */}
        <div style={{ background: 'white', borderRadius: '20px', padding: isMobile ? '20px' : '30px', boxShadow: '0 5px 20px rgba(0,0,0,0.03)', marginBottom: '30px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, borderBottom: `2px solid ${colors.gold}20`, paddingBottom: '10px', marginBottom: '20px' }}>تفاصيل المنتج</h3>
          <p style={{ lineHeight: '1.8', color: '#444', whiteSpace: 'pre-line' }}>
            {product.longDescription?.trim() ? product.longDescription : 'لا توجد تفاصيل إضافية لهذا المنتج.'}
          </p>
        </div>

        {/* Reviews */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '30px', boxShadow: '0 5px 20px rgba(0,0,0,0.03)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '25px' }}>آراء العملاء ({productReviews.length})</h3>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', gap: '40px' }}>
            <div>
              <h4 style={{ fontSize: '15px', marginBottom: '15px' }}>أضف تقييمك</h4>
              {isAuthenticated ? (
                hasPurchasedProduct ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ display: 'flex', gap: '5px' }}>{[1, 2, 3, 4, 5].map(s => <Star key={s} fill={s <= tempRating ? colors.gold : 'none'} color={colors.gold} onClick={() => setTempRating(s)} style={{ cursor: 'pointer' }} size={24} />)}</div>
                    <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} placeholder="رأيك في المنتج..." style={{ width: '100%', height: '100px', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', outline: 'none' }} />
                    <UIButton onClick={handleAddReview} style={{ padding: '12px', background: colors.primary, color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>إرسال التقييم</UIButton>
                  </div>
                ) : (
                  <p style={{ fontSize: '13px', color: '#666' }}>
                    التقييم متاح فقط بعد شراء المنتج واستلامه ضمن الطلبات السابقة.
                  </p>
                )
              ) : (
                <p style={{ fontSize: '13px', color: '#666' }}>يجب <Link to="/login" style={{ color: colors.gold }}>تسجيل الدخول</Link> لإضافة تقييم.</p>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {displayedReviews.map((r, i) => (
                <div key={i} style={{ borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontWeight: 'bold' }}>{r.name}</span>
                    <span style={{ fontSize: '11px', color: '#999' }}>{r.date}</span>
                  </div>
                  <div style={{ color: colors.gold, marginBottom: '8px' }}>{[1, 2, 3, 4, 5].map(s => <Star key={s} fill={s <= r.rating ? 'currentColor' : 'none'} size={12} />)}</div>
                  <p style={{ margin: 0, fontSize: '14px', color: '#555' }}>{r.text}</p>
                </div>
              ))}
              {productReviews.length > 3 && (
                <UIButton
                  onClick={() => setShowAllReviews((prev) => !prev)}
                  style={{ alignSelf: 'flex-start', background: `${colors.gold}15`, color: colors.gold, border: `1px solid ${colors.gold}40`, borderRadius: '10px', padding: '8px 14px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  {showAllReviews ? 'عرض أقل' : 'عرض المزيد'}
                </UIButton>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div style={{ marginTop: '30px', marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: colors.primary }}>منتجات مشابهة</h3>
            <Link to={`/search?q=${encodeURIComponent(product.category || product.mainCategory || product.name || '')}`} style={{ color: colors.gold, textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>عرض الكل</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
            {relatedProducts.map(p => (
              <Link key={p.id} to={`/product/${p.id}`} style={{ textDecoration: 'none', color: 'inherit', background: 'white', borderRadius: '15px', overflow: 'hidden', border: '1px solid #eee', transition: 'all 0.3s', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <img src={p.image || p.images?.[0]?.url || p.images?.[0]} style={{ width: '100%', height: isMobile ? '150px' : '200px', objectFit: 'cover' }} alt="" />
                <div style={{ padding: '12px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '5px', height: '35px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{p.name}</div>
                  <div style={{ color: colors.gold, fontWeight: 'bold', fontSize: '15px' }}>{formatPrice(p.price)}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductPage;

