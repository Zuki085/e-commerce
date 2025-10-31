"use client";

import React, { useState } from 'react';
import { addProduct, updateProduct } from '../firebase/products';

const ProductForm = ({ product, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || '',
    originalPrice: product?.originalPrice || '',
    category: product?.category || 'Men',
    description: product?.description || '',
    material: product?.material || '',
    shippingTime: product?.shippingTime || '',
    madeIn: product?.madeIn || '',
    image: product?.image || 'bg-gray-200'
  });

  const [images, setImages] = useState(product?.images || [
    { id: 1, src: 'bg-gray-200', alt: 'Front view' },
    { id: 2, src: 'bg-gray-300', alt: 'Back view' },
    { id: 3, src: 'bg-gray-100', alt: 'Model wearing' },
    { id: 4, src: 'bg-gray-400', alt: 'Product detail' }
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (index, field, value) => {
    setImages(prev => prev.map((img, i) => 
      i === index ? { ...img, [field]: value } : img
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const productData = {
        ...formData,
        images,
        originalPrice: formData.originalPrice || null
      };

      if (product) {
        await updateProduct(product.id, productData);
      } else {
        await addProduct(productData);
      }

      onSuccess();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Basic Information */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Basic Information</h3>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category *
              </label>
              <select
                name="category"
                id="category"
                required
                value={formData.category}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kid">Kid</option>
              </select>
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price *
              </label>
              <input
                type="text"
                name="price"
                id="price"
                required
                value={formData.price}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="$49.00 USD"
              />
            </div>

            <div>
              <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700">
                Original Price (Optional)
              </label>
              <input
                type="text"
                name="originalPrice"
                id="originalPrice"
                value={formData.originalPrice}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="$99.99 USD"
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description *
            </label>
            <textarea
              name="description"
              id="description"
              rows={4}
              required
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter product description"
            />
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Product Details</h3>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <label htmlFor="material" className="block text-sm font-medium text-gray-700">
                Material *
              </label>
              <input
                type="text"
                name="material"
                id="material"
                required
                value={formData.material}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="100% Cotton"
              />
            </div>

            <div>
              <label htmlFor="shippingTime" className="block text-sm font-medium text-gray-700">
                Shipping Time *
              </label>
              <input
                type="text"
                name="shippingTime"
                id="shippingTime"
                required
                value={formData.shippingTime}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="3-5 workdays"
              />
            </div>

            <div>
              <label htmlFor="madeIn" className="block text-sm font-medium text-gray-700">
                Made In *
              </label>
              <input
                type="text"
                name="madeIn"
                id="madeIn"
                required
                value={formData.madeIn}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="New York"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Product Images */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Product Images</h3>
          
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {images.map((image, index) => (
              <div key={image.id} className="space-y-2">
                <div className={`h-32 w-full ${image.src} rounded-lg flex items-center justify-center`}>
                  <span className="text-white text-xs font-medium">{image.alt}</span>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">Background Color</label>
                  <select
                    value={image.src}
                    onChange={(e) => handleImageChange(index, 'src', e.target.value)}
                    className="mt-1 block w-full text-xs border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="bg-gray-200">Gray 200</option>
                    <option value="bg-gray-300">Gray 300</option>
                    <option value="bg-gray-400">Gray 400</option>
                    <option value="bg-gray-500">Gray 500</option>
                    <option value="bg-blue-100">Blue 100</option>
                    <option value="bg-green-200">Green 200</option>
                    <option value="bg-pink-200">Pink 200</option>
                    <option value="bg-amber-200">Amber 200</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">Alt Text</label>
                  <input
                    type="text"
                    value={image.alt}
                    onChange={(e) => handleImageChange(index, 'alt', e.target.value)}
                    className="mt-1 block w-full text-xs border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? 'Saving...' : (product ? 'Update Product' : 'Create Product')}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;


