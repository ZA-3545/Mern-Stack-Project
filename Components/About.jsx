import React from 'react';
import { Target, Users, Zap, Globe, ArrowRight } from 'lucide-react';
import { Search, Heart, ShoppingCart, Star, Menu, RotateCcw, CheckCircle2 } from 'lucide-react';
import Footer from './Footer';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../CartContext'
import { useWishlist } from '../WishlistContext';
import { useState } from "react";

const reviews = [
  { name: "Marcus Chen", role: "Marathon Runner", text: "Stride has completely transformed my running experience. The Velocity Runner Pro helped me PR by 8 minutes.", img: "https://i.pravatar.cc/150?u=marcus" },
  { name: "Emily Rodriguez", role: "Fitness Instructor", text: "I wear Stride shoes for all my classes. They are versatile, stylish, and most importantly, my feet never hurt.", img: "https://i.pravatar.cc/150?u=emily" },
  { name: "David Kim", role: "Sneaker Enthusiast", text: "The quality and attention to detail is unmatched. Stride has quickly become my go-to brand for daily wear.", img: "https://i.pravatar.cc/150?u=david" }
];


const About = () => {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { wishlist } = useWishlist();
  const navigate = useNavigate();
  const { cart } = useCart();
  
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
          <Link
            to="/about"
            className={`${location.pathname === '/about' ? 'text-orange-500' : 'text-gray-300'} hover:text-orange-500 cursor-pointer transition`}
          >
            About
          </Link>
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
      <div className="min-h-screen bg-[#05070a] text-white">

     
        <section className="relative py-32 px-10 overflow-hidden border-b border-gray-900">
         
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg width="100%" height="100%">
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <span className="bg-orange-950/40 text-orange-500 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
              Our Story
            </span>
            <h1 className="text-6xl lg:text-8xl font-bold mt-8 mb-10 leading-tight">
              We believe in the power of <br />
              <span className="text-[#f06225]">the perfect step</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl leading-relaxed">
              Founded in 2018, Stride was born from a simple idea: footwear should never make you choose
              between style and comfort. Every shoe we create is designed to move with you, support you,
              and help you look great doing it.
            </p>
          </div>
        </section>

       
        <section className="py-20 px-10 border-b border-gray-900 bg-gray-900/10">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            <div>
              <h3 className="text-5xl font-black text-white mb-2">2018</h3>
              <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">Year Founded</p>
            </div>
            <div>
              <h3 className="text-5xl font-black text-white mb-2">1M+</h3>
              <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">Happy Customers</p>
            </div>
            <div>
              <h3 className="text-5xl font-black text-white mb-2">50+</h3>
              <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">Unique Designs</p>
            </div>
            <div>
              <h3 className="text-5xl font-black text-white mb-2">24/7</h3>
              <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">Support</p>
            </div>
          </div>
        </section>


        <section className="py-32 px-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
              <div className="lg:w-1/2">
                <h2 className="text-4xl font-bold mb-8">Performance meets <br /> Everyday Life</h2>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  Whether you're hitting the pavement for a morning run or navigating the city streets,
                  our mission is to provide footwear that adapts to your lifestyle. We use 100%
                  sustainable materials in our latest collections, ensuring that your steps
                  don't just feel good—they do good.
                </p>
                <button className="flex items-center gap-2 text-[#f06225] font-bold hover:gap-4 transition-all">
                  Learn about our sustainability <ArrowRight size={20} />
                </button>
              </div>

              <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: <Zap />, title: "Innovation", text: "Cutting edge cushion technology." },
                  { icon: <Globe />, title: "Eco-Friendly", text: "Recycled oceanic plastics." },
                  { icon: <Target />, title: "Precision", text: "Engineered for maximum grip." },
                  { icon: <Users />, title: "Community", text: "Made for athletes by athletes." }
                ].map((v, i) => (
                  <div key={i} className="bg-gray-900/40 p-8 rounded-3xl border border-gray-800 hover:border-orange-500/50 transition-colors">
                    <div className="text-orange-500 mb-4">{v.icon}</div>
                    <h4 className="font-bold mb-2">{v.title}</h4>
                    <p className="text-xs text-gray-500">{v.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
      <div>
        <section className="max-w mx-auto px-10 py-10 text-center bg-gray-950">
          <span className="bg-orange-950/40 text-orange-500 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
            Customer Love
          </span>
          <h2 className="text-4xl font-bold mt-6 mb-4 text-white">What Our Customers Say</h2>
          <p className="text-gray-400 mb-16">Join thousands of happy customers who have made Stride their go-to brand</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            {reviews.map((rev, i) => (
              <div key={i} className="bg-gray-900/40 border border-gray-800 p-8 rounded-3xl text-left hover:border-orange-500/30 transition-all">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#f06225" color="#f06225" />)}
                </div>
                <p className="text-gray-300 italic mb-8">"{rev.text}"</p>
                <div className="flex items-center gap-4">
                  <img src={rev.img} className="w-12 h-12 rounded-full border-2 border-gray-800" alt={rev.name} />
                  <div>
                    <h4 className="font-bold text-sm text text-lime-100">{rev.name}</h4>
                    <p className="text-xs text-gray-500">{rev.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="text-orange-500 text-sm font-bold hover:underline group pl-300 mt-7">
            View All <span className="text-xl group-hover:translate-x-1 transition-transform">›</span>
          </button>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default About;