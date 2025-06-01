import React from 'react';
import { FaShoppingCart, FaStar, FaEye, FaShoppingBag, FaCartPlus, FaCheckCircle, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CardComponent = ({ _id, name, description, image, price, priceSale, variants }) => {
    const { addToCart } = useCart();
    const [isHovered, setIsHovered] = React.useState(false);
    const [isWishlisted, setIsWishlisted] = React.useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Nếu sản phẩm có variants, chuyển hướng đến trang chi tiết
        if (variants && variants.length > 0) {
            window.location.href = `/product/${_id}`;
            return;
        }

        // Nếu không có variants, thêm trực tiếp vào giỏ hàng
        addToCart({
            _id,
            name,
            description,
            image,
            price,
            priceSale
        });

        toast.success(
            <div className="flex items-start gap-10 p-3">
                <div className="flex-shrink-0 w-18 h-18">
                    <img 
                        src={image} 
                        alt={name}
                        className="w-full h-full object-cover rounded-lg shadow-sm"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <FaCheckCircle className="text-green-500 flex-shrink-0 text-sm" />
                        <p className="text-sm font-medium text-gray-900">Đã thêm vào giỏ</p>
                    </div>
                    <p className="text-sm text-gray-800 mb-1 line-clamp-1">{name}</p>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-amber-600">{priceSale?.toLocaleString()}đ</span>
                        {price > priceSale && (
                            <span className="text-xs text-gray-400 line-through">{price?.toLocaleString()}đ</span>
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
                    width: '320px'
                }
            }
        );
    };

    const handleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsWishlisted(!isWishlisted);
    };

    return (
        <div 
            className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link to={`/product/${_id}`} className="block">
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <img
                        src={image}
                        alt={name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Quick Actions */}
                    <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                        <button
                            onClick={handleWishlist}
                            className={`p-2 rounded-full shadow-md transition-colors ${
                                isWishlisted 
                                    ? 'bg-red-500 text-white hover:bg-red-600' 
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            <FaHeart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                        </button>
                    </div>
                    {/* Discount Badge */}
                    {price > priceSale && (
                        <div className="absolute top-3 left-3">
                            <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                                -{Math.round(((price - priceSale) / price) * 100)}%
                            </span>
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                    <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className="w-3 h-3 text-amber-400" />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">(5.0)</span>
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1 group-hover:text-amber-600 transition-colors">
                        {name}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-2">{description}</p>
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-amber-600">{priceSale?.toLocaleString()}đ</span>
                            {price > priceSale && (
                                <span className="text-xs text-gray-400 line-through">{price?.toLocaleString()}đ</span>
                            )}
                        </div>
                    </div>
                </div>
            </Link>

            {/* Add to Cart Button */}
            <div className="px-4 pb-4">
                <button
                    onClick={handleAddToCart}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-4 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                    <div className="flex items-center gap-2">
                        <FaShoppingCart className="w-4 h-4" />
                        <span className="text-sm font-medium">Thêm vào giỏ</span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default CardComponent;
