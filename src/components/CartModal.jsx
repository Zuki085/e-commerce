'use client';

import React from 'react';
import { useCart } from '../context/CartContext';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';

const CartModal = ({ isOpen, onClose, onCheckout }) => {
	const { items, totalItems, totalPrice, removeFromCart, updateQuantity } =
		useCart();
	const { user } = useSelector(state => state.user);
	const router = useRouter();

	const handleCheckout = () => {
		if (!user) {
			toast.error('Please login to continue with checkout');
			router.push('/login');
			onClose();
		} else {
			// Use the parent's checkout handler
			onCheckout();
		}
	};

	if (!isOpen) return null;

	return (
		<>
			{/* Backdrop */}
			<div
				className='fixed inset-0 bg-black bg-opacity-50 z-40'
				onClick={onClose}
			/>

			{/* Modal */}
			<div className='fixed right-0 top-0 h-full w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-white/20'>
				<div className='flex flex-col h-full'>
					{/* Header */}
					<div className='flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-slate-50 to-white'>
						<h2 className='text-2xl font-display font-bold text-gray-800'>
							Your Cart
						</h2>
						<button
							onClick={onClose}
							className='text-gray-500 hover:text-amber-600 transition-colors p-2 rounded-full hover:bg-amber-50'
						>
							<svg
								className='w-6 h-6'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						</button>
					</div>

					{/* Cart Content */}
					<div className='flex-1 overflow-y-auto'>
						{items.length === 0 ? (
							/* Empty Cart State */
							<div className='flex flex-col items-center justify-center h-full px-6'>
								<div className='w-32 h-32 mb-6'>
									<div className="w-full h-full bg-gradient-to-br from-yellow-100 to-amber-200 rounded-full flex items-center justify-center">
										<svg
											className='w-16 h-16 text-amber-600'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={1.5}
												d='M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01'
											/>
										</svg>
									</div>
								</div>
								<h3 className='text-xl font-display font-bold text-gray-800 mb-2'>
									Your cart is empty
								</h3>
								<p className='text-gray-600 font-sans mb-6 text-center'>
									Add some products to get started
								</p>
								<Link href='/shop'>
									<button
										onClick={onClose}
										className='px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 font-accent font-semibold rounded-xl hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 hover:scale-105 hover:shadow-lg'
									>
										Start Shopping
									</button>
								</Link>
							</div>
						) : (
							/* Cart Items */
							<div className='p-6'>
								<div className='space-y-4'>
									{items.map(item => (
										<div
											key={`${item.id}-${item.color}`}
											className='flex items-center space-x-4 py-4 border-b border-gray-100 last:border-b-0'
										>
											{/* Product Image */}
											<div className='w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden'>
												{item.image ? (
													<img
														src={item.image}
														alt={item.name}
														className='w-full h-full object-cover'
													/>
												) : (
													<div className='w-full h-full flex items-center justify-center'>
														<svg
															className='w-8 h-8 text-gray-400'
															fill='none'
															stroke='currentColor'
															viewBox='0 0 24 24'
														>
															<path
																strokeLinecap='round'
																strokeLinejoin='round'
																strokeWidth={2}
																d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
															/>
														</svg>
													</div>
												)}
											</div>

											{/* Product Details */}
											<div className='flex-1 min-w-0'>
												<h3 className='text-sm font-medium text-gray-800 truncate'>
													{item.name}
												</h3>
												<p className='text-sm text-gray-600'>
													{item.price}
												</p>
												{item.color &&
													item.color !==
														'default' && (
														<p className='text-xs text-gray-500'>
															Color: {item.color}
														</p>
													)}
												<button
													onClick={() =>
														removeFromCart(
															item.id,
															item.color
														)
													}
													className='text-xs text-amber-600 hover:text-amber-800 mt-1 font-accent font-medium hover:underline transition-colors'
												>
													Remove
												</button>
											</div>

											{/* Quantity Controls */}
											<div className='flex items-center space-x-3'>
												<button
													onClick={() =>
														updateQuantity(
															item.id,
															Math.max(
																1,
																item.quantity -
																	1
															),
															item.color
														)
													}
													className='w-8 h-8 rounded-full border-2 border-amber-400 flex items-center justify-center hover:bg-gradient-to-r hover:from-yellow-400 hover:to-amber-500 hover:border-transparent hover:text-slate-900 transition-all duration-300 hover:scale-110'
												>
													<svg
														className='w-4 h-4'
														fill='none'
														stroke='currentColor'
														viewBox='0 0 24 24'
													>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															strokeWidth={2}
															d='M20 12H4'
														/>
													</svg>
												</button>
												<span className='w-8 text-center text-sm font-accent font-semibold text-gray-800'>
													{item.quantity}
												</span>
												<button
													onClick={() =>
														updateQuantity(
															item.id,
															item.quantity + 1,
															item.color
														)
													}
													className='w-8 h-8 rounded-full border-2 border-amber-400 flex items-center justify-center hover:bg-gradient-to-r hover:from-yellow-400 hover:to-amber-500 hover:border-transparent hover:text-slate-900 transition-all duration-300 hover:scale-110'
												>
													<svg
														className='w-4 h-4'
														fill='none'
														stroke='currentColor'
														viewBox='0 0 24 24'
													>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															strokeWidth={2}
															d='M12 6v6m0 0v6m0-6h6m-6 0H6'
														/>
													</svg>
												</button>
											</div>
										</div>
									))}
								</div>
							</div>
						)}
					</div>

					{/* Footer - Only show when cart has items */}
					{items.length > 0 && (
						<div className='border-t border-gray-200 p-6 bg-gradient-to-r from-slate-50 to-white'>
							<div className='flex justify-between items-center mb-6'>
								<span className='text-xl font-display font-bold text-gray-800'>
									Subtotal
								</span>
								<span className='text-2xl font-bold bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent'>
									${totalPrice.toFixed(2)} USD
								</span>
							</div>
							<button
								onClick={handleCheckout}
								className='w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 py-4 px-8 rounded-xl font-accent font-semibold text-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 hover:scale-105 hover:shadow-xl'
							>
								{user
									? 'Continue to Checkout'
									: 'Sign In to Checkout'}
							</button>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default CartModal;
