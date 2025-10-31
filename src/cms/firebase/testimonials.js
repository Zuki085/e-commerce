import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { db } from './config';

const TESTIMONIALS_COLLECTION = 'testimonials';

// Static testimonials as fallback
const staticTestimonials = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Fashion Blogger',
    content: 'The quality of Crochet products is absolutely amazing! I\'ve been shopping here for months and every piece exceeds my expectations.',
    rating: 5,
    image: '/images/user1.png'
  },
  {
    id: '2',
    name: 'Mike Chen',
    role: 'Style Enthusiast',
    content: 'Great customer service and fast shipping. The clothes fit perfectly and the materials are top-notch. Highly recommended!',
    rating: 5,
    image: '/images/User5.svg'
  },
  {
    id: '3',
    name: 'Emma Davis',
    role: 'Fashion Designer',
    content: 'Crochet has become my go-to brand for trendy and affordable fashion. The designs are always fresh and on-point.',
    rating: 5,
    image: '/images/User6.svg'
  }
];

// Get all testimonials
export const getAllTestimonials = async () => {
  try {
    if (!db) {
      console.log('Firebase not configured, using static testimonials');
      return staticTestimonials;
    }
    
    const testimonialsRef = collection(db, TESTIMONIALS_COLLECTION);
    const q = query(testimonialsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const testimonials = [];
    querySnapshot.forEach((doc) => {
      testimonials.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return testimonials;
  } catch (error) {
    console.error('Error getting testimonials:', error);
    console.log('Falling back to static testimonials');
    return staticTestimonials;
  }
};

// Add new testimonial
export const addTestimonial = async (testimonialData) => {
  try {
    if (!db) {
      console.log('Firebase not configured, cannot add testimonial');
      throw new Error('Firebase not configured');
    }
    
    const testimonialsRef = collection(db, TESTIMONIALS_COLLECTION);
    const docRef = await addDoc(testimonialsRef, {
      ...testimonialData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error adding testimonial:', error);
    throw error;
  }
};

