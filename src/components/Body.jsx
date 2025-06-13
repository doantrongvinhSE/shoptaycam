import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardComponent from './CardComponent/CardComponent';
import { API_ENDPOINTS } from '../config/api';

const Body = () => {
    const [products, setProducts] = useState([]);
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [productsResponse, contentsResponse] = await Promise.all([
                    axios.get(API_ENDPOINTS.PRODUCTS),
                    axios.get(API_ENDPOINTS.CONTENTS)
                ]);
                setProducts(productsResponse.data);
                setContents(contentsResponse.data.data);
            } catch (error) {
                console.error('Lỗi khi tải dữ liệu:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
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

    const renderProductSection = (content) => {
        const filteredProducts = products.filter(product => 
            content.idsProduct.includes(product._id)
        );

        return (
            <div key={content._id}>
                <p className='text-xl font-bold mb-6 mt-8'>{content.title}</p>
                {loading ? (
                    <LoadingSkeleton />
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
                        {filteredProducts.map(product => (
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
        );
    };

    return (
        <div>
            <div className='max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8'>
                {contents.map(content => renderProductSection(content))}
            </div>
        </div>
    );
};

export default Body;
