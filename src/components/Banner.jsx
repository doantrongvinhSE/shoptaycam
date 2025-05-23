import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Banner = () => {
    const banners = [
        {
            image: "https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-6/363386527_805011964421153_682121651691280033_n.png?_nc_cat=102&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=6oOJEn08MgAQ7kNvwEJDWOQ&_nc_oc=Adk7XZ7p_j5hftuT3aHj2I5wDTGVkawzQYGOyBuxvdiGPcD9hNCDLe8PP6qu8Jj0BBc&_nc_zt=23&_nc_ht=scontent.fhan20-1.fna&_nc_gid=Z0u4eO3t67UEhc9WOOo0-w&oh=00_AfLXVN85yTHzB7yL3cjrAUTEqhZbkMorPQ1X4uhYU3Gn5A&oe=682DD6EB",
            title: "Khám phá Tay Cầm Chơi Game Đỉnh Cao",
            description: "Trải nghiệm chơi game mượt mà, chính xác và thoải mái với dòng tay cầm chất lượng cao dành cho mọi game thủ."
        },
        {
            image: "https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/488912539_1218696086386070_4911581264514903508_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=C9Iu5rpy14oQ7kNvwHnpIqE&_nc_oc=AdkBd3_y3hAI6FUWcdZhOTTT9dtUjlDnncBRi4kff8gPE7fIM-3od9wJ-fzG09gIZCo&_nc_zt=23&_nc_ht=scontent.fhan2-5.fna&_nc_gid=xRK1JNJGDuFf7Jmii-Upeg&oh=00_AfJtxmyVZNpL9S3P_y7eCArN3CSL9YdH3IPch5_G628fIg&oe=682DF13F",
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
