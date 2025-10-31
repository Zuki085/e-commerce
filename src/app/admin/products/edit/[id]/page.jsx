'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
	getProductById,
	updateProduct,
} from '../../../../../store/product/productThunk';
import { clearCurrentProduct } from '../../../../../store/product/productSlice';
import { uploadImage, deleteImage } from '@/cms/firebase/storage';
import toast from 'react-hot-toast';

// Zod validation schema
const productSchema = z.object({
	name: z
		.string()
		.min(1, 'Product name is required')
		.min(3, 'Product name must be at least 3 characters'),
	price: z
		.string()
		.min(1, 'Price is required')
		.regex(
			/^\$?\d+(\.\d{2})?\s*(USD)?$/i,
			'Please enter a valid price (e.g., $49.00 or 49.00 USD)'
		),
	originalPrice: z
		.string()
		.optional()
		.refine(val => {
			if (!val) return true;
			return /^\$?\d+(\.\d{2})?\s*(USD)?$/i.test(val);
		}, 'Please enter a valid original price (e.g., $99.99 or 99.99 USD)'),
	category: z.enum(['Men', 'Women', 'Kid'], {
		required_error: 'Category is required',
	}),
	description: z
		.string()
		.min(1, 'Description is required')
		.min(10, 'Description must be at least 10 characters'),
	material: z
		.string()
		.min(1, 'Material is required')
		.min(2, 'Material must be at least 2 characters'),
	shippingTime: z
		.string()
		.min(1, 'Shipping time is required')
		.min(3, 'Shipping time must be at least 3 characters'),
	madeIn: z
		.string()
		.min(1, 'Made in location is required')
		.min(2, 'Made in location must be at least 2 characters'),
});

const EditProductPage = ({ params }) => {
	const router = useRouter();
	const dispatch = useDispatch();
	const { currentProduct, loading, error } = useSelector(
		state => state.product
	);

	// Unwrap params using React.use() for Next.js 15 compatibility
	const resolvedParams = use(params);
	const productId = resolvedParams.id;

	// Initialize react-hook-form with Zod resolver
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
	} = useForm({
		resolver: zodResolver(productSchema),
		defaultValues: {
			name: '',
			price: '',
			originalPrice: '',
			category: '',
			description: '',
			material: '',
			shippingTime: '',
			madeIn: '',
		},
	});

	const [images, setImages] = useState([
		{
			id: 1,
			file: null,
			preview: null,
			firebaseUrl: null,
			isUploading: false,
		},
		{
			id: 2,
			file: null,
			preview: null,
			firebaseUrl: null,
			isUploading: false,
		},
		{
			id: 3,
			file: null,
			preview: null,
			firebaseUrl: null,
			isUploading: false,
		},
		{
			id: 4,
			file: null,
			preview: null,
			firebaseUrl: null,
			isUploading: false,
		},
	]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showImageValidation, setShowImageValidation] = useState(false);

	// Custom validation for images - at least one image must be uploaded
	const validateImages = () => {
		const hasImages = images.some(img => img.firebaseUrl !== null);
		return hasImages || 'At least one product image is required';
	};

	// Get only uploaded images (filter out null files)
	const getUploadedImages = () => {
		return images.filter(img => img.firebaseUrl !== null);
	};

	// Check if any image is currently uploading
	const isAnyImageUploading = () => {
		return images.some(img => img.isUploading);
	};

	useEffect(() => {
		// Fetch product data when component mounts
		dispatch(getProductById(productId));

		// Cleanup function to clear current product when component unmounts
		return () => {
			dispatch(clearCurrentProduct());
		};
	}, [dispatch, productId]);

	// Update form data when currentProduct changes
	useEffect(() => {
		if (currentProduct) {
			// Reset form with current product data
			reset({
				name: currentProduct.name || '',
				price: currentProduct.price || '',
				originalPrice: currentProduct.originalPrice || '',
				category: currentProduct.category || '',
				description: currentProduct.description || '',
				material: currentProduct.material || '',
				shippingTime: currentProduct.shippingTime || '',
				madeIn: currentProduct.madeIn || '',
			});

			// Handle existing images
			if (currentProduct.images && currentProduct.images.length > 0) {
				const updatedImages = images.map((img, index) => {
					if (index < currentProduct.images.length) {
						return {
							...img,
							firebaseUrl: currentProduct.images[index],
							preview: currentProduct.images[index],
						};
					}
					return img;
				});
				setImages(updatedImages);
			}
		}
	}, [currentProduct, reset]);

	const handleImageChange = async (index, file) => {
		if (file) {
			// Delete old image from Firebase if it exists
			const currentImage = images[index];
			if (currentImage.firebaseUrl) {
				try {
					await deleteImage(currentImage.firebaseUrl);
				} catch (error) {
					console.error('Error deleting old image:', error);
				}
			}

			// Set uploading state
			setImages(prev =>
				prev.map((img, i) =>
					i === index
						? { ...img, isUploading: true, file: file }
						: img
				)
			);

			// Create preview
			const reader = new FileReader();
			reader.onload = async e => {
				// Update preview first
				setImages(prev =>
					prev.map((img, i) =>
						i === index ? { ...img, preview: e.target.result } : img
					)
				);

				// Upload to Firebase immediately
				try {
					// Use the actual file name from the selected file
					const fileName = file.name;
					const imagePath = `products/${fileName}`;

					const firebaseUrl = await uploadImage(file, imagePath);

					// Update with Firebase URL
					setImages(prev =>
						prev.map((img, i) =>
							i === index
								? { ...img, firebaseUrl, isUploading: false }
								: img
						)
					);
				} catch (error) {
					console.error('Error uploading image:', error);
					// Reset uploading state on error
					setImages(prev =>
						prev.map((img, i) =>
							i === index ? { ...img, isUploading: false } : img
						)
					);
					toast.error('Error uploading image. Please try again.');
				}
			};
			reader.readAsDataURL(file);
		}
	};

	const handleImageClick = index => {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = 'image/*';
		input.onchange = async e => {
			if (e.target.files[0]) {
				await handleImageChange(index, e.target.files[0]);
			}
		};
		input.click();
	};

	const onSubmit = async data => {
		// Validate images
		const imageValidation = validateImages();
		if (imageValidation !== true) {
			setShowImageValidation(true);
			return;
		}

		// Check if any image is still uploading
		if (isAnyImageUploading()) {
			toast.error('Please wait for all images to finish uploading.');
			return;
		}

		setIsSubmitting(true);

		try {
			// Get Firebase URLs from already uploaded images
			const uploadedImages = getUploadedImages();
			const imageUrls = uploadedImages.map(img => img.firebaseUrl);

			const productData = {
				...data,
				images: imageUrls, // Store only Firebase URLs, not the full image objects
				originalPrice: data.originalPrice || null,
			};

			// Dispatch the updateProduct thunk
			const result = await dispatch(
				updateProduct({ id: productId, productData })
			);

			if (updateProduct.fulfilled.match(result)) {
				console.log('Product updated successfully:', result.payload);
				toast.success('Product updated successfully!');
				router.push('/admin/products');
			} else {
				throw new Error(result.payload || 'Failed to update product');
			}
		} catch (error) {
			console.error('Error updating product:', error);
			toast.error(`Error updating product: ${error.message}`);
		} finally {
			setIsSubmitting(false);
		}
	};

	// Show loading state
	if (loading) {
		return (
			<div className='min-h-screen bg-white flex items-center justify-center'>
				<div className='text-center'>
					<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4'></div>
					<p className='text-gray-600'>Loading product...</p>
				</div>
			</div>
		);
	}

	// Show error state
	if (error) {
		return (
			<div className='min-h-screen bg-white flex items-center justify-center'>
				<div className='text-center'>
					<h1 className='text-2xl font-bold text-red-600 mb-4'>
						Error Loading Product
					</h1>
					<p className='text-gray-600 mb-6'>{error}</p>
					<button
						onClick={() => router.push('/admin/products')}
						className='text-gray-800 hover:text-gray-600 underline'
					>
						Back to Products
					</button>
				</div>
			</div>
		);
	}

	// Show not found state
	if (!currentProduct) {
		return (
			<div className='min-h-screen bg-white flex items-center justify-center'>
				<div className='text-center'>
					<h1 className='text-2xl font-bold text-gray-800 mb-4'>
						Product Not Found
					</h1>
					<p className='text-gray-600 mb-6'>
						The product you're trying to edit doesn't exist.
					</p>
					<button
						onClick={() => router.push('/admin/products')}
						className='text-gray-800 hover:text-gray-600 underline'
					>
						Back to Products
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-2xl font-bold text-gray-900'>
					Edit Product
				</h1>
				<p className='mt-1 text-sm text-gray-500'>
					Update product information
				</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
				<div className='bg-white shadow rounded-lg'>
					<div className='px-4 py-5 sm:p-6'>
						<h3 className='text-lg leading-6 font-medium text-gray-900 mb-4'>
							Basic Information
						</h3>

						<div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
							<div>
								<label
									htmlFor='name'
									className='block text-sm font-medium text-gray-700'
								>
									Product Name *
								</label>
								<input
									type='text'
									id='name'
									{...register('name')}
									className={`mt-2 block w-full h-12 px-4 py-3 text-base text-gray-800 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${
										errors.name
											? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20 text-red-800'
											: 'border-gray-300 bg-white hover:border-gray-400 focus:border-indigo-500 text-gray-800'
									}`}
									placeholder='Enter product name'
								/>
								{errors.name && (
									<p className='mt-1 text-sm text-red-600'>
										{errors.name.message}
									</p>
								)}
							</div>

							<div>
								<label
									htmlFor='category'
									className='block text-sm font-medium text-gray-700'
								>
									Category *
								</label>
								<select
									id='category'
									{...register('category')}
									className={`mt-2 block w-full h-12 px-4 py-3 text-base text-gray-800 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${
										errors.category
											? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20 text-red-800'
											: 'border-gray-300 bg-white hover:border-gray-400 focus:border-indigo-500 text-gray-800'
									}`}
								>
									<option value='' disabled>
										Select a category
									</option>
									<option value='Men'>Men</option>
									<option value='Women'>Women</option>
									<option value='Kid'>Kid</option>
								</select>
								{errors.category && (
									<p className='mt-1 text-sm text-red-600'>
										{errors.category.message}
									</p>
								)}
							</div>

							<div>
								<label
									htmlFor='price'
									className='block text-sm font-medium text-gray-700'
								>
									Price *
								</label>
								<input
									type='text'
									id='price'
									{...register('price')}
									className={`mt-2 block w-full px-4 py-3 text-base text-gray-800 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${
										errors.price
											? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20 text-red-800'
											: 'border-gray-300 bg-white hover:border-gray-400 focus:border-indigo-500 text-gray-800'
									}`}
									placeholder='$49.00 USD'
								/>
								{errors.price && (
									<p className='mt-1 text-sm text-red-600'>
										{errors.price.message}
									</p>
								)}
							</div>

							<div>
								<label
									htmlFor='originalPrice'
									className='block text-sm font-medium text-gray-700'
								>
									Original Price (Optional)
								</label>
								<input
									type='text'
									id='originalPrice'
									{...register('originalPrice')}
									className={`mt-2 block w-full px-4 py-3 text-base text-gray-800 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${
										errors.originalPrice
											? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20 text-red-800'
											: 'border-gray-300 bg-white hover:border-gray-400 focus:border-indigo-500 text-gray-800'
									}`}
									placeholder='$99.99 USD'
								/>
								{errors.originalPrice && (
									<p className='mt-1 text-sm text-red-600'>
										{errors.originalPrice.message}
									</p>
								)}
							</div>
						</div>

						<div className='mt-6'>
							<label
								htmlFor='description'
								className='block text-sm font-medium text-gray-700'
							>
								Description *
							</label>
							<textarea
								id='description'
								rows={4}
								{...register('description')}
								className={`mt-2 block w-full px-4 py-3 text-base text-gray-800 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none ${
									errors.description
										? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20 text-red-800'
										: 'border-gray-300 bg-white hover:border-gray-400 focus:border-indigo-500 text-gray-800'
								}`}
								placeholder='Enter product description'
							/>
							{errors.description && (
								<p className='mt-1 text-sm text-red-600'>
									{errors.description.message}
								</p>
							)}
						</div>
					</div>
				</div>

				<div className='bg-white shadow rounded-lg'>
					<div className='px-4 py-5 sm:p-6'>
						<h3 className='text-lg leading-6 font-medium text-gray-900 mb-4'>
							Product Details
						</h3>

						<div className='grid grid-cols-1 gap-6 sm:grid-cols-3'>
							<div>
								<label
									htmlFor='material'
									className='block text-sm font-medium text-gray-700'
								>
									Material *
								</label>
								<input
									type='text'
									id='material'
									{...register('material')}
									className={`mt-2 block w-full px-4 py-3 text-base text-gray-800 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${
										errors.material
											? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20 text-red-800'
											: 'border-gray-300 bg-white hover:border-gray-400 focus:border-indigo-500 text-gray-800'
									}`}
									placeholder='100% Cotton'
								/>
								{errors.material && (
									<p className='mt-1 text-sm text-red-600'>
										{errors.material.message}
									</p>
								)}
							</div>

							<div>
								<label
									htmlFor='shippingTime'
									className='block text-sm font-medium text-gray-700'
								>
									Shipping Time *
								</label>
								<input
									type='text'
									id='shippingTime'
									{...register('shippingTime')}
									className={`mt-2 block w-full px-4 py-3 text-base text-gray-800 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${
										errors.shippingTime
											? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20 text-red-800'
											: 'border-gray-300 bg-white hover:border-gray-400 focus:border-indigo-500 text-gray-800'
									}`}
									placeholder='3-5 workdays'
								/>
								{errors.shippingTime && (
									<p className='mt-1 text-sm text-red-600'>
										{errors.shippingTime.message}
									</p>
								)}
							</div>

							<div>
								<label
									htmlFor='madeIn'
									className='block text-sm font-medium text-gray-700'
								>
									Made In *
								</label>
								<input
									type='text'
									id='madeIn'
									{...register('madeIn')}
									className={`mt-2 block w-full px-4 py-3 text-base text-gray-800 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${
										errors.madeIn
											? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20 text-red-800'
											: 'border-gray-300 bg-white hover:border-gray-400 focus:border-indigo-500 text-gray-800'
									}`}
									placeholder='New York'
								/>
								{errors.madeIn && (
									<p className='mt-1 text-sm text-red-600'>
										{errors.madeIn.message}
									</p>
								)}
							</div>
						</div>
					</div>
				</div>

				<div className='bg-white shadow rounded-lg'>
					<div className='px-4 py-5 sm:p-6'>
						<h3 className='text-lg leading-6 font-medium text-gray-900 mb-4'>
							Product Images
						</h3>
						{showImageValidation && validateImages() !== true && (
							<div className='mb-4 p-3 bg-red-50 border border-red-200 rounded-md'>
								<p className='text-sm text-red-600'>
									{validateImages()}
								</p>
							</div>
						)}

						<div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
							{images.map((image, index) => (
								<div key={image.id} className='space-y-2'>
									<div
										className={`h-32 w-full rounded-lg border-2 border-dashed flex items-center justify-center transition-colors group ${
											image.isUploading
												? 'border-blue-300 bg-blue-50 cursor-not-allowed'
												: 'border-gray-300 cursor-pointer hover:border-indigo-500 hover:bg-indigo-50'
										}`}
										onClick={() =>
											!image.isUploading &&
											handleImageClick(index)
										}
									>
										{image.isUploading ? (
											<div className='text-center'>
												<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto'></div>
												<p className='mt-2 text-xs text-blue-600'>
													Uploading...
												</p>
											</div>
										) : image.preview ? (
											<div className='relative h-full w-full group'>
												<img
													src={image.preview}
													alt={image.label}
													className='h-full w-full object-cover rounded-lg'
												/>
												{image.firebaseUrl && (
													<div className='absolute top-1 right-1 bg-green-500 text-white text-xs px-1 py-0.5 rounded'>
														✓
													</div>
												)}
												{/* Hover overlay with change icon */}
												<div className='absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center'>
													<div className='text-center text-white'>
														<svg
															className='mx-auto h-6 w-6 mb-1'
															fill='none'
															viewBox='0 0 24 24'
															stroke='currentColor'
														>
															<path
																strokeLinecap='round'
																strokeLinejoin='round'
																strokeWidth={2}
																d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
															/>
														</svg>
														<p className='text-xs font-medium'>
															Change Image
														</p>
													</div>
												</div>
											</div>
										) : (
											<div className='text-center'>
												<svg
													className='mx-auto h-8 w-8 text-gray-400'
													fill='none'
													viewBox='0 0 24 24'
													stroke='currentColor'
												>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														strokeWidth={2}
														d='M12 6v6m0 0v6m0-6h6m-6 0H6'
													/>
												</svg>
												<p className='mt-2 text-xs text-gray-500'>
													Click to upload
												</p>
											</div>
										)}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className='flex justify-end space-x-3'>
					<button
						type='button'
						onClick={() => router.back()}
						className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
					>
						Cancel
					</button>
					<button
						type='submit'
						disabled={isSubmitting || isAnyImageUploading()}
						className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
							isSubmitting || isAnyImageUploading()
								? 'bg-indigo-400 cursor-not-allowed'
								: 'bg-indigo-600 hover:bg-indigo-700'
						}`}
					>
						{isSubmitting
							? 'Updating Product...'
							: isAnyImageUploading()
							? 'Uploading Images...'
							: 'Update Product'}
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditProductPage;
