"use client"

import { useState } from "react"
import { useCart } from "../../context/CartContext"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { 
  FaShoppingCart, 
  FaHeart, 
  FaStar, 
  FaCheck, 
  FaTruck, 
  FaExchangeAlt, 
  FaShieldAlt,
  FaChevronRight,
  FaMinus,
  FaPlus
} from "react-icons/fa"
import "react-toastify/dist/ReactToastify.css"

const ProductDetailPage = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product.variants[0]?.color || "")
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addToCart, clearCart } = useCart()
  const navigate = useNavigate()

  // Get selected variant
  const selectedVariant = product.variants?.length > 0 
    ? product.variants.find(v => v.color === selectedColor) || product.variants[0]
    : null

  // Get variant image
  const getVariantImage = () => {
    if (!product.variants?.length) {
      return product.images[0]
    }

    // Tìm variant chính xác với màu
    const exactVariant = product.variants.find(v => v.color === selectedColor)
    
    if (exactVariant?.image) {
      return exactVariant.image
    }

    // Nếu không tìm thấy ảnh nào, trả về ảnh mặc định
    return product.images[0]
  }

  // Get all images including main image and variant images
  const productImages = [
    ...(product.images || []),
    ...(product.variants || [])
      .filter(variant => variant.image && !product.images.includes(variant.image))
      .map(variant => variant.image)
  ].filter((image, index, self) => self.indexOf(image) === index) // Remove duplicates

  // Get colors from variants
  const colors = (product.variants || []).map(variant => ({
    name: variant.color,
    value: variant.color,
    class: variant.color.toLowerCase() === "trắng" ? "bg-white border border-gray-300" : 
           variant.color.toLowerCase() === "đen" ? "bg-black" : 
           "bg-gray-500"
  }))

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))

  // Calculate discount percentage
  const discountPercentage = selectedVariant ? 
    (selectedVariant.salePrice > 0 ? Math.round(((selectedVariant.price - selectedVariant.salePrice) / selectedVariant.price) * 100) : 0) : 0

  const handleImageClick = (index) => {
    setSelectedImage(index)
  }

  const handleAddToCart = () => {
    if (product.variants?.length > 0 && !selectedColor) {
      toast.error("Vui lòng chọn màu sắc")
      return
    }

    const variantImage = getVariantImage()
    const finalPrice = selectedVariant?.salePrice > 0 ? selectedVariant.salePrice : selectedVariant?.price

    addToCart(
      {
        _id: product._id,
        name: product.name,
        description: product.description,
        image: variantImage,
        price: selectedVariant?.price,
        priceSale: selectedVariant?.salePrice
      },
      quantity,
      selectedVariant ? {
        color: selectedColor,
        size: selectedVariant.size,
        image: variantImage,
        price: selectedVariant.price,
        salePrice: selectedVariant.salePrice
      } : null
    )

    toast.success(
      <div className="flex items-start gap-4 p-2">
        <div className="flex-shrink-0 w-16 h-16">
          <img 
            src={variantImage} 
            alt={product.name}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <FaCheck className="text-green-500 flex-shrink-0 w-4 h-4" />
            <p className="text-sm font-medium text-gray-900">Đã thêm vào giỏ</p>
          </div>
          <p className="text-sm text-gray-800 mb-0.5 line-clamp-1">{product.name}</p>
          {selectedColor && (
            <p className="text-xs text-gray-500 mb-0.5">
              Color: {selectedColor}
            </p>
          )}
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-amber-600">
              {finalPrice?.toLocaleString()}đ
            </span>
            {selectedVariant?.salePrice > 0 && selectedVariant?.price > selectedVariant?.salePrice && (
              <span className="text-xs text-gray-400 line-through">
                {selectedVariant?.price?.toLocaleString()}đ
              </span>
            )}
          </div>
        </div>
      </div>,
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: 'bg-white shadow-lg rounded-lg',
        bodyClassName: 'p-0',
        progressClassName: 'bg-amber-500',
        icon: false,
        theme: "light",
        style: {
          background: 'white',
          color: '#333',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          width: '300px'
        }
      }
    )
  }

  const handleBuyNow = () => {
    if (product.variants?.length > 0 && !selectedColor) {
      toast.error("Vui lòng chọn màu sắc")
      return
    }

    const variantImage = getVariantImage()

    // Xóa giỏ hàng hiện tại
    clearCart()
    
    // Thêm sản phẩm vào giỏ hàng
    addToCart(
      {
        _id: product._id,
        name: product.name,
        description: product.description,
        image: variantImage,
        price: selectedVariant?.price,
        priceSale: selectedVariant?.salePrice
      },
      quantity,
      selectedVariant ? {
        color: selectedColor,
        size: selectedVariant.size,
        image: variantImage,
        price: selectedVariant.price,
        salePrice: selectedVariant.salePrice
      } : null
    )

    // Chuyển hướng đến trang thanh toán
    navigate('/checkout')
  }

  if (!product) {
    return <div>Đang tải...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-8 overflow-x-auto">
          <ol className="flex items-center text-xs sm:text-sm whitespace-nowrap space-x-1 sm:space-x-2">
            <li>
              <a href="/" className="text-gray-500 hover:text-gray-700">Trang chủ</a>
            </li>
            <li className="flex items-center space-x-1 sm:space-x-2">
              <FaChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
              <a href="/products" className="text-gray-500 hover:text-gray-700">Sản phẩm</a>
            </li>
            {product.category && product.category[0] && (
              <li className="flex items-center space-x-1 sm:space-x-2 hidden xs:flex">
                <FaChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                <a href={`/category/${product.category[0]._id}`} className="text-gray-500 hover:text-gray-700">
                  {product.category[0].name}
                </a>
              </li>
            )}
            <li className="flex items-center space-x-1 sm:space-x-2">
              <FaChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
              <span className="text-gray-900 font-medium truncate max-w-[120px] sm:max-w-none">{product.name}</span>
            </li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-white">
              <img
                key={selectedImage}
                src={productImages[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleImageClick(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                    selectedImage === index ? "border-amber-500" : "border-gray-200"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-amber-50 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded border border-amber-200">Hàng mới</span>
                <span className="bg-green-50 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded border border-green-200">
                  Bán chạy
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`h-5 w-5 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">(128 đánh giá)</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-gray-900">
                  {(selectedVariant?.salePrice || selectedVariant?.price)?.toLocaleString()}đ
                </span>
                {selectedVariant?.salePrice > 0 && selectedVariant?.price > selectedVariant?.salePrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      {selectedVariant?.price?.toLocaleString()}đ
                    </span>
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Giảm {discountPercentage}%
                    </span>
                  </>
                )}
              </div>

              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <hr className="border-gray-200" />

            {/* Color Selection */}
            {product.variants?.length > 0 && (
              <div className="space-y-3">
                <label className="text-base font-medium text-gray-900">
                  Màu sắc: {selectedColor}
                </label>
                <div className="flex gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color.value)}
                      className={`h-8 w-8 rounded-full ring-2 ring-offset-2 transition-all ${
                        selectedColor === color.value ? "ring-amber-500" : "ring-transparent"
                      } ${color.class}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-3">
              <label className="text-base font-medium text-gray-900">Số lượng</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaMinus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-900 hover:bg-gray-50"
                >
                  <FaPlus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-md font-medium hover:from-amber-600 hover:to-amber-700 transition-colors flex items-center justify-center gap-2"
                >
                  <FaShoppingCart className="h-5 w-5" />
                  Thêm vào giỏ hàng
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`px-6 py-3 rounded-md border transition-colors ${
                    isWishlisted
                      ? "border-red-500 text-red-500 bg-red-50"
                      : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                  }`}
                >
                  <FaHeart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
                </button>
              </div>

              <button 
                onClick={handleBuyNow}
                className="w-full bg-gray-900 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
              >
                Mua ngay
              </button>
            </div>

            <hr className="border-gray-200" />

            {/* Features */}
            <div className="grid grid-cols-1 gap-4">
              <div className="relative overflow-hidden rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-red-100 blur-sm" />
                      <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 text-white shadow-sm">
                        <FaTruck className="h-6 w-6" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900">Miễn phí vận chuyển</h3>
                    <p className="mt-1 text-sm text-gray-600">Cho đơn hàng trên 500.000đ</p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-blue-100 blur-sm" />
                      <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-sm">
                        <FaExchangeAlt className="h-6 w-6" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900">Đổi trả dễ dàng</h3>
                    <p className="mt-1 text-sm text-gray-600">Chính sách đổi trả trong 30 ngày</p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-green-100 blur-sm" />
                      <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-sm">
                        <FaShieldAlt className="h-6 w-6" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900">Bảo hành chính hãng</h3>
                    <p className="mt-1 text-sm text-gray-600">Thời hạn bảo hành 2 năm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
