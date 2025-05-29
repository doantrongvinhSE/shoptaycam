import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Banner = () => {
    const banners = [
        {
            image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?ixlib=rb-4.0.3",
            title: "Tay Cầm Gaming Chuyên Nghiệp",
            description: "Nâng tầm trải nghiệm game của bạn với những tay cầm được thiết kế dành riêng cho game thủ."
        },
        {
            image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?ixlib=rb-4.0.3",
            title: "Công Nghệ Mới Nhất",
            description: "Trải nghiệm công nghệ tiên tiến với độ chính xác và độ nhạy cao."
        }
    ];

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
                {banners.map((banner, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="hero min-h-[400px] md:min-h-[650px] bg-cover bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url('${banner.image}')`,
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
