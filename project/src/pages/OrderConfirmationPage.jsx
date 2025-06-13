import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle, Package, CreditCard, MapPin, ArrowRight } from 'lucide-react';

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://localhost:3001/orders/${orderId}`);
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom max-w-3xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-8"></div>
            <div className="bg-white rounded-lg shadow-soft p-8">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom max-w-3xl text-center">
          <h1 className="text-2xl font-bold mb-4">Ordine non trovato</h1>
          <p className="text-gray-600 mb-6">L'ordine che stai cercando non esiste o è stato rimosso.</p>
          <Link to="/" className="btn-primary">
            Torna alla Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-success-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-success-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Grazie per il tuo ordine!</h1>
          <p className="text-gray-600">
            Il tuo ordine #{order.id} è stato confermato e verrà elaborato al più presto.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-soft overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Dettagli Ordine</h2>
              <span className="text-sm text-gray-500">
                Ordine effettuato il {formatDate(order.date)}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <Package className="w-5 h-5 text-gray-400 mt-1 mr-3" />
                <div>
                  <p className="font-medium mb-1">Stato dell'ordine</p>
                  <p className="text-sm text-gray-600 capitalize">{order.status}</p>
                </div>
              </div>

              <div className="flex items-start">
                <CreditCard className="w-5 h-5 text-gray-400 mt-1 mr-3" />
                <div>
                  <p className="font-medium mb-1">Metodo di pagamento</p>
                  <p className="text-sm text-gray-600">{order.paymentMethod}</p>
                </div>
              </div>

              <div className="flex items-start md:col-span-2">
                <MapPin className="w-5 h-5 text-gray-400 mt-1 mr-3" />
                <div>
                  <p className="font-medium mb-1">Indirizzo di spedizione</p>
                  <p className="text-sm text-gray-600">{order.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h3 className="font-semibold mb-4">Prodotti ordinati</h3>
            <div className="space-y-4">
              {order.products.map((item) => (
                <div key={item.productId} className="flex items-center">
                  <div className="flex-grow">
                    <p className="font-medium">Prodotto #{item.productId}</p>
                    <p className="text-sm text-gray-500">Quantità: {item.quantity}</p>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 mt-6 pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotale</span>
                <span>${(order.total * 0.91).toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">IVA (10%)</span>
                <span>${(order.total * 0.09).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg mt-2">
                <span>Totale</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <p className="text-gray-600">
            Ti invieremo un'email di conferma con i dettagli dell'ordine e le informazioni sulla spedizione.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/" className="btn-primary flex items-center justify-center">
              <ArrowRight size={18} className="mr-2 transform rotate-180" />
              Torna alla Home
            </Link>
            <Link to="/products" className="btn-secondary flex items-center justify-center">
              Continua lo Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;