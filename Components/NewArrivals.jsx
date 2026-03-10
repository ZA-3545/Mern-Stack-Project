import React, { useState, useEffect } from 'react';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from "../CartContext";
import { useWishlist } from '../WishlistContext';

const NewArrivals = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const { toggleWishlist, isFavorited } = useWishlist();
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('token');

    useEffect(() => {
        const fetchNewArrivals = async () => {
            try {
                const res = await axios.get('https://mern-stack-project-1-q0q4.onrender.com/api/products');
               
                const newOnly = res.data.filter(p => p.badge && p.badge.toUpperCase() === 'NEW');
             
                setProducts(newOnly.slice(0, 4));
                setLoading(false);
            } catch (err) {
                console.error("Error fetching new arrivals:", err);
                setLoading(false);
            }
        };
        fetchNewArrivals();
    }, []);

    if (loading) return <div className="bg-[#05070a] py-20 text-center text-white">Loading Fresh Drops...</div>;

    return (
        <section className="max-w-8xl mx-auto px-10 py-20 bg-[#05070a] text-white">
          
            <div className="flex justify-between items-end mb-12">
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-green-500 text-xs font-bold uppercase tracking-widest">Just Dropped</span>
                    </div>
                    <h2 className="text-4xl font-bold tracking-tight">New Arrivals</h2>
                    <p className="text-gray-400 text-sm mt-2">Fresh styles just landed — be the first to rock them</p>
                </div>
                <Link to="/shop?filter=new" className="text-[#f06225] text-sm font-bold flex items-center gap-1 hover:underline group">
                    Shop New Arrivals
                    <span className="text-xl group-hover:translate-x-1 transition-transform">›</span>
                </Link>
            </div>

            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((p) => (
                    <div key={p._id} className="group cursor-pointer">
                     
                        <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-gray-900 mb-5">
                            <span className="absolute top-4 left-4 z-20 bg-green-500 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase">
                                {p.badge}
                            </span>

                            <img
                                src={p.img}
                                alt={p.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                                <div className="flex gap-2 translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                                    <button
                                        onClick={() => addToCart(p)}
                                        className="flex-1 bg-white text-black py-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#f06225] hover:text-white transition-all shadow-xl"
                                    >
                                        <ShoppingCart size={18} />
                                        Add to Cart
                                    </button>

                                    <button
                                        onClick={() => isLoggedIn ? toggleWishlist(p) : navigate('/login')}
                                        className={`p-4 rounded-2xl transition-all border border-white/10 ${isFavorited(p._id) ? 'bg-red-500 text-white' : 'bg-white/20 backdrop-blur-xl text-white'}`}
                                    >
                                        <Heart size={20} fill={isFavorited(p._id) ? "currentColor" : "none"} />
                                    </button>
                                </div>
                            </div>
                        </div>

                    
                        <div className="flex justify-between items-start px-1">
                            <div>
                                <Link to={`/shop?category=${p.category}`} className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1 hover:text-orange-500">
                                    {p.category}
                                </Link>
                                <h4 className="font-bold text-lg group-hover:text-[#f06225] transition-colors">{p.name}</h4>
                                <div className="flex items-center gap-4 mt-2">
                                    <p className="font-bold text-xl">${p.price}</p>
                                    <div className="flex items-center gap-1 bg-gray-900 px-2 py-1 rounded-lg">
                                        <Star size={12} fill="#f06225" color="#f06225" />
                                        <span className="text-[10px] font-bold text-gray-300">{p.rating}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex -space-x-1">
                                {p.colors && p.colors.map((color, idx) => (
                                    <div key={idx} className={`w-3 h-3 rounded-full ${color} ring-2 ring-[#05070a]`}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default NewArrivals;