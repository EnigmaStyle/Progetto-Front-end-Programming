import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom">
          <div className="bg-white rounded-lg shadow-soft p-8 text-center max-w-lg mx-auto">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={32} className="text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Il Tuo Carrello è Vuoto</h1>
            <p className="text-gray-600 mb-6">
              Sembra che non hai ancora aggiunto prodotti al tuo carrello.
            </p>
            <Link to="/products" className="btn-primary">
              Inizia lo Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-6">Carrello</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-soft overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Articoli ({items.length})</h2>
                  <button 
                    onClick={clearCart}
                    className="text-sm text-gray-600 hover:text-error-600 transition"
                  >
                    Svuota Carrello
                  </button>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <div key={item.productId} className="py-4 flex flex-col sm:flex-row">
                      <div className="sm:w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden mb-4 sm:mb-0">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      
                      <div className="sm:ml-6 flex-grow">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-base font-medium">
                              <Link 
                                to={`/product/${item.productId}`} 
                                className="hover:text-primary-600 transition"
                              >
                                {item.product.name}
                              </Link>
                            </h3>
                            <p className="text-sm text-gray-500 capitalize">
                              {item.product.category}
                            </p>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.productId)}
                            className="text-gray-400 hover:text-error-600 transition"
                          >
                            <X size={18} />
                          </button>
                        </div>
                        
                        <div className="mt-4 flex justify-between items-center">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button 
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="p-2 text-gray-600 hover:text-gray-800"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-10 text-center text-sm">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="p-2 text-gray-600 hover:text-gray-800"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-sm text-gray-500">
                              €{item.price.toFixed(2)} × {item.quantity}
                            </p>
                            <p className="font-semibold">
                              €{(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-soft overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Riepilogo Ordine</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotale</span>
                    <span>€{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Spedizione</span>
                    <span>Gratuita</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">IVA</span>
                    <span>€{(total * 0.22).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between font-semibold">
                      <span>Totale</span>
                      <span className="text-lg">€{(total + (total * 0.22)).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <Link 
                  to="/checkout" 
                  className="btn-primary w-full block text-center"
                >
                  Procedi al Checkout
                </Link>
                
                <Link 
                  to="/products" 
                  className="mt-4 btn-secondary w-full block text-center"
                >
                  Continua lo Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;