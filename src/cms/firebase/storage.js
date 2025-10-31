import {
	ref,
	uploadBytes,
	getDownloadURL,
	deleteObject,
	listAll,
} from 'firebase/storage';
import { storage } from '../../config/firebase';

// Upload image to Firebase Storage
export const uploadImage = async (file, path) => {
	try {
		if (!storage) {
			throw new Error(
				'Firebase storage is not initialized. Please check your Firebase configuration.'
			);
		}

		const storageRef = ref(storage, path);
		const snapshot = await uploadBytes(storageRef, file);
		const downloadURL = await getDownloadURL(snapshot.ref);

		return downloadURL;
	} catch (error) {
		console.error('Error uploading image:', error);
		throw error;
	}
};

// Upload multiple images
export const uploadImages = async (files, productId) => {
	try {
		const uploadPromises = files.map((file, index) => {
			const path = `products/${productId}/image-${index + 1}`;
			return uploadImage(file, path);
		});

		const urls = await Promise.all(uploadPromises);
		return urls;
	} catch (error) {
		console.error('Error uploading images:', error);
		throw error;
	}
};

// Delete image from Firebase Storage
export const deleteImage = async imageUrl => {
	try {
		if (!storage) {
			console.warn(
				'Firebase storage is not initialized. Cannot delete image.'
			);
			return false;
		}

		const imageRef = ref(storage, imageUrl);
		await deleteObject(imageRef);
		return true;
	} catch (error) {
		console.error('Error deleting image:', error);
		throw error;
	}
};

// Get all images for a product
export const getProductImages = async productId => {
	try {
		const productRef = ref(storage, `products/${productId}`);
		const result = await listAll(productRef);

		const imagePromises = result.items.map(item => getDownloadURL(item));
		const urls = await Promise.all(imagePromises);

		return urls;
	} catch (error) {
		console.error('Error getting product images:', error);
		throw error;
	}
};

