import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import userSlice from './user/userSlice';
import productSlice from './product/productSlice';

const reducers = combineReducers({
	user: userSlice,
	product: productSlice,
});

const store = configureStore({
	reducer: reducers,
	devTools: process.env.NODE_ENV !== 'production',
});
export default store;
