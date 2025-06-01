import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Banner = () => {
    const banners = [
        {
            image: "https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-6/363386527_805011964421153_682121651691280033_n.png?_nc_cat=102&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeHnrSx0K_xL6IasUwsq6Z9Go0zsnLIcc22jTOycshxzbT13Hd7SkRObl5mllim7SsQcOixaynYvC9HDqRpUkzgk&_nc_ohc=82hE24G9inUQ7kNvwF0WZSQ&_nc_oc=Adm5Hn2fZeEJASNfh1ZkxV10N9Xu4ZrSlidJtF6-l8wYPZh3-RQ2rgjxijtPtpmDoXPLC4_Fm9n1P1ykx43ou1vA&_nc_zt=23&_nc_ht=scontent.fhan20-1.fna&_nc_gid=8SWk3Vob-R0pTcnwjqgw5g&oh=00_AfLf632E20zj0W5grh2hgdZdI2WkGtSIk4K1FomHRws3Rg&oe=68420DEB",
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
