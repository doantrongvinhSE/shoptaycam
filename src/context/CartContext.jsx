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
      // Tạo một key duy nhất cho sản phẩm dựa trên ID và variant
      const itemKey = `${product._id}-${selectedVariant?.color || 'default'}-${selectedVariant?.size || 'default'}`;
      
      // Tìm sản phẩm có cùng key
      const existingItemIndex = prevItems.findIndex(item => {
        const currentItemKey = `${item._id}-${item.selectedVariant?.color || 'default'}-${item.selectedVariant?.size || 'default'}`;
        return currentItemKey === itemKey;
      });
      
      if (existingItemIndex !== -1) {
        // Nếu sản phẩm đã tồn tại, cập nhật số lượng
        const newItems = [...prevItems];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity
        };
        return newItems;
      }
      
      // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
      const newItem = {
        _id: product._id,
        name: product.name,
        description: product.description,
        image: selectedVariant?.image || product.image,
        price: selectedVariant?.price || product.price,
        priceSale: selectedVariant?.salePrice || selectedVariant?.price || product.priceSale || product.price,
        quantity,
        selectedVariant: selectedVariant ? {
          color: selectedVariant.color,
          size: selectedVariant.size,
          image: selectedVariant.image,
          price: selectedVariant.price,
          salePrice: selectedVariant.salePrice || selectedVariant.price
        } : null
      };
      
      return [...prevItems, newItem];
    });
  };

  const removeFromCart = (productId, selectedVariant = null) => {
    setCartItems(prevItems => {
      const itemKey = `${productId}-${selectedVariant?.color || 'default'}-${selectedVariant?.size || 'default'}`;
      return prevItems.filter(item => {
        const currentItemKey = `${item._id}-${item.selectedVariant?.color || 'default'}-${item.selectedVariant?.size || 'default'}`;
        return currentItemKey !== itemKey;
      });
    });
  };

  const updateQuantity = (productId, quantity, selectedVariant = null) => {
    if (quantity < 1) return;
    
    setCartItems(prevItems => {
      const itemKey = `${productId}-${selectedVariant?.color || 'default'}-${selectedVariant?.size || 'default'}`;
      return prevItems.map(item => {
        const currentItemKey = `${item._id}-${item.selectedVariant?.color || 'default'}-${item.selectedVariant?.size || 'default'}`;
        if (currentItemKey === itemKey) {
          return { ...item, quantity };
        }
        return item;
      });
    });
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