import { Instagram, Facebook, Youtube, Twitter, Send } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
const Footer = () => {
  const location = useLocation();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();

   
    if (!email) {
      alert("Please enter an email address.");
      return;
    }

    alert("You subscribed successfully!");
    setEmail(''); 
  };
  return (

    <footer className="bg-[#0f0f0f] text-white pt-20 pb-10 border-t border-gray-900">

   
      <div className="max-w-7xl mx-auto px-10 mb-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-gray-900/30 p-10 rounded-3xl border border-gray-800">
          <div>
            <h3 className="text-3xl font-bold tracking-tight mb-2">Join the Step to grow Club</h3>
            <p className="text-gray-400">Get 15% off your first order, plus early access to new drops.</p>
          </div>

          <div className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#0d1117] border border-gray-800 px-6 py-3 rounded-xl focus:outline-none focus:border-orange-500 w-full md:w-80"
            />
            <button
              onClick={handleSubscribe}
              className="bg-[#f06225] hover:bg-[#d9561f] px-8 py-3 rounded-xl font-bold transition-all"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

   
      <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-[#f06225] p-1.5 rounded-lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
            </div>
            <span className="text-xl font-bold uppercase tracking-tighter">Step to grow</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Premium footwear for every step of your journey. From athletic performance to everyday comfort.
          </p>
          <div className="flex gap-5 text-gray-400">
            <Instagram size={20} className="hover:text-white cursor-pointer transition" />
            <Facebook size={20} className="hover:text-white cursor-pointer transition" />
            <Twitter size={20} className="hover:text-white cursor-pointer transition" />
            <Youtube size={20} className="hover:text-white cursor-pointer transition" />
          </div>
        </div>

     
        <div>
          <h4 className="font-bold mb-6">Shop</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            {['Running', 'Sneakers', 'Basketball', 'Casual', 'Boots'].map((cat) => (
              <li key={cat}>
                <Link
                  onClick={() => window.scrollTo(0, 0)}
                  to={`/shop?category=${cat}`}
                  className="hover:text-white cursor-pointer transition-colors"
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

       
        <div>
          <h4 className="font-bold mb-6">Help</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            {['FAQ', 'Shipping & Returns', 'Size Guide', 'Contact Us', 'Track Order'].map((item) => (
              <li key={item}>
                <Link
                  to="/#trust-section"
                  onClick={(e) => {
                 
                    if (window.location.pathname === '/') {
                      e.preventDefault();
                      document.getElementById('trust-section')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="hover:text-white cursor-pointer"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
    
        <div>
          <h4 className="font-bold mb-6">About</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="hover:text-white cursor-pointer">
              <Link to="/about" onClick={() => window.scrollTo(0, 0)} className="hover:text-white cursor-pointer transition-colors">
                Our Story
              </Link>
            </li>
            <li className="hover:text-white cursor-pointer">
              <Link to="/about" onClick={() => window.scrollTo(0, 0)} className="hover:text-white cursor-pointer transition-colors">
                Sustainability
              </Link>
            </li>
            <li className="hover:text-white cursor-pointer">
              <Link to="/about" onClick={() => window.scrollTo(0, 0)} className="hover:text-white cursor-pointer transition-colors">
                Athletes
              </Link>
            </li>
            <li className="hover:text-white cursor-pointer">
              <Link to="/about" onClick={() => window.scrollTo(0, 0)} className="hover:text-white cursor-pointer transition-colors">
                Careers
              </Link>
            </li>
            <li className="hover:text-white cursor-pointer">
              <Link to="/about" onClick={() => window.scrollTo(0, 0)} className="hover:text-white cursor-pointer transition-colors">
                Store Locator
              </Link>
            </li>
          </ul>
        </div>
      </div>

   
      <div className="max-w-7xl mx-auto px-10 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-xs text-gray-500">© 2026 Step to grow. All rights reserved.</p>


        <div className="flex items-center gap-3">
       
          <div className="bg-[#1a1f71] px-3 py-1.5 rounded-lg flex items-center justify-center h-10 w-16">
            <span className="text-white font-black italic text-sm tracking-tighter">VISA</span>
          </div>

        
          <div className="bg-white px-3 py-1.5 rounded-lg flex items-center justify-center h-10 w-16 relative">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-[#eb001b] rounded-full mr-[-8px]"></div>
              <div className="w-4 h-4 bg-[#f79e1b] rounded-full opacity-90"></div>
            </div>
          </div>

          <div className="bg-[#016fd0] px-3 py-1.5 rounded-lg flex items-center justify-center h-10 w-16">
            <span className="text-white font-extrabold text-[10px] leading-none text-center">AMEX</span>
          </div>

          
          <div className="bg-black px-3 py-1.5 rounded-lg flex items-center justify-center h-10 w-16 border border-gray-800">
            <span className="text-white font-bold text-sm">Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;