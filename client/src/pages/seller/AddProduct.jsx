import React, { useState } from 'react';
import { assets, categories } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const AddProduct = () => {
    const [files, setFiles] = useState([]);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [offerPrice, setOfferPrice] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { axios } = useAppContext();

    const onsubmitHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            // Basic validation
            if (!name || !category || !price || !offerPrice || !description || files.length === 0) {
                throw new Error('All fields are required');
            }

            if (parseFloat(offerPrice) > parseFloat(price)) {
                throw new Error('Offer price cannot be greater than regular price');
            }

            const productData = {
                name,
                description,
                category,
                price: parseFloat(price),
                offerPrice: parseFloat(offerPrice),
            };

            const formData = new FormData();
            formData.append('productData', JSON.stringify(productData));

            files.forEach((file) => {
                if (file) {
                    formData.append('images', file);
                }
            });

            const response = await axios.post('/api/product/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            });

            if (response.data.success) {
                toast.success('Product added successfully!');
                // Reset form
                setName('');
                setDescription('');
                setCategory('');
                setPrice('');
                setOfferPrice('');
                setFiles([]);
            } else {
                throw new Error(response.data.message || 'Failed to add product');
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error(error.response?.data?.message || error.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileChange = (index, e) => {
        const newFiles = [...files];
        if (e.target.files[0]) {
            newFiles[index] = e.target.files[0];
            setFiles(newFiles);
        }
    };

    return (
        <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between p-4">
            <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
            <form onSubmit={onsubmitHandler} className="space-y-5 max-w-lg">
                <div>
                    <p className="text-base font-medium">Product Images (Max 4)</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        {Array(4).fill('').map((_, index) => (
                            <label key={index} htmlFor={`image${index}`} className="cursor-pointer">
                                <input
                                    onChange={(e) => handleFileChange(index, e)}
                                    type="file"
                                    id={`image${index}`}
                                    accept="image/*"
                                    hidden
                                />
                                <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded flex items-center justify-center overflow-hidden">
                                    {files[index] ? (
                                        <img
                                            src={URL.createObjectURL(files[index])}
                                            alt={`Preview ${index}`}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <img
                                            src={assets.upload_area}
                                            alt="Upload area"
                                            className="w-full h-full object-contain p-2"
                                        />
                                    )}
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-base font-medium" htmlFor="product-name">
                        Product Name
                    </label>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        id="product-name"
                        type="text"
                        placeholder="Enter product name"
                        className="outline-none py-2 px-3 rounded border border-gray-300 focus:border-primary transition"
                        required
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-base font-medium" htmlFor="product-description">
                        Product Description
                    </label>
                    <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        id="product-description"
                        rows={4}
                        className="outline-none py-2 px-3 rounded border border-gray-300 focus:border-primary transition resize-none"
                        placeholder="Enter product description"
                        required
                    ></textarea>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-base font-medium" htmlFor="category">
                        Category
                    </label>
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                        id="category"
                        className="outline-none py-2 px-3 rounded border border-gray-300 focus:border-primary transition"
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map((item, index) => (
                            <option key={index} value={item.path}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-wrap gap-5">
                    <div className="flex-1 min-w-[150px] flex flex-col gap-1">
                        <label className="text-base font-medium" htmlFor="product-price">
                            Price ($)
                        </label>
                        <input
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                            id="product-price"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            className="outline-none py-2 px-3 rounded border border-gray-300 focus:border-primary transition"
                            required
                        />
                    </div>

                    <div className="flex-1 min-w-[150px] flex flex-col gap-1">
                        <label className="text-base font-medium" htmlFor="offer-price">
                            Offer Price ($)
                        </label>
                        <input
                            onChange={(e) => setOfferPrice(e.target.value)}
                            value={offerPrice}
                            id="offer-price"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            className="outline-none py-2 px-3 rounded border border-gray-300 focus:border-primary transition"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="px-8 py-2.5 bg-primary text-white font-medium rounded hover:bg-primary-dark transition disabled:opacity-50"
                    disabled={isLoading}
                >
                    {isLoading ? 'Adding...' : 'ADD PRODUCT'}
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
