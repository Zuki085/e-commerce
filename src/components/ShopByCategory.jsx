'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/product/productThunk';

const ShopByCategory = () => {
	const [categories, setCategories] = useState([]);
	const dispatch = useDispatch();
	const { products, loading } = useSelector(state => state.product);

	useEffect(() => {
		dispatch(
			fetchProducts({
				onSuccess: products => {
					// Extract unique categories from products
					const uniqueCategories = [
						...new Set(products.map(product => product.category)),
					];

					const categoryData = uniqueCategories.map(
						(category, index) => ({
							id: index + 1,
							name: category,
							image: [
								'bg-blue-100',
								'bg-pink-100',
								'bg-green-100',
								'bg-purple-100',
								'bg-yellow-100',
							][index % 5],
							description: `Shop ${category}`,
						})
					);

					setCategories(categoryData);
				},
			})
		);
	}, [dispatch]);

	// Fallback to default categories if no products are available
	useEffect(() => {
		if (!loading && products.length === 0) {
			setCategories([
				{
					id: 1,
					name: "Men's Collection",
					image: 'bg-blue-100',
					description: 'Polo Shirts & More',
				},
				{
					id: 2,
					name: "Women's Collection",
					image: 'bg-pink-100',
					description: 'Dresses & Fashion',
				},
				{
					id: 3,
					name: 'Kids Collection',
					image: 'bg-green-100',
					description: 'Comfortable & Fun',
				},
			]);
		}
	}, [loading, products.length]);

	if (loading) {
		return (
			<section className='py-16 bg-white'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-12'>
						<h2 className='text-3xl lg:text-4xl font-bold text-gray-800 mb-6'>
							Shop by category
						</h2>
						<div className='px-8 py-3 bg-gray-100 border border-gray-300 text-gray-800 font-medium rounded-lg animate-pulse'>
							View All Products
						</div>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						{[...Array(3)].map((_, i) => (
							<div key={i} className='animate-pulse'>
								<div className='w-full h-80 bg-gray-200 rounded-lg mb-4'></div>
								<div className='h-6 bg-gray-200 rounded w-3/4'></div>
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
				<div className='text-center mb-12'>
					<h2 className='text-3xl lg:text-4xl font-bold text-gray-800 mb-6'>
						Shop by category
					</h2>
					<Link href='/shop'>
						<button className='px-8 py-3 bg-gray-100 border border-gray-300 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors'>
							View All Products
						</button>
					</Link>
				</div>

			 
			</div>
		</section>
	);
};

export default ShopByCategory;
