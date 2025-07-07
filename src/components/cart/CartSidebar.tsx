import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2, CreditCard } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/Button';
import { GlassCard } from '../ui/GlassCard';
import { CheckoutModal } from '../checkout/CheckoutModal';

export const CartSidebar: React.FC = () => {
  const {
    isCartOpen,
    setCartOpen,
    cart,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    getTotalItems
  } = useStore();

  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const shipping = totalPrice > 100 ? 0 : 15.99;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + shipping + tax;

  const handleCheckout = () => {
    setCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Cart Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ShoppingBag className="w-6 h-6 text-primary-500" />
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Shopping Cart
                      </h2>
                      {totalItems > 0 && (
                        <span className="bg-primary-500 text-white px-2 py-1 rounded-full text-sm">
                          {totalItems}
                        </span>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={X}
                      onClick={() => setCartOpen(false)}
                    />
                  </div>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6">
                  {cart.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400 mb-4">
                        Your cart is empty
                      </p>
                      <Button
                        onClick={() => setCartOpen(false)}
                        className="w-full"
                      >
                        Continue Shopping
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                        >
                          <GlassCard className="p-4" blur="sm">
                            <div className="flex items-center space-x-4">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-gray-900 dark:text-white truncate">
                                  {item.product.name}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {item.product.brand}
                                </p>
                                <p className="text-lg font-semibold text-primary-500">
                                  ${item.product.price.toFixed(2)}
                                </p>
                              </div>
                              <div className="flex flex-col items-end space-y-2">
                                <div className="flex items-center space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    icon={Minus}
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  />
                                  <span className="w-8 text-center font-medium">
                                    {item.quantity}
                                  </span>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    icon={Plus}
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  />
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  icon={Trash2}
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-red-500 hover:text-red-700"
                                />
                              </div>
                            </div>
                          </GlassCard>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                  <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="space-y-4">
                      {/* Order Summary */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                          <span className="font-medium">${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Shipping:</span>
                          <span className="font-medium">
                            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Tax:</span>
                          <span className="font-medium">${tax.toFixed(2)}</span>
                        </div>
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                          <div className="flex justify-between items-center text-lg font-semibold">
                            <span className="text-gray-900 dark:text-white">Total:</span>
                            <span className="text-primary-500">${finalTotal.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Free Shipping Notice */}
                      {totalPrice < 100 && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                          <p className="text-sm text-blue-700 dark:text-blue-300">
                            Add ${(100 - totalPrice).toFixed(2)} more for free shipping!
                          </p>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="space-y-3">
                        <Button 
                          className="w-full" 
                          size="lg"
                          icon={CreditCard}
                          onClick={handleCheckout}
                        >
                          Proceed to Checkout
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => setCartOpen(false)}
                        >
                          Continue Shopping
                        </Button>
                      </div>

                      {/* Security Notice */}
                      <div className="text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          🔒 Secure checkout with SSL encryption
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </>
  );
};