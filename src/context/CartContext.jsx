import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const getUserCartKey = (u) => (u?.id != null ? `cart_${u.id}` : null);

  const safeParseCart = (raw) => {
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const itemSignature = (item) =>
    `${String(item?.id ?? item?.productId ?? item?._id)}|${JSON.stringify(item?.options || {})}`;

  const mergeCartItems = (baseItems, incomingItems) => {
    const map = new Map();
    [...baseItems, ...incomingItems].forEach((item) => {
      const sig = itemSignature(item);
      const prev = map.get(sig);
      if (!prev) {
        map.set(sig, { ...item, quantity: Number(item?.quantity) > 0 ? Number(item.quantity) : 1 });
        return;
      }
      map.set(sig, {
        ...prev,
        quantity: (Number(prev.quantity) || 0) + (Number(item?.quantity) || 0)
      });
    });
    return Array.from(map.values());
  };

  // Load cart on init
  useEffect(() => {
    const loadCart = async () => {
      const guestCart = safeParseCart(localStorage.getItem('cart'));

      if (user) {
        const userCartKey = getUserCartKey(user);
        const userCart = safeParseCart(localStorage.getItem(userCartKey));

        // One-time safe migration/merge from guest cart to logged-in user cart
        // to avoid cart loss after login.
        const merged = mergeCartItems(userCart, guestCart);
        localStorage.setItem(userCartKey, JSON.stringify(merged));
        if (guestCart.length > 0) localStorage.removeItem('cart');
        setCartItems(merged);
      } else {
        setCartItems(guestCart);
      }

      setLoading(false);
    };
    loadCart();
  }, [user]);

  // Sync cart to storage/cloud
  useEffect(() => {
    if (loading) return;
    
    if (user) {
      const userCartKey = getUserCartKey(user);
      localStorage.setItem(userCartKey, JSON.stringify(cartItems));
    } else {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, user, loading]);

  const addToCart = (product, quantity = 1, selectedOptions = {}) => {
    setCartItems(prev => {
      const normalizedProduct = {
        ...product,
        storeName: product.storeName || 'متجر غير معروف',
        sellerId: product.sellerId || null,
        price: typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0
      };
      
      const existingItem = prev.find(item => 
        item.id === normalizedProduct.id && 
        JSON.stringify(item.options) === JSON.stringify(selectedOptions)
      );
      
      if (existingItem) {
        return prev.map(item => 
          item.id === normalizedProduct.id && JSON.stringify(item.options) === JSON.stringify(selectedOptions)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { ...normalizedProduct, quantity, options: selectedOptions }];
      }
    });
  };

  const removeFromCart = (productId, options = {}) => {
    setCartItems(prev => prev.filter(item => !(item.id === productId && JSON.stringify(item.options) === JSON.stringify(options))));
  };

  const updateQuantity = (productId, quantity, options = {}) => {
    if (quantity < 1) return;
    setCartItems(prev => prev.map(item => 
      item.id === productId && JSON.stringify(item.options) === JSON.stringify(options)
        ? { ...item, quantity }
        : item
    ));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const clearCartBySeller = (sellerName) => {
    setCartItems((prev) =>
      prev.filter((item) => {
        const itemSeller = item.storeName || item.seller?.name || (typeof item.seller === 'string' ? item.seller : '');
        return itemSeller !== sellerName;
      })
    );
  };

  const getCartTotal = () => cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const getCartCount = () => cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      clearCartBySeller,
      getCartTotal,
      getCartCount,
      loading
    }}>
      {children}
    </CartContext.Provider>
  );
};