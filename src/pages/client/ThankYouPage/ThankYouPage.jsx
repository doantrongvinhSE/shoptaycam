import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';

const ThankYouPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
      <div className="text-center">
        <div className="flex justify-center mb-4 sm:mb-6">
          <FiCheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-500" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Đặt hàng thành công!</h1>
        <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 px-2">
          Cảm ơn quý khách đã đặt hàng. Chúng tôi sẽ liên hệ với quý khách trong thời gian sớm nhất.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto inline-block bg-amber-500 text-white px-6 py-3 rounded-md hover:bg-amber-600 transition-colors text-center"
          >
            Tiếp tục mua sắm
          </Link>
          <Link
            to="/tra-cuu-don-hang"
            className="w-full sm:w-auto inline-block bg-white text-amber-500 border border-amber-500 px-6 py-3 rounded-md hover:bg-amber-50 transition-colors text-center"
          >
            Xem đơn hàng của tôi
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage; 