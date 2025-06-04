import React from 'react';
import { useCart } from '../../context/CartContext';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const CartDropdown = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="absolute top-full right-0 mt-2 w-80 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] rounded-lg p-4 z-[9999]">
        <div className="absolute -top-2 right-4 w-4 h-4 bg-white transform rotate-45 shadow-[-2px_-2px_5px_rgba(0,0,0,0.06)]"></div>
        <div className="text-center py-4">
          <p className="text-gray-500">Giỏ hàng trống</p>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-full right-0 mt-2 w-80 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] rounded-lg p-4 z-[9999]">
      <div className="absolute -top-2 right-3 w-4 h-4 bg-white transform rotate-45 shadow-[-2px_-2px_5px_rgba(0,0,0,0.06)]"></div>
      <div className="max-h-96 overflow-y-auto">
        {cartItems.map((item) => (
          <div key={`${item._id}-${item.selectedVariant?.color || 'default'}-${item.selectedVariant?.size || 'default'}`} className="flex items-center gap-4 py-3 border-b border-gray-100">
            <Link to={`/product/${item._id}`}>
              <img
                src={item.selectedVariant?.image || item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded hover:opacity-90 transition-opacity"
              />
            </Link>
            <div className="flex-1">
              <Link to={`/product/${item._id}`} className="hover:text-amber-600 transition-colors">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</h3>
              </Link>
              {item.selectedVariant && (
                <p className="text-xs text-gray-500">
                  Color:- {item.selectedVariant.color}
                </p>
              )}
              <p className="text-sm text-amber-600 font-medium">{item.priceSale?.toLocaleString()}đ</p>
              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1, item.selectedVariant)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <FiMinus className="w-3 h-3" />
                </button>
                <span className="text-sm">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1, item.selectedVariant)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <FiPlus className="w-3 h-3" />
                </button>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item._id, item.selectedVariant)}
              className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-red-500"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-900">Tổng cộng:</span>
          <span className="text-lg font-bold text-amber-600">{getCartTotal()?.toLocaleString()}đ</span>
        </div>
        <div className="flex gap-2">
          <Link
            to="/cart"
            className="flex-1 text-center bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            Xem giỏ hàng
          </Link>
          <Link
            to="/checkout"
            className="flex-1 text-center bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition-colors text-sm font-medium"
          >
            Thanh toán
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartDropdown; 