import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardComponent from './CardComponent/CardComponent';

const Body = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://taycambe.onrender.com/api/v1/products');
                setProducts(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Lỗi khi tải sản phẩm:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const LoadingSkeleton = () => (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
            {[...Array(6)].map((_, index) => (
                <div key={index} className="card bg-base-100 shadow-xl">
                    <div className="skeleton h-48 w-full"></div>
                    <div className="card-body p-4">
                        <div className="skeleton h-4 w-3/4"></div>
                        <div className="skeleton h-4 w-1/2 mt-2"></div>
                        <div className="skeleton h-8 w-1/3 mt-2"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div>
            <div className='max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8'>
                <p className='text-xl font-bold mb-6'>TOP TAY CẦM FO4, FIFA, PES BÁN CHẠY NHẤT HÔM NAY</p>
                {loading ? (
                    <LoadingSkeleton />
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
                        {products.map(product => (
                            <CardComponent
                                key={product._id}
                                _id={product._id}
                                name={product.name}
                                description={product.description}
                                images={product.images}
                                variants={product.variants}
                            />
                        ))}
                    </div>
                )}
                <div className="flex justify-center mt-12">
                    <button className="inline-flex items-center gap-2 px-6 py-2.5 border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white transition-all duration-300 text-sm font-medium tracking-wide">
                        Xem thêm
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>

                <p className='text-xl font-bold mb-6 mt-8'>TAY CẦM SONY DUALSENSE 5 PS5 BÁN CHẠY</p>
                {loading ? (
                    <LoadingSkeleton />
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
                        {products.map(product => (
                            <CardComponent
                                key={product._id}
                                _id={product._id}
                                name={product.name}
                                images={product.images}
                                description={product.description}
                                variants={product.variants}
                            />
                        ))}
                    </div>
                )}

                <p className='text-xl font-bold mb-6 mt-8'>TOP TAY CẦM CHƠI FLYDIGI BÁN CHẠY NHẤT</p>
                {loading ? (
                    <LoadingSkeleton />
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
                        {products.map(product => (
                            <CardComponent
                                key={product._id}
                                _id={product._id}
                                name={product.name}
                                images={product.images}
                                description={product.description}
                                variants={product.variants}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Body;
