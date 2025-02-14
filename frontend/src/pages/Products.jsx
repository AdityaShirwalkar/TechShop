import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart, Search, Loader, Package, ImageOff } from 'lucide-react';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [imageErrors, setImageErrors] = useState({});

  const productTypes = [
    { value: 'all', label: 'All Products' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'smartphones', label: 'Smartphones' },
    { value: 'laptops', label: 'Laptops' }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleImageError = (productId) => {
    setImageErrors(prev => ({
      ...prev,
      [productId]: true
    }));
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    if (imageUrl.startsWith('http')) return imageUrl;
    return `http://localhost:5000${imageUrl}`;
  };

  const renderProductImage = (product) => {
    const imageUrl = getImageUrl(product.imageUrl);
    if (imageErrors[product._id] || !imageUrl) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-800">
          <ImageOff className="w-12 h-12 text-gray-600" />
        </div>
      );
    }

    return (
      <img
        src={imageUrl}
        alt={product.name}
        onError={() => handleImageError(product._id)}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
    );
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedType === 'all' || product.type === selectedType)
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-900 gap-4">
        <Loader className="w-12 h-12 text-blue-500 animate-spin" />
        <p className="text-gray-400 animate-pulse">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-800 py-20">
        <div className="absolute inset-0 bg-grid-white/[0.05] -z-0" />
        <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Discover Amazing Products
            </h1>
            <p className="text-lg text-blue-200 mb-12 max-w-2xl mx-auto">
              Browse through our collection of high-quality tech products
            </p>
            <div className="max-w-xl mx-auto space-y-4">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-full bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                  />
                </div>
              </div>
              
              {/* Type Filter */}
              <div className="flex justify-center gap-2 flex-wrap">
                {productTypes.map(type => (
                  <button
                    key={type.value}
                    onClick={() => setSelectedType(type.value)}
                    className={`px-4 py-2 rounded-full transition-all duration-300 ${
                      selectedType === type.value
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl text-gray-400">No products found</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div
                key={product._id}
                className="group bg-gray-800 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 flex flex-col"
              >
                {/* Image Container - Fixed height */}
                <div className="relative w-full h-64 overflow-hidden bg-gray-900">
                  {renderProductImage(product)}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Content Container - Fixed height and padding */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Product Name - Fixed height */}
                  <h3 className="text-lg font-semibold text-white mb-2 h-7 overflow-hidden text-ellipsis whitespace-nowrap group-hover:text-blue-400 transition-colors">
                    {product.name}
                  </h3>
                  
                  {/* Description - Fixed height with line clamp */}
                  <p className="text-gray-400 mb-4 text-sm h-10 line-clamp-2 flex-grow">
                    {product.description}
                  </p>
                  
                  {/* Price and Button Container - Fixed height */}
                  <div className="flex items-center justify-between mt-auto h-12">
                    <span className="text-2xl font-bold text-white whitespace-nowrap">
                      ${product.price}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 h-10 rounded-lg transition-colors duration-300 whitespace-nowrap min-w-[120px]"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
