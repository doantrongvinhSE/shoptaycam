import React, { useState, useEffect } from 'react'
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa'
import { FaRegClock } from 'react-icons/fa6'
import { FaLocationDot } from 'react-icons/fa6'
import { IoIosCall, IoIosMail } from 'react-icons/io'
import { API_ENDPOINTS } from '../config/api';

const TopBar = () => {
    const [config, setConfig] = useState({
        socialLinks: {},
        phone: '',
        email: '',
        address: ''
    });
    const [showAddressTooltip, setShowAddressTooltip] = useState(false);
    const [showTimeTooltip, setShowTimeTooltip] = useState(false);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await fetch(API_ENDPOINTS.CONFIG);
                const data = await response.json();
                setConfig(data);
            } catch (error) {
                console.error('Error fetching config:', error);
            }
        };

        fetchConfig();
    }, []);

    return (
        <div className='bg-[#e3d06f]'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5'>
                <div className='flex flex-col md:flex-row justify-between items-center gap-2'>
                    <p className='text-sm text-center md:text-left'>PressingTimeStore.Com - Tay Cầm Chơi Game, Gaming Gear Cho PC</p>
                    <div className='flex items-center space-x-2'>
                        <div className="relative">
                            <FaLocationDot 
                                className='text-xl text-gray-700 font-bold cursor-pointer' 
                                onMouseEnter={() => setShowAddressTooltip(true)}
                                onMouseLeave={() => setShowAddressTooltip(false)}
                                onClick={() => setShowAddressTooltip(!showAddressTooltip)}
                            />
                            {showAddressTooltip && (
                                <div className="absolute z-10 bg-white p-2 rounded shadow-lg text-sm text-gray-700 mt-1 whitespace-nowrap">
                                    {config.address}
                                </div>
                            )}
                        </div>
                        <span className="text-gray-400">|</span>
                        <a href={`mailto:${config.email}`}>
                            <IoIosMail className='text-2xl text-gray-700 font-bold' />
                        </a>
                        <span className="text-gray-400">|</span>
                        <div className="relative">
                            <FaRegClock 
                                className='text-xl text-gray-700 font-bold cursor-pointer'
                                onMouseEnter={() => setShowTimeTooltip(true)}
                                onMouseLeave={() => setShowTimeTooltip(false)}
                                onClick={() => setShowTimeTooltip(!showTimeTooltip)}
                            />
                            {showTimeTooltip && (
                                <div className="absolute z-10 bg-white p-2 rounded shadow-lg text-sm text-gray-700 mt-1 whitespace-nowrap">
                                    9:00 - 22:00
                                </div>
                            )}
                        </div>
                        <span className="text-gray-400">|</span>
                        <a href={`tel:${config.phone}`}>
                            <IoIosCall className='text-2xl text-gray-700 font-bold' />
                        </a>
                        <span className="text-gray-400">|</span>
                        <a href={config.socialLinks?.facebook} target="_blank" rel="noopener noreferrer">
                            <FaFacebook className='text-xl text-blue-600' />
                        </a>
                        <a href={config.socialLinks?.tiktok} target="_blank" rel="noopener noreferrer">
                            <FaTiktok className='text-lg' />
                        </a>
                        <a href={config.socialLinks?.youtube} target="_blank" rel="noopener noreferrer">
                            <FaYoutube className='text-xl text-red-600' />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopBar