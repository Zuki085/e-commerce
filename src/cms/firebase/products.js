import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  onSnapshot 
} from 'firebase/firestore';
import { db } from './config';
import { products as staticProducts } from '../../data/products';

const PRODUCTS_COLLECTION = 'products';

// Get all products
export const getAllProducts = async () => {
  try {
    if (!db) {
      console.log('Firebase not configured, using static data');
      return staticProducts;
    }
    
    const productsRef = collection(db, PRODUCTS_COLLECTION);
    const q = query(productsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return products;
  } catch (error) {
    console.error('Error getting products:', error);
    console.log('Falling back to static data');
    return staticProducts;
  }
};

// Get product by ID
export const getProductById = async (id) => {
  try {
    if (!db) {
      console.log('Firebase not configured, using static data');
      return staticProducts.find(product => product.id === id) || null;
    }
    
    const productRef = doc(db, PRODUCTS_COLLECTION, id);
    const productSnap = await getDoc(productRef);
    
    if (productSnap.exists()) {
      return {
        id: productSnap.id,
        ...productSnap.data()
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting product:', error);
    console.log('Falling back to static data');
    return staticProducts.find(product => product.id === id) || null;
  }
};

// Get products by category
export const getProductsByCategory = async (category) => {
  try {
    if (!db) {
      console.log('Firebase not configured, using static data');
      return staticProducts.filter(product => product.category === category);
    }
    
    const productsRef = collection(db, PRODUCTS_COLLECTION);
    const q = query(
      productsRef, 
      where('category', '==', category),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return products;
  } catch (error) {
    console.error('Error getting products by category:', error);
    console.log('Falling back to static data');
    return staticProducts.filter(product => product.category === category);
  }
};

// Add new product
export const addProduct = async (productData) => {
  try {
    if (!db) {
      console.log('Firebase not configured, cannot add product');
      throw new Error('Firebase not configured');
    }
    
    const productsRef = collection(db, PRODUCTS_COLLECTION);
    const docRef = await addDoc(productsRef, {
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Update product
export const updateProduct = async (id, productData) => {
  try {
    if (!db) {
      console.log('Firebase not configured, cannot update product');
      throw new Error('Firebase not configured');
    }
    
    const productRef = doc(db, PRODUCTS_COLLECTION, id);
    await updateDoc(productRef, {
      ...productData,
      updatedAt: new Date()
    });
    
    return true;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete product
export const deleteProduct = async (id) => {
  try {
    if (!db) {
      console.log('Firebase not configured, cannot delete product');
      throw new Error('Firebase not configured');
    }
    
    const productRef = doc(db, PRODUCTS_COLLECTION, id);
    await deleteDoc(productRef);
    
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Search products
export const searchProducts = async (searchTerm) => {
  try {
    if (!db) {
      console.log('Firebase not configured, using static data');
      return staticProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    const productsRef = collection(db, PRODUCTS_COLLECTION);
    const q = query(productsRef, orderBy('name'));
    const querySnapshot = await getDocs(q);
    
    const products = [];
    querySnapshot.forEach((doc) => {
      const product = {
        id: doc.id,
        ...doc.data()
      };
      
      // Simple search - in a real app, you'd use Algolia or similar
      if (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        products.push(product);
      }
    });
    
    return products;
  } catch (error) {
    console.error('Error searching products:', error);
    console.log('Falling back to static data');
    return staticProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
};

// Real-time listener for products
export const subscribeToProducts = (callback) => {
  if (!db) {
    console.log('Firebase not configured, using static data');
    callback(staticProducts);
    return () => {}; // Return empty unsubscribe function
  }
  
  const productsRef = collection(db, PRODUCTS_COLLECTION);
  const q = query(productsRef, orderBy('createdAt', 'desc'));
  
  return onSnapshot(q, (querySnapshot) => {
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });
    callback(products);
  });
};
