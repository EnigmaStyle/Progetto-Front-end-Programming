import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Plus, Minus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);
  const { addToCart } = useCart();
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch product details
        const response = await fetch(`http://localhost:3001/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
        
        // Fetch similar products (same category)
        const allProductsResponse = await fetch('http://localhost:3001/products');
        const allProducts = await allProductsResponse.json();
        
        const similar = allProducts.filter(p => 
          p.category === data.category && p.id !== data.id
        ).slice(0, 4);
        
        setSimilarProducts(similar);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
    // Reset state when product ID changes
    setQuantity(1);
    setAddedToCart(false);
  }, [id]);
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setAddedToCart(true);
      
      // Reset the added to cart notification after 3 seconds
      setTimeout(() => {
        setAddedToCart(false);
      }, 3000);
    }
  };
  
  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  if (loading) {
    return (
      <div className="container-custom py-12">
        <div className="animate-pulse">
          <div className="h-8 w-40 bg-gray-200 rounded mb-8"></div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
              <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
              <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-2/3 bg-gray-200 rounded mb-6"></div>
              <div className="h-12 w-full bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container-custom py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products" className="btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        <Link to="/products" className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-6">
          <ArrowLeft size={16} className="mr-2" />
          Torna ai Prodotti
        </Link>
        
        <div className="bg-white rounded-lg shadow-soft overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            <div className="p-6 md:p-8 flex flex-col">
              <div>
                <p className="text-sm text-gray-500 uppercase mb-2">{product.category}</p>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
                <p className="text-xl md:text-2xl font-semibold text-primary-600 mb-4">
                  €{product.price.toFixed(2)}
                </p>
                <div className="border-t border-b border-gray-200 py-4 my-4">
                  <p className="text-gray-700 mb-4">{product.description}</p>
                  <p className={`text-sm font-medium ${product.stock > 0 ? 'text-success-600' : 'text-error-600'}`}>
                    {product.stock > 0 
                      ? `In Stock (${product.stock} available)` 
                      : 'Out of Stock'}
                  </p>
                </div>
              </div>
              
              <div className="mt-auto">
                <div className="flex items-center mb-6">
                  <span className="mr-4 font-medium">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button 
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="px-3 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 text-center">{quantity}</span>
                    <button 
                      onClick={incrementQuantity}
                      disabled={quantity >= product.stock}
                      className="px-3 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`w-full btn ${
                    addedToCart 
                      ? 'bg-success-500 hover:bg-success-600 text-white' 
                      : product.stock === 0 
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                        : 'btn-primary'
                  } flex items-center justify-center`}
                >
                  {addedToCart ? (
                    <>
                      <Check size={18} className="mr-2" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={18} className="mr-2" />
                      {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {similarProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Potrebbe Interessarti Anche</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {similarProducts.map(product => (
                <Link key={product.id} to={`/product/${product.id}`} className="block">
                  <div className="card group h-full flex flex-col">
                    <div className="relative overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-48 object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 flex-grow flex flex-col">
                      <h3 className="font-medium mb-2 line-clamp-1">{product.name}</h3>
                      <div className="mt-auto">
                        <span className="font-semibold">€{product.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;