
import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Star, Filter, LayoutGrid, List } from 'lucide-react';
import { Heart, ShoppingCart, Menu, RotateCcw, CheckCircle2 } from 'lucide-react';
import Footer from './Footer';
import { Link, useNavigate, } from 'react-router-dom';
import { useCart } from "../CartContext";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useWishlist } from '../WishlistContext';

const Shop = () => {

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const [showSaleOnly, setShowSaleOnly] = useState(false);
    const [selectedPrices, setSelectedPrices] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All Products');
    const [loading, setLoading] = useState(true);
    const [showNewOnly, setShowNewOnly] = useState(false);
    const [showBestsellersOnly, setShowBestsellersOnly] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([]); 
    
    const { wishlist, toggleWishlist, isFavorited } = useWishlist();

    const { addToCart, cart } = useCart();
    const navigate = useNavigate();
 
    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory, searchQuery, showNewOnly, showSaleOnly, selectedPrices]); 


    const handlePriceChange = (range) => {
        if (selectedPrices.includes(range)) {
            setSelectedPrices(selectedPrices.filter(p => p !== range));
        } else {
            setSelectedPrices([...selectedPrices, range]);
        }
    };



    const handleAdd = (product) => {
       
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }

        addToCart({
            productId: product._id, 
            name: product.name,
            price: product.price,
            image: product.img,   
            size: "9.5",        
            color: "Original"      
        });
    };

   
    const isLoggedIn = localStorage.getItem('token');

   
    const handleLogout = () => {
        localStorage.removeItem('token'); 
        window.location.href = '/login'
    }



    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const categoryParam = params.get('category');
        const filterParam = params.get('filter');
        const searchParam = params.get('search');
        const sortParam = params.get('sort');
       
        if (categoryParam) {
            setActiveCategory(categoryParam);
        }

        if (filterParam === 'new') {
            setShowNewOnly(true);
            setShowSaleOnly(false); 
            setShowBestsellersOnly(false);
            setActiveCategory('All Products');
        }
        if (sortParam === 'bestSellers') {
            setShowBestsellersOnly(true);
            setShowNewOnly(false);
            setShowSaleOnly(false);
            setActiveCategory('All Products');
        }

        if (filterParam === 'sale') {
            setShowSaleOnly(true);
            setShowNewOnly(false); 
            setShowBestsellersOnly(false);
            setActiveCategory('All Products');
        }
        if (searchParam) {
            setSearchQuery(searchParam);
            setIsSearchOpen(true);
        }
    }, [location]);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
               
                const res = await axios.get('http://localhost:5000/api/products');
                setProducts(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Fetch error:", err);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);
    const productsPerPage = 6;



    const filteredProducts = products.filter(p => {
        const searchMatch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
   
        const categoryMatch = activeCategory === 'All Products' ||
            p.category.toLowerCase() === activeCategory.toLowerCase();

        const priceMatch = selectedPrices.length === 0 || selectedPrices.some(range => {
            if (range === 'Under $100') return p.price < 100;
            if (range === '$100 - $150') return p.price >= 100 && p.price <= 150;
            if (range === '$150 - $200') return p.price > 150 && p.price <= 200;
            if (range === '$200+') return p.price > 200;
            return false;
        });


        const isNew = p.badge && p.badge.trim().toUpperCase() === 'NEW';
        const newArrivalMatch = !showNewOnly || isNew;
        const saleMatch = !showSaleOnly || (p.badge && p.badge.trim().toUpperCase() === 'SALE');
        const bestsellerMatch = !showBestsellersOnly || p.bestseller === true;
      
        return categoryMatch && priceMatch && newArrivalMatch && saleMatch && searchMatch && bestsellerMatch;
    });


    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);



    const categoryCounts = React.useMemo(() => {
        const counts = {};

     
        counts['All Products'] = products.length;

        products.forEach(p => {
           
            if (p.category) {
                const cat = p.category.trim().toLowerCase();
                if (cat === 'sneakers') counts['Sneakers'] = (counts['Sneakers'] || 0) + 1;
                else if (cat === 'running') counts['Running'] = (counts['Running'] || 0) + 1;
                else if (cat === 'basketball') counts['Basketball'] = (counts['Basketball'] || 0) + 1;
                else if (cat === 'casual') counts['Casual'] = (counts['Casual'] || 0) + 1;
                else if (cat === 'boots') counts['Boots'] = (counts['Boots'] || 0) + 1;
                else if (cat === 'sandals') counts['Sandals'] = (counts['Sandals'] || 0) + 1;
            }
        });

        return counts;
    }, [products]);

    if (loading) return <div className="h-screen bg-[#05070a] flex items-center justify-center text-white">Loading...</div>;


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
                    <li
                        onClick={() => {
                            
                            setActiveCategory('All Products');
                            setShowNewOnly(false);
                            setShowSaleOnly(false);
                            setSelectedPrices([]); 
                        }}
                        className={`cursor-pointer transition ${location.pathname === '/shop' && !showNewOnly && !showSaleOnly
                            ? 'text-[#f06225] font-bold'
                            : 'hover:text-white text-gray-300'
                            }`}
                    >
                        Shop
                    </li>
                    <Link to="/categories" className="hover:text-orange-500  cursor-pointer transition">Categories</Link>
                    <li
                        onClick={() => {
                            setActiveCategory('All Products');
                            setShowNewOnly(true);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`cursor-pointer transition ${showNewOnly ? 'text-orange-500 font-bold' : 'hover:text-white'}`}
                    >
                        New Arrivals
                    </li>
                    <li
                        onClick={() => {
                            setActiveCategory('All Products');
                            setShowSaleOnly(true);
                            setShowNewOnly(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`cursor-pointer transition ${showSaleOnly ? 'text-orange-500 font-bold' : 'hover:text-orange-500'
                            }`}
                    >
                        Sale
                    </li>
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
            <div className="min-h-screen bg-[#05070a] text-white pt-10 pb-10">
                <div className="max-w-7xl mx-auto px-6">
                 
                    <div className="mb-12">

                        <h1 className="text-5xl font-bold tracking-tight mb-2">Shop All</h1>
                        <p className="text-gray-400 text-sm">Browse our complete collection of premium footwear</p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-10">

                      
                        <aside className="w-full lg:w-64 space-y-10 sticky top-20 self-start">
                          
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-gray-900 pb-2">
                                    Categories
                                </h3>
                                <ul className="space-y-4">
                                    {['All Products', 'Running', 'Sneakers', 'Basketball', 'Casual', 'Boots', 'Sandals'].map((cat) => (
                                        <li
                                            key={cat}
                                            onClick={() => setActiveCategory(cat)}
                                            className={`flex justify-between items-center cursor-pointer text-sm transition-colors ${activeCategory === cat
                                                    ? 'text-[#f06225] font-bold'
                                                    : 'text-gray-500 hover:text-white'
                                                }`}
                                        >
                                            {cat}
                                          
                                            <span className="text-[10px] opacity-50">{categoryCounts[cat] || 0}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-gray-900 pb-2">
                                    Quick Filters
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => setShowNewOnly(!showNewOnly)}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold border-none transition-all ${showNewOnly ? 'bg-orange-600 text-white' : 'bg-gray-900 text-gray-400'
                                            }`}
                                    >
                                        New Arrivals
                                    </button>
                                    <button
                                        onClick={() => { setShowSaleOnly(!showSaleOnly); setShowNewOnly(false); }}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold border-none transition-all ${showSaleOnly ? 'bg-orange-600 text-white' : 'bg-gray-900 text-gray-400'
                                            }`}
                                    >
                                        On Sale
                                    </button>
                                </div>
                            </div>

                
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-gray-900 pb-2">
                                    Price Range
                                </h3>
                                <div className="space-y-3">
                                    {['Under $100', '$100 - $150', '$150 - $200', '$200+'].map((range) => (
                                        <label key={range} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={selectedPrices.includes(range)}
                                                onChange={() => handlePriceChange(range)}
                                                className="w-4 h-4 rounded border-gray-800 bg-gray-900 text-[#f06225] focus:ring-0 transition-all"
                                            />
                                            <span className={`text-sm transition-colors ${selectedPrices.includes(range) ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'
                                                }`}>
                                                {range}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </aside>

               
                        <main className="flex-1">
                      
                            <div className="flex justify-between items-center mb-8 bg-gray-900/20 p-4 rounded-2xl border border-gray-900">
                                <p className="text-sm text-gray-400">
                                    Showing <span className="text-white font-bold">{filteredProducts.length} Products</span>
                                </p>

                            </div>

                          
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                                {currentProducts.map((p) => (
                                    <div key={p._id} className="group cursor-pointer">
                                        <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-gray-900 mb-4 group">
                                          
                                            {p.badge && (
                                                <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                                                    <span className={`text-[10px] font-black px-3 py-1 rounded-lg shadow-xl uppercase tracking-widest ${p.badge === 'NEW' ? 'bg-green-500 text-white' : 'bg-[#f06225] text-white'}`}>
                                                        {p.badge}
                                                    </span>
                                                    {p.bestseller && (
                                                        <span className="bg-yellow-500 text-black text-[9px] font-black px-2 py-1 rounded-lg uppercase w-fit">
                                                            Bestseller
                                                        </span>
                                                    )}
                                                </div>
                                            )}

                               
                                            <img
                                                src={p.img}
                                                alt={p.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />

                                          
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center p-6 z-10">
                                                <div className="flex w-full items-center gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">

                                                 
                                                    <button
                                                        onClick={() => addToCart(p)}
                                                        className="flex-1 flex items-center justify-center gap-2 bg-white text-black py-4 rounded-2xl font-bold shadow-xl hover:bg-[#f06225] hover:text-white transition-all active:scale-95"
                                                    >
                                                        <ShoppingCart size={18} />
                                                        Add to Cart
                                                    </button>

                                                  
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            if (!isLoggedIn) return navigate('/login');
                                                            toggleWishlist(p);
                                                        }}
                                                        className={`aspect-square p-4 rounded-2xl transition-all shadow-xl active:scale-95 ${isFavorited(p._id)
                                                                ? 'bg-red-500 text-white'
                                                                : 'bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white hover:text-black'
                                                            }`}
                                                    >
                                                        <Heart size={20} fill={isFavorited(p._id) ? "white" : "none"} />
                                                    </button>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="px-2">
                                            <div className="flex justify-between items-center mb-1">
                                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{p.category}</p>
                                                <div className="flex items-center gap-1">
                                                    <Star size={12} fill="#f06225" color="#f06225" />
                                                    <span className="text-xs font-bold">{p.rating}</span>
                                                </div>
                                            </div>
                                            <h3 className="font-bold text-lg mb-2 group-hover:text-[#f06225] transition-colors">{p.name}</h3>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xl font-bold">${p.price}</span>
                                                    {p.oldPrice && <span className="text-sm text-gray-600 line-through">${p.oldPrice}</span>}
                                                </div>
                                                <div className="flex -space-x-1">
                                                    {p.colors.map((c, i) => (
                                                        <div key={i} className={`w-3 h-3 rounded-full ${c} ring-2 ring-[#05070a]`}></div>
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-[10px] text-gray-600 mt-3 font-medium uppercase tracking-widest">{p.stock} Available</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <div className="mt-20 flex justify-center gap-2">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                                        <button
                                            key={num}
                                            onClick={() => {
                                                setCurrentPage(num);
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }}
                                            className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${currentPage === num
                                                    ? 'bg-[#f06225] text-white shadow-lg shadow-orange-950/20'
                                                    : 'bg-gray-900 text-gray-500 hover:text-white hover:bg-gray-800'
                                                }`}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Shop;
