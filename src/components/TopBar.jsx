import React from 'react'
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa'
import { FaRegClock } from 'react-icons/fa6'
import { FaLocationDot } from 'react-icons/fa6'
import { IoIosCall, IoIosMail } from 'react-icons/io'

const TopBar = () => {
    return (
        <div className='bg-[#e3d06f]'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5'>
                <div className='flex flex-col md:flex-row justify-between items-center gap-2'>
                    <p className='text-sm text-center md:text-left'>PressingTimeStore.Com - Tay Cầm Chơi Game, Gaming Gear Cho PC</p>
                    <div className='flex items-center space-x-2'>
                        <FaLocationDot className='text-xl text-gray-700 font-bold' />
                        <span className="text-gray-400">|</span>
                        <IoIosMail className='text-2xl text-gray-700 font-bold' />
                        <span className="text-gray-400">|</span>
                        <FaRegClock className='text-xl text-gray-700 font-bold' />
                        <span className="text-gray-400">|</span>
                        <IoIosCall className='text-2xl text-gray-700 font-bold' />
                        <span className="text-gray-400">|</span>
                        <a href="">
                            <FaFacebook className='text-xl text-blue-600' />
                        </a>
                        <a href="">
                            <FaInstagram className='text-xl text-red-400' />
                        </a>
                        <a href="">
                            <FaTiktok className='text-lg' />
                        </a>
                        <a href="">
                            <FaYoutube className='text-xl text-red-600' />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopBar