import React, { useState } from 'react';
import { useCart } from '../../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiShoppingCart } from 'react-icons/fi';
import useAddress from '../../../hooks/useAddress';
import { API_ENDPOINTS } from '../../../config/api';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const {
    provinces,
    districts,
    wards,
    selectedProvince,
    setSelectedProvince,
    selectedDistrict,
    setSelectedDistrict,
    loading
  } = useAddress();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    ward: '',
    note: '',
    paymentMethod: 'cod'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Validate họ và tên
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ và tên';
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    // Validate số điện thoại
    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }

    // Validate địa chỉ
    if (!formData.address.trim()) {
      newErrors.address = 'Vui lòng nhập địa chỉ';
    }

    // Validate tỉnh/thành phố
    if (!formData.city) {
      newErrors.city = 'Vui lòng chọn tỉnh/thành phố';
    }

    // Validate quận/huyện
    if (!formData.district) {
      newErrors.district = 'Vui lòng chọn quận/huyện';
    }

    // Validate phường/xã
    if (!formData.ward) {
      newErrors.ward = 'Vui lòng chọn phường/xã';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Xóa lỗi khi người dùng bắt đầu nhập
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Cập nhật selectedProvince và selectedDistrict khi chọn tỉnh/thành phố và quận/huyện
    if (name === 'city') {
      setSelectedProvince(value);
      setSelectedDistrict('');
      setFormData(prev => ({
        ...prev,
        district: '',
        ward: ''
      }));
    } else if (name === 'district') {
      setSelectedDistrict(value);
      setFormData(prev => ({
        ...prev,
        ward: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Format data according to API requirements
      console.log('Debug provinces:', provinces);
      console.log('Debug districts:', districts);
      console.log('Debug wards:', wards);
      console.log('Form data:', formData);

      const selectedProvince = provinces.find(p => p.code === parseInt(formData.city));
      const selectedDistrict = districts.find(d => d.code === parseInt(formData.district));
      const selectedWard = wards.find(w => w.code === parseInt(formData.ward));

      console.log('Selected locations:', {
        province: selectedProvince,
        district: selectedDistrict,
        ward: selectedWard
      });

      const orderData = {
        customerInfo: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone
        },
        items: cartItems.map(item => ({
          product: item._id,
          quantity: item.quantity,
          price: item.priceSale || item.price
        })),
        shippingAddress: {
          address: formData.address,
          city: selectedProvince?.name || '',
          district: selectedDistrict?.name || '',
          ward: selectedWard?.name || ''
        },
        paymentMethod: formData.paymentMethod === 'cod' ? 'COD' : 'BANK_TRANSFER'
      };

      console.log('Sending order data:', orderData); // Debug log

      const response = await fetch(API_ENDPOINTS.ORDERS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to place order');
      }
      
      // Clear cart and redirect on success
      clearCart();
      navigate('/thank-you');
    } catch (error) {
      console.error('Error placing order:', error);
      setErrors(prev => ({
        ...prev,
        submit: error.message || 'Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Giỏ hàng trống</h2>
          <p className="text-gray-500 mb-8">Bạn cần thêm sản phẩm vào giỏ hàng trước khi thanh toán</p>
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
      <Link
        to="/cart"
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
      >
        <FiArrowLeft className="mr-2" />
        Quay lại giỏ hàng
      </Link>

      <h1 className="text-2xl font-bold text-gray-900 mb-8">Thanh toán</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form thông tin thanh toán */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Thông tin giao hàng</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Địa chỉ *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500`}
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tỉnh/Thành phố *
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    disabled={loading}
                    className={`w-full px-3 py-2 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500`}
                  >
                    <option value="">Chọn tỉnh/thành phố</option>
                    {provinces.map((province) => (
                      <option key={province.code} value={province.code}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quận/Huyện *
                  </label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    disabled={loading || !selectedProvince}
                    className={`w-full px-3 py-2 border ${errors.district ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500`}
                  >
                    <option value="">Chọn quận/huyện</option>
                    {districts.map((district) => (
                      <option key={district.code} value={district.code}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                  {errors.district && (
                    <p className="mt-1 text-sm text-red-500">{errors.district}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phường/Xã *
                  </label>
                  <select
                    name="ward"
                    value={formData.ward}
                    onChange={handleInputChange}
                    disabled={loading || !selectedDistrict}
                    className={`w-full px-3 py-2 border ${errors.ward ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500`}
                  >
                    <option value="">Chọn phường/xã</option>
                    {wards.map((ward) => (
                      <option key={ward.code} value={ward.code}>
                        {ward.name}
                      </option>
                    ))}
                  </select>
                  {errors.ward && (
                    <p className="mt-1 text-sm text-red-500">{errors.ward}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Phương thức thanh toán</h2>
              
              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500"
                  />
                  <span className="ml-2">Thanh toán khi nhận hàng (COD)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="banking"
                    checked={formData.paymentMethod === 'banking'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500"
                  />
                  <span className="ml-2">Chuyển khoản ngân hàng</span>
                </label>
              </div>

              {formData.paymentMethod === 'banking' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-md font-medium text-gray-900 mb-3">Thông tin chuyển khoản</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ngân hàng:</span>
                      <span className="font-medium">Vietcombank</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Số tài khoản:</span>
                      <span className="font-medium">1234567890</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Chủ tài khoản:</span>
                      <span className="font-medium">CÔNG TY TNHH SHOP TAY CẦM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Chi nhánh:</span>
                      <span className="font-medium">Hồ Chí Minh</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nội dung chuyển khoản:</span>
                      <span className="font-medium">SHOPTAYCAM [Số điện thoại của bạn]</span>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-gray-500">
                    <p className="font-medium text-amber-600">Lưu ý:</p>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      <li>Vui lòng chuyển khoản đúng số tiền và nội dung</li>
                      <li>Đơn hàng sẽ được xử lý sau khi chúng tôi xác nhận được chuyển khoản</li>
                      <li>Nếu cần hỗ trợ, vui lòng liên hệ hotline: 0123456789</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Ghi chú đơn hàng</h2>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleInputChange}
                rows="4"
                placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </form>
        </div>

        {/* Tổng đơn hàng */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Đơn hàng của bạn</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={`${item._id}-${item.selectedVariant?.color || 'default'}-${item.selectedVariant?.size || 'default'}`} className="flex items-center gap-4">
                  <img
                    src={item.selectedVariant?.image || item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                    {item.selectedVariant && (
                      <p className="text-sm text-gray-500">
                        Color: {item.selectedVariant.color}
                      </p>
                    )}
                    <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                    <p className="text-sm text-amber-600 font-medium">{item.priceSale?.toLocaleString()}đ</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Tạm tính</span>
                <span>{getCartTotal().toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Phí vận chuyển</span>
                <span>Miễn phí</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between font-medium">
                <span>Tổng cộng</span>
                <span className="text-amber-600">{getCartTotal().toLocaleString()}đ</span>
              </div>
            </div>

            {errors.submit && (
              <p className="text-sm text-red-500 mb-4">{errors.submit}</p>
            )}

            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-amber-500 text-white py-3 rounded-md hover:bg-amber-600 transition-colors mb-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'Đang xử lý...' : (
                <>
                  <FiShoppingCart className="text-lg" />
                  Đặt hàng
                </>
              )}
            </button>

            <div className="text-sm text-gray-500">
              <p className="mb-2">Chính sách vận chuyển:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Miễn phí vận chuyển cho đơn hàng trên 500.000đ</li>
                <li>Giao hàng toàn quốc</li>
                <li>Nhận hàng và thanh toán</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 