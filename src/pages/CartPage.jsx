import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash, Plus, Dash, BagDash, ArrowRight } from 'react-bootstrap-icons';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartCount } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const C = {
    primary: '#0a1a3a',
    gold: '#c88c23',
    bg: '#f4f7f9',
    white: '#ffffff',
    border: '#eef2f6',
    red: '#ef4444',
    green: '#10b981',
    text: '#1e293b',
    gray: '#64748b'
  };

  const formatPrice = (price) => (price || 0).toLocaleString() + ' ريال';

  const groupedItems = cartItems.reduce((acc, item) => {
    const seller = item.storeName || item.seller?.name || item.seller || 'متجر غير معروف';
    if (!acc[seller]) acc[seller] = [];
    acc[seller].push(item);
    return acc;
  }, {});

  const vendors = Object.keys(groupedItems);

  if (cartItems.length === 0) {
    return (
      <div style={{ direction: 'rtl', minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ textAlign: 'center', maxWidth: '400px', width: '100%' }}>
          <div style={{ width: '120px', height: '120px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <BagDash size={60} color={C.gold} style={{ opacity: 0.6 }} />
          </div>
          <h2 style={{ color: C.primary, fontSize: '24px', fontWeight: '900', marginBottom: '12px' }}>سلة المشتريات فارغة</h2>
          <p style={{ color: C.gray, marginBottom: '32px', fontSize: '15px' }}>ابدأ بإضافة بعض المنتجات الرائعة إلى سلتك للتسوق.</p>
          <Link to="/" style={{ display: 'inline-block', padding: '16px 40px', background: C.primary, color: 'white', textDecoration: 'none', borderRadius: '16px', fontWeight: 'bold', boxShadow: '0 8px 20px rgba(10, 26, 58, 0.15)', transition: 'transform 0.2s' }}>
            تصفح المتجر الآن
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ direction: 'rtl', minHeight: '100vh', background: C.bg, padding: '40px 15px 120px 15px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        <header style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: '28px', color: C.primary, fontWeight: '900', margin: 0 }}>سلة المشتريات</h1>
            <p style={{ color: C.gray, fontSize: '14px', marginTop: '4px' }}>لديك {getCartCount()} منتجات في سلتك</p>
          </div>
          <button onClick={() => navigate(-1)} style={{ background: 'white', border: `1px solid ${C.border}`, padding: '10px 15px', borderRadius: '12px', color: C.primary, fontSize: '13px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
           <ArrowRight size={16}/> العودة للتسوق
          </button>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {vendors.map((vendor) => {
            const items = groupedItems[vendor];
            const vendorTotal = items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
            
            return (
              <section key={vendor} style={{ background: 'white', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', border: `1px solid ${C.border}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', paddingBottom: '16px', borderBottom: `1px solid ${C.border}` }}>
                  <Link 
                    to={`/store/${vendor.replace(/\s+/g, '-')}`}
                    style={{ display: 'flex', alignItems: 'center', gap: '15px', textDecoration: 'none', cursor: 'pointer' }}
                  >
                     <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.gold, fontWeight: '900', fontSize: '20px' }}>
                       {vendor.charAt(0)}
                     </div>
                     <h2 style={{ fontSize: '18px', fontWeight: '800', color: C.primary, margin: 0 }}>منتجات من متجر {vendor}</h2>
                  </Link>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {items.map((item, idx) => (
                    <div key={`${item.id}-${idx}`} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                      <Link to={`/product/${item.id}`} style={{ textDecoration: 'none', flexShrink: 0 }}>
                        <img src={item.image || (item.images && item.images[0])} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '20px', background: C.bg }} />
                      </Link>
                      
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <Link to={`/product/${item.id}`} style={{ textDecoration: 'none' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '700', color: C.text, margin: 0 }}>{item.name}</h3>
                          </Link>
                          <button onClick={() => removeFromCart(item.id, item.options)} style={{ background: 'none', border: 'none', color: C.red, cursor: 'pointer', opacity: 0.6 }}>
                            <Trash size={20} />
                          </button>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '15px' }}>
                          {item.options?.size && <span style={{ fontSize: '12px', color: C.gray }}>مقاس: {item.options.size}</span>}
                          {item.options?.color && <span style={{ fontSize: '12px', color: C.gray }}>لون: {item.options.color}</span>}
                        </div>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '18px', fontWeight: '900', color: C.gold }}>{formatPrice(item.price)}</span>
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', background: C.bg, padding: '8px 18px', borderRadius: '15px' }}>
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.options)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.primary }} disabled={item.quantity <= 1}><Dash size={20}/></button>
                            <span style={{ fontWeight: '800', fontSize: '16px', minWidth: '24px', textAlign: 'center' }}>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.options)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.primary }}><Plus size={20}/></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: `1px dashed ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                   <div>
                     <div style={{ fontSize: '14px', color: C.gray, marginBottom: '4px' }}>إجمالي الحساب لهذا المتجر:</div>
                     <div style={{ fontSize: '24px', fontWeight: '900', color: C.primary }}>{formatPrice(vendorTotal)}</div>
                   </div>
                   
                   <button 
                    onClick={() => navigate(isAuthenticated ? `/checkout?seller=${encodeURIComponent(vendor)}` : `/login?redirect=/checkout?seller=${encodeURIComponent(vendor)}`)}
                    style={{ padding: '16px 32px', background: C.primary, color: 'white', border: 'none', borderRadius: '18px', fontWeight: '900', fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 8px 20px rgba(10, 26, 58, 0.15)' }}
                  >
                    إتمام الطلب من {vendor} <ArrowRight size={18}/>
                  </button>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
