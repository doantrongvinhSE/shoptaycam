import React, { useState, useEffect } from "react";
import { FiX, FiShoppingCart } from "react-icons/fi";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";




const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const navItems = [
    { id: 1, name: "Home", href: "#" },
    { id: 2, name: "Products", href: "#" },
    { id: 3, name: "Categories", href: "#" },
    { id: 4, name: "About", href: "#" },
    { id: 5, name: "Contact", href: "#" }
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  useEffect(() => {
    document.body.className = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  return (
    <header className={`fixed w-full top-0 z-50 bg-white text-gray-800 shadow-md transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex-shrink-0">
            <img
              className="h-16 w-auto"
              src="https://shoptaycam.com/wp-content/uploads/2018/05/logo-1-khong-nen.png"
              alt="Logo"
            />
          </div>

          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="text-sm font-medium hover:text-blue-500 transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative">
            <button
                className="p-3 rounded-full  hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                onClick={toggleCart}
                aria-label="Shopping cart"
              >
                <IoSearchSharp className="h-6 w-6 text-red-400" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-blue-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {cartCount}
                  </span>
                )}
              </button>



              <button
                className="p-2 rounded-full ml-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                onClick={toggleCart}
                aria-label="Shopping cart"
              >
                <MdOutlineShoppingCart className="h-6 w-6 text-red-400" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-blue-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {cartCount}
                  </span>
                )}
              </button>

          

              {isCartOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4">
                  <h3 className="text-lg font-semibold mb-2">Shopping Cart</h3>
                  <p className="text-gray-500 dark:text-gray-400">Your cart is empty</p>
                </div>
              )}
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
            <div className="px-2 pt-2 pb-3 space-y-1">
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
  );
};

export default Header;