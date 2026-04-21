import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1, selectedOptions = {}) => {
    setCartItems(prev => {
      // ✅ توحيد بيانات المنتج
      const normalizedProduct = {
        ...product,
        storeName: product.storeName || product.seller?.name || product.seller || 'متجر غير معروف',
        sellerId: product.sellerId || product.seller?.id || null,
        seller: product.seller || {
          name: product.storeName || product.seller?.name,
          id: product.sellerId
        },
        price: typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0
      };
      
      const existingItem = prev.find(item => 
        item.id === normalizedProduct.id && 
        JSON.stringify(item.options) === JSON.stringify(selectedOptions)
      );
      
      let newCart;
      if (existingItem) {
        newCart = prev.map(item => 
          item.id === normalizedProduct.id && JSON.stringify(item.options) === JSON.stringify(selectedOptions)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newCart = [...prev, { ...normalizedProduct, quantity, options: selectedOptions }];
      }
      
      localStorage.setItem('cartLastUpdated', new Date().toISOString());
      return newCart;
    });
  };

  const removeFromCart = (productId, options = {}) => {
    setCartItems(prev => {
      localStorage.setItem('cartLastUpdated', new Date().toISOString());
      return prev.filter(item => !(item.id === productId && JSON.stringify(item.options) === JSON.stringify(options)));
    });
  };

  const updateQuantity = (productId, quantity, options = {}) => {
    if (quantity < 1) return;
    setCartItems(prev => {
      localStorage.setItem('cartLastUpdated', new Date().toISOString());
      return prev.map(item => 
        item.id === productId && JSON.stringify(item.options) === JSON.stringify(options)
          ? { ...item, quantity }
          : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartLastUpdated');
  };

  const clearCartBySeller = (sellerName) => {
    setCartItems(prev => prev.filter(item => (item.storeName || item.seller?.name || item.seller || 'متجر غير معروف') !== sellerName));
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      clearCartBySeller,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};