import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	collection,
	addDoc,
	doc,
	updateDoc,
	deleteDoc,
	onSnapshot,
	getDoc,
	query,
	orderBy,
} from 'firebase/firestore';
import { db } from '@/config/firebase';

// Add a new product to Firebase
export const addProduct = createAsyncThunk(
	'product/addProduct',
	async (productData, { rejectWithValue }) => {
		try {
			// Add timestamp to the product data
			const productWithTimestamp = {
				...productData,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				status: 'Active',
			};

			// Add the product to the 'products' collection
			const docRef = await addDoc(
				collection(db, 'products'),
				productWithTimestamp
			);

			// Return the product data with the generated ID
			return {
				id: docRef.id,
				...productWithTimestamp,
			};
		} catch (error) {
			console.error('Error adding product:', error);
			return rejectWithValue(error.message || 'Failed to add product');
		}
	}
);

// Fetch all products from Firebase

export const fetchProducts = createAsyncThunk(
	'product/fetchProducts',
	async ({ onSuccess }, thunkAPI) => {
		try {
			const productsRef = collection(db, 'products');

			// 🕒 Order products by 'createdAt' (latest first)
			const q = query(productsRef, orderBy('createdAt', 'desc'));

			// Real-time Firestore listener
			onSnapshot(q, snapshot => {
				const products = snapshot.docs.map(doc => ({
					id: doc.id,
					...doc.data(),
				}));

				if (onSuccess) {
					onSuccess(products);
				}
			});

			return;
		} catch (error) {
			console.error('Error fetching products:', error);
			return thunkAPI.rejectWithValue(
				error.message || 'Failed to fetch products'
			);
		}
	}
);

// Update a product in Firebase
export const updateProduct = createAsyncThunk(
	'product/updateProduct',
	async ({ id, productData }, { rejectWithValue }) => {
		try {
			const productRef = doc(db, 'products', id);
			const updatedData = {
				...productData,
				updatedAt: new Date().toISOString(),
			};

			await updateDoc(productRef, updatedData);

			return {
				id,
				...updatedData,
			};
		} catch (error) {
			console.error('Error updating product:', error);
			return rejectWithValue(error.message || 'Failed to update product');
		}
	}
);

// Get a single product by ID from Firebase
export const getProductById = createAsyncThunk(
	'product/getProductById',
	async (productId, { rejectWithValue }) => {
		try {
			const productRef = doc(db, 'products', productId);
			const productSnap = await getDoc(productRef);

			if (productSnap.exists()) {
				return {
					id: productSnap.id,
					...productSnap.data(),
				};
			} else {
				return rejectWithValue('Product not found');
			}
		} catch (error) {
			console.error('Error fetching product:', error);
			return rejectWithValue(error.message || 'Failed to fetch product');
		}
	}
);

// Delete a product from Firebase
export const deleteProduct = createAsyncThunk(
	'product/deleteProduct',
	async ({ productId, onSuccess }, { rejectWithValue }) => {
		try {
			const productRef = doc(db, 'products', productId);
			await deleteDoc(productRef);
			if (onSuccess) {
				onSuccess();
			}

			return productId;
		} catch (error) {
			console.error('Error deleting product:', error);
			return rejectWithValue(error.message || 'Failed to delete product');
		}
	}
);
