import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import TopBar from '../../../components/TopBar'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import ProductDetailsComponent from '../../../components/ProductDetailsComponent/ProductDetailsComponent'

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/products/${id}`);
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
    return <div>Đang tải...</div>;
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