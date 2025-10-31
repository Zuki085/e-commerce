import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export function PurchaseModal({ open, toggle, items, subtotal, cartOnClose }) {
	const { uid, user } = useSelector(state => state.user);
	const { clearCart } = useCart();
	const [loader, setLoading] = useState(false);
	const router = useRouter();
	const [error, setError] = useState(null);
	const stripe = useStripe();
	const elements = useElements();
	const modalRef = useRef(null);

	useEffect(() => {
		function handleClickOutside(event) {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target) &&
				!loader
			) {
				toggle();
			}
		}

		if (open) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [open, toggle]);

	const handleSubmit = async event => {
		event.preventDefault();
		setLoading(true);

		if (!stripe || !elements) {
			setLoading(false);
			return;
		}

		const cardElement = elements.getElement(CardElement);
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: cardElement,
		});

		if (error) {
			setError(error.message);
			setLoading(false);
			return;
		}

		try {
			const res = await fetch('/api/create-payment-intent', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					paymentMethodId: paymentMethod.id,
					subtotal,
					items,
					userId: uid,
					email: user?.email,
					name: user?.name,
				}),
			});

			const result = await res.json();
			if (result.success) {
				console.log('Payment success:', result.paymentIntent);

				// Clear the cart and show success toast
				clearCart();
				toast.success(
					'Payment successful! Your order has been placed.'
				);

				// Close the modal and cart
				toggle();
				if (cartOnClose) {
					cartOnClose();
				}
				router.push('/');
			} else {
				setError(result.error);
			}
		} catch (err) {
			console.error('Submit error:', err);
			setError(err.message);
		}

		setLoading(false);
	};

	if (!open) return null;
	return (
		<div className='fixed overflow-auto inset-0 bg-gray-600 bg-opacity-50 z-50 rounded-2xl flex items-center justify-center'>
			<div
				ref={modalRef}
				className='bg-white rounded-xl shadow-lg w-full max-w-md'
			>
				{/* Items list like in drawer */}
				<div className='max-h-56 overflow-y-auto space-y-3 px-6 pt-4'>
					{items.map(item => (
						<div
							key={item.id}
							className='flex gap-3 border rounded-lg p-3'
						>
							<div className='shrink-0'>
								<div className='relative w-[56px] h-[56px] rounded-md overflow-hidden bg-neutral-100'>
									<Image
										src={
											item.frontImage ||
											item.image ||
											'/images/frontImage.webp'
										}
										alt={item.name}
										fill
										className='object-contain'
									/>
								</div>
							</div>
							<div className='flex-1 min-w-0'>
								<div className='flex items-start justify-between gap-2'>
									<div className='min-w-0'>
										<p className='truncate text-sm font-medium text-neutral-900'>
											{item.name}
										</p>
										{item.size ? (
											<p className='text-xs text-neutral-500 mt-0.5'>
												Size: {item.size}
											</p>
										) : null}
										{item.quantity ? (
											<p className='text-xs text-neutral-500 mt-0.5'>
												Qty: {item.quantity}
											</p>
										) : null}
									</div>
									<p className='text-sm font-semibold'>
										${Number(item.price).toFixed(2)}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Total */}
				{/* <div className='flex items-center justify-between px-6'>
					<span className='font-medium text-neutral-800'>Total</span>
					<span className='text-lg font-semibold'>
						${subtotal.toFixed(2)} USD
					</span>
				</div> */}
				<form
					onSubmit={handleSubmit}
					className='space-y-4 bg-white px-6 py-2 my-2 w-full'
				>
					<label className='block text-black font-normal text-lg mt-2'>
						Email for membership
					</label>

					<input
						type='text'
						required
						className='w-full p-3 border border-[#444444] text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
						placeholder='Enter email'
						readOnly
						defaultValue={user?.email}
						// onChange={(e) =>
						//     handleInputChange(question.id, e.target.value)
						// }
					/>
					<label className='block text-black font-normal text-lg mt-3'>
						Payment information
					</label>
					<div className='h-[52px] my-2 w-full rounded-md border border-[#444444] py-4 px-3'>
						<CardElement
							id='cardElement'
							options={{ hidePostalCode: true }}
							className='dark:text-white'
						/>
					</div>
					{error && (
						<div className='text-red-600 text-sm mt-2'>{error}</div>
					)}

					<button
						type='submit'
						disabled={loader}
						className='w-full text-center bg-gray-800 my-5 text-white py-3 rounded-md font-semibold cursor-pointer flex items-center justify-center'
					>
						{loader ? (
							<Loader2 className='h-5 w-5 animate-spin' />
						) : (
							`Pay $${subtotal.toFixed(2)}`
						)}
					</button>
				</form>
			</div>
		</div>
	);
}
