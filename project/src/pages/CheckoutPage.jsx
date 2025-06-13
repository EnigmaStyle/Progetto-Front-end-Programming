import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { CreditCard, Truck, Check } from 'lucide-react';

const CheckoutPage = () => {
  const { user } = useAuth();
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: user?.address || '',
    phone: user?.phone || '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'credit-card',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  
  if (items.length === 0) {
    navigate('/cart');
    return null;
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formatted.length <= 19) { // 16 digits + 3 spaces
        setFormData({
          ...formData,
          [name]: formatted
        });
      }
      return;
    }
    
    // Format card expiry with slash
    if (name === 'cardExpiry') {
      let formatted = value.replace(/\D/g, '');
      if (formatted.length > 2) {
        formatted = `${formatted.slice(0, 2)}/${formatted.slice(2, 4)}`;
      }
      if (formatted.length <= 5) { // MM/YY format
        setFormData({
          ...formData,
          [name]: formatted
        });
      }
      return;
    }
    
    // For all other fields
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const validateForm = () => {
    const errors = {};
    
    // Required fields
    ['name', 'email', 'address', 'city', 'state', 'zipCode', 'phone'].forEach(field => {
      if (!formData[field]?.trim()) {
        errors[field] = 'This field is required';
      }
    });
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Credit card validation if payment method is credit card
    if (formData.paymentMethod === 'credit-card') {
      if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length !== 16) {
        errors.cardNumber = 'Please enter a valid 16-digit card number';
      }
      
      if (!formData.cardExpiry || formData.cardExpiry.length !== 5) {
        errors.cardExpiry = 'Please enter a valid expiration date (MM/YY)';
      }
      
      if (!formData.cardCVC || formData.cardCVC.length < 3 || formData.cardCVC.length > 4) {
        errors.cardCVC = 'Please enter a valid CVC/CVV code (3-4 digits)';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Create the order
      const orderData = {
        userId: user.id,
        products: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        })),
        total: total + (total * 0.1), // Subtotal + tax
        status: 'pending',
        date: new Date().toISOString(),
        address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
        paymentMethod: formData.paymentMethod === 'credit-card' ? 'Credit Card' : 'PayPal'
      };
      
      // Submit order to API
      const response = await fetch('http://localhost:3001/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create order');
      }
      
      // Clear the cart after successful order
      clearCart();
      
      // Navigate to order confirmation page
      const orderResult = await response.json();
      navigate(`/order-confirmation/${orderResult.id}`);
    } catch (error) {
      console.error('Checkout error:', error);
      // Show error message to user
      alert('There was an error processing your order. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-5 gap-8">
          {/* Delivery Information */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-lg shadow-soft overflow-hidden">
              <div className="border-b border-gray-200 p-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <Truck size={20} className="mr-3 text-primary-600" />
                  Delivery Information
                </h2>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`input-field ${formErrors.name ? 'border-error-500 ring-1 ring-error-500' : ''}`}
                    />
                    {formErrors.name && <p className="text-error-600 text-sm mt-1">{formErrors.name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`input-field ${formErrors.email ? 'border-error-500 ring-1 ring-error-500' : ''}`}
                    />
                    {formErrors.email && <p className="text-error-600 text-sm mt-1">{formErrors.email}</p>}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Address*
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`input-field ${formErrors.address ? 'border-error-500 ring-1 ring-error-500' : ''}`}
                  />
                  {formErrors.address && <p className="text-error-600 text-sm mt-1">{formErrors.address}</p>}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="col-span-2">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                      City*
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`input-field ${formErrors.city ? 'border-error-500 ring-1 ring-error-500' : ''}`}
                    />
                    {formErrors.city && <p className="text-error-600 text-sm mt-1">{formErrors.city}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                      State*
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`input-field ${formErrors.state ? 'border-error-500 ring-1 ring-error-500' : ''}`}
                    />
                    {formErrors.state && <p className="text-error-600 text-sm mt-1">{formErrors.state}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code*
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className={`input-field ${formErrors.zipCode ? 'border-error-500 ring-1 ring-error-500' : ''}`}
                    />
                    {formErrors.zipCode && <p className="text-error-600 text-sm mt-1">{formErrors.zipCode}</p>}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`input-field ${formErrors.phone ? 'border-error-500 ring-1 ring-error-500' : ''}`}
                  />
                  {formErrors.phone && <p className="text-error-600 text-sm mt-1">{formErrors.phone}</p>}
                </div>
              </div>
            </div>
            
            {/* Payment Information */}
            <div className="bg-white rounded-lg shadow-soft overflow-hidden">
              <div className="border-b border-gray-200 p-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <CreditCard size={20} className="mr-3 text-primary-600" />
                  Payment Method
                </h2>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="credit-card"
                      name="paymentMethod"
                      value="credit-card"
                      checked={formData.paymentMethod === 'credit-card'}
                      onChange={handleChange}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="credit-card" className="ml-3 flex items-center">
                      <span className="font-medium mr-2">Credit Card</span>
                      <div className="flex space-x-1">
                        <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs">Visa</div>
                        <div className="w-10 h-6 bg-red-600 rounded flex items-center justify-center text-white text-xs">MC</div>
                      </div>
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="paypal"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={handleChange}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="paypal" className="ml-3 flex items-center">
                      <span className="font-medium mr-2">PayPal</span>
                      <div className="w-14 h-6 bg-blue-800 rounded flex items-center justify-center text-white text-xs font-bold">PayPal</div>
                    </label>
                  </div>
                </div>
                
                {formData.paymentMethod === 'credit-card' && (
                  <div className="pt-4 space-y-4">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number*
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        className={`input-field ${formErrors.cardNumber ? 'border-error-500 ring-1 ring-error-500' : ''}`}
                      />
                      {formErrors.cardNumber && <p className="text-error-600 text-sm mt-1">{formErrors.cardNumber}</p>}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date*
                        </label>
                        <input
                          type="text"
                          id="cardExpiry"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleChange}
                          placeholder="MM/YY"
                          className={`input-field ${formErrors.cardExpiry ? 'border-error-500 ring-1 ring-error-500' : ''}`}
                        />
                        {formErrors.cardExpiry && <p className="text-error-600 text-sm mt-1">{formErrors.cardExpiry}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="cardCVC" className="block text-sm font-medium text-gray-700 mb-2">
                          CVC/CVV*
                        </label>
                        <input
                          type="text"
                          id="cardCVC"
                          name="cardCVC"
                          value={formData.cardCVC}
                          onChange={handleChange}
                          placeholder="123"
                          maxLength={4}
                          className={`input-field ${formErrors.cardCVC ? 'border-error-500 ring-1 ring-error-500' : ''}`}
                        />
                        {formErrors.cardCVC && <p className="text-error-600 text-sm mt-1">{formErrors.cardCVC}</p>}
                      </div>
                    </div>
                  </div>
                )}
                
                {formData.paymentMethod === 'paypal' && (
                  <div className="pt-4">
                    <p className="text-gray-600">
                      You will be redirected to PayPal to complete your payment securely.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-soft sticky top-6">
              <div className="border-b border-gray-200 p-6">
                <h2 className="text-xl font-semibold">Order Summary</h2>
              </div>
              
              <div className="p-6">
                <div className="max-h-80 overflow-y-auto mb-6">
                  {items.map((item) => (
                    <div key={item.productId} className="flex py-3 border-b border-gray-100">
                      <div className="h-16 w-16 flex-shrink-0 rounded overflow-hidden">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-4 flex-grow">
                        <h3 className="text-sm font-medium">{item.product.name}</h3>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3 pt-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (10%)</span>
                    <span>${(total * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-800">Total</span>
                      <span className="text-lg">${(total + (total * 0.1)).toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Including taxes and shipping</p>
                  </div>
                </div>
                
                <button 
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Check size={18} className="mr-2" />
                      Place Order
                    </span>
                  )}
                </button>
                
                <p className="text-xs text-gray-500 text-center mt-4">
                  By placing your order, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;