'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCart } from '../context/CartContext';
import { logout } from '../store/user/userThunk';
import CartModal from './CartModal';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '@/config/stripe';
import { PurchaseModal } from './PurchaseModal';
import Image from 'next/image';
import Logo from '../../public/images/logo.png';
const Header = () => {
	const [isPagesDropdownOpen, setIsPagesDropdownOpen] = useState(false);
	const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
	const dropdownRef = useRef(null);
	const profileDropdownRef = useRef(null);
	const { totalItems, items, totalPrice } = useCart();
	const dispatch = useDispatch();
	const { user } = useSelector(state => state.user);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = event => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				setIsPagesDropdownOpen(false);
			}
			if (
				profileDropdownRef.current &&
				!profileDropdownRef.current.contains(event.target)
			) {
				setIsProfileDropdownOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleLinkClick = () => {
		setIsPagesDropdownOpen(false);
	};

	const handleLogout = () => {
		dispatch(
			logout({
				onSuccess: () => {
					setIsProfileDropdownOpen(false);
				},
			})
		);
	};

	const handleCheckout = () => {
		if (!user) {
			// This should be handled in CartModal, but just in case
			return;
		}
		setIsCartOpen(false);
		setIsPaymentModalOpen(true);
	};

	const handlePaymentModalToggle = () => {
		setIsPaymentModalOpen(!isPaymentModalOpen);
	};

	return (
		<header className='bg-white shadow-sm'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center h-16'>
					{/* Logo */}
					<div className='flex items-center space-x-2'>
						<div className='w-8 h-8 bg-gray-800 rounded flex items-center justify-center'>
							<Image src={Logo} alt='logo' width={32} height={32} />
						</div>
						<span className='text-xl font-display font-bold text-gray-800'>
							Crochet
						</span>
					</div>

					{/* Navigation */}
					<nav className='hidden md:flex space-x-8'>
						<a
							href='/'
							className='text-gray-800 hover:text-gray-600 font-accent font-medium'
						>
							Home
						</a>
						<a
							href='/about'
							className='text-gray-800 hover:text-gray-600 font-accent font-medium'
						>
							About
						</a>
						<a
							href='/shop'
							className='text-gray-800 hover:text-gray-600 font-accent font-medium'
						>
							Shop All
						</a>
						<a
							href='/contact'
							className='text-gray-800 hover:text-gray-600 font-accent font-medium'
						>
							Contact
						</a>
					
					</nav>

					{/* Icons */}
					<div className='flex items-center space-x-4'>
						<button className='text-gray-800 hover:text-gray-600'>
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
									d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
								/>
							</svg>
						</button>
						<button
							className='relative text-gray-800 hover:text-gray-600'
							onClick={() => setIsCartOpen(true)}
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
									d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
								/>
							</svg>
							{totalItems > 0 && (
								<span className='absolute -top-2 -right-2 bg-gray-800 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
									{totalItems}
								</span>
							)}
						</button>
						{user ? (
							<div className='relative' ref={profileDropdownRef}>
								<button
									onClick={() =>
										setIsProfileDropdownOpen(
											!isProfileDropdownOpen
										)
									}
									className='flex items-center space-x-1 text-gray-800 hover:text-gray-600 focus:outline-none'
								>
									<div className='w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center'>
										{user.profilePicture ? (
											<img
												src={user.profilePicture}
												alt={user.name || 'Profile'}
												className='w-8 h-8 rounded-full object-cover'
											/>
										) : (
											<svg
												className='w-5 h-5 text-gray-600'
												fill='currentColor'
												viewBox='0 0 20 20'
											>
												<path
													fillRule='evenodd'
													d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
													clipRule='evenodd'
												/>
											</svg>
										)}
									</div>
									{/* <span className='hidden md:block text-sm font-medium'>
										{user.name || 'User'}
									</span> */}
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
											d='M19 9l-7 7-7-7'
										/>
									</svg>
								</button>

								{/* Profile Dropdown Menu */}
								{isProfileDropdownOpen && (
									<div className='absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50'>
										<div className='py-2'>
											<div className='px-4 py-2 border-b border-gray-100'>
												<p className='text-sm font-accent font-medium text-gray-900'>
													{user.name || 'User'}
												</p>
												<p className='text-xs text-gray-500'>
													{user.email}
												</p>
											</div>
											{user.role === 'admin' && (
												<a
													href='/admin'
													onClick={() =>
														setIsProfileDropdownOpen(
															false
														)
													}
													className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
												>
													Admin Panel
												</a>
											)}
											<button
												onClick={handleLogout}
												className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
											>
												Logout
											</button>
										</div>
									</div>
								)}
							</div>
						) : (
							<a
								href='/login'
								className='relative text-gray-800 hover:text-gray-600 font-accent font-medium'
							>
								Login
							</a>
						)}
					</div>
				</div>
			</div>

			{/* Cart Modal */}
			<CartModal
				isOpen={isCartOpen}
				onClose={() => setIsCartOpen(false)}
				onCheckout={handleCheckout}
			/>

			{/* Payment Modal */}
			{isPaymentModalOpen && (
				<Elements stripe={stripePromise}>
					<PurchaseModal
						open={isPaymentModalOpen}
						toggle={handlePaymentModalToggle}
						cartOnClose={() => setIsCartOpen(false)}
						items={items}
						subtotal={totalPrice}
					/>
				</Elements>
			)}
		</header>
	);
};

export default Header;
