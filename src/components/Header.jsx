import React, { useState, useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import CartDropdown from "./CartDropdown/CartDropdown";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const cartRef = useRef(null);
  const searchRef = useRef(null);
  const { getCartCount } = useCart();

  const navItems = [
    { id: 1, name: "Trang chủ", href: "/" },
    { id: 2, name: "Tay cầm FO4", href: "/f04" },
    { id: 3, name: "Tay Cầm PS5", href: "#" },
    { id: 4, name: "Tay Cầm Flydigi", href: "#" },
    { id: 5, name: "Tay Cầm EasySMX", href: "#" },
    { id: 6, name: "Tay Cầm BigBig Won", href: "#" },
    { id: 7, name: "Tay Cầm PS4", href: "#" },
    { id: 8, name: "Tay Cầm Xbox", href: "#" },
    { id: 9, name: "Tay Cầm Gamesir", href: "#" },
    { id: 10, name: "Tay Cầm P4 Plus", href: "#" },
    { id: 11, name: "Tay Cầm A102L", href: "#" },
    { id: 12, name: "Tay Cầm Z03DP", href: "#" },
    { id: 13, name: "Tay Cầm 8Bitdo", href: "#" },
    { id: 14, name: "Tay Cầm Mobapad", href: "#" },
    { id: 15, name: "Tay Cầm PXN", href: "#" },
    { id: 16, name: "Tay Cầm Nintendo Switch", href: "#" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    setIsSearchOpen(false);
  };
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsCartOpen(false);
  };

  useEffect(() => {
    document.body.className = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector('.header-height');
      if (header) {
        const height = header.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${height}px`);
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);

    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, []);

  return (
    <>
      <header className={`w-full bg-white text-gray-800 shadow-md transition-colors duration-300 header-height`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-auto py-3">
            <div className="flex-shrink-0">
              <a href="/">
                <img
                  className="h-18 md:h-32 w-auto"
                  src="https://i.imgur.com/h8QCPkF.jpeg"
                  alt="Logo"
                />
              </a>
            </div>

            <nav className="hidden md:flex flex-wrap gap-4 max-w-4xl">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="text-sm font-medium hover:text-blue-500 transition-colors duration-200 whitespace-nowrap"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4 relative">
              <div ref={searchRef}>
                <button
                  className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  onClick={toggleSearch}
                  aria-label="Search"
                >
                  <IoSearchSharp className="h-6 w-6 text-red-400" />
                </button>
                {isSearchOpen && (
                  <div className="absolute z-30 top-full flex space-x-2 right-0 mt-2 w-[90vw] sm:w-[400px] md:w-[500px] lg:w-[500px] bg-white shadow-2xl rounded-lg p-4">
                    <label className="flex-1">
                      <input 
                        type="search" 
                        required 
                        placeholder="Tìm kiếm sản phẩm" 
                        className="input w-full border-0 focus:outline-none focus:ring-0 focus:border-none"
                      />
                    </label>
                    <button className="btn btn-square btn-sm sm:btn-md">
                      <FaSearch className="text-sm sm:text-base"/>
                    </button>
                  </div>
                )}
              </div>

              <div ref={cartRef} className="relative">
                <button
                  className="p-2 rounded-full ml-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  onClick={toggleCart}
                  aria-label="Shopping cart"
                >
                  <MdOutlineShoppingCart className="h-6 w-6 text-red-400" />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                      {getCartCount()}
                    </span>
                  )}
                </button>
                {isCartOpen && <CartDropdown />}
              </div>

              <button
                className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <FiX className="h-6 w-6" />
                ) : (
                  <HiMenuAlt3 className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 max-h-[80vh] overflow-y-auto">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>  
    </>
  );
};

export default Header;