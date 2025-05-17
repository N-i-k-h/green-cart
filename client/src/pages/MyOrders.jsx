import React from 'react';
import { useAppContext } from '../context/AppContext';

const MyOrders = () => {
    const { currency, orders } = useAppContext();

    return (
        <div className='container mx-auto p-6'>
            {/* Header */}
            <div className='text-center mb-8'>
                <h1 className='text-3xl font-bold text-gray-800 uppercase'>My Orders</h1>
                <div className='w-16 h-1 bg-primary rounded-full mx-auto mt-2'></div>
            </div>

            {/* Orders List */}
            {orders.map((order) => (
                <div
                    key={order._id}
                    className='bg-white shadow-md rounded-lg p-6 mb-6 max-w-4xl mx-auto'
                >
                    {/* Order Item */}
                    <div className='flex items-center mb-4'>
                        <div className='bg-gray-100 p-4 rounded-lg'>
                            <img
                                src={order.items[0].product.image[0]}
                                alt={order.items[0].product.name}
                                className='w-16 h-16 object-cover'
                            />
                        </div>
                        <div className='ml-4'>
                            <h2 className='text-xl font-semibold text-gray-800'>
                                {order.items[0].product.name}
                            </h2>
                            <p className='text-gray-600'>
                                Category: {order.items[0].product.category}
                            </p>
                        </div>
                    </div>

                    {/* Order Details */}
                    <div className='space-y-2 text-gray-700'>
                        <p>
                            <span className='font-medium'>Quantity:</span> {order.items[0].quantity}
                        </p>
                        <p>
                            <span className='font-medium'>Status:</span> {order.status}
                        </p>
                        <p>
                            <span className='font-medium'>Date:</span>{' '}
                            {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                        <p>
                            <span className='font-medium'>Amount:</span>{' '}
                            {currency}
                            {order.items[0].product.offerPrice * order.items[0].quantity}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyOrders;
