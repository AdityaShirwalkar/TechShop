import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Star, Shield, Truck, Clock, ChevronRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function Home() {
  const { user } = useAuth();

  const features = [
    {
      icon: <Star className="w-6 h-6 text-yellow-400" />,
      title: "Premium Quality",
      description: "All our products are carefully selected from top manufacturers"
    },
    {
      icon: <Shield className="w-6 h-6 text-green-400" />,
      title: "Secure Shopping",
      description: "Your transactions are protected with industry-leading security"
    },
    {
      icon: <Truck className="w-6 h-6 text-blue-400" />,
      title: "Fast Delivery",
      description: "Get your products delivered within 2-3 business days"
    },
    {
      icon: <Clock className="w-6 h-6 text-purple-400" />,
      title: "24/7 Support",
      description: "Our customer service team is always here to help you"
    }
  ];

  const categories = [
    { name: "Laptops", count: "150+ products" },
    { name: "Smartphones", count: "200+ products" },
    { name: "Accessories", count: "300+ products" },
    { name: "Gaming", count: "100+ products" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-lg animate-pulse"></div>
              <ShoppingBag className="h-16 w-16 text-blue-600 relative" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Welcome to <span className="text-blue-600">TechShop</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover our amazing products at great prices. Shop with confidence and enjoy the best deals online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/products"
              className="group flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Browse Products
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            {!user && (
              <Link
                to="/register"
                className="flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Sign Up Now
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="bg-gray-50 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Popular Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              to="/products"
              className="group bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500">{category.count}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest updates on new products and exclusive offers.
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 bg-indigo-400"
            />
            <button
              type="submit"
              className="bg-white text-blue-600 px-8 py-3 rounded-full hover:bg-blue-50 transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;