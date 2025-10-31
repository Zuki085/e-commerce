'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const ModernHeroSection = () => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const slides = [
		{
			id: 1,
			title: 'Elegant Collection',
			subtitle: 'Premium tea cups crafted for your perfect tea ritual',
			bg: 'bg-gradient-to-br from-purple-400 to-pink-400',
			img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&h=800&fit=crop',
		},
		{
			id: 2,
			title: 'Artisan Crafted',
			subtitle: 'Handcrafted ceramic and porcelain tea cups for discerning tea lovers',
			bg: 'bg-gradient-to-br from-blue-400 to-purple-400',
			img: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&h=800&fit=crop',
		},
		{
			id: 3,
			title: 'Timeless Elegance',
			subtitle: 'From classic bone china to modern glass designs',
			bg: 'bg-gradient-to-br from-green-400 to-blue-400',
			img: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&h=800&fit=crop',
		},
	];

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentSlide(prev => (prev + 1) % slides.length);
		}, 4000);
		return () => clearInterval(timer);
	}, [slides.length]);

	return (
		<section className='relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden pt-16 pb-8'>
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
				<div className='absolute top-20 left-10 w-20 h-20 bg-purple-500 rounded-full blur-xl opacity-20 animate-pulse'></div>
				<div className='absolute top-40 right-20 w-32 h-32 bg-pink-500 rounded-full blur-xl opacity-20 animate-pulse delay-1000'></div>
				<div className='absolute bottom-20 left-1/4 w-16 h-16 bg-blue-500 rounded-full blur-xl opacity-20 animate-pulse delay-2000'></div>
			</div>

			{/* Slider Container */}
			<div className='relative z-10'>
				<div className='w-full'>
					{/* Slide Content */}
					<div className='relative overflow-hidden'>
						<div
							className='flex transition-transform duration-1000 ease-in-out'
							style={{
								transform: `translateX(-${
									currentSlide * 100
								}%)`,
							}}
						>
							{slides.map((slide, index) => (
								<div
									key={slide.id}
									className='w-full flex-shrink-0'
								>
									<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
										<div className='flex flex-col lg:flex-row items-center gap-8'>
											{/* Left Content */}
											<div className='lg:w-1/2 mb-12 lg:mb-0 lg:pr-12'>
												<div className='text-center lg:text-left'>
													{/* Badge */}
													<div
														className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400/20 to-amber-500/20 backdrop-blur-sm border border-yellow-400/30 mb-6 transition-all duration-1000 ${
															index ===
															currentSlide
																? 'opacity-100 translate-y-0'
																: 'opacity-0 translate-y-8'
														}`}
														style={{
															transitionDelay:
																index ===
																currentSlide
																	? '0.2s'
																	: '0s',
														}}
													>
														<span className='text-sm font-accent font-medium text-white'>
															☕{' '}
															{index === 0
																? 'Premium Collection'
																: index === 1
																? 'Handcrafted'
																: 'Bestseller'}
														</span>
													</div>

													{/* Main Headline */}
													<h1
														className={`text-5xl lg:text-7xl font-display text-white mb-6 leading-tight transition-all duration-1000 ${
															index ===
															currentSlide
																? 'opacity-100 translate-y-0'
																: 'opacity-0 translate-y-12'
														}`}
														style={{
															transitionDelay:
																index ===
																currentSlide
																	? '0.4s'
																	: '0s',
														}}
													>
														{slide.title
															.split(' ')
															.map((word, i) => (
																<span
																	key={i}
																	className={`block transition-all duration-1000 ${
																		i === 0
																			? 'block'
																			: 'block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'
																	}`}
																	style={{
																		transitionDelay:
																			index ===
																			currentSlide
																				? `${
																						0.6 +
																						i *
																							0.2
																				  }s`
																				: '0s',
																		opacity:
																			index ===
																			currentSlide
																				? 1
																				: 0,
																		transform:
																			index ===
																			currentSlide
																				? 'translateY(0)'
																				: 'translateY(20px)',
																	}}
																>
																	{word}
																</span>
															))}
													</h1>

													{/* Subtitle */}
													<p
														className={`text-xl font-sans text-gray-300 mb-8 max-w-lg leading-relaxed transition-all duration-1000 ${
															index ===
															currentSlide
																? 'opacity-100 translate-y-0'
																: 'opacity-0 translate-y-8'
														}`}
														style={{
															transitionDelay:
																index ===
																currentSlide
																	? '1.2s'
																	: '0s',
														}}
													>
														{slide.subtitle}
													</p>

													{/* CTA Button */}
													<div
														className={`mb-12 transition-all duration-1000 ${
															index ===
															currentSlide
																? 'opacity-100 translate-y-0'
																: 'opacity-0 translate-y-8'
														}`}
														style={{
															transitionDelay:
																index ===
																currentSlide
																	? '1.4s'
																	: '0s',
														}}
													>
														<Link href='/shop'>
															<button className='group px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 font-accent font-semibold rounded-full hover:from-yellow-500 hover:to-amber-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'>
																<span className='flex items-center justify-center'>
																	View Collection
																	<svg
																		className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform'
																		fill='none'
																		stroke='currentColor'
																		viewBox='0 0 24 24'
																	>
																		<path
																			strokeLinecap='round'
																			strokeLinejoin='round'
																			strokeWidth={
																				2
																			}
																			d='M17 8l4 4m0 0l-4 4m4-4H3'
																		/>
																	</svg>
																</span>
															</button>
														</Link>
													</div>
												</div>
											</div>

											{/* Right Product Showcase */}
											<div
												className={`lg:w-1/2 relative transition-all duration-1000 ${
													index === currentSlide
														? 'opacity-100 translate-x-0'
														: 'opacity-0 translate-x-12'
												}`}
												style={{
													transitionDelay:
														index === currentSlide
															? '0.8s'
															: '0s',
												}}
											>
												<div className='relative'>
													{/* Main Product Card */}
													<div
														className={`relative z-10 bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl transition-all duration-1000 ${
															index ===
															currentSlide
																? 'opacity-100 scale-100'
																: 'opacity-0 scale-95'
														}`}
														style={{
															transitionDelay:
																index ===
																currentSlide
																	? '1.0s'
																	: '0s',
														}}
													>
														<div
															className={`w-full h-80 rounded-2xl flex items-center justify-center overflow-hidden`}
														>
															<div className='w-full h-full flex items-center justify-center'>
																<img
																	src={
																		slide.img
																	}
																	className='max-w-full max-h-full object-cover rounded-2xl'
																	alt={
																		slide.title
																	}
																/>
															</div>
														</div>
													</div>

													{/* Floating Product Cards */}
													<div
														className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-pink-400 to-rose-400 rounded-2xl shadow-lg transition-all duration-1000 ${
															index ===
															currentSlide
																? 'opacity-100 scale-100 animate-bounce'
																: 'opacity-0 scale-75'
														}`}
														style={{
															transitionDelay:
																index ===
																currentSlide
																	? '1.8s'
																	: '0s',
														}}
													></div>
													<div
														className={`absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl shadow-lg transition-all duration-1000 ${
															index ===
															currentSlide
																? 'opacity-100 scale-100 animate-bounce delay-1000'
																: 'opacity-0 scale-75'
														}`}
														style={{
															transitionDelay:
																index ===
																currentSlide
																	? '2.0s'
																	: '0s',
														}}
													></div>
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Dots Indicator */}
					<div className='flex justify-center space-x-2 z-20 mt-8'>
						{slides.map((_, index) => (
							<button
								key={index}
								onClick={() => setCurrentSlide(index)}
								className={`w-3 h-3 rounded-full transition-all duration-300 ${
									index === currentSlide
										? 'bg-white scale-125'
										: 'bg-white/30 hover:bg-white/50'
								}`}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default ModernHeroSection;
