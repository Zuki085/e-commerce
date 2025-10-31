"use client";

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { onAuthStateChange, isAdmin } from '../firebase/auth';
import { subscribeToProducts } from '../firebase/products';

const CMSContext = createContext();

const cmsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_USER':
      return { 
        ...state, 
        user: action.payload,
        isAdmin: action.payload ? isAdmin(action.payload) : false
      };
    
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    
    default:
      return state;
  }
};

export const CMSProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cmsReducer, {
    user: null,
    isAdmin: false,
    products: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribeAuth = onAuthStateChange((user) => {
      dispatch({ type: 'SET_USER', payload: user });
      dispatch({ type: 'SET_LOADING', payload: false });
    });

    // Listen to products changes
    const unsubscribeProducts = subscribeToProducts((products) => {
      dispatch({ type: 'SET_PRODUCTS', payload: products });
    });

    return () => {
      unsubscribeAuth();
      unsubscribeProducts();
    };
  }, []);

  const value = {
    ...state,
    dispatch
  };

  return (
    <CMSContext.Provider value={value}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};


