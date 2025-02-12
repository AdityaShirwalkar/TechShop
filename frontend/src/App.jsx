import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import ProductAdmin from './components/ProductAdmin';
import Profile from './components/Profile';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import ScrollToTop from './components/ScrollToTop';  // Import the component

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen w-full bg-slate-900">
            <Navbar />
            <ScrollToTop />  {/* Add ScrollToTop here */}
            <div className="w-full">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin/products" element={<ProductAdmin />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
              </Routes>
            </div>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
