import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeImageUrl } from './imageUrl.js';

test('giữ nguyên URL ImageKit không có đuôi ảnh', () => {
  assert.equal(
    normalizeImageUrl('https://ik.imagekit.io/nlmksmytw/taycam/blob_JetnVOybO'),
    'https://ik.imagekit.io/nlmksmytw/taycam/blob_JetnVOybO'
  );
});

test('giữ nguyên URL đã có đuôi .jpg', () => {
  assert.equal(
    normalizeImageUrl('https://ik.imagekit.io/nlmksmytw/taycam/image-1780059972330_jLtjq2RV7.jpg'),
    'https://ik.imagekit.io/nlmksmytw/taycam/image-1780059972330_jLtjq2RV7.jpg'
  );
});

test('lấy url từ object ảnh sản phẩm', () => {
  assert.equal(
    normalizeImageUrl({
      url: 'https://ik.imagekit.io/nlmksmytw/taycam/image-1780059972330_jLtjq2RV7.jpg',
      public_id: '6a198f455c7cd75eb8472460'
    }),
    'https://ik.imagekit.io/nlmksmytw/taycam/image-1780059972330_jLtjq2RV7.jpg'
  );
});

test('lấy url từ object ảnh variant và không tự thêm .jpg', () => {
  assert.equal(
    normalizeImageUrl({
      url: 'https://ik.imagekit.io/nlmksmytw/taycam/blob_JetnVOybO',
      public_id: '6a198f475c7cd75eb84730d8'
    }),
    'https://ik.imagekit.io/nlmksmytw/taycam/blob_JetnVOybO'
  );
});
