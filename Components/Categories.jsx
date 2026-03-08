import { Search, Heart, ShoppingCart, Star, Menu, RotateCcw, CheckCircle2 } from 'lucide-react';
import Footer from './Footer';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../CartContext'
import { useWishlist } from '../WishlistContext';
import axios from 'axios';
import { useState, useEffect } from "react";
const cat = [
  { name: 'Running', count: 48, desc: 'Performance shoes built for speed and endurance', img: 'https://png.pngtree.com/thumb_back/fh260/background/20240621/pngtree-running-shoes-with-mesh-and-black-and-white-soles-close-up-image_15805469.jpg', color: 'from-red-900/90', gridClass: 'md:col-span-2 md:row-span-2 h-[660px]' },
  { name: 'Sneakers', count: 86, desc: 'Classic and contemporary streetwear styles', img: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=600', color: 'from-orange-900/80', gridClass: 'h-[320px]' },
  { name: 'Basketball', count: 32, desc: 'Court-ready shoes with superior ankle support', img: 'https://images.unsplash.com/photo-1582229911941-ad25e99c9ead?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJhc2tldGJhbGwlMjBzaG9lc3xlbnwwfHwwfHx8MA%3D%3D', color: 'from-blue-900/80', gridClass: 'h-[320px]' },
  { name: 'Casual', count: 64, desc: 'Everyday comfort meets effortless style', img: 'https://s.alicdn.com/@sc04/kf/H618b385008ed40718331e2ed217225d4f/Italian-Luxury-Men-s-Suede-Nubuck-Leather-Flat-Sneakers-Old-Money-Retro-Style-Lace-up-Classic-Casual-Trainers-Soft-Special-Logo.jpg', color: 'from-yellow-900/80', gridClass: 'h-[320px]' },
  { name: 'Boots', count: 28, desc: 'Rugged style for any terrain', img: 'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/F77990s.jpg?im=Resize,width=750', color: 'from-gray-900/80', gridClass: 'h-[320px]' },
  { name: 'Sandals', count: 24, desc: 'Breathable comfort for warmer days', img: 'https://www.borjan.com.pk/cdn/shop/files/4_4a080972-ef03-4350-935e-21b90de9de1d.png?v=1757098336&width=1445', color: 'from-stone-900/80', gridClass: 'h-[320px]' },
];

const Categories = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching for counts:", err);
      }
    };
    fetchProducts();
  }, []);
  const getCount = (categoryName) => {
    return products.filter(p => p.category.toLowerCase() === categoryName.toLowerCase()).length;
  };

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { cart } = useCart();
  const { wishlist } = useWishlist();

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
          <Link
            to="/categories"
            className={`${location.pathname === '/categories' ? 'text-orange-500' : 'text-gray-300'} hover:text-orange-500 transition`}
          >
            Categories
          </Link>
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
      <div className="bg-[#05070a] text-white">
        <section className="max-w-7xl mx-auto px-6 py-20">
    
          <div className="mb-12">

            <h2 className="text-5xl font-bold tracking-tight mb-3">Shop by Category</h2>
            <p className="text-gray-400 text-sm">Find the perfect shoes for every occasion and activity</p>
          </div>

         
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 auto-rows-min">
            {cat.map((cat, index) => (
              <Link
                to={`/shop?category=${cat.name}`}
                key={index}
                className={`group relative rounded-4xl overflow-hidden cursor-pointer shadow-2xl transition-all duration-500 ${cat.gridClass}`}>
           
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                <div className={`absolute inset-0 bg-linear-to-t ${cat.color} via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500`}></div>

            
                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                  <span className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-[11px] font-medium px-4 py-1.5 rounded-full w-fit mb-4 uppercase tracking-widest">
                    {getCount(cat.name)} PRODUCTS
                  </span>
                  <h3 className={`${cat.name === 'Running' ? 'text-4xl' : 'text-2xl'} font-bold mb-2`}>
                    {cat.name}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed mb-6 max-w-70 opacity-90 group-hover:opacity-100 transition-opacity">
                    {cat.desc}
                  </p>
                  <button className="text-sm font-black flex items-center gap-2 hover:gap-4 transition-all w-fit">
                    Shop Now <span className="text-xl">→</span>
                  </button>
                </div>
              </Link>
            ))}
          </div>

        
          <div className="mt-20 flex flex-col md:flex-row items-center justify-between p-12 bg-gray-900/20 rounded-[3rem] border border-gray-900">
            <div>
              <h3 className="text-3xl font-bold mb-2">Can't decide?</h3>
              <p className="text-gray-500">Browse all our products or check out our bestsellers</p>
            </div>
            <div className="flex gap-4 mt-6 md:mt-0">
              <Link to="/shop" className="bg-[#f06225] hover:bg-[#d9561f] px-8 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-orange-950/20">
                Shop All
              </Link>
              <Link to="/shop?sort=bestSellers" className="border border-gray-700 hover:border-white px-8 py-3 rounded-2xl font-bold transition-all">
                View Best Sellers
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Categories;