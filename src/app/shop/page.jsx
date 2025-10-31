'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {
	getAllProducts,
	getProductsByCategory,
} from '../../cms/firebase/products';
import { fetchProducts } from '@/store/product/productThunk';
import { useDispatch } from 'react-redux';

const ShopPage = () => {
	const dispatch = useDispatch();
	const [selectedCategory, setSelectedCategory] = useState('All');
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	const [searchTerm, setSearchTerm] = useState('');
	const [categories, setCategories] = useState(['All']);

	// Pagination state
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 8;

	useEffect(() => {
		const loadProducts = async () => {
			try {
				await dispatch(
					fetchProducts({
						onSuccess: fetchedProducts => {
							setProducts(fetchedProducts);

							const uniqueCategories = [
								'All',
								...new Set(
									fetchedProducts
										.map(product => product.category)
										.filter(Boolean)
								),
							];
							setCategories(uniqueCategories);
							setLoading(false);
						},
					})
				);
			} catch (error) {
				console.error('Error loading products:', error);
				const { products: staticProducts } = await import(
					'../../data/products'
				);
				setProducts(staticProducts);
				setCategories(['All', 'Men', 'Women', 'Kid']);
				setLoading(false);
			}
		};

		loadProducts();
	}, [dispatch]);

	// Handle URL parameters for category filtering
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const categoryParam = urlParams.get('category');
		if (categoryParam) {
			setSelectedCategory(categoryParam);
		}
	}, []);

	const filteredProducts = products.filter(product => {
		const matchesCategory =
			selectedCategory === 'All' || product.category === selectedCategory;
		const matchesSearch =
			searchTerm === '' ||
			product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			product.description
				.toLowerCase()
				.includes(searchTerm.toLowerCase());
		return matchesCategory && matchesSearch;
	});

	// Pagination calculations
	const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentProducts = filteredProducts.slice(startIndex, endIndex);

	// Reset to first page when filters change
	useEffect(() => {
		setCurrentPage(1);
	}, [selectedCategory, searchTerm]);

	if (loading) {
		return (
			<div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center'>
				<div className='text-center'>
					{/* Animated Purse Icon */}
					<div className="relative mb-8">
						<div className="w-20 h-20 mx-auto relative">
							{/* Purse Body */}
							<div className="w-full h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-t-2xl rounded-b-lg animate-pulse shadow-lg">
								{/* Purse Handle */}
								<div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-4 border-4 border-yellow-600 rounded-full border-b-0 animate-bounce"></div>
								{/* Purse Details */}
								<div className="absolute top-2 left-2 w-2 h-2 bg-yellow-200 rounded-full animate-ping"></div>
								<div className="absolute top-2 right-2 w-2 h-2 bg-yellow-200 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
								{/* Purse Strap */}
								<div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-yellow-600 rounded-full animate-pulse"></div>
							</div>
							{/* Floating Sparkles */}
							<div className="absolute -top-2 -left-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-60"></div>
							<div className="absolute -top-1 -right-3 w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping opacity-60" style={{ animationDelay: '0.3s' }}></div>
							<div className="absolute -bottom-1 -left-1 w-1 h-1 bg-yellow-600 rounded-full animate-ping opacity-60" style={{ animationDelay: '0.7s' }}></div>
						</div>
					</div>
					
					{/* Loading Text */}
					<div className="space-y-2">
						<h2 className="text-2xl font-display font-bold bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
							Crochet
						</h2>
						<p className="text-gray-600 font-sans">Loading products...</p>
					</div>
					
					{/* Loading Dots */}
					<div className="flex justify-center space-x-2 mt-6">
						<div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
						<div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
						<div className="w-2 h-2 bg-yellow-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100'>
			<Header />

			{/* Hero Section */}
			<section className='relative py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden'>
				{/* Background Pattern */}
				<div className='absolute inset-0 opacity-20'>
					<div
						className='w-full h-full'
						style={{
							backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
						}}
					></div>
				</div>

				{/* Floating Elements */}
				<div className='absolute inset-0 pointer-events-none'>
					<div className='absolute top-10 left-10 w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full blur-xl opacity-20 animate-pulse'></div>
					<div className='absolute top-20 right-20 w-24 h-24 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full blur-xl opacity-20 animate-pulse delay-1000'></div>
					<div className='absolute bottom-10 left-1/4 w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full blur-xl opacity-20 animate-pulse delay-2000'></div>
				</div>

				<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h1 className="text-5xl lg:text-7xl font-display font-bold mb-6">
						<span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
							Shop All
						</span>
					</h1>
					<p className="text-xl lg:text-2xl text-gray-300 font-sans max-w-3xl mx-auto leading-relaxed">
						Discover our complete collection of premium fashion items
					</p>
				</div>
			</section>

			{/* Shop All Section */}
			<section className='py-20 bg-gradient-to-br from-slate-50 via-white to-slate-100'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					{/* Search Bar */}
					<div className='max-w-lg mx-auto mb-12'>
						<div className="relative">
							<input
								type='text'
								placeholder='Search products...'
								value={searchTerm}
								onChange={e => setSearchTerm(e.target.value)}
								className='w-full px-6 py-4 pl-12 border-2 border-gray-300 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 font-sans text-lg shadow-lg'
							/>
							<div className="absolute left-4 top-1/2 transform -translate-y-1/2">
								<svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
								</svg>
							</div>
						</div>
					</div>

					{/* Category Filters */}
					<div className='flex flex-wrap justify-center gap-4 mb-16'>
						{categories.map(category => (
							<button
								key={category}
								onClick={() => setSelectedCategory(category)}
								className={`px-8 py-4 rounded-2xl font-accent font-semibold transition-all duration-300 ${
									selectedCategory === category
										? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 shadow-lg scale-105'
										: 'bg-white/80 backdrop-blur-sm text-gray-800 border-2 border-gray-200 hover:border-yellow-400 hover:shadow-lg hover:scale-105'
								}`}
							>
								{category}
							</button>
						))}
					</div>

					{/* Product Grid */}
					<div className='grid grid-cols-2 md:grid-cols-4 gap-8 mb-16'>
						{currentProducts.map(product => (
							<Link
								key={product.id}
								href={`/product/${product.id}`}
								className="group"
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
											{product.price}
										</span>
										{product.originalPrice && (
											<span className='text-gray-500 line-through text-sm'>
												{product.originalPrice}
											</span>
										)}
									</div>
								</div>
							</Link>
						))}
					</div>

					{/* Pagination */}
					{totalPages > 1 && (
						<div className='flex justify-center items-center space-x-6'>
							<button
								onClick={() =>
									setCurrentPage(prev =>
										Math.max(prev - 1, 1)
									)
								}
								disabled={currentPage === 1}
								className={`px-8 py-3 border-2 font-accent font-semibold rounded-xl transition-all duration-300 ${
									currentPage === 1
										? 'opacity-50 cursor-not-allowed border-gray-300 text-gray-400'
										: 'border-yellow-400 text-gray-800 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-amber-500 hover:text-slate-900 hover:border-transparent hover:scale-105 hover:shadow-lg'
								}`}
							>
								Previous
							</button>

							<div className="flex items-center space-x-2">
								<span className='text-gray-600 font-accent font-semibold text-lg'>
									{currentPage}
								</span>
								<span className='text-gray-400'>/</span>
								<span className='text-gray-600 font-accent font-semibold text-lg'>
									{totalPages}
								</span>
							</div>

							<button
								onClick={() =>
									setCurrentPage(prev =>
										Math.min(prev + 1, totalPages)
									)
								}
								disabled={currentPage === totalPages}
								className={`px-8 py-3 border-2 font-accent font-semibold rounded-xl transition-all duration-300 ${
									currentPage === totalPages
										? 'opacity-50 cursor-not-allowed border-gray-300 text-gray-400'
										: 'border-yellow-400 text-gray-800 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-amber-500 hover:text-slate-900 hover:border-transparent hover:scale-105 hover:shadow-lg'
								}`}
							>
								Next
							</button>
						</div>
					)}
				</div>
			</section>

			<Footer />
		</div>
	);
};

export default ShopPage;
