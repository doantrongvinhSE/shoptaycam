import React, { useState } from 'react';
import { FiCheck, FiCopy, FiLoader } from 'react-icons/fi';

const formatVnd = (value) => `${Number(value || 0).toLocaleString('vi-VN')}đ`;

const BankTransferPayment = ({ paymentInfo, isPaid, pollingError, onBackToCart }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(paymentInfo.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-sm border border-amber-100 p-6 text-center">
        <div className="flex justify-center mb-4">
          {isPaid ? (
            <FiCheck className="w-12 h-12 text-green-500" />
          ) : (
            <FiLoader className="w-12 h-12 text-amber-500 animate-spin" />
          )}
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {isPaid ? 'Đã xác nhận thanh toán' : 'Quét QR để thanh toán'}
        </h1>
        <p className="text-gray-600 mb-6">
          Vui lòng chuyển khoản đúng số tiền và nội dung để hệ thống tự động xác nhận.
        </p>

        <div className="flex justify-center mb-6">
          <img
            src={paymentInfo.qrUrl}
            alt="QR chuyển khoản"
            className="w-72 max-w-full rounded-lg border border-gray-200"
          />
        </div>

        <div className="space-y-3 text-left bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between gap-4">
            <span className="text-gray-600">Ngân hàng</span>
            <span className="font-semibold text-gray-900">{paymentInfo.bankName}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-600">Số tài khoản</span>
            <span className="font-semibold text-gray-900">{paymentInfo.accountNumber}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-600">Số tiền</span>
            <span className="font-semibold text-amber-600">{formatVnd(paymentInfo.amount)}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span className="text-gray-600">Nội dung</span>
            <div className="flex items-center gap-2 justify-end">
              <span className="font-semibold text-gray-900 text-lg tracking-wide">{paymentInfo.content}</span>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-amber-500 text-white hover:bg-amber-600 transition-colors"
              >
                {copied ? <FiCheck /> : <FiCopy />}
                {copied ? 'Đã copy' : 'Copy'}
              </button>
            </div>
          </div>
        </div>

        {pollingError && (
          <p className="text-sm text-red-500 mb-4">{pollingError}</p>
        )}

        <div className="text-sm text-gray-500 space-y-1 mb-6">
          <p>Hệ thống đang tự kiểm tra trạng thái thanh toán.</p>
          <p>Nếu đã chuyển khoản, vui lòng giữ nguyên trang trong giây lát.</p>
        </div>

        <button
          type="button"
          onClick={onBackToCart}
          className="text-amber-600 hover:text-amber-700 font-medium"
        >
          Quay lại giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default BankTransferPayment;
