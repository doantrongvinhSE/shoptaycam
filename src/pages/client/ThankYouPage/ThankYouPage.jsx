import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';

const ThankYouPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <FiCheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Đặt hàng thành công!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Cảm ơn quý khách đã đặt hàng. Chúng tôi sẽ liên hệ với quý khách trong thời gian sớm nhất.
        </p>
        <div className="space-x-4">
          <Link
            to="/"
            className="inline-block bg-amber-500 text-white px-6 py-3 rounded-md hover:bg-amber-600 transition-colors"
          >
            Tiếp tục mua sắm
          </Link>
          <Link
            to="/orders"
            className="inline-block bg-white text-amber-500 border border-amber-500 px-6 py-3 rounded-md hover:bg-amber-50 transition-colors"
          >
            Xem đơn hàng của tôi
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage; 