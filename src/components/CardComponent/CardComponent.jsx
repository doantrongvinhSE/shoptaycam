import React from 'react';
import { FaShoppingCart, FaHeart, FaStar, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CardComponent = ({ name, image, description, price, priceSale, _id }) => {
    return (
        <div className="group">
            <Link to={`/product/${_id}`} className="block">
                <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <figure className="relative px-4 pt-4">
                        <img
                            src={image}
                            alt={name}
                            className="rounded-xl h-48 w-full object-cover"
                        />
                        <div className="absolute top-2 right-2 flex flex-col gap-2">
                            <button className="btn btn-circle btn-sm bg-white/80 hover:bg-white">
                                <FaHeart className="text-red-500" />
                            </button>
                            <button className="btn btn-circle btn-sm bg-white/80 hover:bg-white">
                                <FaEye className="text-blue-500" />
                            </button>
                        </div>
                    </figure>
                    <div className="card-body">
                        <div className="flex items-center gap-1 mb-2">
                            <FaStar className="text-yellow-400" />
                            <FaStar className="text-yellow-400" />
                            <FaStar className="text-yellow-400" />
                            <FaStar className="text-yellow-400" />
                            <FaStar className="text-gray-300" />
                            <span className="text-sm text-gray-500 ml-1">(4.0)</span>
                        </div>
                        <h2 className="card-title text-lg group-hover:text-primary transition-colors">{name}</h2>
                        <p className="text-sm text-gray-600">{description}</p>
                        <div className="card-actions justify-between items-center mt-4">
                            <div className="flex flex-col">
                                <span className="text-lg font-bold text-primary">{priceSale?.toLocaleString()}đ</span>
                                <span className="text-sm text-gray-400 line-through">{price?.toLocaleString()}đ</span>
                            </div>
                            <div className='flex gap-2'>
                                <button className="btn btn-primary btn-sm gap-2">Mua ngay</button>
                                <button className="btn btn-outline btn-sm">
                                    <FaShoppingCart /> Thêm vào giỏ
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default CardComponent;
