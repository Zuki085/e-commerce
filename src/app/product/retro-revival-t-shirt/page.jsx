'use client';

import React, { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { useCart } from '../../../context/CartContext';
import { getProductById } from '../../../data/products';

const ProductDetailsPage = () => {
	const [selectedColor, setSelectedColor] = useState('');
	const [quantity, setQuantity] = useState(1);
	const { addToCart } = useCart();

	// Get product data
	const product = getProductById('retro-revival-t-shirt');

	const handleAddToCart = () => {
		addToCart({
			id: product.id,
			name: product.name,
			price: product.price,
			images: product.images,
			quantity: quantity,
		});
		alert('Product added to cart!');
	};

	const reviews = [
		{
			id: 1,
			name: 'Frances Guerrero',
			title: 'A must-have product',
			rating: 4,
			text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		},
		{
			id: 2,
			name: 'Larry Lawson',
			title: 'Amazing...loved it',
			rating: 5,
			text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		},
		{
			id: 3,
			name: 'Sarah Johnson',
			title: 'Perfect fit and quality',
			rating: 5,
			text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
		},
		{
			id: 4,
			name: 'Mike Chen',
			title: 'Great value for money',
			rating: 4,
			text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		},
	];

	const relatedProducts = [
		{
			id: 1,
			name: "Urban edge men's tee",
			price: '$49.00 USD',
			category: 'Men',
			image: 'bg-gray-200',
		},
		{
			id: 2,
			name: 'Adventure seeker tee',
			price: '$80.49 USD',
			originalPrice: '$99.99 USD',
			category: 'Men',
			image: 'bg-green-200',
		},
		{
			id: 3,
			name: 'Classic comfort crewneck',
			price: '$49.00 USD',
			category: 'Women',
			image: 'bg-gray-400',
		},
		{
			id: 4,
			name: 'Weekend warrior t-shirt',
			price: '$40.00 USD',
			category: 'Men',
			image: 'bg-gray-500',
		},
	];

	const renderStars = rating => {
		return [...Array(5)].map((_, i) => (
			<svg
				key={i}
				className={`w-4 h-4 ${
					i < rating ? 'text-yellow-400' : 'text-gray-300'
				}`}
				fill='currentColor'
				viewBox='0 0 20 20'
			>
				<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
			</svg>
		));
	};

	return (
		<div className='min-h-screen bg-white'>
			<Header />

			{/* Product Details Section */}
			<section className='py-16 bg-white'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
						{/* Product Images */}
						<div className='space-y-4'>
							<div className='grid grid-cols-2 gap-4'>
								{product.images.map(image => (
									<div
										key={image.id}
										className={`aspect-square ${image.src} rounded-lg flex items-center justify-center`}
									>
										<span className='text-white text-sm font-medium'>
											{image.alt}
										</span>
									</div>
								))}
							</div>
						</div>

						{/* Product Information */}
						<div className='space-y-6'>
							{/* Category Tag */}
							<div className='inline-block'>
								<span className='bg-gray-800 text-white px-3 py-1 rounded text-sm font-medium'>
									{product.category}
								</span>
							</div>

							{/* Product Title */}
							<h1 className='text-3xl lg:text-4xl font-bold text-gray-800'>
								{product.name}
							</h1>

							{/* Price */}
							<div className='text-2xl font-bold text-gray-800'>
								{product.price}
							</div>

							{/* Description */}
							<p className='text-gray-600 leading-relaxed'>
								{product.description}
							</p>

							{/* Color Selector */}
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									Select Color
								</label>
								<select
									value={selectedColor}
									onChange={e =>
										setSelectedColor(e.target.value)
									}
									className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent outline-none'
								>
									<option value=''>Choose a color</option>
									<option value='black'>Black</option>
									<option value='white'>White</option>
									<option value='gray'>Gray</option>
									<option value='navy'>Navy</option>
								</select>
							</div>

							{/* Quantity Selector */}
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									Quantity
								</label>
								<input
									type='number'
									min='1'
									value={quantity}
									onChange={e =>
										setQuantity(
											parseInt(e.target.value) || 1
										)
									}
									className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent outline-none'
								/>
							</div>

							{/* Add to Cart Button */}
							<button
								onClick={handleAddToCart}
								className='w-full bg-gray-800 text-white py-4 px-6 rounded-lg font-medium hover:bg-gray-700 transition-colors text-lg'
							>
								Add to Cart
							</button>

							{/* Product Details */}
							<div className='space-y-3 pt-6 border-t border-gray-200'>
								<div className='flex justify-between'>
									<span className='text-gray-600'>
										Material
									</span>
									<span className='text-gray-800 font-medium'>
										{product.material}
									</span>
								</div>
								<div className='flex justify-between'>
									<span className='text-gray-600'>
										Shipping Time
									</span>
									<span className='text-gray-800 font-medium'>
										{product.shippingTime}
									</span>
								</div>
								<div className='flex justify-between'>
									<span className='text-gray-600'>
										Made in
									</span>
									<span className='text-gray-800 font-medium'>
										{product.madeIn}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Feature Highlights */}
			<section className='py-16 bg-gray-50'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						{/* Free Shipping */}
						<div className='text-center'>
							<div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4'>
								<svg
									className='w-8 h-8 text-blue-600'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4'
									/>
								</svg>
							</div>
							<h3 className='text-lg font-semibold text-gray-800 mb-2'>
								Free Shipping
							</h3>
							<p className='text-gray-600'>
								Free shipping on orders over $50
							</p>
						</div>

						{/* Fast Delivery */}
						<div className='text-center'>
							<div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
								<svg
									className='w-8 h-8 text-green-600'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M13 10V3L4 14h7v7l9-11h-7z'
									/>
								</svg>
							</div>
							<h3 className='text-lg font-semibold text-gray-800 mb-2'>
								Fast Delivery
							</h3>
							<p className='text-gray-600'>
								Quick delivery to your doorstep
							</p>
						</div>

						{/* Quality Guarantee */}
						<div className='text-center'>
							<div className='w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4'>
								<svg
									className='w-8 h-8 text-purple-600'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
									/>
								</svg>
							</div>
							<h3 className='text-lg font-semibold text-gray-800 mb-2'>
								100% Quality Guarantee
							</h3>
							<p className='text-gray-600'>
								Satisfaction guaranteed or your money back
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Reviews Section */}
			<section className='py-16 bg-white'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-12'>
						<h2 className='text-3xl lg:text-4xl font-bold text-gray-800 mb-6'>
							Reviews
						</h2>
						<p className='text-lg text-gray-600 mb-8'>
							Read Reviews from our satisfied customers. Share
							your experience with Us by clicking the below
							button!
						</p>
						<button className='px-8 py-3 border border-gray-800 text-gray-800 font-medium rounded-lg hover:bg-gray-800 hover:text-white transition-colors'>
							Submit a review
						</button>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
						{reviews.map(review => (
							<div
								key={review.id}
								className='bg-gray-50 rounded-lg p-6'
							>
								<div className='flex items-center mb-3'>
									<div className='flex'>
										{renderStars(review.rating)}
									</div>
								</div>
								<h4 className='font-semibold text-gray-800 mb-2'>
									{review.title}
								</h4>
								<p className='text-sm text-gray-600 mb-3'>
									{review.name}
								</p>
								<p className='text-gray-700 text-sm leading-relaxed'>
									{review.text}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Related Products */}
			<section className='py-16 bg-gray-50'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<h2 className='text-3xl lg:text-4xl font-bold text-gray-800 mb-12 text-center'>
						Related products
					</h2>

					<div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
						{relatedProducts.map(product => (
							<div
								key={product.id}
								className='bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow'
							>
								<div className='relative'>
									<span className='absolute top-2 left-2 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded'>
										{product.category}
									</span>
									<div
										className={`w-full h-48 ${product.image} rounded-lg mb-4`}
									></div>
								</div>
								<h3 className='font-medium text-gray-800 mb-2 text-sm'>
									{product.name}
								</h3>
								<div className='flex items-center space-x-2'>
									<span className='text-gray-800 font-medium'>
										{product.price}
									</span>
									{product.originalPrice && (
										<span className='text-gray-500 line-through text-sm'>
											{product.originalPrice}
										</span>
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Sticky Bottom Bar (Mobile) */}
			<div className='fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 lg:hidden z-50'>
				<div className='flex items-center justify-between'>
					<div className='flex-1'>
						<h3 className='font-medium text-sm'>{product.name}</h3>
						<p className='text-sm text-gray-300'>{product.price}</p>
					</div>
					<div className='flex items-center space-x-3'>
						<select className='px-3 py-2 bg-gray-700 text-white rounded text-sm'>
							<option>Color</option>
						</select>
						<input
							type='number'
							min='1'
							value={quantity}
							className='w-16 px-2 py-2 bg-gray-700 text-white rounded text-sm'
						/>
						<button
							onClick={handleAddToCart}
							className='bg-white text-gray-800 px-4 py-2 rounded text-sm font-medium'
						>
							Add to Cart
						</button>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
};

export default ProductDetailsPage;
