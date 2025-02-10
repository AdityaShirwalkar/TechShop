import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 flex justify-center">
          <ShoppingBag className="h-16 w-16 text-blue-600" />
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
          <Link
            to="/register"
            className="flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Sign Up Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;