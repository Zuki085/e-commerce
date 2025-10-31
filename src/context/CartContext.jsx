'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_TO_CART':
			const existingItem = state.items.find(
				item => item.id === action.payload.id
			);

			if (existingItem) {
				return {
					...state,
					items: state.items.map(item =>
						item.id === action.payload.id
							? {
									...item,
									quantity:
										item.quantity + action.payload.quantity,
							  }
							: item
					),
				};
			} else {
				return {
					...state,
					items: [...state.items, action.payload],
				};
			}

		case 'REMOVE_FROM_CART':
			return {
				...state,
				items: state.items.filter(
					item => item.id !== action.payload.id
				),
			};

		case 'UPDATE_QUANTITY':
			return {
				...state,
				items: state.items.map(item =>
					item.id === action.payload.id
						? { ...item, quantity: action.payload.quantity }
						: item
				),
			};

		case 'CLEAR_CART':
			return {
				...state,
				items: [],
			};

		case 'UPDATE_TOTALS':
			return {
				...state,
				totalItems: action.payload.totalItems,
				totalPrice: action.payload.totalPrice,
				totalQuantity: action.payload.totalQuantity,
			};

		default:
			return state;
	}
};

export const CartProvider = ({ children }) => {
	// Initialize state from localStorage
	const getInitialState = () => {
		if (typeof window !== 'undefined') {
			const savedCart = localStorage.getItem('cart');
			if (savedCart) {
				try {
					return JSON.parse(savedCart);
				} catch (error) {
					console.error(
						'Error loading cart from localStorage:',
						error
					);
				}
			}
		}
		return {
			items: [],
			totalItems: 0,
			totalPrice: 0,
			totalQuantity: 0,
		};
	};

	const [state, dispatch] = useReducer(cartReducer, getInitialState());

	// Save cart to localStorage whenever items change
	useEffect(() => {
		if (typeof window !== 'undefined') {
			if (state.items.length > 0) {
				localStorage.setItem('cart', JSON.stringify(state));
			} else {
				localStorage.removeItem('cart');
			}
		}
	}, [state.items]);

	// Calculate totals whenever items change
	useEffect(() => {
		const totalItems = state.items.length; // Count unique products
		const totalQuantity = state.items.reduce(
			(sum, item) => sum + item.quantity,
			0
		); // Total quantity of all items
		const totalPrice = state.items.reduce((sum, item) => {
			// Handle different price formats
			let price = 0;
			if (typeof item.price === 'string') {
				// Remove $ and USD, then parse
				price = parseFloat(
					item.price.replace(/[$,\s]/g, '').replace('USD', '')
				);
			} else if (typeof item.price === 'number') {
				price = item.price;
			}
			return sum + price * item.quantity;
		}, 0);

		// Update state directly instead of dispatching
		dispatch({
			type: 'UPDATE_TOTALS',
			payload: { totalItems, totalPrice, totalQuantity },
		});
	}, [state.items]);

	const addToCart = product => {
		dispatch({
			type: 'ADD_TO_CART',
			payload: {
				id: product.id,
				name: product.name,
				price: product.price,
				image:
					product.images && product.images.length > 0
						? product.images[0]
						: product.image,
				quantity: product.quantity || 1,
			},
		});
	};

	const removeFromCart = id => {
		dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
	};

	const updateQuantity = (id, quantity) => {
		dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
	};

	const clearCart = () => {
		dispatch({ type: 'CLEAR_CART' });
		// Also clear from localStorage
		if (typeof window !== 'undefined') {
			localStorage.removeItem('cart');
		}
	};

	const value = {
		...state,
		addToCart,
		removeFromCart,
		updateQuantity,
		clearCart,
	};

	return (
		<CartContext.Provider value={value}>{children}</CartContext.Provider>
	);
};

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
};

