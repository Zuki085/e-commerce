'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Static dummy product data
const dummyProducts = [
	{
		id: '1',
		name: 'Classic White Porcelain Tea Cup',
		price: 24.99,
		originalPrice: 34.99,
		category: 'Tea Cups',
		images: [
			'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500&h=500&fit=crop',
		],
	},
	{
		id: '2',
		name: 'Elegant Ceramic Tea Cup Set',
		price: 49.99,
		originalPrice: null,
		category: 'Tea Cups',
		images: [
			'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500&h=500&fit=crop',
		],
	},
	{
		id: '3',
		name: 'Vintage Floral Tea Cup',
		price: 29.99,
		originalPrice: 39.99,
		category: 'Tea Cups',
		images: [
			'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500&h=500&fit=crop',
		],
	},
	{
		id: '4',
		name: 'Modern Glass Tea Cup',
		price: 19.99,
		originalPrice: 29.99,
		category: 'Tea Cups',
		images: [
			'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500&h=500&fit=crop',
		],
	},
	{
		id: '5',
		name: 'Premium Bone China Tea Cup',
		price: 59.99,
		originalPrice: null,
		category: 'Tea Cups',
		images: [
			'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500&h=500&fit=crop',
		],
	},
	{
		id: '6',
		name: 'Japanese Style Tea Cup',
		price: 34.99,
		originalPrice: 44.99,
		category: 'Tea Cups',
		images: [
			'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500&h=500&fit=crop',
		],
	},
	{
		id: '7',
		name: 'Hand-painted Tea Cup',
		price: 27.99,
		originalPrice: 37.99,
		category: 'Tea Cups',
		images: [
			'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500&h=500&fit=crop',
		],
	},
	{
		id: '8',
		name: 'Luxury Gold Trim Tea Cup',
		price: 44.99,
		originalPrice: null,
		category: 'Tea Cups',
		images: [
			'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500&h=500&fit=crop',
		],
	},
];

const RecentProducts = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Simulate loading delay for better UX
		setTimeout(() => {
			setProducts(dummyProducts);
			setLoading(false);
		}, 300);
	}, []);

	// Use the first 8 products from our data
	const recentProducts = products.slice(0, 8);

	if (loading) {
		return (
			<section className='py-16 bg-white'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<h2 className='text-3xl lg:text-4xl font-bold text-gray-800 mb-12 text-center'>
						Recent products
					</h2>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
						{[...Array(4)].map((_, i) => (
							<div
								key={i}
								className='bg-white rounded-lg shadow-sm p-4 animate-pulse'
							>
								<div className='w-full h-48 bg-gray-200 rounded-lg mb-4'></div>
								<div className='h-4 bg-gray-200 rounded mb-2'></div>
								<div className='h-4 bg-gray-200 rounded w-1/2'></div>
							</div>
						))}
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className='py-16 bg-white'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<h2 className='text-3xl lg:text-4xl font-bold text-gray-800 mb-12 text-center'>
					Recent products
				</h2>

				<div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
					{recentProducts.map(product => (
						<Link
							key={product.id}
							href={`/product/${product.id}`}
							className='group'
						>
							<div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-white/20'>
								<div className='relative'>
									<span className='absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 text-xs px-3 py-1 rounded-full font-accent font-semibold'>
										{product.category}
									</span>
									<img
										src={product.images[0]}
										alt={product.name}
										className='w-full h-48 rounded-xl object-cover mb-4 group-hover:scale-105 transition-transform duration-300'
									/>
								</div>
								<h3 className='font-accent font-semibold text-gray-800 mb-3 text-sm group-hover:text-amber-600 transition-colors duration-300'>
									{product.name}
								</h3>
								<div className='flex items-center space-x-2'>
									<span className='text-gray-800 font-bold text-lg'>
										{`$${product.price} USD`}
									</span>
									{product.originalPrice && (
										<span className='text-gray-500 line-through text-sm'>
											{`$${product.originalPrice} USD`}
										</span>
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
