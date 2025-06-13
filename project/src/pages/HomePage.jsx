import React, { useState, useEffect } from 'react';
import { ArrowRight, ShoppingBag, Truck, Shield, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import { useProducts } from '../context/ProductContext.jsx';
import { useCategories } from '../context/CategoryContext.jsx';

const FeaturedCategory = ({ category, image, link }) => (
  <Link to={link} className="block group">
    <div className="rounded-lg overflow-hidden relative h-48">
      <img 
        src={image} 
        alt={category} 
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-40 transition-all">
        <h3 className="text-white text-xl font-semibold">{category}</h3>
      </div>
    </div>
  </Link>
);

const FeatureCard = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-soft">
    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const HomePage = () => {
  const { products } = useProducts();
  const { categories } = useCategories();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  
  useEffect(() => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    setFeaturedProducts(shuffled.slice(0, 4));
  }, [products]);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 animate-fadeIn">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Scopri i nostri prodotti
              </h1>
              <p className="text-lg text-primary-100">
                Esplora la nostra collezione di prodotti di alta qualità a prezzi imbattibili. Qualità garantita con un'esperienza di shopping sicura.
              </p>
              <div>
                <Link to="/products" className="btn bg-white text-primary-600 hover:bg-gray-100">
                  Scopri
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.pexels.com/photos/6214478/pexels-photo-6214478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Shopping" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Categorie</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Esplora la nostra vasta gamma di prodotti in diverse categorie
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map(category => {
              const productForImage = products.find(p => p.category === category.name);
              const imageUrl = productForImage ? productForImage.image : 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
              
              return (
                <FeaturedCategory 
                  key={category.id}
                  category={category.displayName}
                  image={imageUrl}
                  link={`/products?category=${category.name}`}
                />
              );
            })}
          </div>
          
          <div className="mt-10 text-center">
            <Link to="/products" className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700">
              Vedi tutte le categorie
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Prodotti in Evidenza</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Scopri i nostri prodotti più popolari selezionati per te
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Link to="/products" className="btn-primary inline-flex items-center">
              Vedi tutti i prodotti
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;