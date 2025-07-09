import React from 'react';
// Import logo mẫu (bạn cần thêm các file logo vào đúng đường dẫn này)
import bigbigwonLogo from '../../assets/brands/1.jpg';
import bitdoLogo from '../../assets/brands/4.png';
import easysmxLogo from '../../assets/brands/2.jpg';
import pxnLogo from '../../assets/brands/3.png';
import flydigiLogo from '../../assets/brands/5.jpg';
import pxnLogo2 from '../../assets/brands/6.jpg';

const brands = [
  { src: bigbigwonLogo, alt: 'BigBigWon' },
  { src: bitdoLogo, alt: '8BitDo' },
  { src: flydigiLogo, alt: 'Flydigi' },
  { src: easysmxLogo, alt: 'EasySMX' },
  { src: pxnLogo, alt: 'PXN' },
  { src: pxnLogo2, alt: 'PXN' },
];

const BrandComponent = () => {
  return (
    <div style={{ maxWidth: 1800, margin: '0 auto', padding: '40px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <h2 style={{
          fontSize: 32,
          fontWeight: 700,
          margin: 0,
          letterSpacing: 1,
        }}>
          Đối tác thương hiệu của Pressing Time
        </h2>
        <div style={{
          width: 120,
          height: 4,
          background: 'linear-gradient(90deg, #ff9800, #2196f3)',
          margin: '12px auto 0 auto',
          borderRadius: 2
        }} />
        <p style={{
          color: '#666',
          fontSize: 16,
          marginTop: 12
        }}>
          Chúng tôi tự hào hợp tác cùng các thương hiệu hàng đầu về thiết bị chơi game.
        </p>
      </div>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '32px',
      }}>
        {brands.map((brand, idx) => (
          <div
            key={idx}
            style={{
              background: '#fff',
              borderRadius: 16,
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              padding: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.2s, box-shadow 0.2s',
              height: 130,
              width: 160,
              cursor: 'pointer'
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'scale(1.07)';
              e.currentTarget.style.boxShadow = '0 4px 24px rgba(33,150,243,0.15)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
            }}
          >
            <img
              src={brand.src}
              alt={brand.alt}
              style={{ maxHeight: 100, maxWidth: 120, objectFit: 'contain' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandComponent;