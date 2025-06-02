import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Slider, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { fetchProductsByCategory } from '../../redux/slices/productSlice';
import CardComponent from '../CardComponent/CardComponent';
import './CategoryPage.css';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const { products, loading: productsLoading, error } = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [category, setCategory] = useState(null);
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    dispatch(fetchProductsByCategory(categoryId))
      .unwrap()
      .then((data) => {
        setFilteredProducts(data);
        if (data.length > 0 && data[0].category) {
          setCategory(data[0].category[0]);
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, [dispatch, categoryId]);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    const filtered = products.filter((product) => {
      const minPrice = Math.min(...product.variants.map(v => v.price));
      return minPrice >= newValue[0] && minPrice <= newValue[1];
    });
    setFilteredProducts(filtered);
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortBy(value);
    let sorted = [...filteredProducts];
    
    switch (value) {
      case 'price-asc':
        sorted.sort((a, b) => {
          const priceA = Math.min(...a.variants.map(v => v.price));
          const priceB = Math.min(...b.variants.map(v => v.price));
          return priceA - priceB;
        });
        break;
      case 'price-desc':
        sorted.sort((a, b) => {
          const priceA = Math.min(...a.variants.map(v => v.price));
          const priceB = Math.min(...b.variants.map(v => v.price));
          return priceB - priceA;
        });
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    
    setFilteredProducts(sorted);
  };

  if (productsLoading) {
    return (
      <div className="category-page">
        <div className="loading">Đang tải...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="category-page">
        <div className="error">Có lỗi xảy ra: {error}</div>
      </div>
    );
  }

  return (
    <div className="category-page">
      <div className="breadcrumb">
        <Link to="/">Trang chủ</Link>
        <span className="separator">/</span>
        <Link to="/categories">Danh mục</Link>
        <span className="separator">/</span>
        <span className="current">{category?.name || 'Danh Mục Sản Phẩm'}</span>
      </div>

      <div className="category-header">
        <h1>{category?.name || 'Danh Mục Sản Phẩm'}</h1>
        {category?.description && (
          <p className="category-description">{category.description}</p>
        )}
      </div>

      <div className="category-content">
        <div className="filters">
          <div className="price-filter">
            <h3>Lọc Theo Giá</h3>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={5000000}
              step={100000}
            />
            <div className="price-range">
              <span>{priceRange[0].toLocaleString('vi-VN')}đ</span>
              <span>{priceRange[1].toLocaleString('vi-VN')}đ</span>
            </div>
          </div>
        </div>

        <div className="products-section">
          <div className="products-header">
            <div className="products-count">
              {filteredProducts.length} sản phẩm
            </div>
            <div className="products-sort">
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel>Sắp xếp theo</InputLabel>
                <Select
                  value={sortBy}
                  onChange={handleSortChange}
                  label="Sắp xếp theo"
                >
                  <MenuItem value="default">Mặc định</MenuItem>
                  <MenuItem value="price-asc">Giá tăng dần</MenuItem>
                  <MenuItem value="price-desc">Giá giảm dần</MenuItem>
                  <MenuItem value="name-asc">Tên A-Z</MenuItem>
                  <MenuItem value="name-desc">Tên Z-A</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <CardComponent
                  key={product._id}
                  _id={product._id}
                  name={product.name}
                  description={product.description}
                  image={product.image}
                  price={product.variants?.[0]?.price || product.priceSale}
                  priceSale={product.priceSale}
                  variants={product.variants}
                />
              ))
            ) : (
              <div className="no-products">
                Không có sản phẩm nào trong danh mục này
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage; 