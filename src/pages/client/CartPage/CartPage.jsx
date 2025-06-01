import React from 'react';
import { useCart } from '../../../context/CartContext';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Giỏ hàng trống</h2>
          <p className="text-gray-500 mb-8">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
          <Link
            to="/"
            className="inline-block bg-amber-500 text-white px-6 py-3 rounded-md hover:bg-amber-600 transition-colors"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Giỏ hàng của bạn</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Danh sách sản phẩm */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm">
            {cartItems.map((item) => (
              <div 
                key={`${item._id}-${item.selectedVariant?.color}`} 
                className="flex items-center gap-4 p-4 border-b border-gray-100 last:border-0"
              >
                <Link to={`/product/${item._id}`}>
                  <img
                    src={item.selectedVariant?.image || item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded hover:opacity-90 transition-opacity"
                  />
                </Link>
                <div className="flex-1">
                  <Link to={`/product/${item._id}`} className="hover:text-amber-600 transition-colors">
                    <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
                  </Link>
                  {item.selectedVariant && (
                    <p className="text-sm text-gray-500 mb-1">
                      Color: {item.selectedVariant.color}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 line-clamp-2 mb-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1, item.selectedVariant)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <FiMinus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1, item.selectedVariant)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <FiPlus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-amber-600 font-medium">{item.priceSale?.toLocaleString()}đ</p>
                        {item.price > item.priceSale && (
                          <p className="text-sm text-gray-400 line-through">{item.price?.toLocaleString()}đ</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item._id, item.selectedVariant)}
                        className="p-2 hover:bg-gray-100 rounded text-gray-500 hover:text-red-500"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={clearCart}
              className="text-gray-500 hover:text-red-500 transition-colors"
            >
              Xóa tất cả
            </button>
            <Link
              to="/"
              className="text-amber-600 hover:text-amber-700 transition-colors"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>

        {/* Tổng đơn hàng */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Tổng đơn hàng</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tạm tính</span>
                <span className="text-gray-900">{getCartTotal()?.toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Phí vận chuyển</span>
                <span className="text-gray-900">Miễn phí</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Giảm giá</span>
                <span className="text-red-500">-0đ</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-base font-bold text-gray-900">Tổng cộng</span>
                <span className="text-xl font-bold text-amber-600">{getCartTotal()?.toLocaleString()}đ</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="block w-full bg-amber-500 text-white text-center py-3 rounded-md hover:bg-amber-600 transition-colors font-medium"
            >
              Tiến hành thanh toán
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 