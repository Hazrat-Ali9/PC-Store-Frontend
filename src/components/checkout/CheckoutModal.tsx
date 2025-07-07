import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  CreditCard, 
  Truck, 
  Shield, 
  MapPin, 
  User, 
  Mail, 
  Phone,
  Lock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cart, getTotalPrice, clearCart } = useStore();
  const [currentStep, setCurrentStep] = React.useState(1);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [orderComplete, setOrderComplete] = React.useState(false);

  const [shippingInfo, setShippingInfo] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  const [paymentInfo, setPaymentInfo] = React.useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    paymentMethod: 'card'
  });

  const subtotal = getTotalPrice();
  const shipping = subtotal > 100 ? 0 : 15.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const steps = [
    { id: 1, title: 'Shipping', icon: Truck },
    { id: 2, title: 'Payment', icon: CreditCard },
    { id: 3, title: 'Review', icon: CheckCircle }
  ];

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateShippingInfo()) {
      setCurrentStep(2);
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePaymentInfo()) {
      setCurrentStep(3);
    }
  };

  const handleOrderSubmit = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    setOrderComplete(true);
    clearCart();
    
    toast.success('Order placed successfully!', {
      icon: '🎉',
      duration: 5000
    });
  };

  const validateShippingInfo = () => {
    const required = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zipCode'];
    return required.every(field => shippingInfo[field as keyof typeof shippingInfo]);
  };

  const validatePaymentInfo = () => {
    return paymentInfo.cardNumber && paymentInfo.expiryDate && paymentInfo.cvv && paymentInfo.cardholderName;
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const getCardType = (number: string) => {
    const num = number.replace(/\s/g, '');
    if (/^4/.test(num)) return 'Visa';
    if (/^5[1-5]/.test(num)) return 'Mastercard';
    if (/^3[47]/.test(num)) return 'American Express';
    return 'Card';
  };

  if (orderComplete) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-4 md:inset-8 lg:inset-16 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6"
                >
                  <CheckCircle className="w-12 h-12 text-white" />
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Order Confirmed!
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                  Thank you for your purchase. Your order has been confirmed and will be shipped soon.
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Order Number</p>
                  <p className="text-lg font-mono font-bold text-gray-900 dark:text-white">
                    #PC{Date.now().toString().slice(-6)}
                  </p>
                </div>
                <Button onClick={onClose} size="lg">
                  Continue Shopping
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
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
                  Checkout
                </h2>
                <Button variant="ghost" size="sm" icon={X} onClick={onClose} />
              </div>

              {/* Progress Steps */}
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => {
                    const IconComponent = step.icon;
                    const isActive = currentStep === step.id;
                    const isCompleted = currentStep > step.id;
                    
                    return (
                      <div key={step.id} className="flex items-center">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                          isCompleted 
                            ? 'bg-green-500 border-green-500 text-white'
                            : isActive
                            ? 'border-primary-500 text-primary-500'
                            : 'border-gray-300 text-gray-400'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <IconComponent className="w-5 h-5" />
                          )}
                        </div>
                        <span className={`ml-2 font-medium ${
                          isActive ? 'text-primary-500' : 'text-gray-500'
                        }`}>
                          {step.title}
                        </span>
                        {index < steps.length - 1 && (
                          <div className={`w-16 h-0.5 mx-4 ${
                            isCompleted ? 'bg-green-500' : 'bg-gray-300'
                          }`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
                  {/* Main Content */}
                  <div className="lg:col-span-2">
                    {/* Step 1: Shipping Information */}
                    {currentStep === 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                          Shipping Information
                        </h3>
                        <form onSubmit={handleShippingSubmit} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                First Name *
                              </label>
                              <input
                                type="text"
                                required
                                value={shippingInfo.firstName}
                                onChange={(e) => setShippingInfo(prev => ({ ...prev, firstName: e.target.value }))}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Last Name *
                              </label>
                              <input
                                type="text"
                                required
                                value={shippingInfo.lastName}
                                onChange={(e) => setShippingInfo(prev => ({ ...prev, lastName: e.target.value }))}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              required
                              value={shippingInfo.email}
                              onChange={(e) => setShippingInfo(prev => ({ ...prev, email: e.target.value }))}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              value={shippingInfo.phone}
                              onChange={(e) => setShippingInfo(prev => ({ ...prev, phone: e.target.value }))}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Address *
                            </label>
                            <input
                              type="text"
                              required
                              value={shippingInfo.address}
                              onChange={(e) => setShippingInfo(prev => ({ ...prev, address: e.target.value }))}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                City *
                              </label>
                              <input
                                type="text"
                                required
                                value={shippingInfo.city}
                                onChange={(e) => setShippingInfo(prev => ({ ...prev, city: e.target.value }))}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                State *
                              </label>
                              <input
                                type="text"
                                required
                                value={shippingInfo.state}
                                onChange={(e) => setShippingInfo(prev => ({ ...prev, state: e.target.value }))}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                ZIP Code *
                              </label>
                              <input
                                type="text"
                                required
                                value={shippingInfo.zipCode}
                                onChange={(e) => setShippingInfo(prev => ({ ...prev, zipCode: e.target.value }))}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                              />
                            </div>
                          </div>

                          <Button type="submit" size="lg" className="w-full">
                            Continue to Payment
                          </Button>
                        </form>
                      </motion.div>
                    )}

                    {/* Step 2: Payment Information */}
                    {currentStep === 2 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                          Payment Information
                        </h3>
                        
                        {/* Payment Methods */}
                        <div className="mb-6">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                              { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
                              { id: 'paypal', label: 'PayPal', icon: Shield },
                              { id: 'apple', label: 'Apple Pay', icon: Lock }
                            ].map((method) => {
                              const IconComponent = method.icon;
                              return (
                                <button
                                  key={method.id}
                                  onClick={() => setPaymentInfo(prev => ({ ...prev, paymentMethod: method.id }))}
                                  className={`p-4 border-2 rounded-lg flex items-center space-x-3 transition-colors ${
                                    paymentInfo.paymentMethod === method.id
                                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                                  }`}
                                >
                                  <IconComponent className="w-5 h-5" />
                                  <span className="font-medium">{method.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {paymentInfo.paymentMethod === 'card' && (
                          <form onSubmit={handlePaymentSubmit} className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Card Number *
                              </label>
                              <div className="relative">
                                <input
                                  type="text"
                                  required
                                  placeholder="1234 5678 9012 3456"
                                  value={paymentInfo.cardNumber}
                                  onChange={(e) => setPaymentInfo(prev => ({ 
                                    ...prev, 
                                    cardNumber: formatCardNumber(e.target.value) 
                                  }))}
                                  maxLength={19}
                                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                                  {getCardType(paymentInfo.cardNumber)}
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  Expiry Date *
                                </label>
                                <input
                                  type="text"
                                  required
                                  placeholder="MM/YY"
                                  value={paymentInfo.expiryDate}
                                  onChange={(e) => {
                                    let value = e.target.value.replace(/\D/g, '');
                                    if (value.length >= 2) {
                                      value = value.substring(0, 2) + '/' + value.substring(2, 4);
                                    }
                                    setPaymentInfo(prev => ({ ...prev, expiryDate: value }));
                                  }}
                                  maxLength={5}
                                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  CVV *
                                </label>
                                <input
                                  type="text"
                                  required
                                  placeholder="123"
                                  value={paymentInfo.cvv}
                                  onChange={(e) => setPaymentInfo(prev => ({ 
                                    ...prev, 
                                    cvv: e.target.value.replace(/\D/g, '').substring(0, 4) 
                                  }))}
                                  maxLength={4}
                                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Cardholder Name *
                              </label>
                              <input
                                type="text"
                                required
                                value={paymentInfo.cardholderName}
                                onChange={(e) => setPaymentInfo(prev => ({ ...prev, cardholderName: e.target.value }))}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                              />
                            </div>

                            <div className="flex space-x-4">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setCurrentStep(1)}
                                className="flex-1"
                              >
                                Back
                              </Button>
                              <Button type="submit" className="flex-1">
                                Review Order
                              </Button>
                            </div>
                          </form>
                        )}

                        {paymentInfo.paymentMethod !== 'card' && (
                          <div className="text-center py-8">
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                              You will be redirected to {paymentInfo.paymentMethod === 'paypal' ? 'PayPal' : 'Apple Pay'} to complete your payment.
                            </p>
                            <div className="flex space-x-4">
                              <Button
                                variant="outline"
                                onClick={() => setCurrentStep(1)}
                                className="flex-1"
                              >
                                Back
                              </Button>
                              <Button onClick={() => setCurrentStep(3)} className="flex-1">
                                Continue
                              </Button>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* Step 3: Review Order */}
                    {currentStep === 3 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                          Review Your Order
                        </h3>
                        
                        <div className="space-y-6">
                          {/* Shipping Address */}
                          <GlassCard className="p-4">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                              <MapPin className="w-5 h-5 mr-2" />
                              Shipping Address
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">
                              {shippingInfo.firstName} {shippingInfo.lastName}<br />
                              {shippingInfo.address}<br />
                              {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                            </p>
                          </GlassCard>

                          {/* Payment Method */}
                          <GlassCard className="p-4">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                              <CreditCard className="w-5 h-5 mr-2" />
                              Payment Method
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">
                              {paymentInfo.paymentMethod === 'card' 
                                ? `${getCardType(paymentInfo.cardNumber)} ending in ${paymentInfo.cardNumber.slice(-4)}`
                                : paymentInfo.paymentMethod === 'paypal' 
                                ? 'PayPal'
                                : 'Apple Pay'
                              }
                            </p>
                          </GlassCard>

                          {/* Order Items */}
                          <GlassCard className="p-4">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                              Order Items
                            </h4>
                            <div className="space-y-3">
                              {cart.map((item) => (
                                <div key={item.id} className="flex items-center space-x-4">
                                  <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="w-16 h-16 object-cover rounded-lg"
                                  />
                                  <div className="flex-1">
                                    <h5 className="font-medium text-gray-900 dark:text-white">
                                      {item.product.name}
                                    </h5>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                      Quantity: {item.quantity}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-medium text-gray-900 dark:text-white">
                                      ${(item.product.price * item.quantity).toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </GlassCard>

                          <div className="flex space-x-4">
                            <Button
                              variant="outline"
                              onClick={() => setCurrentStep(2)}
                              className="flex-1"
                            >
                              Back
                            </Button>
                            <Button
                              onClick={handleOrderSubmit}
                              isLoading={isProcessing}
                              className="flex-1"
                              size="lg"
                            >
                              {isProcessing ? 'Processing...' : `Place Order - $${total.toFixed(2)}`}
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Order Summary */}
                  <div className="lg:col-span-1">
                    <GlassCard className="p-6 sticky top-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Order Summary
                      </h3>
                      
                      <div className="space-y-3 mb-4">
                        {cart.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">
                              {item.product.name} × {item.quantity}
                            </span>
                            <span className="font-medium">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Subtotal</span>
                          <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Shipping</span>
                          <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Tax</span>
                          <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                          <div className="flex justify-between font-semibold text-lg">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Security Badges */}
                      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <Shield className="w-4 h-4" />
                          <span>Secure SSL Encryption</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mt-2">
                          <Lock className="w-4 h-4" />
                          <span>256-bit Security</span>
                        </div>
                      </div>
                    </GlassCard>
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