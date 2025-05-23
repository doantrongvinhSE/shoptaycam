import React from 'react'
import { FaShoppingCart, FaHeart, FaStar, FaEye } from 'react-icons/fa'

const CardComponent = () => {
    return (
        <div className="group">
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                <figure className="relative px-4 pt-4">
                    <img
                        src="https://laptopworld.vn/media/product/15729_72104_tay_cam_choi_game_khong_day_iine_tears_of_the_kingdom_design_controller.jpg"
                        alt="Game Controller"
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
                    <h2 className="card-title text-lg group-hover:text-primary transition-colors">Game Controller</h2>
                    <p className="text-sm text-gray-600">Tay cầm chơi game không dây chất lượng cao</p>
                    <div className="card-actions justify-between items-center mt-4">
                        <div className="flex flex-col">
                            <span className="text-lg font-bold text-primary">1.200.000đ</span>
                            <span className="text-sm text-gray-400 line-through">1.500.000đ</span>
                        </div>
                        <div className='flex gap-2'>
                            <button className="btn btn-primary  btn-sm gap-2">
                               
                                Mua ngay
                            </button>
                            <button className="btn btn-outline btn-sm">  <FaShoppingCart /> Thêm vào giỏ</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardComponent