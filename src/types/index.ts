export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  images: string[];
  specifications: Record<string, string>;
  rating: number;
  reviews: number;
  inStock: boolean;
  features: string[];
  brand: string;
  tags: string[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatar?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
}

export interface FilterState {
  category: string;
  priceRange: [number, number];
  brand: string[];
  rating: number;
  inStock: boolean;
  sortBy: 'price' | 'rating' | 'name' | 'newest';
  sortOrder: 'asc' | 'desc';
}