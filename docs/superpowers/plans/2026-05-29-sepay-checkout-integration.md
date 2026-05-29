# Sepay Checkout Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tích hợp thanh toán chuyển khoản Sepay vào checkout: backend trả `paymentInfo`, frontend hiển thị QR và tự chuyển trang khi webhook cập nhật `PAID`.

**Architecture:** Backend giữ luồng tạo đơn hiện tại nhưng bổ sung `paymentInfo` cho đơn `BANK_TRANSFER`. Frontend tách phần hiển thị chờ thanh toán thành component riêng, polling `GET /api/orders/:id` đến khi `paymentStatus = PAID`, còn COD giữ hành vi cũ.

**Tech Stack:** Backend Node.js/Express/Mongoose, frontend React 19/Vite/Tailwind, fetch API, Sepay QR URL.

---

## File Structure

### Backend: `e:\WORKING\taycam\taycambe`

- Modify: `src/controllers/orderController.js`
  - Thêm helper build QR URL/paymentInfo.
  - Trả `paymentInfo` trong response tạo đơn `BANK_TRANSFER`.

### Frontend: `e:\WORKING\taycam\shoptaycam_fe`

- Create: `src/components/Payment/BankTransferPayment.jsx`
  - Hiển thị QR, ngân hàng, số tài khoản, số tiền, nội dung chuyển khoản, nút copy, trạng thái chờ thanh toán.
- Modify: `src/pages/client/CheckoutPage/CheckoutPage.jsx`
  - Lưu `paymentInfo` và `pendingOrderId` sau khi tạo đơn chuyển khoản.
  - COD tiếp tục clear cart + navigate `/thank-you`.
  - BANK_TRANSFER hiển thị component chờ thanh toán và polling order detail.

---

### Task 1: Backend returns paymentInfo for bank transfer orders

**Files:**
- Modify: `e:\WORKING\taycam\taycambe\src\controllers\orderController.js`

- [ ] **Step 1: Add payment constants and helper**

In `src/controllers/orderController.js`, after `const TELEGRAM_SEND_URL = ...`, add:

```js
const BANK_PAYMENT_INFO = {
  bankName: 'VPBank',
  bankCode: 'VPBank',
  accountNumber: '0343383136',
  template: 'compact',
};

function buildSepayQrUrl({ amount, content }) {
  const params = new URLSearchParams({
    bank: BANK_PAYMENT_INFO.bankCode,
    acc: BANK_PAYMENT_INFO.accountNumber,
    template: BANK_PAYMENT_INFO.template,
    amount: String(amount),
    des: content,
  });

  return `https://qr.sepay.vn/img?${params.toString()}`;
}

function buildPaymentInfo(order) {
  if (order.paymentMethod !== 'BANK_TRANSFER' || !order.orderCode) {
    return undefined;
  }

  return {
    orderId: order._id,
    amount: order.totalAmount,
    content: order.orderCode,
    bankName: BANK_PAYMENT_INFO.bankName,
    accountNumber: BANK_PAYMENT_INFO.accountNumber,
    qrUrl: buildSepayQrUrl({
      amount: order.totalAmount,
      content: order.orderCode,
    }),
  };
}
```

- [ ] **Step 2: Return paymentInfo when creating order**

In `exports.createOrder`, replace the success response:

```js
    res.status(201).json({
      success: true,
      data: order
    });
```

with:

```js
    res.status(201).json({
      success: true,
      data: order,
      paymentInfo: buildPaymentInfo(order)
    });
```

- [ ] **Step 3: Export buildPaymentInfo for future testability**

At the end of `src/controllers/orderController.js`, after `exports.sendTelegram = sendTelegram;`, add:

```js
exports.buildPaymentInfo = buildPaymentInfo;
```

- [ ] **Step 4: Verify backend tests still pass**

Run:

```bash
npm --prefix "e:\WORKING\taycam\taycambe" test
```

Expected: PASS with 7 passing tests.

---

### Task 2: Frontend payment waiting component

**Files:**
- Create: `e:\WORKING\taycam\shoptaycam_fe\src\components\Payment\BankTransferPayment.jsx`

- [ ] **Step 1: Create Payment directory if missing**

Run:

```powershell
New-Item -ItemType Directory -Path "e:\WORKING\taycam\shoptaycam_fe\src\components\Payment" -Force
```

Expected: directory exists.

- [ ] **Step 2: Create BankTransferPayment component**

Create `src/components/Payment/BankTransferPayment.jsx`:

```jsx
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
```

---

### Task 3: Wire payment info into checkout

**Files:**
- Modify: `e:\WORKING\taycam\shoptaycam_fe\src\pages\client\CheckoutPage\CheckoutPage.jsx`

- [ ] **Step 1: Update imports**

In `CheckoutPage.jsx`, change:

```jsx
import React, { useState } from 'react';
```

to:

```jsx
import React, { useEffect, useState } from 'react';
```

Add this import after `normalizeImageUrl`:

```jsx
import BankTransferPayment from '../../../components/Payment/BankTransferPayment';
```

- [ ] **Step 2: Add payment waiting state**

After:

```jsx
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
```

add:

```jsx
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [pendingOrderId, setPendingOrderId] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [pollingError, setPollingError] = useState('');
```

- [ ] **Step 3: Add polling effect**

After state declarations and before `validateForm`, add:

```jsx
  useEffect(() => {
    if (!pendingOrderId || isPaid) {
      return undefined;
    }

    const checkPaymentStatus = async () => {
      try {
        const response = await fetch(`${API_ENDPOINTS.ORDERS}/${pendingOrderId}`);
        const responseData = await response.json();

        if (!response.ok || !responseData.success) {
          throw new Error('Không thể kiểm tra trạng thái thanh toán');
        }

        setPollingError('');

        if (responseData.data?.paymentStatus === 'PAID') {
          setIsPaid(true);
          clearCart();
          navigate('/thank-you');
        }
      } catch {
        setPollingError('Chưa kiểm tra được trạng thái thanh toán, hệ thống sẽ thử lại.');
      }
    };

    checkPaymentStatus();
    const intervalId = window.setInterval(checkPaymentStatus, 4000);

    return () => window.clearInterval(intervalId);
  }, [clearCart, isPaid, navigate, pendingOrderId]);
```

- [ ] **Step 4: Update submit success behavior**

Replace:

```jsx
      // Clear cart and redirect on success
      clearCart();
      navigate('/thank-you');
```

with:

```jsx
      if (formData.paymentMethod === 'banking') {
        if (!responseData.paymentInfo) {
          throw new Error('Không nhận được thông tin thanh toán. Vui lòng thử lại.');
        }

        setPaymentInfo(responseData.paymentInfo);
        setPendingOrderId(responseData.paymentInfo.orderId || responseData.data?._id);
        setPollingError('');
        return;
      }

      clearCart();
      navigate('/thank-you');
```

- [ ] **Step 5: Show payment waiting component**

After the empty-cart guard and before the main `return`, add:

```jsx
  if (paymentInfo) {
    return (
      <BankTransferPayment
        paymentInfo={paymentInfo}
        isPaid={isPaid}
        pollingError={pollingError}
        onBackToCart={() => setPaymentInfo(null)}
      />
    );
  }
```

- [ ] **Step 6: Update banking preview copy before submit**

In the banking info block, replace the current content rows from `Ngân hàng` through `Nội dung chuyển khoản` with:

```jsx
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ngân hàng:</span>
                      <span className="font-medium">VPBank</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Số tài khoản:</span>
                      <span className="font-medium">0343383136</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nội dung chuyển khoản:</span>
                      <span className="font-medium">Hệ thống sẽ tạo mã DH sau khi đặt hàng</span>
                    </div>
```

- [ ] **Step 7: Run frontend build**

Run:

```bash
npm --prefix "e:\WORKING\taycam\shoptaycam_fe" run build
```

Expected: build succeeds.

---

### Task 4: Manual end-to-end verification

**Files:**
- No code changes expected.

- [ ] **Step 1: Run backend tests**

Run:

```bash
npm --prefix "e:\WORKING\taycam\taycambe" test
```

Expected: PASS with 7 passing tests.

- [ ] **Step 2: Run frontend build**

Run:

```bash
npm --prefix "e:\WORKING\taycam\shoptaycam_fe" run build
```

Expected: build succeeds.

- [ ] **Step 3: Start backend on test port**

Run:

```powershell
$env:PORT='3002'; npm --prefix "e:\WORKING\taycam\taycambe" start
```

Expected: backend prints `server is running on port: 3002` and `MongoDB connected`.

- [ ] **Step 4: Start frontend dev server**

Run:

```bash
npm --prefix "e:\WORKING\taycam\shoptaycam_fe" run dev -- --host 127.0.0.1 --port 5173
```

Expected: Vite serves the frontend at `http://127.0.0.1:5173`.

- [ ] **Step 5: Verify checkout transfer flow manually**

Open `http://127.0.0.1:5173`, add a product to cart, go to checkout, select chuyển khoản, and submit.

Expected:
- checkout shows QR from `qr.sepay.vn`,
- content displays a `DH...` code,
- amount matches order total,
- cart is not cleared yet.

- [ ] **Step 6: Simulate Sepay webhook**

Use the visible `DH...` code and amount from the QR screen:

```powershell
$body = @{ content = 'Thanh toan don DHXXXXXX'; transferAmount = 269000 } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3002/hooks/sepay-payments" -Method Post -ContentType "application/json" -Body $body
```

Expected: backend returns `success: true`, frontend polling redirects to `/thank-you`, and cart is cleared.

---

## Self-Review

- Spec coverage: Backend `paymentInfo`, QR URL, FE QR display, polling, COD unchanged, webhook-driven PAID transition, and manual verification are covered.
- Placeholder scan: No TBD/TODO/fill-later placeholders remain; commands and code blocks are concrete.
- Type consistency: `paymentInfo.orderId`, `amount`, `content`, `bankName`, `accountNumber`, `qrUrl` are consistently used across backend and frontend.
