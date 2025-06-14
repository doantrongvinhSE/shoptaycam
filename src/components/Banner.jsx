import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { API_ENDPOINTS } from '../config/api';

const Banner = () => {
    const [config, setConfig] = useState({
        banners: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                setLoading(true);
                const response = await fetch(API_ENDPOINTS.CONFIG);
                const data = await response.json();
                setConfig(data);
            } catch (error) {
                console.error('Error fetching config:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchConfig();
    }, []);

    const LoadingSkeleton = () => (
        <div className="min-h-[400px] md:min-h-[650px]">
            <div className="skeleton w-full h-full"></div>
        </div>
    );

    if (loading) {
        return <LoadingSkeleton />;
    }

    return (
        <>
            <style>
                {`
                    .swiper-button-next,
                    .swiper-button-prev {
                        width: 30px !important;
                        height: 30px !important;
                        background-color: rgba(255, 255, 255, 0.3);
                        border-radius: 50%;
                        color: white !important;
                    }
                    .swiper-button-next:after,
                    .swiper-button-prev:after {
                        font-size: 15px !important;
                    }
                    .swiper-button-next:hover,
                    .swiper-button-prev:hover {
                        background-color: rgba(255, 255, 255, 0.5);
                    }
                `}
            </style>
            <Swiper
                spaceBetween={0}
                centeredSlides={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {config.banners && config.banners.map((bannerImage, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="hero min-h-[400px] md:min-h-[650px] bg-cover bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url('${bannerImage}')`,
                                backgroundPosition: 'center center'
                            }}
                        >
                            {/* <div className="hero-overlay bg-opacity-50"></div>
                            <div className="hero-content text-center text-white">
                                <div className="max-w-xl">
                                    <h1 className="text-5xl font-bold">{banner.title}</h1>
                                    <p className="py-6">
                                        {banner.description}
                                    </p>
                                    <button className="btn btn-primary">Mua ngay</button>
                                </div>
                            </div> */}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default Banner;
