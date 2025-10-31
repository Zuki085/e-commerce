"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllProducts } from '../cms/firebase/products';
import { fetchProducts } from '@/store/product/productThunk';
import { useDispatch } from 'react-redux';

const RecentProducts = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const allProducts = await getAllProducts();
  //       setProducts(allProducts);
  //     } catch (error) {
  //       console.error('Error fetching products:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  useEffect(() => {
		dispatch(
			fetchProducts({
				onSuccess: products => {
					setProducts(products);
				},
			})
		);
		setLoading(false);
	}, []);

  // Use the first 8 products from our data
  const recentProducts = products.slice(0, 4);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-12 text-center">
            Recent products
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-12 text-center">
          Recent products
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {recentProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="relative">
                  <span className="absolute top-2 left-2 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                    {product.category}
                  </span>
                  {/* <div className={`w-full h-48 ${product.image} rounded-lg mb-4`}></div> */}
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className='w-full h-48 rounded-lg mb-4'
                  />
                </div>
                <h3 className="font-medium text-gray-800 mb-2 text-sm">{product.name}</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-800 font-medium">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-gray-500 line-through text-sm">{product.originalPrice}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentProducts;
