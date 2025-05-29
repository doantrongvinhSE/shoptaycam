import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardComponent from './CardComponent/CardComponent';

const Body = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/v1/products');
                setProducts(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Lỗi khi tải sản phẩm:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <div className='max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8'>
                <p className='text-xl font-bold mb-6'>Sản phẩm bán chạy</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map(product => (
                        <CardComponent
                            key={product._id}
                            _id={product._id}
                            name={product.name}
                            image={product.image}
                            price={product.variants?.[0]?.price}
                            priceSale={product.priceSale}
                        />
                    ))}
                </div>
                <div className="flex justify-center mt-12">
                    <button className="inline-flex items-center gap-2 px-6 py-2.5 border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white transition-all duration-300 text-sm font-medium tracking-wide">
                        Xem thêm
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Body;
