import React, { useState } from 'react';
import { Minus, Plus, X, ArrowLeft, Lock, Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import Footer from './Footer';
import { Search, Heart, ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext'
import { useWishlist } from '../WishlistContext';

const CartPage = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { wishlist } = useWishlist();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();


  const TAX_RATE = 0.08; 
  const subtotal = cart.reduce((acc, item) => {
    const itemPrice = Number(item.productId?.price) || Number(item.price) || 0;
    const itemQuantity = Number(item.quantity) || 0;
    return acc + (itemPrice * itemQuantity);
  }, 0);
  const estimatedTax = subtotal * TAX_RATE;
  const grandTotal = subtotal + estimatedTax;
  const navigate = useNavigate();


  const isLoggedIn = localStorage.getItem('token');


  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'
  }


  return (
    <>

      <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-[#05070a] backdrop-blur-md text-white border-b border-gray-800">

       
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="bg-orange-600 p-1.5 rounded-full">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <Link to="/" className="text-2xl font-bold tracking-tight">STEP TO GROW</Link>
        </div>

        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link to="/shop" className="hover:text-orange-500  cursor-pointer transition">Shop</Link>
          <Link to="/categories" className="hover:text-orange-500  cursor-pointer transition">Categories</Link>
          <Link
            to="/shop?filter=new"
            className="cursor-pointer hover:text-orange-500 "
          >
            New Arrivals
          </Link>
          <Link to="/shop?filter=sale" className="hover:text-orange-500 cursor-pointer transition">Sale</Link>
          <Link to="/about" className="hover:text-orange-500  cursor-pointer transition">About</Link>
        </ul>

        
        <div className="flex items-center gap-6">
          {!isSearchOpen ? (
          
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:text-orange-500 transition-colors"
            >
              <Search size={20} />
            </button>
          ) : (
         
            <div className="relative flex items-center animate-in slide-in-from-right-2 duration-300">
              <Search
                className="absolute left-3 text-gray-500"
                size={18}
              />
              <input
                autoFocus
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
               
                onBlur={() => {
                  if (searchQuery === "") setIsSearchOpen(false);
                }}
                className="bg-gray-900 border border-gray-800 text-white text-sm rounded-xl py-2 pl-10 pr-10 focus:outline-none focus:border-orange-500 transition-all w-64"
              />
             
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery("");
                }}
                className="absolute right-3 text-gray-500 hover:text-white"
              >
                ✕
              </button>
            </div>
          )}
          <Link to="/wishlist" className="relative hover:text-orange-500 transition">
            <Heart size={20} fill={wishlist.length > 0 ? "orange" : "none"} />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative hover:text-orange-500 transition">
            <ShoppingCart size={20} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>

         
          {!isLoggedIn ? (
            <Link to="/login" className="bg-[#f06225] px-6 py-2 rounded-full font-bold hover:bg-[#d4521d] transition">
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="border border-gray-600 px-6 py-2 rounded-full font-bold hover:bg-white hover:text-black transition"
            >
              Logout
            </button>
          )}
        </div>

      </nav>
      <div className="min-h-screen bg-[#05070a] text-white pt-10 pb-20">
        <div className="max-w-7xl mx-auto px-6">
         

          <h1 className="text-4xl font-bold mb-12">Shopping Cart</h1>

          <div className="flex flex-col lg:flex-row gap-8">

            
            <div className="flex-1">
            
              <div className="grid grid-cols-12 pb-4 border-b border-gray-900 text-xs font-bold uppercase tracking-widest text-gray-500 px-2">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

             
              {cart.length > 0 ? (
                cart.map((item, index) => (

                  <div key={item._id || index} className="grid grid-cols-12 py-8 items-center border-b border-gray-900 px-2 group">
                   
                    <div className="col-span-6 flex gap-6 items-center">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-900">
                        <img
                          src={item.image || item.productId?.img} 
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-xl"
                          onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }} 
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">{item.productId?.name || item.name}</h3>
                        <p className="text-sm text-gray-500">{item.productId?.category || item.category}</p>
                      </div>
                    </div>

                    
                    <div className="col-span-2 text-center font-bold text-lg">
                      
                      ${((Number(item.productId?.price) || Number(item.price) || 0) * (item.quantity || 1)).toFixed(2)}
                    </div>

                
                    <div className="col-span-2 flex justify-center">
                      <div className="flex items-center bg-gray-900/50 border border-gray-800 rounded-xl p-1">
                        <button
                          onClick={() => updateQuantity(item._id, (item.quantity || 1) - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-bold">{item.quantity || 1}</span>

                        <button
                          onClick={() => updateQuantity(item._id, (item.quantity || 1) + 1)}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

            
                    <div className="col-span-2 text-right flex items-center justify-end gap-4">
                      <span className="font-bold text-xl">
                        ${((Number(item.productId?.price) || Number(item.price) || 0) * (item.quantity || 1)).toFixed(2)}
                      </span>
                      <button onClick={() => removeFromCart(item._id)}>
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center text-gray-500">
                  Your cart is empty. <Link to="/shop" className="text-orange-500 underline">Go shopping!</Link>
                </div>
              )}

              <div className="flex justify-between items-center mt-8">
                <Link to="/shop" className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors group">
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                  Continue Shopping
                </Link>
                <button
                  onClick={clearCart}
                  className="text-sm font-bold text-red-500 hover:underline"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            
            <div className="w-full lg:w-[400px]">
              <div className="bg-[#0c1017] border border-gray-900 rounded-[2.5rem] p-8 shadow-2xl">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

             
                <div className="mb-8">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Promo Code</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="flex-1 bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-600"
                    />
                    <button className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-xl text-sm font-bold transition-colors">
                      Apply
                    </button>
                  </div>
                </div>

             
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Subtotal</span>
                    <span className="text-white font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Shipping</span>
                    <span className="text-green-500 font-bold uppercase">Free</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Estimated Tax (8%)</span>
                    <span className="text-white font-bold">${estimatedTax.toFixed(2)}</span>
                  </div>
                  <div className="pt-4 border-t border-gray-900 flex justify-between items-center">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-2xl font-black text-white">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button className="w-full bg-[#f06225] hover:bg-[#ff7539] text-white py-5 rounded-[1.5rem] font-bold text-lg transition-all shadow-lg shadow-orange-950/20 active:scale-95 mb-6">
                  Proceed to Checkout
                </button>

        
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    <Lock size={12} />
                    Secure Checkout
                  </div>
                  <div className="flex gap-4 grayscale opacity-50">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 pt-10 border-t border-gray-900">
            <div className="flex items-center gap-4">
              <div className="bg-orange-900/20 p-3 rounded-2xl text-[#f06225]">
                <Truck size={24} />
              </div>
              <div>
                <h4 className="font-bold">Free Shipping</h4>
                <p className="text-xs text-gray-500">On orders over $75</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-orange-900/20 p-3 rounded-2xl text-[#f06225]">
                <RotateCcw size={24} />
              </div>
              <div>
                <h4 className="font-bold">60-Day Returns</h4>
                <p className="text-xs text-gray-500">Easy returns & exchanges</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-orange-900/20 p-3 rounded-2xl text-[#f06225]">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-bold">Secure Payment</h4>
                <p className="text-xs text-gray-500">SSL encrypted checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;