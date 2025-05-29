"use client"

import { useState, useEffect } from "react"

const ProductDetailPage = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product.variants[0]?.color || "")
  const [selectedSize, setSelectedSize] = useState("M")
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  // Get selected variant
  const selectedVariant = product.variants.find(v => v.color === selectedColor) || product.variants[0]

  // Get all images including main image and variant images
  const productImages = [
    product.image,
    ...product.variants
      .filter(variant => variant.image && variant.image !== product.image)
      .map(variant => variant.image)
  ].filter((image, index, self) => self.indexOf(image) === index) // Remove duplicates

  // Update selected image when color changes
  useEffect(() => {
    if (selectedVariant?.image) {
      const variantImageIndex = productImages.findIndex(img => img === selectedVariant.image)
      if (variantImageIndex !== -1) {
        setSelectedImage(variantImageIndex)
      } else {
        setSelectedImage(0)
      }
    } else {
      setSelectedImage(0)
    }
  }, [selectedColor, selectedVariant, productImages])

  // Get colors from variants
  const colors = product.variants.map(variant => ({
    name: variant.color,
    value: variant.color,
    class: variant.color.toLowerCase() === "trắng" ? "bg-white border border-gray-300" : 
           variant.color.toLowerCase() === "đen" ? "bg-black" : 
           "bg-gray-500"
  }))

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"]

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))

  // Calculate discount percentage
  const discountPercentage = selectedVariant ? 
    Math.round(((selectedVariant.price - product.priceSale) / selectedVariant.price) * 100) : 0

  const handleImageClick = (index) => {
    console.log('Image clicked:', index)
    console.log('Current selected image:', selectedImage)
    console.log('Image to be selected:', productImages[index])
    setSelectedImage(index)
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
              <svg className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <a href="/products" className="text-gray-500 hover:text-gray-700">Sản phẩm</a>
            </li>
            {product.category && product.category[0] && (
              <li className="flex items-center space-x-1 sm:space-x-2 hidden xs:flex">
                <svg className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <a href={`/category/${product.category[0]._id}`} className="text-gray-500 hover:text-gray-700">
                  {product.category[0].name}
                </a>
              </li>
            )}
            <li className="flex items-center space-x-1 sm:space-x-2">
              <svg className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
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
                    selectedImage === index ? "border-blue-500" : "border-gray-200"
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
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Hàng mới</span>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Bán chạy
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-500">(128 đánh giá)</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-gray-900">{product.priceSale?.toLocaleString()}đ</span>
                <span className="text-xl text-gray-500 line-through">{selectedVariant?.price?.toLocaleString()}đ</span>
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Giảm {discountPercentage}%
                </span>
              </div>

              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <hr className="border-gray-200" />

            {/* Color Selection */}
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
                      selectedColor === color.value ? "ring-blue-500" : "ring-transparent"
                    } ${color.class}`}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <label className="text-base font-medium text-gray-900">Kích thước: {selectedSize}</label>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex h-10 w-12 items-center justify-center rounded-md border transition-colors ${
                      selectedSize === size
                        ? "border-blue-500 bg-blue-500 text-white"
                        : "border-gray-300 bg-white text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <label className="text-base font-medium text-gray-900">Số lượng</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-900 hover:bg-gray-50"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8"
                    />
                  </svg>
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
                  <svg
                    className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>

              <button className="w-full bg-gray-900 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors">
                Mua ngay
              </button>
            </div>

            <hr className="border-gray-200" />

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-red-600">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                <span>Miễn phí vận chuyển cho đơn hàng trên 500.000đ</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-blue-600">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span>Chính sách đổi trả trong 30 ngày</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-green-600">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span>Bảo hành 2 năm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
