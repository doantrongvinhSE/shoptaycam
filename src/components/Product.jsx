import React from 'react'

const Product = () => {
  return (
    <div>
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <figure className="px-4 pt-4">
                        <img
                            src="https://laptopworld.vn/media/product/15729_72104_tay_cam_choi_game_khong_day_iine_tears_of_the_kingdom_design_controller.jpg"
                            alt="Game Controller"
                            className="rounded-xl h-48 w-full object-cover"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title text-lg">Game Controller</h2>
                        <p className="text-sm text-gray-600">Tay cầm chơi game không dây chất lượng cao</p>
                        <div className="card-actions justify-between items-center mt-4">
                            <span className="text-lg font-bold text-primary">1.200.000đ</span>
                            <button className="btn btn-primary btn-sm">Mua ngay</button>
                        </div>
                    </div>
                </div>
    </div>
  )
}

export default Product