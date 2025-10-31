export default function Loading() {
	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100'>
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
						Kupasi
					</h2>
					<p className='text-gray-600 font-sans'>
						Loading your experience...
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
