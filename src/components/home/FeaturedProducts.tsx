import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Eye, Heart } from 'lucide-react';
import { Product } from '../../types';
import { getFeaturedProducts } from '../../data/products';
import { useStore } from '../../store/useStore';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';

export const FeaturedProducts: React.FC = () => {
  const { addToCart } = useStore();
  const featuredProducts = getFeaturedProducts();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our handpicked selection of premium PC components at special prices
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              variants={cardVariants}
              onAddToCart={() => addToCart(product)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

interface ProductCardProps {
  product: Product;
  variants: any;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, variants, onAddToCart }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      variants={variants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <GlassCard className="p-6 h-full group cursor-pointer">
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