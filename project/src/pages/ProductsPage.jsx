import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard.jsx';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortBy, setSortBy] = useState('default');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const location = useLocation();
  
  // Extract search parameters from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory('');
    }
    
    // Apply filtering with search term if present
    if (products.length > 0) {
      applyFilters(categoryParam, searchParam);
    }
  }, [location.search, products]);

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const productsResponse = await fetch('http://localhost:3001/products');
        const productsData = await productsResponse.json();
        setProducts(productsData);
        
        // Fetch categories
        const categoriesResponse = await fetch('http://localhost:3001/categories');
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);
        
        // Apply initial filters
        const searchParams = new URLSearchParams(location.search);
        const categoryParam = searchParams.get('category');
        const searchParam = searchParams.get('search');
        applyFilters(categoryParam, searchParam, productsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const applyFilters = (categoryFilter = selectedCategory, searchTerm = '', productsToFilter = products) => {
    let filtered = [...productsToFilter];
    
    // Apply category filter
    if (categoryFilter) {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply price filter
    filtered = filtered.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );
    
    // Apply sorting
    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }
    
    setFilteredProducts(filtered);
  };
  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    applyFilters(category);
  };
  
  const handlePriceChange = (type, value) => {
    const newRange = { ...priceRange, [type]: Number(value) };
    setPriceRange(newRange);
    applyFilters(selectedCategory, '', products, newRange);
  };
  
  const handleSortChange = (value) => {
    setSortBy(value);
    applyFilters(selectedCategory, '', products, priceRange, value);
  };
  
  const clearFilters = () => {
    setSelectedCategory('');
    setPriceRange({ min: 0, max: 1000 });
    setSortBy('default');
    applyFilters('', '', products, { min: 0, max: 1000 }, 'default');
  };
  
  const getCategoryName = (categorySlug) => {
    const category = categories.find(cat => cat.name === categorySlug);
    return category ? category.displayName : 'All Products';
  };
  
  const getPageTitle = () => {
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('search');
    
    if (searchTerm) {
      return `Search Results: "${searchTerm}"`;
    } else if (selectedCategory) {
      return getCategoryName(selectedCategory);
    } else {
      return 'All Products';
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8">{getPageTitle()}</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile filter button */}
          <div className="lg:hidden flex justify-between items-center mb-4">
            <button 
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="btn-secondary flex items-center"
            >
              <Filter size={18} className="mr-2" />
              Filters
            </button>
            
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="input-field pl-4 pr-10 py-2 appearance-none"
              >
                <option value="default">Sort by: Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
            </div>
          </div>
          
          {/* Sidebar with filters */}
          <aside 
            className={`lg:w-1/4 bg-white rounded-lg shadow-soft p-6 h-fit transition-all duration-300 ${
              showMobileFilters ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                <SlidersHorizontal size={20} className="mr-2" />
                Filters
              </h2>
              <button 
                onClick={() => setShowMobileFilters(false)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="all"
                    name="category"
                    checked={selectedCategory === ''}
                    onChange={() => handleCategoryChange('')}
                    className="mr-2"
                  />
                  <label htmlFor="all" className="cursor-pointer">All Products</label>
                </div>
                
                {categories.map(category => (
                  <div key={category.id} className="flex items-center">
                    <input
                      type="radio"
                      id={category.name}
                      name="category"
                      checked={selectedCategory === category.name}
                      onChange={() => handleCategoryChange(category.name)}
                      className="mr-2"
                    />
                    <label htmlFor={category.name} className="cursor-pointer">{category.displayName}</label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Min Price</label>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="10"
                    value={priceRange.min}
                    onChange={(e) => handlePriceChange('min', e.target.value)}
                    className="w-full"
                  />
                  <span className="text-sm">${priceRange.min}</span>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Max Price</label>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="10"
                    value={priceRange.max}
                    onChange={(e) => handlePriceChange('max', e.target.value)}
                    className="w-full"
                  />
                  <span className="text-sm">${priceRange.max}</span>
                </div>
              </div>
            </div>
            
            {/* Sort (Desktop only) */}
            <div className="hidden lg:block mb-6">
              <h3 className="font-medium mb-3">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="input-field w-full"
              >
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>
            
            {/* Clear Filters */}
            <button 
              onClick={clearFilters}
              className="w-full btn-secondary"
            >
              Clear Filters
            </button>
          </aside>
          
          {/* Product Grid */}
          <div className="lg:w-3/4">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="bg-white rounded-lg overflow-hidden shadow-soft animate-pulse">
                    <div className="w-full h-60 bg-gray-200"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                      <div className="flex justify-between items-center">
                        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-soft p-8 text-center">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search term to find what you're looking for.
                </p>
                <button 
                  onClick={clearFilters} 
                  className="btn-primary"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;