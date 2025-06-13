import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="card group h-full flex flex-col">
        <div className="relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-60 object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <div className="flex-grow">
            <p className="text-sm text-gray-500 uppercase mb-1">{product.category}</p>
            <h3 className="font-medium text-lg mb-2 line-clamp-2">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-lg font-semibold">€{product.price.toFixed(2)}</span>
            <button
              onClick={handleAddToCart}
              className="btn-primary flex items-center p-2"
              aria-label="Aggiungi al carrello"
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;