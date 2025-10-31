export const products = [
  {
    id: 'urban-edge-mens-tee',
    name: "Urban edge men's tee",
    price: "$49.00 USD",
    originalPrice: null,
    category: "Men",
    image: "bg-gray-200",
    description: "A modern take on classic streetwear with clean lines and comfortable fit.",
    material: "100% Cotton",
    shippingTime: "3-5 workdays",
    madeIn: "Los Angeles",
    images: [
      { id: 1, src: "bg-gray-200", alt: "Front view" },
      { id: 2, src: "bg-gray-300", alt: "Back view" },
      { id: 3, src: "bg-gray-100", alt: "Model wearing" },
      { id: 4, src: "bg-gray-400", alt: "Product detail" }
    ]
  },
  {
    id: 'retro-revival-t-shirt',
    name: "Retro revival t-shirt",
    price: "$105.49 USD",
    originalPrice: null,
    category: "Women",
    image: "bg-gray-300",
    description: "Step back in time with our Retro Revival T-Shirt! Embrace nostalgia with its vintage-inspired design and classic fit.",
    material: "Cotton",
    shippingTime: "3-6 workdays",
    madeIn: "New York",
    images: [
      { id: 1, src: "bg-gray-800", alt: "Front view" },
      { id: 2, src: "bg-gray-700", alt: "Back view" },
      { id: 3, src: "bg-blue-100", alt: "Model wearing shirt" },
      { id: 4, src: "bg-gray-600", alt: "Product held up" }
    ]
  },
  {
    id: 'adventure-seeker-tee',
    name: "Adventure seeker tee",
    price: "$80.49 USD",
    originalPrice: "$99.99 USD",
    category: "Men",
    image: "bg-green-200",
    description: "Perfect for outdoor adventures with moisture-wicking fabric and durable construction.",
    material: "Polyester Blend",
    shippingTime: "2-4 workdays",
    madeIn: "Portland",
    images: [
      { id: 1, src: "bg-green-200", alt: "Front view" },
      { id: 2, src: "bg-green-300", alt: "Back view" },
      { id: 3, src: "bg-green-100", alt: "Model wearing" },
      { id: 4, src: "bg-green-400", alt: "Product detail" }
    ]
  },
  {
    id: 'classic-comfort-crewneck',
    name: "Classic comfort crewneck",
    price: "$49.00 USD",
    originalPrice: null,
    category: "Women",
    image: "bg-gray-400",
    description: "Ultra-soft crewneck with a relaxed fit that's perfect for everyday wear.",
    material: "100% Cotton",
    shippingTime: "3-5 workdays",
    madeIn: "Chicago",
    images: [
      { id: 1, src: "bg-gray-400", alt: "Front view" },
      { id: 2, src: "bg-gray-500", alt: "Back view" },
      { id: 3, src: "bg-gray-300", alt: "Model wearing" },
      { id: 4, src: "bg-gray-600", alt: "Product detail" }
    ]
  },
  {
    id: 'athletic-performance-tee',
    name: "Athletic performance tee",
    price: "$79.49 USD",
    originalPrice: "$105.49 USD",
    category: "Men",
    image: "bg-green-300",
    description: "High-performance athletic tee designed for active lifestyles and intense workouts.",
    material: "Moisture-Wicking Polyester",
    shippingTime: "2-3 workdays",
    madeIn: "Miami",
    images: [
      { id: 1, src: "bg-green-300", alt: "Front view" },
      { id: 2, src: "bg-green-400", alt: "Back view" },
      { id: 3, src: "bg-green-200", alt: "Model wearing" },
      { id: 4, src: "bg-green-500", alt: "Product detail" }
    ]
  },
  {
    id: 'weekend-warrior-t-shirt',
    name: "Weekend warrior t-shirt",
    price: "$40.00 USD",
    originalPrice: null,
    category: "Men",
    image: "bg-gray-500",
    description: "Casual weekend essential with a comfortable fit and versatile style.",
    material: "100% Cotton",
    shippingTime: "3-5 workdays",
    madeIn: "Austin",
    images: [
      { id: 1, src: "bg-gray-500", alt: "Front view" },
      { id: 2, src: "bg-gray-600", alt: "Back view" },
      { id: 3, src: "bg-gray-400", alt: "Model wearing" },
      { id: 4, src: "bg-gray-700", alt: "Product detail" }
    ]
  },
  {
    id: 'vintage-vibes-graphic-tee',
    name: "Vintage vibes graphic tee",
    price: "$47.00 USD",
    originalPrice: "$60.00 USD",
    category: "Men",
    image: "bg-amber-200",
    description: "Retro-inspired graphic tee with vintage aesthetics and modern comfort.",
    material: "100% Cotton",
    shippingTime: "3-5 workdays",
    madeIn: "Seattle",
    images: [
      { id: 1, src: "bg-amber-200", alt: "Front view" },
      { id: 2, src: "bg-amber-300", alt: "Back view" },
      { id: 3, src: "bg-amber-100", alt: "Model wearing" },
      { id: 4, src: "bg-amber-400", alt: "Product detail" }
    ]
  },
  {
    id: 'romantic-ruffle-tee',
    name: "Romantic ruffle tee",
    price: "$35.49 USD",
    originalPrice: null,
    category: "Women",
    image: "bg-pink-200",
    description: "Feminine ruffle details add a romantic touch to this comfortable everyday tee.",
    material: "100% Cotton",
    shippingTime: "3-5 workdays",
    madeIn: "San Francisco",
    images: [
      { id: 1, src: "bg-pink-200", alt: "Front view" },
      { id: 2, src: "bg-pink-300", alt: "Back view" },
      { id: 3, src: "bg-pink-100", alt: "Model wearing" },
      { id: 4, src: "bg-pink-400", alt: "Product detail" }
    ]
  }
];

export const getProductById = (id) => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category) => {
  if (category === 'All') return products;
  return products.filter(product => product.category === category);
};


