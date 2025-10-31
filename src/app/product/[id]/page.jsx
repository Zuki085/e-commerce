'use client';

import React, { useState, useEffect, use } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { useCart } from '../../../context/CartContext';
import Link from 'next/link';
import toast from 'react-hot-toast';

// Static dummy product data
const dummyProducts = [
	{
		id: '1',
		name: 'Classic White Porcelain Tea Cup',
		price: 24.99,
		originalPrice: 34.99,
		category: 'Tea Cups',
		description:
			'A timeless classic, this elegant white porcelain tea cup combines traditional craftsmanship with modern durability. Perfect for your daily tea ritual.',
		material: 'Porcelain',
		shippingTime: '3-5 business days',
		madeIn: 'China',
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
		description:
			'Sophisticated ceramic tea cup with a smooth finish and ergonomic design. Ideal for both casual and formal tea settings.',
		material: 'Ceramic',
		shippingTime: '3-5 business days',
		madeIn: 'Japan',
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
		description:
			'Beautiful vintage-inspired tea cup featuring delicate floral patterns. Adds a touch of elegance to your tea collection.',
		material: 'Fine China',
		shippingTime: '5-7 business days',
		madeIn: 'United Kingdom',
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
		description:
			'Contemporary glass tea cup that showcases the beautiful color of your tea. Perfect for visual tea appreciation.',
		material: 'Borosilicate Glass',
		shippingTime: '2-4 business days',
		madeIn: 'Germany',
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
		description:
			'Luxurious bone china tea cup known for its translucency and durability. A premium choice for the discerning tea enthusiast.',
		material: 'Bone China',
		shippingTime: '5-7 business days',
		madeIn: 'United Kingdom',
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
		description:
			'Authentic Japanese-style tea cup with traditional design elements. Perfect for matcha and green tea ceremonies.',
		material: 'Stoneware',
		shippingTime: '7-10 business days',
		madeIn: 'Japan',
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
		description:
			'Unique hand-painted tea cup with artistic designs. Each piece is one-of-a-kind, making it a special addition to your collection.',
		material: 'Ceramic',
		shippingTime: '5-7 business days',
		madeIn: 'Turkey',
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
		description:
			'Opulent tea cup featuring elegant gold trim accents. Perfect for special occasions and elegant tea gatherings.',
		material: 'Fine Bone China',
		shippingTime: '5-7 business days',
		madeIn: 'United Kingdom',
		images: [
			'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500&h=500&fit=crop',
		],
	},
];

const ProductDetailsPage = ({ params }) => {
	const resolvedParams = use(params);
	const { addToCart } = useCart();
	const [quantity, setQuantity] = useState(1);
	const [currentProduct, setCurrentProduct] = useState(null);
	const [relatedProducts, setRelatedProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Simulate loading delay
		setTimeout(() => {
			if (resolvedParams.id) {
				const product = dummyProducts.find(
					p => p.id === resolvedParams.id
				);
				setCurrentProduct(product || null);

				// Get related products (exclude current product, limit to 4)
				const filtered = dummyProducts
					.filter(p => p.id !== resolvedParams.id)
					.slice(0, 4);
				setRelatedProducts(filtered);
			}
			setLoading(false);
		}, 300);
	}, [resolvedParams.id]);

	if (loading) {
		return (
			<div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center'>
				<div className='text-center'>
					{/* Animated Purse Icon */}
					<div className='relative mb-8'>
						<div className='w-20 h-20 mx-auto relative'>
							{/* Purse Body */}
							<div className='w-full h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-t-2xl rounded-b-lg animate-pulse shadow-lg'>
								{/* Purse Handle */}
								<div className='absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-4 border-4 border-yellow-600 rounded-full border-b-0 animate-bounce'></div>
								{/* Purse Details */}
								<div className='absolute top-2 left-2 w-2 h-2 bg-yellow-200 rounded-full animate-ping'></div>
								<div
									className='absolute top-2 right-2 w-2 h-2 bg-yellow-200 rounded-full animate-ping'
									style={{ animationDelay: '0.5s' }}
								></div>
								{/* Purse Strap */}
								<div className='absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-yellow-600 rounded-full animate-pulse'></div>
							</div>
							{/* Floating Sparkles */}
							<div className='absolute -top-2 -left-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-60'></div>
							<div
								className='absolute -top-1 -right-3 w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping opacity-60'
								style={{ animationDelay: '0.3s' }}
							></div>
							<div
								className='absolute -bottom-1 -left-1 w-1 h-1 bg-yellow-600 rounded-full animate-ping opacity-60'
								style={{ animationDelay: '0.7s' }}
							></div>
						</div>
					</div>

					{/* Loading Text */}
					<div className='space-y-2'>
						<h2 className='text-2xl font-display font-bold bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent'>
							Crochet
						</h2>
						<p className='text-gray-600 font-sans'>
							Loading product details...
						</p>
					</div>

					{/* Loading Dots */}
					<div className='flex justify-center space-x-2 mt-6'>
						<div className='w-2 h-2 bg-yellow-400 rounded-full animate-bounce'></div>
						<div
							className='w-2 h-2 bg-amber-500 rounded-full animate-bounce'
							style={{ animationDelay: '0.1s' }}
						></div>
						<div
							className='w-2 h-2 bg-yellow-600 rounded-full animate-bounce'
							style={{ animationDelay: '0.2s' }}
						></div>
					</div>
				</div>
			</div>
		);
	}

	if (!currentProduct) {
		return (
			<div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center'>
				<div className='text-center max-w-md mx-auto px-4'>
					<div className='w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-yellow-100 to-amber-200 rounded-full flex items-center justify-center'>
						<svg
							className='w-10 h-10 text-amber-500'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 12a3 3 0 11-6 0 3 3 0 016 0z'
							/>
						</svg>
					</div>
					<h1 className='text-3xl font-display font-bold text-gray-800 mb-4'>
						Product Not Found
					</h1>
					<p className='text-gray-600 mb-8 font-sans'>
						The product you're looking for doesn't exist.
					</p>
					<a
						href='/shop'
						className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 font-accent font-semibold rounded-xl hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 hover:scale-105 hover:shadow-lg'
					>
						Back to Shop
					</a>
				</div>
			</div>
		);
	}

	const handleAddToCart = () => {
		if (!currentProduct) {
			toast.error('Product not available');
			return;
		}

		addToCart({
			id: currentProduct.id,
			name: currentProduct.name,
			price: currentProduct.price,
			images: currentProduct.images,
			quantity: quantity,
		});
		toast.success('Product added to cart!');
	};

	// const reviews = [
	// 	{
	// 		id: 1,
	// 		name: 'Frances Guerrero',
	// 		title: 'A must-have product',
	// 		rating: 4,
	// 		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
	// 	},
	// 	{
	// 		id: 2,
	// 		name: 'Larry Lawson',
	// 		title: 'Amazing...loved it',
	// 		rating: 5,
	// 		text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
	// 	},
	// 	{
	// 		id: 3,
	// 		name: 'Sarah Johnson',
	// 		title: 'Perfect fit and quality',
	// 		rating: 5,
	// 		text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
	// 	},
	// 	{
	// 		id: 4,
	// 		name: 'Mike Chen',
	// 		title: 'Great value for money',
	// 		rating: 4,
	// 		text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	// 	},
	// ];

	// const relatedProducts = [
	// 	{
	// 		id: 1,
	// 		name: "Urban edge men's tee",
	// 		price: '$49.00 USD',
	// 		category: 'Men',
	// 		image: 'bg-gray-200',
	// 	},
	// 	{
	// 		id: 2,
	// 		name: 'Adventure seeker tee',
	// 		price: '$80.49 USD',
	// 		originalPrice: '$99.99 USD',
	// 		category: 'Men',
	// 		image: 'bg-green-200',
	// 	},
	// 	{
	// 		id: 3,
	// 		name: 'Classic comfort crewneck',
	// 		price: '$49.00 USD',
	// 		category: 'Women',
	// 		image: 'bg-gray-400',
	// 	},
	// 	{
	// 		id: 4,
	// 		name: 'Weekend warrior t-shirt',
	// 		price: '$40.00 USD',
	// 		category: 'Men',
	// 		image: 'bg-gray-500',
	// 	},
	// ];

	// const renderStars = rating => {
	// 	return [...Array(5)].map((_, i) => (
	// 		<svg
	// 			key={i}
	// 			className={`w-4 h-4 ${
	// 				i < rating ? 'text-yellow-400' : 'text-gray-300'
	// 			}`}
	// 			fill='currentColor'
	// 			viewBox='0 0 20 20'
	// 		>
	// 			<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
	// 		</svg>
	// 	));
	// };

	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100'>
			<Header />

			{/* Product Details Section */}
			<section className='py-20 bg-gradient-to-br from-slate-50 via-white to-slate-100'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
						{/* Product Images */}
						<div className='space-y-6'>
							<div className='group'>
								{currentProduct.images &&
								currentProduct.images.length > 0 ? (
									<img
										src={currentProduct.images[0]}
										alt={currentProduct.name}
										className='w-full aspect-square rounded-2xl object-cover shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105'
									/>
								) : (
									<div className='aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center shadow-lg'>
										<span className='text-gray-500 text-sm font-accent font-medium'>
											No images available
										</span>
									</div>
								)}
							</div>
						</div>

						{/* Product Information */}
						<div className='space-y-8'>
							{/* Category Tag */}
							<div className='inline-block'>
								<span className='bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 px-4 py-2 rounded-xl text-sm font-accent font-semibold shadow-lg'>
									{currentProduct.category || 'Uncategorized'}
								</span>
							</div>

							{/* Product Title */}
							<h1 className='text-4xl lg:text-5xl font-display font-bold text-gray-800 leading-tight'>
								{currentProduct.name || 'Product Name'}
							</h1>

							{/* Price */}
							<div className='text-3xl font-bold text-gray-800 flex items-center space-x-4'>
								<span className='bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent'>
									{`$${currentProduct.price} USD` ||
										'Price not available'}
								</span>
								{currentProduct.originalPrice && (
									<span className='text-gray-500 line-through text-lg'>
										{`$${currentProduct.originalPrice} USD`}
									</span>
								)}
							</div>

							{/* Description */}
							<p className='text-gray-600 leading-relaxed text-lg font-sans'>
								{currentProduct.description ||
									'No description available'}
							</p>

							{/* Quantity Selector */}
							<div>
								<label className='block text-lg font-accent font-semibold text-gray-700 mb-3'>
									Quantity
								</label>
								<input
									type='number'
									min='1'
									value={quantity}
									onChange={e => {
										const value = parseInt(e.target.value);
										setQuantity(isNaN(value) ? 1 : value);
									}}
									className='w-full px-6 py-4 border-2 border-gray-300 rounded-xl text-gray-700 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all duration-300 font-sans text-lg'
								/>
							</div>

							{/* Add to Cart Button */}
							<button
								onClick={handleAddToCart}
								className='w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 py-4 px-8 rounded-xl font-accent font-semibold text-xl hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 hover:scale-105 hover:shadow-xl'
							>
								Add to Cart
							</button>

							{/* Product Details */}
							<div className='space-y-6 pt-8 bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg'>
								<h6 className='text-gray-800 text-2xl font-display font-bold mb-6'>
									Product Details
								</h6>
								<div className='space-y-4'>
									<div className='flex justify-between items-center py-3 border-b border-gray-200'>
										<span className='text-gray-800 text-lg font-accent font-semibold'>
											Material
										</span>
										<span className='text-gray-600 text-lg font-sans'>
											{currentProduct.material ||
												'Not specified'}
										</span>
									</div>
									<div className='flex justify-between items-center py-3 border-b border-gray-200'>
										<span className='text-gray-800 text-lg font-accent font-semibold'>
											Shipping Time
										</span>
										<span className='text-gray-600 text-lg font-sans'>
											{currentProduct.shippingTime ||
												'Not specified'}
										</span>
									</div>
									<div className='flex justify-between items-center py-3'>
										<span className='text-gray-800 text-lg font-accent font-semibold'>
											Made in
										</span>
										<span className='text-gray-600 text-lg font-sans'>
											{currentProduct.madeIn ||
												'Not specified'}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Feature Highlights */}
			<section className='py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-16'>
						<h2 className='text-4xl font-display font-bold mb-4'>
							<span className='bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent'>
								Why Choose Crochet?
							</span>
						</h2>
						<p className='text-xl text-gray-300 font-sans max-w-2xl mx-auto'>
							Experience premium quality and exceptional service
							with every purchase
						</p>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						{/* Free Shipping */}
						<div className='text-center group'>
							<div className='w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg'>
								<svg
									className='w-10 h-10 text-slate-900'
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
							<h3 className='text-xl font-display font-bold text-white mb-3'>
								Free Shipping
							</h3>
							<p className='text-gray-300 font-sans'>
								Free shipping on orders over $50
							</p>
						</div>

						{/* Fast Delivery */}
						<div className='text-center group'>
							<div className='w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg'>
								<svg
									className='w-10 h-10 text-slate-900'
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
							<h3 className='text-xl font-display font-bold text-white mb-3'>
								Fast Delivery
							</h3>
							<p className='text-gray-300 font-sans'>
								Quick delivery to your doorstep
							</p>
						</div>

						{/* Quality Guarantee */}
						<div className='text-center group'>
							<div className='w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg'>
								<svg
									className='w-10 h-10 text-slate-900'
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
							<h3 className='text-xl font-display font-bold text-white mb-3'>
								100% Quality Guarantee
							</h3>
							<p className='text-gray-300 font-sans'>
								Satisfaction guaranteed or your money back
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Reviews Section */}
			{/* <section className='py-16 bg-white'>
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
			</section> */}

			{/* Related Products */}
			<section className='py-20 bg-gradient-to-br from-slate-50 via-white to-slate-100'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-16'>
						<h2 className='text-4xl font-display font-bold text-gray-800 mb-4'>
							<span className='bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent'>
								Related Products
							</span>
						</h2>
						<p className='text-xl text-gray-600 font-sans max-w-2xl mx-auto'>
							Discover more amazing products you might love
						</p>
					</div>

					<div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
						{relatedProducts.map(product => (
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

			{/* Sticky Bottom Bar (Mobile) */}
			<div className='fixed bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm text-slate-900 p-4 lg:hidden z-50 rounded-2xl shadow-2xl border border-white/20'>
				<div className='flex items-center justify-between'>
					<div className='flex-1'>
						<h3 className='font-accent font-semibold text-sm text-gray-800'>
							{currentProduct.name || 'Product Name'}
						</h3>
						<p className='text-sm text-gray-600 font-sans'>
							{`$${currentProduct.price} USD` ||
								'Price not available'}
							{currentProduct.originalPrice && (
								<span className='text-gray-500 line-through text-sm ml-2'>
									{`$${currentProduct.originalPrice} USD`}
								</span>
							)}
						</p>
					</div>
					<div className='flex items-center space-x-3'>
						<input
							type='number'
							min='1'
							value={quantity}
							onChange={e => {
								const value = parseInt(e.target.value);
								setQuantity(isNaN(value) ? 1 : value);
							}}
							className='w-16 px-3 py-2 bg-gray-100 text-slate-900 rounded-xl text-sm font-sans border-2 border-yellow-400 focus:border-yellow-500 focus:outline-none'
						/>
						<button
							onClick={handleAddToCart}
							className='bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 px-6 py-2 rounded-xl text-sm font-accent font-semibold hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 hover:scale-105'
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
