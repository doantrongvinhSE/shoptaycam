import React from 'react';

const NavbarComponent = () => {
  const categories = [
    'Tay Cầm PS4 Đáng Mua Nhất',
    'Tay Cầm Xbox 360',
    'Tay Cầm PS4',
    'Tay Cầm PS5',
    'Tay cầm Xbox',
    'Tay Cầm Xbox Series X',
    'Tay Cầm Gamesir',
    'Máy Chơi Game',
    'Phụ kiện tay cầm'
  ];

  const newProducts = [
    {
      img: 'https://via.placeholder.com/80',
      name: 'Tay Cầm Chơi Game 8Bitdo Ultimate 2 Wireless...',
      price: '980.000VNĐ'
    },
    {
      img: 'https://via.placeholder.com/80',
      name: 'Tay Cầm Chơi Game 8Bitdo Ultimate 2 Wireless (Trắng)...',
      price: '980.000VNĐ'
    },
    {
      img: 'https://via.placeholder.com/80',
      name: 'Tay Cầm Chơi Game GameSir T4 PRO chính hãng...',
      price: '1.199.000VNĐ'
    },
    {
      img: 'https://via.placeholder.com/80',
      name: 'Tay Cầm Chơi Game GameSir NOVA LITE 2...',
      price: '550.000VNĐ'
    }
  ];

  return (
    <div className="w-64 p-4 border-r border-gray-200">
      {/* Danh mục sản phẩm */}
      <div>
        <h2 className="font-bold mb-2">DANH MỤC SẢN PHẨM</h2>
        <ul className="space-y-1 text-blue-600 text-sm">
          {categories.map((item, index) => (
            <li key={index} className="hover:underline cursor-pointer">{item}</li>
          ))}
        </ul>
      </div>

      {/* Lọc theo giá */}
      <div className="mt-6">
        <h2 className="font-bold mb-2">LỌC THEO GIÁ</h2>
        <input type="range" min="339000" max="1449000" className="w-full" />
        <div className="text-sm text-gray-700 mt-1">
          Giá: 339.000VNĐ – 1.449.000VNĐ
        </div>
      </div>

      {/* Sản phẩm mới */}
      <div className="mt-6">
        <h2 className="font-bold mb-2">SẢN PHẨM MỚI</h2>
        <div className="space-y-4">
          {newProducts.map((product, index) => (
            <div key={index} className="flex items-start space-x-2">
              <img src={product.img} alt={product.name} className="w-16 h-16 object-cover border" />
              <div className="text-sm">
                <div className="font-medium text-gray-800">{product.name}</div>
                <div className="text-red-600 font-semibold">{product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavbarComponent;
