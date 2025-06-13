import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, ChevronDown, Sparkles, Package, Shirt, Home } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useCategories } from '../context/CategoryContext.jsx';

const CategoryIcon = ({ category }) => {
  switch (category) {
    case 'electronics':
      return <Sparkles size={18} />;
    case 'clothing':
      return <Shirt size={18} />;
    case 'home':
      return <Home size={18} />;
    default:
      return <Package size={18} />;
  }
};

const Navbar = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const { itemCount } = useCart();
  const { categories } = useCategories();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen || isAccountMenuOpen || isProductsMenuOpen || isSearchOpen) {
        const navbar = document.getElementById('main-navigation');
        const accountMenu = document.getElementById('account-menu');
        const productsMenu = document.getElementById('products-menu');
        const searchContainer = document.getElementById('search-container');
        if (navbar && !navbar.contains(event.target)) {
          setIsMenuOpen(false);
        }
        if (accountMenu && !accountMenu.contains(event.target)) {
          setIsAccountMenuOpen(false);
        }
        if (productsMenu && !productsMenu.contains(event.target)) {
          setIsProductsMenuOpen(false);
        }
        if (searchContainer && !searchContainer.contains(event.target)) {
          setIsSearchOpen(false);
          setSearchTerm('');
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen, isAccountMenuOpen, isProductsMenuOpen, isSearchOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        setIsAccountMenuOpen(false);
        setIsProductsMenuOpen(false);
        setIsSearchOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${searchTerm}`);
      setIsSearchOpen(false);
      setSearchTerm('');
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
    setIsAccountMenuOpen(false);
  };

  const toggleAccountMenu = () => {
    setIsAccountMenuOpen(!isAccountMenuOpen);
  };

  const toggleProductsMenu = () => {
    setIsProductsMenuOpen(!isProductsMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        document.getElementById('search-input')?.focus();
      }, 100);
    }
  };

  return (
    <nav 
      className="bg-white shadow-sm border-b border-gray-100 relative z-50"
      id="main-navigation"
      role="navigation"
      aria-label="Menu principale"
    >
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="flex items-center" 
            onClick={() => setIsMenuOpen(false)}
            aria-label="THRIFT SHOP - Vai alla home page"
          >
            <span className="text-2xl font-bold text-primary-600">THRIFT SHOP</span>
          </Link>

          <div className="hidden md:flex md:items-center md:space-x-8" role="menubar">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-primary-600 transition"
              role="menuitem"
            >
              Home
            </Link>

            <div 
              className="relative group"
              id="products-menu"
              onMouseEnter={() => setIsProductsMenuOpen(true)}
              onMouseLeave={() => setIsProductsMenuOpen(false)}
            >
              <button
                className="flex items-center text-gray-700 hover:text-primary-600 transition py-2"
                onClick={toggleProductsMenu}
                aria-expanded={isProductsMenuOpen}
                aria-haspopup="true"
              >
                Prodotti
                <ChevronDown size={16} className={`ml-1 transition-transform duration-200 ${isProductsMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProductsMenuOpen && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-lg shadow-lg py-3 mt-1">
                  <Link
                    to="/products"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                    onClick={() => setIsProductsMenuOpen(false)}
                  >
                    <Package size={18} className="mr-3 text-gray-400" />
                    <span>Tutti i Prodotti</span>
                  </Link>
                  
                  <div className="h-px bg-gray-100 my-2"></div>
                  
                  {categories.map(category => (
                    <Link
                      key={category.id}
                      to={`/products?category=${category.name}`}
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                      onClick={() => setIsProductsMenuOpen(false)}
                    >
                      <CategoryIcon category={category.name} className="mr-3 text-gray-400" />
                      <span>{category.displayName}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link 
              to="/contatti" 
              className="text-gray-700 hover:text-primary-600 transition"
              role="menuitem"
            >
              Contatti
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-6">
            <div id="search-container" className="relative">
              <button
                onClick={toggleSearch}
                className="text-gray-700 hover:text-primary-600 transition p-2"
                aria-label="Cerca"
              >
                <Search size={20} />
              </button>

              {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg p-4 animate-slideLeft">
                  <form onSubmit={handleSearch} role="search" className="relative">
                    <input
                      id="search-input"
                      type="search"
                      placeholder="Cerca prodotti..."
                      className="w-full py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      aria-label="Cerca prodotti"
                    />
                    <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
                  </form>
                </div>
              )}
            </div>

            <Link 
              to="/cart" 
              className="flex items-center"
              aria-label={`Carrello${itemCount > 0 ? `, ${itemCount} articoli` : ''}`}
            >
              <div className="relative">
                <ShoppingCart size={22} className="text-gray-700 hover:text-primary-600 transition" />
                {itemCount > 0 && (
                  <span 
                    className="absolute -top-2 -right-2 h-5 w-5 bg-accent-500 text-white rounded-full text-xs flex items-center justify-center"
                    aria-hidden="true"
                  >
                    {itemCount}
                  </span>
                )}
              </div>
            </Link>

            {isAuthenticated ? (
              <div className="relative" id="account-menu">
                <button
                  className="flex items-center text-gray-700 hover:text-primary-600 focus:outline-none"
                  onClick={toggleAccountMenu}
                  aria-expanded={isAccountMenuOpen}
                  aria-haspopup="true"
                  aria-label="Menu account"
                >
                  <User size={22} />
                  <span className="ml-2">Account</span>
                </button>
                {isAccountMenuOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-20"
                    role="menu"
                  >
                    {isAdmin ? (
                      <Link 
                        to="/admin" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                        role="menuitem"
                        onClick={() => setIsAccountMenuOpen(false)}
                      >
                        Dashboard Admin
                      </Link>
                    ) : (
                      <Link 
                        to="/profile" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                        role="menuitem"
                        onClick={() => setIsAccountMenuOpen(false)}
                      >
                        Il Mio Profilo
                      </Link>
                    )}
                    <Link 
                      to="/orders" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                      role="menuitem"
                      onClick={() => setIsAccountMenuOpen(false)}
                    >
                      I Miei Ordini
                    </Link>
                    <div className="h-px bg-gray-100 my-1"></div>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                      role="menuitem"
                    >
                      Esci
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-primary-600 transition flex items-center"
                aria-label="Accedi al tuo account"
              >
                <User size={22} />
                <span className="ml-2">Accedi</span>
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleSearch}
              className="mr-4 text-gray-700 hover:text-primary-600 transition"
              aria-label="Cerca"
            >
              <Search size={20} />
            </button>

            <Link 
              to="/cart" 
              className="mr-4"
              aria-label={`Carrello${itemCount > 0 ? `, ${itemCount} articoli` : ''}`}
            >
              <div className="relative">
                <ShoppingCart size={22} className="text-gray-700" />
                {itemCount > 0 && (
                  <span 
                    className="absolute -top-2 -right-2 h-5 w-5 bg-accent-500 text-white rounded-full text-xs flex items-center justify-center"
                    aria-hidden="true"
                  >
                    {itemCount}
                  </span>
                )}
              </div>
            </Link>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Chiudi menu" : "Apri menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden border-t border-gray-200 animate-slideDown">
          <div className="container-custom py-4">
            <form onSubmit={handleSearch} role="search" className="relative">
              <input
                type="search"
                placeholder="Cerca prodotti..."
                className="w-full py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Cerca prodotti"
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            </form>
          </div>
        </div>
      )}

      {isMenuOpen && (
        <div 
          className="md:hidden animate-slideUp"
          role="dialog"
          aria-label="Menu mobile"
        >
          <div className="px-4 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
            <Link 
              to="/" 
              className="flex items-center py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg px-3"
              onClick={() => setIsMenuOpen(false)}
              role="menuitem"
            >
              Home
            </Link>
            
            <Link 
              to="/products" 
              className="flex items-center py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg px-3"
              onClick={() => setIsMenuOpen(false)}
              role="menuitem"
            >
              <Package size={18} className="mr-3" />
              Tutti i Prodotti
            </Link>

            {categories.map(category => (
              <Link 
                key={category.id}
                to={`/products?category=${category.name}`} 
                className="flex items-center py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg px-3"
                onClick={() => setIsMenuOpen(false)}
                role="menuitem"
              >
                <CategoryIcon category={category.name} className="mr-3" />
                {category.displayName}
              </Link>
            ))}

            <Link 
              to="/contatti" 
              className="flex items-center py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg px-3"
              onClick={() => setIsMenuOpen(false)}
              role="menuitem"
            >
              Contatti
            </Link>

            <div className="h-px bg-gray-100 my-2"></div>

            {isAuthenticated ? (
              <>
                {isAdmin ? (
                  <Link 
                    to="/admin" 
                    className="flex items-center py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg px-3"
                    onClick={() => setIsMenuOpen(false)}
                    role="menuitem"
                  >
                    Dashboard Admin
                  </Link>
                ) : (
                  <Link 
                    to="/profile" 
                    className="flex items-center py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg px-3"
                    onClick={() => setIsMenuOpen(false)}
                    role="menuitem"
                  >
                    Il Mio Profilo
                  </Link>
                )}
                <Link 
                  to="/orders" 
                  className="flex items-center py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg px-3"
                  onClick={() => setIsMenuOpen(false)}
                  role="menuitem"
                >
                  I Miei Ordini
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center w-full py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg px-3"
                  role="menuitem"
                >
                  Esci
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg px-3"
                onClick={() => setIsMenuOpen(false)}
                role="menuitem"
              >
                <User size={18} className="mr-3" />
                Accedi
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;