import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { Menu, X, ShoppingCart, UserCircle, Cpu, LogOut, Settings } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const isAdmin = user?.role === 'admin';
  const username = user?.username ? user.username : '';

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  // Simplified navigation links array
  const navigationLinks = [
    { to: "/products", label: "Products" },
    { to: "/about", label: "About Us" },
  ];

  return (
    <nav className="bg-white/5 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between h-20 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-3 group"
            >
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
                <Cpu className="w-9 h-9 text-blue-500 relative" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text">
                TechShop
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            {navigationLinks.map((link) => (
              <Link 
                key={link.to}
                to={link.to} 
                className="text-gray-300 hover:text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-white/5 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            
            {isAdmin && (
              <Link 
                to="/admin/products" 
                className="flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 px-4 py-2 text-sm font-medium rounded-lg hover:bg-white/5 transition-colors duration-200"
              >
                <Settings className="w-4 h-4" />
                <span>Admin Dashboard</span>
              </Link>
            )}
            
            <Link 
              to="/cart" 
              className="relative flex items-center text-gray-300 hover:text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-white/5 transition-colors duration-200"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs font-medium">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/profile"
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 group"
                >
                  <UserCircle className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
                  <span className="group-hover:text-blue-400">{username}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-rose-600 hover:to-pink-700 transition-all duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-white/5 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-blue-500/20"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-gray-900/90 backdrop-blur-lg border-t border-white/10">
          <div className="px-4 pt-2 pb-3 space-y-2">
            {navigationLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block px-4 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            
            {isAdmin && (
              <Link
                to="/admin/products"
                className="flex items-center px-4 py-3 text-base font-medium text-emerald-400 hover:text-emerald-300 hover:bg-white/5 rounded-lg transition-colors duration-200"
              >
                <Settings className="w-5 h-5 mr-3" />
                Product Admin
              </Link>
            )}

            <Link
              to="/cart"
              className="flex items-center justify-between px-4 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-200"
            >
              <div className="flex items-center">
                <ShoppingCart className="w-5 h-5 mr-3" />
                Cart
              </div>
              {cartItemsCount > 0 && (
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            
            {user ? (
              <>
                <div className="px-4 py-3">
                  <div className="text-sm text-gray-400">{username}</div>
                  {isAdmin && (
                    <div className="text-xs text-emerald-400 mt-1">Admin</div>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 text-base font-medium text-rose-400 hover:text-rose-300 hover:bg-white/5 rounded-lg transition-colors duration-200"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}