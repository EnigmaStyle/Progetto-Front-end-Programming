import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, Check, X, Eye } from 'lucide-react';

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
    <span className={`${classes} px-2 py-1 rounded-full text-xs font-medium capitalize`}>
      {status}
    </span>
  );
};

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editingStatus, setEditingStatus] = useState('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch orders
        const ordersResponse = await fetch('http://localhost:3001/orders');
        const ordersData = await ordersResponse.json();
        setOrders(ordersData);
        
        // Fetch users
        const usersResponse = await fetch('http://localhost:3001/users');
        const usersData = await usersResponse.json();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Filtering, sorting, and pagination logic
  let filteredOrders = [...orders];
  
  // Apply search filter (by order ID or customer name)
  if (searchTerm) {
    const search = searchTerm.toLowerCase();
    filteredOrders = filteredOrders.filter(order => {
      const user = users.find(u => u.id === order.userId);
      return (
        order.id.toString().includes(search) ||
        (user && user.name.toLowerCase().includes(search))
      );
    });
  }
  
  // Apply status filter
  if (filterStatus) {
    filteredOrders = filteredOrders.filter(order => order.status === filterStatus);
  }
  
  // Apply sorting
  filteredOrders.sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    // Special case for date field
    if (sortField === 'date') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
  
  // Get current items for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };
  
  const handleCloseModal = () => {
    setSelectedOrder(null);
  };
  
  const handleEditStatus = (orderId, currentStatus) => {
    setEditingOrderId(orderId);
    setEditingStatus(currentStatus);
  };
  
  const handleCancelEdit = () => {
    setEditingOrderId(null);
    setEditingStatus('');
  };
  
  const handleStatusChange = (e) => {
    setEditingStatus(e.target.value);
  };
  
  const handleSaveStatus = async () => {
    try {
      const orderToUpdate = orders.find(order => order.id === editingOrderId);
      
      if (!orderToUpdate) {
        throw new Error('Order not found');
      }
      
      const response = await fetch(`http://localhost:3001/orders/${editingOrderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: editingStatus
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update order status');
      }
      
      const updatedOrder = await response.json();
      
      // Update local state
      setOrders(orders.map(order => 
        order.id === updatedOrder.id ? updatedOrder : order
      ));
      
      // If the currently viewed order is the one being updated, update it too
      if (selectedOrder && selectedOrder.id === updatedOrder.id) {
        setSelectedOrder(updatedOrder);
      }
      
      // Reset editing state
      setEditingOrderId(null);
      setEditingStatus('');
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Error updating order status. Please try again.');
    }
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const getUserName = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : `User #${userId}`;
  };
  
  // Handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Order Management</h1>
          <Link to="/admin" className="btn-secondary">
            Back to Dashboard
          </Link>
        </div>
        
        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-soft mb-8 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by ID or customer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10 pr-4 py-2"
                />
                <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
              
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="input-field pl-10 pr-4 py-2 appearance-none"
                >
                  <option value="">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <Filter size={18} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <span>{filteredOrders.length} orders found</span>
            </div>
          </div>
        </div>
        
        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-soft overflow-hidden">
          {loading ? (
            <div className="p-6 animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="grid grid-cols-5 gap-4">
                    <div className="h-6 bg-gray-200 rounded col-span-1"></div>
                    <div className="h-6 bg-gray-200 rounded col-span-1"></div>
                    <div className="h-6 bg-gray-200 rounded col-span-1"></div>
                    <div className="h-6 bg-gray-200 rounded col-span-1"></div>
                    <div className="h-6 bg-gray-200 rounded col-span-1"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('id')}
                    >
                      <div className="flex items-center">
                        Order ID
                        {sortField === 'id' && (
                          sortDirection === 'asc' ? 
                            <ArrowUp size={14} className="ml-1" /> : 
                            <ArrowDown size={14} className="ml-1" />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('date')}
                    >
                      <div className="flex items-center">
                        Order Date
                        {sortField === 'date' && (
                          sortDirection === 'asc' ? 
                            <ArrowUp size={14} className="ml-1" /> : 
                            <ArrowDown size={14} className="ml-1" />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('userId')}
                    >
                      <div className="flex items-center">
                        Customer
                        {sortField === 'userId' && (
                          sortDirection === 'asc' ? 
                            <ArrowUp size={14} className="ml-1" /> : 
                            <ArrowDown size={14} className="ml-1" />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('total')}
                    >
                      <div className="flex items-center">
                        Total
                        {sortField === 'total' && (
                          sortDirection === 'asc' ? 
                            <ArrowUp size={14} className="ml-1" /> : 
                            <ArrowDown size={14} className="ml-1" />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('status')}
                    >
                      <div className="flex items-center">
                        Status
                        {sortField === 'status' && (
                          sortDirection === 'asc' ? 
                            <ArrowUp size={14} className="ml-1" /> : 
                            <ArrowDown size={14} className="ml-1" />
                        )}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600">
                        #{order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {formatDate(order.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {getUserName(order.userId)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingOrderId === order.id ? (
                          <select
                            value={editingStatus}
                            onChange={handleStatusChange}
                            className="input-field py-1 px-2 text-sm"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        ) : (
                          <OrderStatusBadge status={order.status} />
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          {editingOrderId === order.id ? (
                            <>
                              <button
                                onClick={handleSaveStatus}
                                className="text-primary-600 hover:text-primary-900 flex items-center"
                              >
                                <Check size={16} className="mr-1" />
                                Save
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="text-gray-600 hover:text-gray-900 flex items-center"
                              >
                                <X size={16} className="mr-1" />
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEditStatus(order.id, order.status)}
                                className="text-primary-600 hover:text-primary-900"
                              >
                                Edit Status
                              </button>
                              <button
                                onClick={() => handleViewOrder(order)}
                                className="text-gray-600 hover:text-gray-900 flex items-center"
                              >
                                <Eye size={16} className="mr-1" />
                                View
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {/* Pagination */}
          {!loading && filteredOrders.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, filteredOrders.length)}
                </span>{' '}
                of <span className="font-medium">{filteredOrders.length}</span> orders
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`btn py-1 px-2 ${
                    currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'btn-secondary'
                  }`}
                >
                  <ChevronLeft size={16} />
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
                  // Show pages around the current page
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = index + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = index + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + index;
                  } else {
                    pageNumber = currentPage - 2 + index;
                  }
                  
                  if (pageNumber <= totalPages) {
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => paginate(pageNumber)}
                        className={`btn py-1 px-3 ${
                          currentPage === pageNumber ? 'btn-primary' : 'btn-secondary'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  }
                  return null;
                })}
                
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`btn py-1 px-2 ${
                    currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'btn-secondary'
                  }`}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="order-details-modal" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
              aria-hidden="true"
              onClick={handleCloseModal}
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
                    onClick={handleCloseModal}
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="border-t border-b border-gray-200 py-4 my-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Customer</p>
                      <p className="text-sm">{getUserName(selectedOrder.userId)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Order Status</p>
                      <div className="mt-1">
                        <OrderStatusBadge status={selectedOrder.status} />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Payment Method</p>
                      <p className="text-sm">{selectedOrder.paymentMethod}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Items</p>
                      <p className="text-sm">
                        {selectedOrder.products.reduce((total, product) => total + product.quantity, 0)} items
                      </p>
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
                
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => {
                      handleEditStatus(selectedOrder.id, selectedOrder.status);
                      handleCloseModal();
                    }}
                  >
                    Update Status
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

export default OrderManagement;