import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, AlertCircle } from 'lucide-react';

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity > 0 && newQuantity <= item.stock) {
      updateQuantity(item._id, newQuantity);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-8">
            <ShoppingBag className="w-8 h-8 text-blue-500" />
            <h2 className="text-2xl font-bold text-white">Shopping Cart</h2>
            <span className="ml-auto text-gray-400">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </span>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {cart.map(item => (
                  <div
                    key={item._id}
                    className="flex items-center gap-6 p-4 bg-gray-700/50 rounded-xl border border-gray-600/50"
                  >
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    )}
                    
                    <div className="flex-grow">
                      <h3 className="font-semibold text-white text-lg mb-1">
                        {item.name}
                      </h3>
                      <p className="text-blue-400 font-bold">${item.price}</p>
                      
                      {item.stock < 5 && (
                        <div className="flex items-center gap-2 text-yellow-500 text-sm mt-1">
                          <AlertCircle className="w-4 h-4" />
                          <span>Only {item.stock} left in stock</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleQuantityChange(item, item.quantity - 1)}
                        className="p-1 text-gray-400 hover:text-white transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      
                      <span className="w-8 text-center text-white">
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => handleQuantityChange(item, item.quantity + 1)}
                        className="p-1 text-gray-400 hover:text-white transition-colors"
                        disabled={item.quantity >= item.stock}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t border-gray-700 pt-6">
                <div className="flex justify-between text-lg mb-6">
                  <span className="text-gray-400">Total</span>
                  <span className="text-white font-bold">${total.toFixed(2)}</span>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-semibold transition-colors duration-300">
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;