import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { API_ENDPOINTS } from '../../../config/api'
import ProductDetailsComponent from '../../../components/ProductDetailsComponent/ProductDetailsComponent'

const LoadingSpinner = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <div style={{
        width: '50px',
        height: '50px',
        border: '5px solid #f3f3f3',
        borderTop: '5px solid #3498db',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINTS.PRODUCTS}/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Lỗi khi tải thông tin sản phẩm:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!product) {
    return <div>Không tìm thấy sản phẩm</div>;
  }

  return (
    <div>
      <ProductDetailsComponent product={product} />
    </div>
  )
}

export default ProductDetailsPage