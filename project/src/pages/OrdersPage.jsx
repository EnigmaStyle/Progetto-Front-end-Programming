import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Package, Eye, ShoppingBag } from 'lucide-react';

const OrderStatusBadge = ({ status }) => {
  let classes = '';
  
  switch (status) {
    case 'pending':
      classes = 'bg-yellow-100 text-yellow-800';
      break;
    case 'processing':
      classes = 'bg-blue-100 text-blue-800';
      break;
    case 'shipped':
      classes = 'bg-purple-100 text-purple-800';
      break;
    case 'delivered':
      classes = 'bg-green-100 text-green-800';
      break;
    case 'cancelled':
      classes = 'bg-red-100 text-red-800';
      break;
    default:
      classes = 'bg-gray-100 text-gray-800';
  }
  
  return (
    <span className={`${classes} inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize`}>
      {status}
    </span>
  );
};

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      
      try {
        const response = await fetch(`http://localhost:3001/orders?userId=${user.id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        
        const data = await response.json();
        
        // Sort orders by date (newest first)
        const sortedOrders = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setOrders(sortedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [user]);
  
  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>
        
        {loading ? (
          <div className="bg-white rounded-lg shadow-soft p-8 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
            
            {[1, 2, 3].map(i => (
              <div key={i} className="border-b border-gray-200 pb-6 mb-6">
                <div className="flex flex-wrap justify-between mb-4">
                  <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/5"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : orders.length > 0 ? (
          <div className="bg-white rounded-lg shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600">
                        #{order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {formatDate(order.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <OrderStatusBadge status={order.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {order.products.reduce((total, product) => total + product.quantity, 0)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => viewOrderDetails(order)}
                          className="text-primary-600 hover:text-primary-900 flex items-center justify-end w-full"
                        >
                          <Eye size={16} className="mr-1" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-soft p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
              <Package size={32} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">No Orders Yet</h2>
            <p className="text-gray-600 mb-6">
              You haven't placed any orders yet. Start shopping to get started!
            </p>
            <Link to="/products" className="btn-primary inline-flex items-center">
              <ShoppingBag size={16} className="mr-2" />
              Shop Now
            </Link>
          </div>
        )}
      </div>
      
      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="order-details-modal" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
              aria-hidden="true"
              onClick={closeModal}
            ></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full lg:max-w-2xl">
              <div className="bg-white p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold leading-6 text-gray-900">
                      Order #{selectedOrder.id}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Placed on {formatDate(selectedOrder.date)}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={closeModal}
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="border-t border-b border-gray-200 py-4 my-4">
                  <div className="flex justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Order Status</p>
                      <OrderStatusBadge status={selectedOrder.status} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Payment Method</p>
                      <p className="text-sm">{selectedOrder.paymentMethod}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Shipping Address</p>
                    <p className="text-sm">{selectedOrder.address}</p>
                  </div>
                </div>
                
                <div className="my-6">
                  <h4 className="text-base font-semibold mb-3">Order Items</h4>
                  <div className="max-h-48 overflow-y-auto">
                    <div className="divide-y divide-gray-200">
                      {selectedOrder.products.map((item) => (
                        <div key={item.productId} className="py-3 flex items-center">
                          <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                            <Package size={20} className="text-gray-500" />
                          </div>
                          <div className="ml-4 flex-grow">
                            <p className="text-sm font-medium">ID: {item.productId}</p>
                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                            <p className="text-xs text-gray-500">${item.price.toFixed(2)} each</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between my-2">
                    <span className="text-sm text-gray-500">Subtotal</span>
                    <span className="text-sm">
                      ${(selectedOrder.total * 0.91).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between my-2">
                    <span className="text-sm text-gray-500">Tax (10%)</span>
                    <span className="text-sm">
                      ${(selectedOrder.total * 0.09).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between font-medium text-base mt-4">
                    <span>Total</span>
                    <span>${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="btn-secondary flex items-center"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;