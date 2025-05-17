import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from '../context/AppContext';

const ProductCard = ({ product }) => {
    const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext();

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(product._id);
    };

    const handleRemoveFromCart = (e) => {
        e.stopPropagation();
        removeFromCart(product._id);
    };

    const handleIncrement = (e) => {
        e.stopPropagation();
        addToCart(product._id);
    };

    if (!product) return null;

    return (
        <div
            onClick={() => {
                navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
                window.scrollTo(0, 0);
            }}
            className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer flex flex-col h-full"
        >
            {/* Product Image */}
            <div className="relative pt-[100%] overflow-hidden">
                <img 
                    className="absolute top-0 left-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300" 
                    src={product.image[0]} 
                    alt={product.name} 
                    loading="lazy"
                />
            </div>

            {/* Product Details */}
            <div className="p-4 flex flex-col flex-grow">
                <span className="text-xs text-gray-500 uppercase tracking-wider">
                    {product.category}
                </span>
                <h3 className="text-lg font-medium text-gray-900 mt-1 mb-2 line-clamp-2">
                    {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                    {Array(5).fill('').map((_, i) => (
                        <img 
                            key={i} 
                            className="w-4 h-4" 
                            src={i < 4 ? assets.star_icon : assets.star_dull_icon} 
                            alt="rating star" 
                        />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">(4)</span>
                </div>

                {/* Price and CTA */}
                <div className="mt-auto flex items-end justify-between">
                    <div>
                        <p className="text-lg font-semibold text-indigo-600">
                            {currency}{product.offerPrice}
                        </p>
                        {product.offerPrice < product.price && (
                            <p className="text-xs text-gray-500 line-through">
                                {currency}{product.price}
                            </p>
                        )}
                    </div>

                    {/* Add to Cart Button */}
                    <div className="text-indigo-600">
                        {!cartItems[product._id] ? (
                            <button
                                className="flex items-center justify-center gap-1 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 px-3 py-1.5 rounded-lg text-indigo-600 font-medium text-sm transition-colors"
                                onClick={handleAddToCart}
                            >
                                <img src={assets.cart_icon} alt="cart" className="w-4 h-4" />
                                <span>Add</span>
                            </button>
                        ) : (
                            <div className="flex items-center justify-between bg-indigo-50 rounded-lg w-24 h-9 px-2">
                                <button
                                    onClick={handleRemoveFromCart}
                                    className="text-indigo-600 hover:text-indigo-800 text-lg font-medium w-6 flex items-center justify-center"
                                >
                                    -
                                </button>
                                <span className="text-sm font-medium">
                                    {cartItems[product._id]}
                                </span>
                                <button
                                    onClick={handleIncrement}
                                    className="text-indigo-600 hover:text-indigo-800 text-lg font-medium w-6 flex items-center justify-center"
                                >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;