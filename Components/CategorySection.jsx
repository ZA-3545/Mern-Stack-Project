import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
const categories = [
  { name: 'Running', count: 48, desc: 'Performance shoes built for speed and endurance', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYf0ujxcAnFpRb5bJ4mFK5WvIa0eDGfNAhNg&s', color: 'from-red-900/80' },
  { name: 'Sneakers', count: 86, desc: 'Classic and contemporary streetwear styles', img: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=600', color: 'from-orange-900/80' },
  { name: 'Basketball', count: 32, desc: 'Court-ready shoes with superior ankle support', img: 'https://media.istockphoto.com/id/153366544/photo/basketball-court.jpg?s=612x612&w=0&k=20&c=_mvaKmjtoC7VyZdS3_XbrFrJkVFLkS1Cs7oVY94J-WU=', color: 'from-blue-900/80' },
  { name: 'Casual', count: 64, desc: 'Everyday comfort meets effortless style', img: 'https://rukminim2.flixcart.com/image/480/640/xif0q/shoe/t/s/f/9-wt-480-9-wugatti-green-original-imah7wyu6se7cyxz.jpeg?q=90', color: 'from-yellow-900/80' },
  { name: 'Boots', count: 28, desc: 'Rugged style for any terrain', img: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=600', color: 'from-gray-900/80' },
  { name: 'Sandals', count: 24, desc: 'Breathable comfort for warmer days', img: 'https://www.borjan.com.pk/cdn/shop/files/1_2fb9bf90-b87e-40eb-ac20-27a9a467a70f.png?v=1757100337', color: 'from-stone-900/80' },
];

const CategorySection = () => {
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

  return (
   <div className="bg-gray-950">
      <section className="max-w-7xl mx-auto px-10 py-20">
        <div className="flex justify-between items-end mb-10 text-white">
          <div>
            <h2 className="text-4xl font-bold tracking-tight mb-2">Shop by Category</h2>
            <p className="text-gray-400 text-sm">Find the perfect pair for every occasion</p>
          </div>
          
          <Link to="/shop" className="text-[#f06225] text-sm font-bold flex items-center gap-1 hover:underline">
            View All <span className="text-lg">›</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
           
            <Link 
              to={`/shop?category=${cat.name}`} 
              key={index} 
              className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-2xl text-white"
            >
              <img src={cat.img} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              
           
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} to-transparent opacity-90 transition-opacity group-hover:opacity-100`}></div>

              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <span className="inline-block bg-white/20 backdrop-blur-md text-[10px] font-bold px-3 py-1 rounded-full w-fit mb-3">
                  {getCount(cat.name)} PRODUCTS
                </span>
                <h3 className="text-2xl font-bold mb-1">{cat.name}</h3>
                <p className="text-xs text-gray-300 leading-relaxed mb-4 max-w-[200px]">{cat.desc}</p>
                <div className="text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all underline-none decoration-[#f06225] underline-offset-4">
                  Shop Now <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CategorySection;

