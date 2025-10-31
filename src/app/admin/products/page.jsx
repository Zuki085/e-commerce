'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
// import { products } from '../../../data/products';
import { deleteProduct, fetchProducts } from '@/store/product/productThunk';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

const ProductsPage = () => {
	const dispatch = useDispatch();
	const [productsData, setProductsData] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('All');

	const categories = ['All', 'Men', 'Women', 'Kid'];

	const filteredProducts = productsData?.filter(product => {
		const matchesSearch = product.name
			.toLowerCase()
			.includes(searchTerm.toLowerCase());
		const matchesCategory =
			selectedCategory === 'All' || product.category === selectedCategory;
		return matchesSearch && matchesCategory;
	});

	const handleDelete = id => {
		if (confirm('Are you sure you want to delete this product?')) {
			// Handle delete logic here
			dispatch(
				deleteProduct({
					productId: id,
					onSuccess: () => {
						toast.success('Product deleted successfully!');
						// Refresh the products list after deletion
						dispatch(
							fetchProducts({
								onSuccess: products => {
									setProductsData(products);
								},
							})
						);
					},
				})
			);
		}
	};

	useEffect(() => {
		dispatch(
			fetchProducts({
				onSuccess: products => {
					setProductsData(products);
				},
			})
		);
	}, []);

	return (
		<div className='space-y-6'>
			<div className='sm:flex sm:items-center sm:justify-between'>
				<div>
					<h1 className='text-2xl font-bold text-gray-900'>
						Products
					</h1>
					<p className='mt-1 text-sm text-gray-500'>
						Manage your product catalog
					</p>
				</div>
				<div className='mt-4 sm:mt-0'>
					<Link
						href='/admin/products/add'
						className='inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
					>
						<svg
							className='-ml-1 mr-2 h-5 w-5'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M12 4v16m8-8H4'
							/>
						</svg>
						Add Product
					</Link>
				</div>
			</div>

			{/* Filters */}
			<div className='bg-white shadow rounded-lg'>
				<div className='px-4 py-5 sm:p-6'>
					<h3 className='text-lg leading-6 font-medium text-gray-900 mb-4'>
						Filter Products
					</h3>
					<div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
						<div>
							<label
								htmlFor='search'
								className='block text-sm font-medium text-gray-700'
							>
								Search Products
							</label>
							<input
								type='text'
								id='search'
								value={searchTerm}
								onChange={e => setSearchTerm(e.target.value)}
								className='mt-2 block w-full h-12 px-4 py-3 text-base border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 border-gray-300 bg-white hover:border-gray-400 text-gray-800'
								placeholder='Search by product name...'
							/>
						</div>
						<div>
							<label
								htmlFor='category'
								className='block text-sm font-medium text-gray-700'
							>
								Category
							</label>
							<select
								id='category'
								value={selectedCategory}
								onChange={e =>
									setSelectedCategory(e.target.value)
								}
								className='mt-2 block w-full h-12 px-4 py-3 text-base border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 border-gray-300 bg-white hover:border-gray-400 focus:border-indigo-500 text-gray-800'
							>
								{categories.map(category => (
									<option key={category} value={category}>
										{category}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>
			</div>

			{/* Products Table */}
			<div className='bg-white shadow rounded-lg overflow-hidden'>
				<div className='px-4 py-5 sm:p-6'>
					<div className='overflow-x-auto'>
						<table className='min-w-full divide-y divide-gray-200'>
							<thead className='bg-gray-50'>
								<tr>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Product
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Category
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Price
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Status
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Actions
									</th>
								</tr>
							</thead>
							<tbody className='bg-white divide-y divide-gray-200'>
								{filteredProducts.map(product => (
									<tr
										key={product.id}
										className='hover:bg-gray-50'
									>
										<td className='px-6 py-4 whitespace-nowrap'>
											<div className='flex items-center'>
												{/* <div className={`h-12 w-12 ${product.image} rounded-lg flex-shrink-0`}></div> */}
												<img
													src={product.images[0]}
													alt={product.name}
													className='h-12 w-12 rounded-lg flex-shrink-0'
												/>
												<div className='ml-4'>
													<div className='text-sm font-medium text-gray-900'>
														{product.name}
													</div>
													<div className='text-sm text-gray-500'>
														{product.material}
													</div>
												</div>
											</div>
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<span className='inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800'>
												{product.category}
											</span>
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<div className='text-sm text-gray-900'>
												${product.price} USD
											</div>
											{product.originalPrice && (
												<div className='text-sm text-gray-500 line-through'>
													${product.originalPrice} USD
												</div>
											)}
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<span className='inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800'>
												Active
											</span>
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
											<div className='flex items-center'>
												<Link
													href={`/product/${product.id}`}
													target='_blank'
													className='text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-indigo-50 transition-colors'
													title='View Product'
												>
													<svg
														className='w-5 h-5'
														fill='none'
														stroke='currentColor'
														viewBox='0 0 24 24'
													>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															strokeWidth={2}
															d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
														/>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															strokeWidth={2}
															d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
														/>
													</svg>
												</Link>
												<Link
													href={`/admin/products/edit/${product.id}`}
													className='text-yellow-600 hover:text-yellow-900 p-1 rounded-md hover:bg-yellow-50 transition-colors'
													title='Edit Product'
												>
													<svg
														className='w-5 h-5'
														fill='none'
														stroke='currentColor'
														viewBox='0 0 24 24'
													>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															strokeWidth={2}
															d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
														/>
													</svg>
												</Link>
												<button
													onClick={() =>
														handleDelete(product.id)
													}
													className='text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50 transition-colors'
													title='Delete Product'
												>
													<svg
														className='w-5 h-5'
														fill='none'
														stroke='currentColor'
														viewBox='0 0 24 24'
													>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															strokeWidth={2}
															d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
														/>
													</svg>
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{filteredProducts.length === 0 && (
						<div className='text-center py-12'>
							<svg
								className='mx-auto h-12 w-12 text-gray-400'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
								/>
							</svg>
							<h3 className='mt-2 text-sm font-medium text-gray-900'>
								No products found
							</h3>
							<p className='mt-1 text-sm text-gray-500'>
								{searchTerm || selectedCategory !== 'All'
									? 'Try adjusting your search or filter criteria.'
									: 'Get started by creating a new product.'}
							</p>
							{!searchTerm && selectedCategory === 'All' && (
								<div className='mt-6'>
									<Link
										href='/admin/products/add'
										className='inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700'
									>
										<svg
											className='-ml-1 mr-2 h-5 w-5'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M12 4v16m8-8H4'
											/>
										</svg>
										Add Product
									</Link>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductsPage;

