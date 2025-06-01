import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart items from localStorage when component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart items to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1, selectedVariant = null) => {
    setCartItems(prevItems => {
      // Tìm sản phẩm có cùng ID và variant
      const existingItem = prevItems.find(item => 
        item._id === product._id && 
        item.selectedVariant?.color === selectedVariant?.color &&
        item.selectedVariant?.size === selectedVariant?.size
      );
      
      if (existingItem) {
        return prevItems.map(item =>
          item._id === product._id && 
          item.selectedVariant?.color === selectedVariant?.color &&
          item.selectedVariant?.size === selectedVariant?.size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prevItems, { 
        ...product, 
        quantity,
        selectedVariant,
        price: selectedVariant?.price || product.price,
        priceSale: selectedVariant?.priceSale || product.priceSale
      }];
    });
  };

  const removeFromCart = (productId, selectedVariant = null) => {
    setCartItems(prevItems => 
      prevItems.filter(item => 
        !(item._id === productId && 
          item.selectedVariant?.color === selectedVariant?.color &&
          item.selectedVariant?.size === selectedVariant?.size)
      )
    );
  };

  const updateQuantity = (productId, quantity, selectedVariant = null) => {
    if (quantity < 1) return;
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === productId && 
        item.selectedVariant?.color === selectedVariant?.color &&
        item.selectedVariant?.size === selectedVariant?.size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.priceSale * item.quantity);
    }, 0);
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
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 