# Thiết kế tích hợp thanh toán Sepay cho checkout

## Mục tiêu

Tích hợp luồng thanh toán chuyển khoản Sepay vào checkout frontend. Khách chọn chuyển khoản sẽ thấy QR thanh toán, mã nội dung chuyển khoản ngắn dạng `DH...`, và frontend tự nhận biết khi backend được Sepay xác nhận thanh toán.

## Backend

- Khi tạo đơn `BANK_TRANSFER`, backend sinh `orderCode` dạng `DH` + 6 ký tự in hoa/số.
- Response tạo đơn trả thêm `paymentInfo` cho đơn chuyển khoản:
  - `orderId`: `_id` của đơn,
  - `amount`: tổng tiền,
  - `content`: `orderCode`,
  - `bankName`: `VPBank`,
  - `accountNumber`: `0343383136`,
  - `qrUrl`: URL Sepay QR đã có `bank`, `acc`, `template`, `amount`, `des`.
- URL QR dùng format: `https://qr.sepay.vn/img?bank=VPBank&acc=0343383136&template=compact&amount=<amount>&des=<orderCode>`.
- Webhook Sepay parse mã `DH...` từ nội dung giao dịch, kiểm tra đúng đơn và đúng số tiền, rồi cập nhật `paymentStatus = PAID`, `orderStatus = PROCESSING`.
- Endpoint `GET /api/orders/:id` giữ vai trò cho frontend polling trạng thái thanh toán.

## Frontend

- Checkout vẫn cho chọn `COD` hoặc chuyển khoản.
- Với `COD`, sau khi tạo đơn thành công thì clear cart và chuyển sang trang cảm ơn như hiện tại.
- Với chuyển khoản, sau khi tạo đơn thành công:
  - không clear cart ngay,
  - không chuyển sang trang cảm ơn ngay,
  - hiển thị trạng thái chờ thanh toán trong checkout.
- Màn hình chờ thanh toán hiển thị:
  - QR từ `paymentInfo.qrUrl`,
  - ngân hàng `VPBank`,
  - số tài khoản `0343383136`,
  - số tiền cần chuyển,
  - nội dung chuyển khoản `DH...`,
  - nút copy nội dung chuyển khoản.
- Frontend polling `GET /api/orders/:orderId` mỗi 3-5 giây.
- Khi response có `paymentStatus = PAID`, frontend clear cart và chuyển sang trang cảm ơn.
- Nếu polling lỗi, frontend giữ QR trên màn hình và hiển thị hướng dẫn chờ xác nhận hoặc tra cứu đơn hàng.

## UX và lỗi

- QR chỉ hiển thị sau khi backend tạo đơn thành công để đảm bảo mã thanh toán đã được lưu.
- Khách cần chuyển đúng số tiền và nội dung `DH...`.
- Nếu khách đóng trang sau khi tạo đơn, họ vẫn có thể tra cứu đơn bằng số điện thoại/email như hiện tại.
- Không thêm xác thực webhook trong phạm vi này.

## Kiểm thử

- Backend tạo đơn `BANK_TRANSFER` trả `paymentInfo` đúng format.
- Backend tạo đơn `COD` không cần `paymentInfo`.
- Frontend chọn chuyển khoản hiển thị QR và nội dung chuyển khoản từ response backend.
- Frontend polling nhận `PAID` thì clear cart và chuyển Thank You.
- Frontend build/lint thành công.
