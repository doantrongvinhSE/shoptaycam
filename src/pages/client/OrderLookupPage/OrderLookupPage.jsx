import React, { useState } from 'react';
import axios from 'axios';
import { FaSearch, FaBox, FaShippingFast, FaMapMarkerAlt, FaCalendarAlt, FaMoneyBillWave } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { BsTelephoneFill } from 'react-icons/bs';
import { API_ENDPOINTS } from '../../../config/api';

const OrderStatus = ({ status }) => {
    const getStatusColor = () => {
        switch(status?.toLowerCase()) {
            case 'pending':
                return 'bg-[#e3d06f] bg-opacity-20 text-[#8b7e43]';
            case 'processing':
                return 'bg-blue-100 text-blue-800';
            case 'shipping':
                return 'bg-purple-100 text-purple-800';
            case 'delivered':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status) => {
        switch(status) {
            case 'PENDING':
                return 'Chờ xác nhận';
            case 'PROCESSING':
                return 'Đang xử lý';
            case 'SHIPPING':
                return 'Đang giao';
            case 'DELIVERED':
                return 'Đã giao';
            case 'CANCELLED':
                return 'Đã hủy';
            default:
                return status;
        }
    };

    return (
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
            {getStatusText(status)}
        </span>
    );
};

const OrderLookupPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searched, setSearched] = useState(false);
    const [searchType, setSearchType] = useState('phone'); // 'phone' or 'email'

    const handleLookup = async (e) => {
        e.preventDefault();
        if (!searchTerm) {
            setError('Vui lòng nhập thông tin tìm kiếm');
            return;
        }
        setLoading(true);
        setError('');
        setOrders([]);
        setSearched(true);
        try {
            const endpoint = searchType === 'email' 
                ? `${API_ENDPOINTS.ORDERS}/email/${searchTerm}`
                : `${API_ENDPOINTS.ORDERS}/phone/${searchTerm}`;
            
            const response = await axios.get(endpoint);
            if (response.data.success) {
                setOrders(response.data.data);
                if (response.data.data.length === 0) {
                    setError('Không tìm thấy đơn hàng nào.');
                }
            } else {
                setError('Có lỗi xảy ra khi tìm kiếm đơn hàng.');
            }
        } catch {
            setError('Không tìm thấy đơn hàng. Vui lòng kiểm tra lại thông tin.');
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-4 min-h-screen  bg-opacity-5">
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-8 border border-[#e3d06f] border-opacity-20">
                <div className="text-center mb-8">
                    <FaBox className="mx-auto text-4xl text-[#e3d06f] mb-4" />
                    <h1 className="text-3xl font-bold text-gray-800">Tra cứu đơn hàng</h1>
                    <p className="text-gray-600 mt-2">Nhập thông tin để kiểm tra trạng thái đơn hàng của bạn</p>
                </div>

                <div className="flex justify-center gap-4 mb-6">
                    <button 
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                            searchType === 'phone' 
                            ? 'bg-[#e3d06f] text-white shadow-md' 
                            : 'bg-gray-100 hover:bg-[#e3d06f] hover:bg-opacity-10'
                        }`}
                        onClick={() => setSearchType('phone')}
                    >
                        <BsTelephoneFill /> Số điện thoại
                    </button>
                    <button 
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                            searchType === 'email' 
                            ? 'bg-[#e3d06f] text-white shadow-md' 
                            : 'bg-gray-100 hover:bg-[#e3d06f] hover:bg-opacity-10'
                        }`}
                        onClick={() => setSearchType('email')}
                    >
                        <MdEmail /> Email
                    </button>
                </div>

                <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                        <input
                            type={searchType === 'email' ? 'email' : 'tel'}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder={searchType === 'email' ? 'Nhập email của bạn' : 'Nhập số điện thoại của bạn'}
                            className="input w-full pl-10 focus:border-[#e3d06f] focus:ring-[#e3d06f]"
                        />
                        {searchType === 'email' ? 
                            <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#e3d06f]" /> :
                            <BsTelephoneFill className="absolute left-3 top-1/2 -translate-y-1/2 text-[#e3d06f]" />
                        }
                    </div>
                    <button 
                        type="submit" 
                        className="btn bg-[#e3d06f] hover:bg-[#cbb962] text-white min-w-[120px] flex items-center gap-2 border-none"
                        disabled={loading}
                    >
                        <FaSearch className={loading ? 'animate-spin' : ''} />
                        {loading ? 'Đang tìm...' : 'Tra cứu'}
                    </button>
                </form>

                {error && (
                    <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                        <p className="flex items-center gap-2">
                            <span className="font-medium">Lỗi:</span> {error}
                        </p>
                    </div>
                )}
            </div>

            {searched && !loading && orders.length > 0 && (
                <div className="space-y-6 animate-fadeIn">
                    <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
                        <FaBox className="text-[#e3d06f]" /> Kết quả tra cứu
                    </h2>
                    {orders.map(order => (
                        <div key={order._id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-[#e3d06f] border-opacity-10">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Đơn hàng #{order._id}</h3>
                                <OrderStatus status={order.orderStatus} />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <p className="flex items-center gap-2 text-gray-600">
                                        <FaCalendarAlt className="text-[#e3d06f]" />
                                        <span>Ngày đặt: {new Date(order.createdAt).toLocaleDateString('vi-VN')}</span>
                                    </p>
                                    <p className="flex items-center gap-2 text-gray-600">
                                        <FaMoneyBillWave className="text-[#e3d06f]" />
                                        <span>Tổng tiền: <span className="font-semibold text-[#e3d06f]">{order.totalAmount?.toLocaleString()}đ</span></span>
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-start gap-2">
                                        <FaBox className="text-[#e3d06f] mt-1" />
                                        <div>
                                            <p className="font-medium text-gray-700">Sản phẩm:</p>
                                            <ul className="list-disc list-inside text-gray-600">
                                                {order.items.map(item => (
                                                    <li key={item._id} className="text-sm">
                                                        {item.productInfo.name} - {item.quantity} x {item.price?.toLocaleString()}đ
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {order.shippingAddress && (
                                <div className="mt-4 pt-4 border-t border-[#e3d06f] border-opacity-10">
                                    <div className="flex items-start gap-2">
                                        <FaMapMarkerAlt className="text-[#e3d06f] mt-1" />
                                        <div>
                                            <p className="font-medium text-gray-700">Địa chỉ giao hàng:</p>
                                            <p className="text-gray-600">{order.customerInfo.fullName}, {order.customerInfo.phone}</p>
                                            <p className="text-gray-600">{order.shippingAddress.address}, {order.shippingAddress.ward}, {order.shippingAddress.district}, {order.shippingAddress.city}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="mt-4 flex items-center gap-2">
                                <FaShippingFast className="text-[#e3d06f]" />
                                <span className="text-sm text-gray-600">Phương thức thanh toán: {order.paymentMethod}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderLookupPage; 