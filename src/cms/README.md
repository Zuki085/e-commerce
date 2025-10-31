# Crochet CMS

A Content Management System for managing Crochet products using Firebase.

## Features

- 🔐 Firebase Authentication
- 📦 Product Management (CRUD operations)
- 🔍 Search and Filter products
- 📊 Dashboard with statistics
- 🖼️ Image management
- 📱 Responsive design
- ⚡ Real-time updates

## Setup

### 1. Firebase Configuration

1. Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication (Email/Password)
3. Create a Firestore database
4. Enable Storage for image uploads
5. Copy your Firebase config and add to `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 2. Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products collection - only authenticated admin users can access
    match /products/{productId} {
      allow read, write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

### 3. Storage Security Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

## Usage

### Accessing the CMS

1. Navigate to `/cms` in your browser
2. Sign in with admin credentials
3. Start managing your products!

### Demo Credentials

- Email: admin@Crochet.com
- Password: admin123

*Note: You'll need to create this user in Firebase Authentication first*

## File Structure

```
src/cms/
├── components/
│   ├── LoginForm.jsx          # Authentication form
│   └── ProductForm.jsx        # Product creation/editing form
├── context/
│   └── CMSContext.jsx         # Global state management
├── firebase/
│   ├── config.js              # Firebase configuration
│   ├── auth.js                # Authentication functions
│   ├── products.js            # Product CRUD operations
│   └── storage.js             # Image upload functions
├── pages/
│   ├── CMSDashboard.jsx       # Main dashboard
│   └── ProductsPage.jsx       # Product management
├── CMSApp.jsx                 # Main CMS application
└── README.md                  # This file
```

## Features in Detail

### Product Management
- Add new products with complete details
- Edit existing products
- Delete products with confirmation
- Search products by name
- Filter by category (Men, Women, Kid)
- Real-time updates across all users

### Dashboard
- Product statistics
- Recent products overview
- Quick actions for common tasks

### Authentication
- Secure login with Firebase Auth
- Admin-only access
- Session management

### Image Management
- Multiple product images
- Background color selection
- Alt text for accessibility

## Development

### Adding New Features

1. Create new components in `src/cms/components/`
2. Add Firebase functions in `src/cms/firebase/`
3. Update the CMS context if needed
4. Add new pages to `src/cms/pages/`

### Database Schema

Products collection structure:
```javascript
{
  name: string,
  price: string,
  originalPrice: string | null,
  category: 'Men' | 'Women' | 'Kid',
  description: string,
  material: string,
  shippingTime: string,
  madeIn: string,
  image: string,
  images: Array<{
    id: number,
    src: string,
    alt: string
  }>,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## Troubleshooting

### Common Issues

1. **Firebase not initialized**: Check your environment variables
2. **Permission denied**: Verify Firestore security rules
3. **Images not uploading**: Check Storage security rules
4. **Authentication failing**: Ensure user exists in Firebase Auth

### Getting Help

- Check Firebase console for errors
- Verify environment variables are set correctly
- Ensure all Firebase services are enabled
- Check browser console for JavaScript errors


