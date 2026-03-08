import { Search, Heart, ShoppingCart, Menu, RotateCcw, ArrowRight, CheckCircle2 } from 'lucide-react';
import React from "react";
import Footer from './Footer';
import CategorySection from './CategorySection';
import { Link, useNavigate } from 'react-router-dom';
import TrustSection from './TranstSection';
import Testimonials from './Testimonials';
import { useCart } from '../CartContext'
import { useWishlist } from '../WishlistContext';
import { useState } from "react";

const Home = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

 
  const isLoggedIn = localStorage.getItem('token');

  
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    window.location.href = '/login'
  }
  return (
    <>
      <div className="min-h-screen bg-[#05070a] text-white font-sans selection:bg-orange-500">
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
            <Link to="/shop" className="hover:text-orange-500 cursor-pointer transition">Shop</Link>
            <Link to="/categories" className="hover:text-orange-500 cursor-pointer transition">Categories</Link>
            <Link
              to="/shop?filter=new"
              className="hover:text-orange-500 cursor-pointer transition"
            >
              New Arrivals
            </Link>
            <Link to="/shop?filter=sale" className="hover:text-orange-500 cursor-pointer transition">Sale</Link>
            <Link to="/about" className="hover:text-orange-500 cursor-pointer transition">About</Link>
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

        <main className="relative max-w-7xl mx-auto px-10 py-20 flex flex-col lg:flex-row items-center overflow-hidden">

    
          <div className="w-full lg:w-1/2 z-10 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-950/30 border border-orange-500/20 text-orange-500 text-xs font-semibold">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
              New Collection 2026
            </div>

            <h1 className="text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tighter">
              Step Into <br />
              <span className="text-[#f06225]">Your Best</span>
            </h1>

            <p className="text-gray-400 text-lg max-w-md leading-relaxed">
              Premium footwear for every step of your journey. From athletic performance to everyday comfort.
            </p>

            <div className="flex items-center gap-4 pt-4">
              <Link to="/shop" className="bg-[#f06225] hover:bg-[#d9561f] px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all hover:scale-105">
                Shop Now <ArrowRight size={20} />
              </Link>
              <Link to="/categories" className="border border-gray-700 hover:border-white px-8 py-4 rounded-full font-bold transition-all">
                Browse Categories
              </Link>
            </div>
          </div>

         
          <div className="w-full lg:w-1/2 relative mt-20 lg:mt-0 flex justify-center">
         
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%]  -rotate-12 rounded-3xl z-0 shadow-2xl shadow-red-600/20"></div>

          
            <img
              src="https://images.microcms-assets.io/assets/1775a3633c8b428d9f011c6a758a8a5c/2ba26d16ee6a44d78f843afdef2d1203/A.jpeg?w=1500&fm=webp"
              alt="Nike Red Shoe"
              className="relative z-10 w-[110%] drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] rotate-[-15deg] hover:rotate-0 transition-transform duration-700 cursor-pointer"
            />

            <div className="absolute top-10 left-0 z-20 bg-white/10 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center gap-3 shadow-2xl">
              <div className="bg-green-500 p-1.5 rounded-full text-white">
                <CheckCircle2 size={16} />
              </div>
              <div>
                <p className="text-xs font-bold">Free Shipping</p>
                <p className="text-[10px] text-gray-400">Orders over $75</p>
              </div>
            </div>

         
            <div className="absolute top-0 right-10 z-20 bg-orange-500 p-5 rounded-full aspect-square flex flex-col items-center justify-center text-center shadow-lg shadow-orange-500/40 animate-pulse">
              <p className="text-[10px] uppercase font-black leading-none">Up to</p>
              <p className="text-xl font-black">40%</p>
              <p className="text-[10px] uppercase font-black leading-none">Off</p>
            </div>

            
            <div className="absolute bottom-10 right-0 z-20 bg-white/10 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center gap-3 shadow-2xl">
              <div className="bg-orange-500 p-1.5 rounded-full text-white">
                <RotateCcw size={16} />
              </div>
              <div>
                <p className="text-xs font-bold">Easy Returns</p>
                <p className="text-[10px] text-gray-400">60-day guarantee</p>
              </div>
            </div>
          </div>

        </main>
      </div>
      <CategorySection />
      <div id="trust-section">
        <TrustSection />
      </div>
      <Testimonials />
      <Footer />
    </>


  );

};

export default Home;