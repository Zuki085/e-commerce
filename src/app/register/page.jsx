'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { registerUser } from '../../store/user/userThunk';
import { registerSchema } from '../../lib/validation';

const RegisterPage = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const { isLoading } = useSelector(state => state.user);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
			terms: false,
		},
	});

	const onSubmit = async data => {
		try {
			const result = await dispatch(
				registerUser({
					payload: {
						name: data.name.trim(),
						email: data.email.trim(),
						password: data.password,
					},
					onSuccess: () => {
						router.push('/login');
					},
				})
			);

			// If registration was successful, redirect to login
			if (result.type === 'user/registerUser/fulfilled') {
				router.push('/login');
			}
		} catch (error) {
			console.error('Registration error:', error);
		}
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100'>
			<Header />

			{/* Register Section */}
			<section className='py-20'>
				<div className='max-w-md mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8'>
						{/* Header */}
						<div className='text-center mb-8'>
							<h1 className='text-3xl font-display font-bold text-gray-800 mb-2'>
								Join Crochet
							</h1>
							<p className='text-gray-600 font-sans'>
								Create your account and start shopping
							</p>
						</div>

						{/* Register Form */}
						<form
							onSubmit={handleSubmit(onSubmit)}
							className='space-y-6'
						>
							{/* Name Field */}
							<div>
								<label
									htmlFor='name'
									className='block text-sm font-accent font-semibold text-gray-700 mb-2'
								>
									Full Name
								</label>
								<input
									type='text'
									id='name'
									{...register('name')}
									className={`w-full px-4 py-3 text-base text-gray-800 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-400 ${
										errors.name
											? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20 text-red-800'
											: 'border-gray-300 bg-white hover:border-gray-400 focus:border-yellow-400 text-gray-800'
									}`}
									placeholder='Enter your full name'
								/>
								{errors.name && (
									<p className='mt-1 text-sm text-red-600'>
										{errors.name.message}
									</p>
								)}
							</div>

							{/* Email Field */}
							<div>
								<label
									htmlFor='email'
									className='block text-sm font-accent font-semibold text-gray-700 mb-2'
								>
									Email Address
								</label>
								<input
									type='email'
									id='email'
									{...register('email')}
									className={`w-full px-4 py-3 text-base text-gray-800 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-400 ${
										errors.email
											? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20 text-red-800'
											: 'border-gray-300 bg-white hover:border-gray-400 focus:border-yellow-400 text-gray-800'
									}`}
									placeholder='Enter your email'
								/>
								{errors.email && (
									<p className='mt-1 text-sm text-red-600'>
										{errors.email.message}
									</p>
								)}
							</div>

							{/* Password Field */}
							<div>
								<label
									htmlFor='password'
									className='block text-sm font-accent font-semibold text-gray-700 mb-2'
								>
									Password
								</label>
								<input
									type='password'
									id='password'
									{...register('password')}
									className={`w-full px-4 py-3 text-base text-gray-800 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-400 ${
										errors.password
											? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20 text-red-800'
											: 'border-gray-300 bg-white hover:border-gray-400 focus:border-yellow-400 text-gray-800'
									}`}
									placeholder='Create a password'
								/>
								{errors.password && (
									<p className='mt-1 text-sm text-red-600'>
										{errors.password.message}
									</p>
								)}
							</div>

							{/* Confirm Password Field */}
							<div>
								<label
									htmlFor='confirmPassword'
									className='block text-sm font-accent font-semibold text-gray-700 mb-2'
								>
									Confirm Password
								</label>
								<input
									type='password'
									id='confirmPassword'
									{...register('confirmPassword')}
									className={`w-full px-4 py-3 text-base text-gray-800 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-400 ${
										errors.confirmPassword
											? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20 text-red-800'
											: 'border-gray-300 bg-white hover:border-gray-400 focus:border-yellow-400 text-gray-800'
									}`}
									placeholder='Confirm your password'
								/>
								{errors.confirmPassword && (
									<p className='mt-1 text-sm text-red-600'>
										{errors.confirmPassword.message}
									</p>
								)}
							</div>

							{/* Terms and Conditions */}
							<div className='flex items-start'>
								<div className='flex items-center h-5'>
									<input
										id='terms'
										type='checkbox'
										{...register('terms')}
										className='h-4 w-4 text-yellow-400 focus:ring-yellow-400 border-gray-300 rounded'
									/>
								</div>
								<div className='ml-3 text-sm'>
									<label
										htmlFor='terms'
										className='text-gray-700 font-sans'
									>
										I agree to the{' '}
										<a
											href='/terms'
											className='text-amber-600 hover:text-amber-500 hover:underline font-accent font-semibold'
										>
											Terms of Service
										</a>{' '}
										and{' '}
										<a
											href='/privacy'
											className='text-amber-600 hover:text-amber-500 hover:underline font-accent font-semibold'
										>
											Privacy Policy
										</a>
									</label>
								</div>
							</div>
							{errors.terms && (
								<p className='mt-1 text-sm text-red-600'>
									{errors.terms.message}
								</p>
							)}

							{/* Register Button */}
							<button
								type='submit'
								disabled={isLoading}
								className='w-full py-4 px-6 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 font-accent font-semibold rounded-xl hover:from-yellow-300 hover:to-amber-400 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:shadow-lg'
							>
								{isLoading ? (
									<div className='flex items-center justify-center'>
										<svg
											className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
										>
											<circle
												className='opacity-25'
												cx='12'
												cy='12'
												r='10'
												stroke='currentColor'
												strokeWidth='4'
											></circle>
											<path
												className='opacity-75'
												fill='currentColor'
												d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
											></path>
										</svg>
										Creating account...
									</div>
								) : (
									'Create Account'
								)}
							</button>
						</form>

						{/* Sign In Link */}
						<div className='mt-8 text-center'>
							<p className='text-gray-600 font-sans'>
								Already have an account?{' '}
								<a
									href='/login'
									className='font-accent font-semibold text-amber-600 hover:text-amber-500 hover:underline transition-colors duration-300'
								>
									Sign in here
								</a>
							</p>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
};

export default RegisterPage;
