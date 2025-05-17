import React from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const SellerLayout = () => {
    const { setIsSeller } = useAppContext();
    const navigate = useNavigate();

    const sidebarLinks = [
        { name: "Add product", path: "add-product", icon: assets.add_icon },
        { name: "Product List", path: "product-list", icon: assets.product_list_icon },
        { name: "Orders", path: "orders", icon: assets.order_icon },
    ];

    const logout = async () => {
        setIsSeller(false);
        localStorage.removeItem('isSeller'); // Clear the login state from local storage
        toast.success('Logged out successfully'); // Show logout message
        navigate('/'); // Redirect to the home page
    };

    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
                <Link to="/">
                    <img src={assets.logo} alt="logo" className="cursor-pointer w-34 md:w-38" />
                </Link>
                <div className="flex items-center gap-5 text-gray-500">
                    <p>Hi! Admin</p>
                    <button onClick={logout} className='border rounded-full text-sm px-4 py-1'>Logout</button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="md:w-64 w-16 border-r border-gray-300 bg-white">
                    {sidebarLinks.map((item) => (
                        <NavLink
                            to={item.path}
                            key={item.name}
                            className={({ isActive }) =>
                                `flex items-center py-3 px-4 gap-3 ${isActive
                                    ? "border-r-4 border-primary bg-primary/10 text-primary"
                                    : "hover:bg-gray-100"
                                }`
                            }
                        >
                            <img src={item.icon} alt="" className="w-7" />
                            <span className="md:block hidden">{item.name}</span>
                        </NavLink>
                    ))}
                </div>

                {/* Content Area - Where Outlet Renders */}
                <div className="flex-1 overflow-auto p-4 bg-gray-50">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default SellerLayout;
