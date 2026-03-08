import React from 'react';
import { Search, Heart, ShoppingCart, Trash2, ArrowLeft, Star } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from "../CartContext";
import { useWishlist } from '../WishlistContext'; 
import Footer from './Footer';
import { useState } from "react";
const Wishlist = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { addToCart, cart } = useCart();
  
    const { wishlist, toggleWishlist } = useWishlist();
    const navigate = useNavigate();

    const handleAdd = (item) => {
   
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }

        addToCart(item);
    };
    const isLoggedIn = localStorage.getItem('token');
    const handleLogout = () => {
        localStorage.removeItem('token'); 
        window.location.href = '/login'
    }

    return (

        <div className="min-h-screen bg-[#05070a] text-white">
           
            <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-[#05070a] backdrop-blur-md text-white border-b border-gray-800">

               
                <div className="flex items-center gap-2 cursor-pointer">
                    <div className="bg-orange-600 p-1.5 rounded-full">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                        </svg>
                    </div>
                    <Link to="/" className="text-2xl font-bold tracking-tight">STEP to grow</Link>
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
            <div className="px-8 py-6  border-gray-800 ">
                <Link to="/shop" className="flex items-center gap-2 text-gray-400 hover:text-white transition">
                    <ArrowLeft size={20} />
                    <span className="text-sm font-medium">Back to Shop</span>
                </Link>
                <h1 className="text-6xl pt-8  font-bold tracking-tight">My Wishlist  {wishlist.length}</h1>
                <div className="w-20"></div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-12">
                {wishlist.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="bg-gray-900/50 p-6 rounded-full mb-6">
                            <Heart size={48} className="text-gray-700" />
                        </div>
                        <h2 className="text-3xl font-bold mb-2">Your wishlist is empty</h2>
                        <p className="text-gray-500 mb-8 max-w-md">
                            Save items you love in your wishlist. Review them anytime and easily move them to the cart.
                        </p>
                        <Link to="/shop" className="bg-[#f06225] px-8 py-3 rounded-full font-bold hover:bg-[#d4521d] transition">
                            Explore Products
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {wishlist.map((item) => (
                            <div key={item._id} className="group bg-gray-900/30 border border-gray-800 rounded-[2rem] overflow-hidden hover:border-gray-700 transition-all">
                                <div className="relative aspect-square overflow-hidden bg-gray-900">
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <button
                                        onClick={() => toggleWishlist(item)}
                                        className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full text-white hover:bg-red-500 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>

                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">
                                                {item.category}
                                            </p>
                                            <h3 className="font-bold text-lg">{item.name}</h3>
                                        </div>
                                        <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-lg">
                                            <Star size={12} fill="#f06225" color="#f06225" />
                                            <span className="text-xs font-bold">{item.rating}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="text-xl font-bold">${item.price}</span>
                                        {item.oldPrice && (
                                            <span className="text-sm text-gray-600 line-through">${item.oldPrice}</span>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => handleAdd(item)}
                                        className="w-full flex items-center justify-center gap-2 bg-white text-black py-3 rounded-xl font-bold hover:bg-[#f06225] hover:text-white transition-all shadow-lg"
                                    >
                                        <ShoppingCart size={18} />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Wishlist;