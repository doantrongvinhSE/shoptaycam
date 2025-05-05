import React from 'react'
import { FaFacebook, FaTiktok, FaYoutube, FaCcVisa, FaCcPaypal, FaCcStripe, FaCcMastercard, FaApplePay } from "react-icons/fa";
import { SiZalo } from "react-icons/si";



const Footer = () => {
    return (
        <div className='mt-500'>
            <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
                <nav>
                    <h6 className="footer-title">Thông tin liên hệ
                    </h6>
                    <p>Địa Chỉ : số 18 ngõ 357 Tam Trinh, P. Hoàng Văn Thụ, Hoàng Mai, Hà Nội</p>
                    <p>Số điện thoại : 0988.965.716 - 0988.4999.30 - 0988.4999.60</p>
                    <p>Email : shoptaycam@gmail.com</p>
                    <p>Website : www.shoptaycam.com</p>
                    <ul className="flex gap-3">
                        <li>
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-2xl text-blue-600 transition-colors">
                                <FaFacebook />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-2xl text-blue-600 transition-colors">
                                <SiZalo />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-xl text-black-600 transition-colors">
                                <FaTiktok />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-2xl text-red-600 transition-colors">
                                <FaYoutube />
                            </a>
                        </li>
                    </ul>

                </nav>
                <nav>
                    <h6 className="footer-title">Quy định & hướng dẫn</h6>
                    <a className="link link-hover">Hướng dẫn mua hàng</a>
                    <a className="link link-hover">Hình thức thanh toán</a>
                    <a className="link link-hover">Quy trình thực hiện</a>
                    <a className="link link-hover">Dịch vụ chuyển SHIP COD</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Thông tin chung
                    </h6>
                    <a className="link link-hover">Giới thiệu Công ty</a>
                    <a className="link link-hover">Năng lực sản xuất    </a>
                    <a className="link link-hover">Thư ngỏ đối tác</a>
                    <a className="link link-hover">Bán hàng</a>

                </nav>
                <nav>
                    <h6 className="footer-title">Danh mục sản phẩm
                    </h6>
                    <a className="link link-hover">Tay Cầm FO4 Đáng Mua Nhất</a>
                    <a className="link link-hover">Tay Cầm Xbox 360   </a>
                    <a className="link link-hover">Tay Cầm PS4</a>
                    <a className="link link-hover">Tay Cầm PS5</a>
                    <a className="link link-hover">Tay cầm xbox</a>
                    <a className="link link-hover">Tay Cầm Xbox Series X</a>
                    <a className="link link-hover">Tay Cầm Gamesir</a>
                    <a className="link link-hover">Máy Chơi Game</a>


                </nav>
            </footer>
            <footer className="footer sm:footer-horizontal footer-center bg-gray-200 text-white p-4">
                <aside>
                    <ul className="flex gap-5">
                        <li>
                            <p className="text-3xl transition-colors" style={{ color: '#1A1F71' }}>
                                <FaCcVisa />
                            </p>
                        </li>
                        <li>
                            <p className="text-3xl transition-colors" style={{ color: '#0070BA' }}>
                                <FaCcPaypal />
                            </p>
                        </li>
                        <li>
                            <p className="text-3xl transition-colors" style={{ color: '#635BFF' }}>
                                <FaCcStripe />
                            </p>
                        </li>
                        <li>
                            <p className="text-3xl transition-colors" style={{ color: '#FF5F00' }}>
                                <FaCcMastercard />
                            </p>
                        </li>
                        <li>
                            <p className="text-3xl transition-colors" style={{ color: '#000000' }}>
                                <FaApplePay />
                            </p>
                        </li>
                    </ul>
                    <p className='text-black'>Copyright © {new Date().getFullYear()} - All right reserved by Mr Doan</p>
                </aside>
            </footer>

        </div>
    )
}

export default Footer