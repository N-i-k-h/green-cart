import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext'; // Ensure the path is correct
import ProductCard from '../components/ProductCard';

const AllProducts = () => {
    const { products, searchQuery } = useAppContext();
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        if (searchQuery.length > 0) {
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(filtered);
            console.log("Filtered products:", filtered); // Debugging line
        } else {
            setFilteredProducts(products);
            console.log("All products:", products); // Debugging line
        }
    }, [products, searchQuery]);

    if (filteredProducts.length === 0) {
        return <div>No products found.</div>; // Render a message if no products are found
    }

    return (
        <div className='mt-16 flex flex-col'>
            <div className='flex flex-col items-end w-max'>
                <p className='text-2xl font-medium uppercase'>All Products</p>
                <div className='w-16 h-0.5 bg-primary rounded-full'></div>
            </div>

            <div className='grid grid-cols-2 md:text-3xl sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
                {filteredProducts.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </div>
    );
};

export default AllProducts;
