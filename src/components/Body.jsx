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
        <div className="space-y-8">
            {[...Array(2)].map((_, sectionIndex) => (
                <div key={sectionIndex}>
                    <div className="h-6 w-1/3 skeleton mb-4"></div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="card bg-base-100 shadow-sm">
                                <div className="relative aspect-square">
                                    <div className="skeleton w-full h-full"></div>
                                </div>
                                <div className="card-body p-4 space-y-2">
                                    <div className="skeleton h-4 w-3/4"></div>
                                    <div className="skeleton h-4 w-1/2"></div>
                                    <div className="skeleton h-6 w-1/3"></div>
                                </div>
                            </div>
                        ))}
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
            <div key={content._id} className="mb-8">
                <div className="mb-4 inline-block">
                    <h2 className="text-2xl font-bold text-yellow-600 mb-1">
                        {content.title}
                    </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
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
            </div>
        );
    };

    return (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            {loading ? <LoadingSkeleton /> : contents.map(content => renderProductSection(content))}
        </div>
    );
};

export default Body;
