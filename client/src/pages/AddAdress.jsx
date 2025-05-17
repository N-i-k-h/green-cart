import React from 'react';

const AddAddress = () => {
  return (
    <div className='mt-16 pb-16'>
      <p className='text-2xl md:text-3xl text-gray-500'>
        Add Shipping <span className='font-semibold text-primary'>Address</span>
      </p>
      <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
        <div className='flex-1 max-w-md'>
          <form className='space-y-4'>
            <div>
              <label className='block text-gray-700'>First Name</label>
              <input type='text' className='w-full border border-gray-300 rounded px-3 py-2' />
            </div>
            <div>
              <label className='block text-gray-700'>Last Name</label>
              <input type='text' className='w-full border border-gray-300 rounded px-3 py-2' />
            </div>
            <div>
              <label className='block text-gray-700'>Email address</label>
              <input type='email' className='w-full border border-gray-300 rounded px-3 py-2' />
            </div>
            <div>
              <label className='block text-gray-700'>Street</label>
              <input type='text' className='w-full border border-gray-300 rounded px-3 py-2' />
            </div>
            <div>
              <label className='block text-gray-700'>City</label>
              <input type='text' className='w-full border border-gray-300 rounded px-3 py-2' />
            </div>
            <div>
              <label className='block text-gray-700'>State</label>
              <input type='text' className='w-full border border-gray-300 rounded px-3 py-2' />
            </div>
            <div>
              <label className='block text-gray-700'>Zip code</label>
              <input type='text' className='w-full border border-gray-300 rounded px-3 py-2' />
            </div>
            <div>
              <label className='block text-gray-700'>Country</label>
              <input type='text' className='w-full border border-gray-300 rounded px-3 py-2' />
            </div>
            <div>
              <label className='block text-gray-700'>Phone</label>
              <input type='text' className='w-full border border-gray-300 rounded px-3 py-2' />
            </div>
            <button type='submit' className='w-full bg-primary text-white py-2 rounded'>
              Save Address
            </button>
          </form>
        </div>
        <div className='flex-1 max-w-md'>
          <div>
            <img
              className='md:mr-16 mb-16 md:mt-0'
              src='path_to_your_image.svg' // Replace with the actual path to your SVG file
              alt='Add Address'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
