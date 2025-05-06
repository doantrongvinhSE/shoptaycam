import React from 'react';

const Banner = () => {
    return (
        <div
            className="hero min-h-[600px] bg-cover bg-center"
            style={{
                backgroundImage: "url('https://www.hardwareinside.de/wp-content/uploads/2021/12/Corsair.png')"
            }}
        >
            <div className="hero-overlay  bg-opacity-50"></div>
            <div className="hero-content text-center text-white">
                <div className="max-w-xl">
                    <h1 className="text-5xl font-bold">Khám phá Tay Cầm Chơi Game Đỉnh Cao</h1>
                    <p className="py-6">
                        Trải nghiệm chơi game mượt mà, chính xác và thoải mái với dòng tay cầm chất lượng cao dành cho mọi game thủ.
                    </p>
                    <button className="btn btn-primary">Mua ngay</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;
