import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

const Navbar = () => {
    const { user, logout, navigate, searchQuery, setSearchQuery, setShowUserLogin } = useAppContext();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const searchInputRef = useRef(null);
    const profileMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setProfileMenuOpen(false);
            }
            if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
                setShowSearch(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (showSearch && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [showSearch]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate('/products');
            setShowSearch(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        setProfileMenuOpen(false);
    };

    const handleMyOrders = () => {
        navigate('/my-orders');
        setProfileMenuOpen(false);
        setMobileMenuOpen(false);
    };

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <NavLink to="/" className="text-xl font-bold">
                            <img src={assets.logo} alt="Logo" className="h-8" />
                        </NavLink>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <div className="relative" ref={searchInputRef}>
                            <form onSubmit={handleSearch} className="flex items-center">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search products..."
                                    className="py-1 px-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                                />
                                <button
                                    type="submit"
                                    className="bg-primary text-white px-3 py-1 rounded-r-md hover:bg-primary-dull"
                                >
                                    <img src={assets.search_icon} alt="Search" className="w-4 h-6" />
                                </button>
                            </form>
                        </div>

                        <NavLink to="/" className="text-gray-700 hover:text-primary px-3 py-2">Home</NavLink>
                        <NavLink to="/products" className="text-gray-700 hover:text-primary px-3 py-2">Products</NavLink>
                        <NavLink to="/contact" className="text-gray-700 hover:text-primary px-3 py-2">Contact</NavLink>

                        {/* Cart Icon */}
                        <NavLink to="/cart" className="text-gray-700 hover:text-primary px-3 py-2">
                            <img src={assets.cart_icon} alt="Cart" className="w-6 h-6" />
                        </NavLink>

                        {user ? (
                            <div className="relative" ref={profileMenuRef}>
                                <button
                                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                                    className="flex items-center space-x-2 focus:outline-none px-3 py-2"
                                >
                                    <img src={assets.profile_icon} alt="Profile" className="w-8 h-8 rounded-full" />
                                    <span>{user.name}</span>
                                </button>

                                {profileMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                        <button
                                            onClick={handleMyOrders}
                                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            My Orders
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowUserLogin(true)}
                                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dull"
                            >
                                Login
                            </button>
                        )}
                    </div>

                    <div className="md:hidden flex items-center space-x-4">
                        <button
                            onClick={() => setShowSearch(!showSearch)}
                            className="text-gray-700 hover:text-primary focus:outline-none"
                        >
                            <img src={assets.search_icon} alt="Search" className="w-5 h-5" />
                        </button>

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-gray-700 hover:text-primary focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {showSearch && (
                    <div className="md:hidden px-4 py-3" ref={searchInputRef}>
                        <form onSubmit={handleSearch} className="flex">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search products..."
                                className="flex-1 py-2 px-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                            />
                            <button
                                type="submit"
                                className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary-dull"
                            >
                                Search
                            </button>
                        </form>
                    </div>
                )}
            </div>

            {mobileMenuOpen && (
                <div className="md:hidden bg-white shadow-md">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <NavLink
                            to="/"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-3 py-2 text-gray-700 hover:bg-gray-100"
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/products"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-3 py-2 text-gray-700 hover:bg-gray-100"
                        >
                            Products
                        </NavLink>
                        <NavLink
                            to="/contact"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-3 py-2 text-gray-700 hover:bg-gray-100"
                        >
                            Contact
                        </NavLink>
                        <NavLink
                            to="/cart"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-3 py-2 text-gray-700 hover:bg-gray-100"
                        >
                            Cart
                        </NavLink>

                        {user && (
                            <>
                                <button
                                    onClick={handleMyOrders}
                                    className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    My Orders
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
