// src/components/products/ProductCard.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, Truck, Share, Cart2, Heart, HeartFill, Whatsapp } from 'react-bootstrap-icons';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product, viewMode, isMobile }) => {
  const colors = {
    primary: '#0a1a3a',
    gold: '#c88c23',
    white: '#ffffff',
    lightGray: '#f8f9fa',
    darkGray: '#343a40',
    green: '#28a745'
  };

  const showSuccessToast = (message) => {
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

  const { toggleWishlist, isInWishlist } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [hovered, setHovered] = useState(false);

  const formatPrice = (price) => (price || 0).toLocaleString() + ' ريال';
  
  const sellerName = typeof product.seller === 'string' 
    ? product.seller 
    : product.seller?.name || 'متجر موثوق';

  const isWhatsAppFlow = product.mainCategory === 'المركبات' || product.mainCategory === 'العقارات' || product.categoryTitle?.includes('مركبات') || product.categoryTitle?.includes('عقارات') || product.categoryTitle?.includes('سيارات');

  return (
    <Link to={`/product/${product.id}`} className="product-card-container" style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{
        background: colors.white,
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        transition: 'all 0.3s',
        marginBottom: viewMode === 'list' ? (isMobile ? '10px' : '15px') : '0',
        display: viewMode === 'list' ? 'flex' : 'block',
        height: viewMode === 'list' ? (isMobile ? '120px' : '150px') : 'auto',
        position: 'relative'
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      >
        {/* شارة عدم التوفر */}
        {(product.inStock === false || (product.stock !== undefined && parseInt(product.stock) <= 0)) && (
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'rgba(52, 58, 64, 0.9)',
            color: colors.white,
            padding: '4px 10px',
            borderRadius: '5px',
            fontSize: '11px',
            fontWeight: 'bold',
            zIndex: 10
          }}>
            نفذت الكمية
          </div>
        )}



        {/* صورة المنتج */}
        <div style={{
          width: viewMode === 'list' ? (isMobile ? '120px' : '180px') : '100%',
          height: viewMode === 'list' ? '100%' : (isMobile ? '160px' : '220px'),
          overflow: 'hidden',
          position: 'relative'
        }}>
          <img
            src={product.images?.[0]?.url || product.images?.[0] || product.image || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format'}
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s',
              transform: hovered && !isMobile ? 'scale(1.1)' : 'scale(1)'
            }}
          />
          
          {/* Overlay for Desktop Hover */}
          {!isMobile && (
            <div className="product-card-overlay">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleWishlist(product);
                }}
                className={`hover-icon-btn ${isInWishlist(product.id) ? 'wishlist-active' : ''}`}
                title="أضف للمفضلة"
              >
                {isInWishlist(product.id) ? <HeartFill size={20} /> : <Heart size={20} />}
              </button>
              
              {!isWhatsAppFlow && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart(product, 1);
                    showSuccessToast('تمت الإضافة إلى السلة بنجاح!');
                  }}
                  className="hover-icon-btn"
                  title="أضف للسلة"
                >
                  <Cart2 size={20} />
                </button>
              )}

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const url = encodeURIComponent(`${window.location.origin}/product/${product.id}`);
                  window.open(`https://wa.me/967770000000?text=${encodeURIComponent(`أنا مهتم بهذا الإعلان: ${product.name}\n`)}${url}`, '_blank');
                }}
                className="hover-icon-btn"
                style={{ color: '#25D366' }}
                title="تواصل عبر واتساب"
              >
                <Whatsapp size={20} />
              </button>
            </div>
          )}

          {/* Quick Actions for Mobile */}
          {isMobile && !isWhatsAppFlow && (
             <div style={{
               position: 'absolute',
               bottom: '5px',
               right: '5px',
               zIndex: 5
             }}>
               <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart(product, 1);
                    showSuccessToast('تمت الإضافة إلى السلة!');
                  }}
                  style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    background: colors.gold, border: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: colors.primary, boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                  }}
                >
                  <Cart2 size={16} />
                </button>
             </div>
          )}
        </div>

        {/* معلومات المنتج */}
        <div style={{
          padding: viewMode === 'list' ? (isMobile ? '8px' : '15px') : (isMobile ? '6px' : '12px'),
          flex: 1
        }}>
          <h3 style={{
            color: colors.primary,
            fontSize: viewMode === 'list' ? (isMobile ? '12px' : '16px') : (isMobile ? '10px' : '14px'),
            fontWeight: 'bold',
            marginBottom: '3px',
            lineHeight: '1.2',
            height: viewMode === 'grid' && isMobile ? '2.4em' : 'auto',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}>
            {product.name}
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px' }}>
            <div style={{ display: 'flex', gap: '2px' }}>
              {[1,2,3,4,5].map(star => (
                <Star
                  key={star}
                  size={viewMode === 'list' ? (isMobile ? 10 : 12) : (isMobile ? 8 : 10)}
                  color={star <= (product.rating || 4) ? colors.gold : '#ccc'}
                />
              ))}
            </div>
            <span style={{ color: '#666', fontSize: viewMode === 'list' ? (isMobile ? '10px' : '11px') : '9px' }}>
              ({product.reviews || 0})
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px', flexWrap: 'wrap' }}>
            <span style={{
              color: colors.gold,
              fontSize: viewMode === 'list' ? (isMobile ? '13px' : '18px') : (isMobile ? '11px' : '16px'),
              fontWeight: 'bold'
            }}>
              {formatPrice(product.price)}
            </span>
            {(product.oldPrice || product.originalPrice) && (
              <span style={{
                color: '#999',
                fontSize: viewMode === 'list' ? (isMobile ? '10px' : '12px') : (isMobile ? '9px' : '11px'),
                textDecoration: 'line-through'
              }}>
                {formatPrice(product.oldPrice || product.originalPrice)}
              </span>
            )}
          </div>

          {viewMode === 'list' && (
            <p style={{ color: '#666', fontSize: isMobile ? '11px' : '12px', marginBottom: '5px' }}>
              {sellerName}
            </p>
          )}

          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate(`/product/${product.id}`);
            }}
            style={{
              background: colors.gold,
              color: colors.primary,
              border: 'none',
              padding: viewMode === 'list' ? (isMobile ? '4px 8px' : '6px 15px') : (isMobile ? '4px' : '5px 10px'),
              borderRadius: '5px',
              fontSize: viewMode === 'list' ? (isMobile ? '10px' : '13px') : (isMobile ? '9px' : '11px'),
              fontWeight: 'bold',
              cursor: 'pointer',
              width: viewMode === 'list' ? 'auto' : '100%',
              marginTop: viewMode === 'grid' && isMobile ? '3px' : '0'
            }}>
            {isWhatsAppFlow ? 'التفاصيل' : 'تسوق الآن'}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;