import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, User, FilterState } from '../types';

interface StoreState {
  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  
  // User
  user: User | null;
  setUser: (user: User | null) => void;
  
  // Filters
  filters: FilterState;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  
  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // UI
  isCartOpen: boolean;
  isMobileMenuOpen: boolean;
  setCartOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
}

const defaultFilters: FilterState = {
  category: '',
  priceRange: [0, 10000],
  brand: [],
  rating: 0,
  inStock: false,
  sortBy: 'name',
  sortOrder: 'asc'
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Theme
      isDarkMode: false,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      
      // Cart
      cart: [],
      addToCart: (product) => {
        const cart = get().cart;
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          });
        } else {
          set({
            cart: [...cart, { id: product.id, product, quantity: 1 }]
          });
        }
      },
      removeFromCart: (productId) => {
        set({
          cart: get().cart.filter(item => item.id !== productId)
        });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        
        set({
          cart: get().cart.map(item =>
            item.id === productId ? { ...item, quantity } : item
          )
        });
      },
      clearCart: () => set({ cart: [] }),
      getTotalItems: () => get().cart.reduce((sum, item) => sum + item.quantity, 0),
      getTotalPrice: () => get().cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0),
      
      // User
      user: null,
      setUser: (user) => set({ user }),
      
      // Filters
      filters: defaultFilters,
      setFilters: (newFilters) => set({
        filters: { ...get().filters, ...newFilters }
      }),
      resetFilters: () => set({ filters: defaultFilters }),
      
      // Search
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      // UI
      isCartOpen: false,
      isMobileMenuOpen: false,
      setCartOpen: (open) => set({ isCartOpen: open }),
      setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open })
    }),
    {
      name: 'pc-store-storage',
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        cart: state.cart,
        user: state.user,
        filters: state.filters
      })
    }
  )
);