import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Eye, Heart, Package, TrendingUp } from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../store/useStore';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
  onViewDetails?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  viewMode = 'grid',
  onViewDetails 
}) => {
  const { addToCart } = useStore();
  const [isHovered, setIsHovered] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [isWishlisted, setIsWishlisted] = React.useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      icon: '🛒',
      style: {
        background: 'rgba(16, 185, 129, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(16, 185, 129, 0.2)',
        color: '#065f46'
      }
    });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(
      isWishlisted ? 'Removed from wishlist' : 'Added to wishlist!',
      {
        icon: isWishlisted ? '💔' : '❤️',
        style: {
          background: 'rgba(239, 68, 68, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          color: '#991b1b'
        }
      }
    );
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const viewersCount = Math.floor(Math.random() * 50) + 10;

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        className="w-full"
      >
        <GlassCard className="p-6">
          <div className="flex items-center space-x-6">
            {/* Product Image */}
            <div className="w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0 relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">Out of Stock</span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {product.brand}
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-2 mb-2">
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
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.features.slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 text-xs rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Social Proof */}
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{viewersCount} viewing</span>
                    </div>
                    {product.inStock && (
                      <div className="flex items-center space-x-1">
                        <Package className="w-3 h-3" />
                        <span>In Stock</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="flex flex-col items-end space-y-3 ml-4">
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${product.price.toFixed(2)}
                      </div>
                      {product.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </div>
                      )}
                    </div>
                    {discountPercentage > 0 && (
                      <div className="text-sm text-green-600 font-medium">
                        Save {discountPercentage}%
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={Heart}
                      onClick={handleWishlist}
                      className={isWishlisted ? 'text-red-500' : ''}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      icon={Eye}
                      onClick={() => onViewDetails?.(product)}
                    >
                      View
                    </Button>
                    <Button
                      onClick={handleAddToCart}
                      icon={ShoppingCart}
                      size="sm"
                      disabled={!product.inStock}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group h-full"
    >
      <GlassCard className="p-6 h-full flex flex-col">
        <div className="relative">
          {/* Product Image */}
          <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden mb-4 relative">
            <motion.img
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Image Navigation Dots */}
            {product.images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentImageIndex
                        ? 'bg-white scale-125'
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            )}
            
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
                onClick={() => onViewDetails?.(product)}
                className="border-white text-white hover:bg-white hover:text-gray-900"
              />
              <Button
                variant="outline"
                size="sm"
                icon={Heart}
                onClick={handleWishlist}
                className={`border-white hover:bg-white hover:text-gray-900 ${
                  isWishlisted ? 'text-red-500 border-red-500' : 'text-white'
                }`}
              />
            </motion.div>

            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col space-y-1">
              {!product.inStock && (
                <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  Out of Stock
                </span>
              )}
              {discountPercentage > 0 && (
                <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  -{discountPercentage}%
                </span>
              )}
            </div>

            {/* Trending Badge */}
            {product.rating > 4.5 && (
              <div className="absolute top-2 right-2">
                <div className="bg-orange-500 text-white p-1 rounded-full">
                  <TrendingUp className="w-3 h-3" />
                </div>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-3 flex-1 flex flex-col">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg line-clamp-2 mb-1">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {product.brand}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
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
                {product.rating} ({product.reviews})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
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

            {/* Social Proof */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>{viewersCount} viewing</span>
              </div>
              {product.inStock && (
                <div className="flex items-center space-x-1">
                  <Package className="w-3 h-3 text-green-500" />
                  <span className="text-green-600">In Stock</span>
                </div>
              )}
            </div>

            {/* Add to Cart Button */}
            <div className="mt-auto pt-3">
              <Button
                onClick={handleAddToCart}
                icon={ShoppingCart}
                className="w-full"
                size="lg"
                disabled={!product.inStock}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};