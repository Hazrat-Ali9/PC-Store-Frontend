import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Eye, Heart, Filter, Grid, List } from 'lucide-react';
import { Product } from '../../types';
import { products } from '../../data/products';
import { useStore } from '../../store/useStore';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';

export const ProductShowcase: React.FC = () => {
  const { addToCart, searchQuery, filters } = useStore();
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = React.useState<'name' | 'price' | 'rating'>('name');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

  // Filter and search products
  const filteredProducts = React.useMemo(() => {
    let filtered = products;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'graphics-cards', name: 'Graphics Cards' },
    { id: 'processors', name: 'Processors' },
    { id: 'motherboards', name: 'Motherboards' },
    { id: 'ram', name: 'RAM' },
    { id: 'storage', name: 'Storage' },
    { id: 'cooling', name: 'Cooling' },
    { id: 'monitors', name: 'Monitors' },
    { id: 'peripherals', name: 'Peripherals' }
  ];

  return (
    <section id="products" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our Products
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our complete collection of premium PC components
          </p>
        </motion.div>

        {/* Filters and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <GlassCard className="p-6">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-primary-500 text-white shadow-lg'
                        : 'bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-gray-800/70'
                    }`}
                  >
                    {category.name}
                  </motion.button>
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'rating')}
                  className="px-3 py-2 bg-white/50 dark:bg-gray-800/50 border border-white/20 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price">Sort by Price</option>
                  <option value="rating">Sort by Rating</option>
                </select>

                {/* View Mode */}
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors duration-200 ${
                      viewMode === 'grid'
                        ? 'bg-primary-500 text-white'
                        : 'bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors duration-200 ${
                      viewMode === 'list'
                        ? 'bg-primary-500 text-white'
                        : 'bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          layout
          className={`grid gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1'
          }`}
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard
                product={product}
                viewMode={viewMode}
                onAddToCart={() => addToCart(product)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              No products found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode, onAddToCart }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  if (viewMode === 'list') {
    return (
      <GlassCard className="p-6">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {product.brand}
            </p>
            <div className="flex items-center space-x-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                ({product.reviews})
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {product.description}
            </p>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                ${product.price}
              </div>
              {product.originalPrice && (
                <div className="text-sm text-gray-500 line-through">
                  ${product.originalPrice}
                </div>
              )}
            </div>
            <Button
              onClick={onAddToCart}
              icon={ShoppingCart}
              size="sm"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </GlassCard>
    );
  }

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
      className="group"
    >
      <GlassCard className="p-6 h-full">
        <div className="relative">
          {/* Product Image */}
          <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden mb-4">
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Overlay Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 bg-black/50 flex items-center justify-center space-x-3"
            >
              <Button
                variant="outline"
                size="sm"
                icon={Eye}
                className="border-white text-white hover:bg-white hover:text-gray-900"
              />
              <Button
                variant="outline"
                size="sm"
                icon={Heart}
                className="border-white text-white hover:bg-white hover:text-gray-900"
              />
            </motion.div>
          </div>

          {/* Sale Badge */}
          {product.originalPrice && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium"
            >
              Sale
            </motion.div>
          )}

          {/* Product Info */}
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg line-clamp-2">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {product.brand}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                ({product.reviews})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-1">
              {product.features.slice(0, 2).map((feature) => (
                <span
                  key={feature}
                  className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 text-xs rounded-full"
                >
                  {feature}
                </span>
              ))}
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={onAddToCart}
              icon={ShoppingCart}
              className="w-full"
              size="lg"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};