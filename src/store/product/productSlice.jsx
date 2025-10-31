import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	products: [],
	loading: false,
	error: null,
	currentProduct: null,
};

const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		clearError: state => {
			state.error = null;
		},
		setCurrentProduct: (state, action) => {
			state.currentProduct = action.payload;
		},
		clearCurrentProduct: state => {
			state.currentProduct = null;
		},
	},
	extraReducers: builder => {
		// Add Product
		builder
			.addCase('product/addProduct/pending', state => {
				state.loading = true;
				state.error = null;
			})
			.addCase('product/addProduct/fulfilled', (state, action) => {
				state.loading = false;
				state.products.push(action.payload);
				state.error = null;
			})
			.addCase('product/addProduct/rejected', (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// Update Product
			.addCase('product/updateProduct/pending', state => {
				state.loading = true;
				state.error = null;
			})
			.addCase('product/updateProduct/fulfilled', (state, action) => {
				state.loading = false;
				const index = state.products.findIndex(
					product => product.id === action.payload.id
				);
				if (index !== -1) {
					state.products[index] = action.payload;
				}
				state.error = null;
			})
			.addCase('product/updateProduct/rejected', (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// Delete Product
			.addCase('product/deleteProduct/pending', state => {
				state.loading = true;
				state.error = null;
			})
			.addCase('product/deleteProduct/fulfilled', (state, action) => {
				state.loading = false;
				state.products = state.products.filter(
					product => product.id !== action.payload
				);
				state.error = null;
			})
			.addCase('product/deleteProduct/rejected', (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// Get Product By ID
			.addCase('product/getProductById/pending', state => {
				state.loading = true;
				state.error = null;
			})
			.addCase('product/getProductById/fulfilled', (state, action) => {
				state.loading = false;
				state.currentProduct = action.payload;
				state.error = null;
			})
			.addCase('product/getProductById/rejected', (state, action) => {
				state.loading = false;
				state.currentProduct = null;
				state.error = action.payload;
			});
	},
});

export const { clearError, setCurrentProduct, clearCurrentProduct } =
	productSlice.actions;
export default productSlice.reducer;
