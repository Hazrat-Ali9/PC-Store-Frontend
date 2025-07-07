import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Package,
  Clock,
  Award
} from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../store/useStore';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';

interface ProductDetailsProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  isOpen,
  onClose
}) => {
  const { addToCart } = useStore();
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);
  const [selectedTab, setSelectedTab] = React.useState<'description' | 'specifications' | 'reviews'>('description');
  const [isWishlisted, setIsWishlisted] = React.useState(false);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`${quantity}x ${product.name} added to cart!`, {
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
        icon: isWishlisted ? '💔' : '❤️'
      }
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

  const mockReviews = [
    {
      id: 1,
      user: 'Alex Johnson',
      rating: 5,
      date: '2024-01-15',
      comment: 'Excellent product! Exceeded my expectations in every way.',
      verified: true
    },
    {
      id: 2,
      user: 'Sarah Chen',
      rating: 4,
      date: '2024-01-10',
      comment: 'Great quality and fast shipping. Would recommend.',
      verified: true
    },
    {
      id: 3,
      user: 'Mike Rodriguez',
      rating: 5,
      date: '2024-01-08',
      comment: 'Perfect for my gaming setup. Installation was easy.',
      verified: false
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-4 md:inset-8 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Product Details
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={X}
                  onClick={onClose}
                />
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
                  {/* Image Gallery */}
                  <div className="space-y-4">
                    {/* Main Image */}
                    <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                      <img
                        src={product.images[currentImageIndex]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Navigation Arrows */}
                      {product.images.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </>
                      )}

                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col space-y-2">
                        {!product.inStock && (
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            Out of Stock
                          </span>
                        )}
                        {discountPercentage > 0 && (
                          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            -{discountPercentage}% OFF
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Thumbnail Images */}
                    {product.images.length > 1 && (
                      <div className="flex space-x-2 overflow-x-auto">
                        {product.images.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                              index === currentImageIndex
                                ? 'border-primary-500'
                                : 'border-gray-200 dark:border-gray-700'
                            }`}
                          >
                            <img
                              src={image}
                              alt={`${product.name} ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="space-y-6">
                    {/* Basic Info */}
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {product.name}
                      </h1>
                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                        by {product.brand}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(product.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-gray-600 dark:text-gray-400">
                          {product.rating} ({product.reviews} reviews)
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center space-x-4 mb-6">
                        <span className="text-4xl font-bold text-gray-900 dark:text-white">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-2xl text-gray-500 line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                        {discountPercentage > 0 && (
                          <span className="text-lg text-green-600 font-medium">
                            Save ${(product.originalPrice! - product.price).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Key Features
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {product.features.map((feature) => (
                          <span
                            key={feature}
                            className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 text-sm rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Quantity and Actions */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-700 dark:text-gray-300">Quantity:</span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-medium">{quantity}</span>
                          <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <Button
                          onClick={handleAddToCart}
                          icon={ShoppingCart}
                          className="flex-1"
                          size="lg"
                          disabled={!product.inStock}
                        >
                          Add to Cart - ${(product.price * quantity).toFixed(2)}
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          icon={Heart}
                          onClick={handleWishlist}
                          className={isWishlisted ? 'text-red-500 border-red-500' : ''}
                        />
                        <Button
                          variant="outline"
                          size="lg"
                          icon={Share2}
                        />
                      </div>
                    </div>

                    {/* Shipping Info */}
                    <GlassCard className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Truck className="w-5 h-5 text-green-500" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              Free Shipping
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Estimated delivery: {estimatedDelivery.toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Shield className="w-5 h-5 text-blue-500" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              2-Year Warranty
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Manufacturer warranty included
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RotateCcw className="w-5 h-5 text-orange-500" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              30-Day Returns
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Easy returns and exchanges
                            </p>
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                </div>

                {/* Tabs Section */}
                <div className="border-t border-gray-200 dark:border-gray-700">
                  <div className="px-6">
                    {/* Tab Navigation */}
                    <div className="flex space-x-8 border-b border-gray-200 dark:border-gray-700">
                      {[
                        { id: 'description', label: 'Description' },
                        { id: 'specifications', label: 'Specifications' },
                        { id: 'reviews', label: 'Reviews' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setSelectedTab(tab.id as any)}
                          className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                            selectedTab === tab.id
                              ? 'border-primary-500 text-primary-500'
                              : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Tab Content */}
                    <div className="py-6">
                      {selectedTab === 'description' && (
                        <div className="prose dark:prose-invert max-w-none">
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            {product.description}
                          </p>
                          <div className="mt-6">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                              What's in the Box
                            </h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                              <li>1x {product.name}</li>
                              <li>Installation Guide</li>
                              <li>Warranty Card</li>
                              <li>Required Cables and Accessories</li>
                            </ul>
                          </div>
                        </div>
                      )}

                      {selectedTab === 'specifications' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Object.entries(product.specifications).map(([key, value]) => (
                            <div
                              key={key}
                              className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700"
                            >
                              <span className="font-medium text-gray-900 dark:text-white">
                                {key}
                              </span>
                              <span className="text-gray-600 dark:text-gray-400">
                                {value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {selectedTab === 'reviews' && (
                        <div className="space-y-6">
                          {/* Review Summary */}
                          <div className="flex items-center space-x-8">
                            <div className="text-center">
                              <div className="text-4xl font-bold text-gray-900 dark:text-white">
                                {product.rating}
                              </div>
                              <div className="flex items-center justify-center mb-1">
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
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {product.reviews} reviews
                              </div>
                            </div>
                            <div className="flex-1">
                              {[5, 4, 3, 2, 1].map((stars) => (
                                <div key={stars} className="flex items-center space-x-2 mb-1">
                                  <span className="text-sm w-8">{stars}★</span>
                                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div
                                      className="bg-yellow-400 h-2 rounded-full"
                                      style={{
                                        width: `${Math.random() * 80 + 10}%`
                                      }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Individual Reviews */}
                          <div className="space-y-4">
                            {mockReviews.map((review) => (
                              <GlassCard key={review.id} className="p-4">
                                <div className="flex items-start space-x-4">
                                  <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-medium">
                                    {review.user.charAt(0)}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <span className="font-medium text-gray-900 dark:text-white">
                                        {review.user}
                                      </span>
                                      {review.verified && (
                                        <div className="flex items-center space-x-1">
                                          <Award className="w-4 h-4 text-green-500" />
                                          <span className="text-xs text-green-600">
                                            Verified Purchase
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                    <div className="flex items-center space-x-2 mb-2">
                                      <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                          <Star
                                            key={i}
                                            className={`w-4 h-4 ${
                                              i < review.rating
                                                ? 'text-yellow-400 fill-current'
                                                : 'text-gray-300'
                                            }`}
                                          />
                                        ))}
                                      </div>
                                      <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {new Date(review.date).toLocaleDateString()}
                                      </span>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400">
                                      {review.comment}
                                    </p>
                                  </div>
                                </div>
                              </GlassCard>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};