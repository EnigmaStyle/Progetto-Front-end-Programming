import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingCart, Users, DollarSign, BarChart2, ArrowUp, ArrowDown } from 'lucide-react';

const StatCard = ({ title, value, icon, change, color }) => {
  const isPositive = change >= 0;
  
  return (
    <div className="bg-white rounded-lg shadow-soft p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-700">{title}</h3>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-2xl font-bold mb-2">{value}</p>
        <p className={`text-sm flex items-center ${isPositive ? 'text-success-600' : 'text-error-600'}`}>
          {isPositive ? <ArrowUp size={16} className="mr-1" /> : <ArrowDown size={16} className="mr-1" />}
          {Math.abs(change)}% rispetto al mese scorso
        </p>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState([]);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch products
        const productsResponse = await fetch('http://localhost:3001/products');
        const productsData = await productsResponse.json();
        
        // Fetch orders
        const ordersResponse = await fetch('http://localhost:3001/orders');
        const ordersData = await ordersResponse.json();
        
        // Fetch users
        const usersResponse = await fetch('http://localhost:3001/users');
        const usersData = await usersResponse.json();
        const customerCount = usersData.filter(user => user.role !== 'admin').length;
        
        // Calculate revenue
        const totalRevenue = ordersData.reduce((sum, order) => sum + order.total, 0);
        
        // Update stats
        setStats({
          products: productsData.length,
          orders: ordersData.length,
          users: customerCount,
          revenue: totalRevenue,
        });
        
        // Get recent orders
        const sortedOrders = [...ordersData].sort((a, b) => new Date(b.date) - new Date(a.date));
        setRecentOrders(sortedOrders.slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('it-IT', options);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard Admin</h1>
          <div className="flex space-x-4">
            <Link to="/admin/products" className="btn-primary">
              Gestione Prodotti
            </Link>
            <Link to="/admin/orders" className="btn-secondary">
              Gestione Ordini
            </Link>
            <Link to="/admin/customers" className="btn-secondary">
              Gestione Clienti
            </Link>
          </div>
        </div>
        
        {/* Stats Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-pulse">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-soft p-6 h-32">
                <div className="h-5 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Totale Prodotti"
              value={stats.products}
              icon={<Package size={24} className="text-white" />}
              change={8.2}
              color="bg-primary-600 text-white"
            />
            <StatCard
              title="Totale Ordini"
              value={stats.orders}
              icon={<ShoppingCart size={24} className="text-white" />}
              change={12.5}
              color="bg-accent-500 text-white"
            />
            <StatCard
              title="Totale Clienti"
              value={stats.users}
              icon={<Users size={24} className="text-white" />}
              change={5.3}
              color="bg-success-500 text-white"
            />
            <StatCard
              title="Fatturato Totale"
              value={`€${stats.revenue.toFixed(2)}`}
              icon={<DollarSign size={24} className="text-white" />}
              change={-2.4}
              color="bg-error-500 text-white"
            />
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-soft overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold flex items-center">
                  <BarChart2 size={20} className="mr-3 text-primary-600" />
                  Ordini Recenti
                </h2>
                <Link to="/admin/orders" className="text-sm text-primary-600 hover:text-primary-700">
                  Vedi Tutti
                </Link>
              </div>
              
              {loading ? (
                <div className="p-6 animate-pulse space-y-4">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="flex justify-between items-center">
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                        <div className="h-3 bg-gray-200 rounded w-32"></div>
                      </div>
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </div>
                  ))}
                </div>
              ) : recentOrders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID Ordine
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Cliente
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Data
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Stato
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Importo
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentOrders.map((order) => {
                        // Map status to colors
                        let statusColor = '';
                        let statusText = '';
                        switch (order.status) {
                          case 'pending':
                            statusColor = 'bg-yellow-100 text-yellow-800';
                            statusText = 'In attesa';
                            break;
                          case 'processing':
                            statusColor = 'bg-blue-100 text-blue-800';
                            statusText = 'In lavorazione';
                            break;
                          case 'shipped':
                            statusColor = 'bg-purple-100 text-purple-800';
                            statusText = 'Spedito';
                            break;
                          case 'delivered':
                            statusColor = 'bg-green-100 text-green-800';
                            statusText = 'Consegnato';
                            break;
                          case 'cancelled':
                            statusColor = 'bg-red-100 text-red-800';
                            statusText = 'Annullato';
                            break;
                          default:
                            statusColor = 'bg-gray-100 text-gray-800';
                            statusText = order.status;
                        }
                        
                        return (
                          <tr key={order.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600">
                              #{order.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              Cliente #{order.userId}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(order.date)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`${statusColor} px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}>
                                {statusText}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
                              €{order.total.toFixed(2)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-6 text-center">
                  <p className="text-gray-500">Nessun ordine trovato</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-soft overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Stato Inventario</h2>
              </div>
              
              {loading ? (
                <div className="p-6 animate-pulse space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item}>
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-2 bg-gray-200 rounded-full"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <p className="text-sm font-medium text-gray-700">Elettronica</p>
                        <p className="text-sm text-gray-500">42%</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <p className="text-sm font-medium text-gray-700">Abbigliamento</p>
                        <p className="text-sm text-gray-500">78%</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-accent-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <p className="text-sm font-medium text-gray-700">Casa</p>
                        <p className="text-sm text-gray-500">35%</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-success-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Prodotti in Esaurimento</h3>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <p className="text-sm">Cuffie Premium</p>
                          <p className="text-sm text-error-600 font-medium">10 rimasti</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm">Macchina del Caffè</p>
                          <p className="text-sm text-error-600 font-medium">20 rimasti</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;