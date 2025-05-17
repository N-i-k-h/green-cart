import React from 'react';
import ProductCard from './ProductCard';
import { useAppContext } from '../context/AppContext'; 

const BestSeller = () => {
    const { products } = useAppContext();

    // Filter in-stock products and get top 5
    const bestSellers = products.filter(product => product.inStock).slice(0, 5);

    return (
        <div className='mt-16 px-4 sm:px-6 lg:px-8'>
            <h2 className='text-2xl md:text-3xl font-medium text-center md:text-left mb-8'>
                Best Sellers
            </h2>
            
            <div className='grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6'>
                {bestSellers.length > 0 ? (
                    bestSellers.map((product, index) => (
                        <ProductCard 
                            key={`${product.id}-${index}`} 
                            product={product} 
                            className="w-full"
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center py-8">
                        <p className="text-gray-500">No best sellers available at the moment</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BestSeller;