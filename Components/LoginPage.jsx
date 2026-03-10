import React, { useState } from 'react'; 
import { User, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const LoginPage = () => {
  
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      
    
      const response = await axios.post('https://mern-stack-project-1-q0q4.onrender.com/api/users', {
        email,
        password
      });

      if (response.status === 200 && response.data.token) {
        alert("Login Successful!");
        localStorage.setItem('token', response.data.token); 
        navigate('/'); 
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
     
      alert(error.response?.data?.message || "Invalid Credentials");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl">
        <div className="text-center">
          <h2 className="text-4xl font-black text-[#333333] mb-12">Login</h2>
        </div>

        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-8">
            <div className="relative border-b border-gray-300 focus-within:border-purple-500 transition-colors pb-2">
              <label className="text-xs text-gray-500 block mb-1">Email</label>
              <div className="flex items-center">
                <span className="text-gray-400 mr-3"><User size={18} /></span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 focus:outline-none text-sm"
                  placeholder="Type your email"
                />
              </div>
            </div>

            <div className="relative border-b border-gray-300 focus-within:border-purple-500 transition-colors pb-2">
              <label className="text-xs text-gray-500 block mb-1">Password</label>
              <div className="flex items-center">
                <span className="text-gray-400 mr-3"><Lock size={18} /></span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 focus:outline-none text-sm"
                  placeholder="Type your password"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-full text-white bg-gradient-to-r from-[#49e0e2] via-[#a367f0] to-[#ff48fb] hover:opacity-90 transition-opacity focus:outline-none shadow-md uppercase tracking-wider"
            >
              LOGIN
            </button>
          </div>
        </form>
        <div className="mt-12 text-center">
          <p className="text-xs text-gray-500 mb-6">Or Sign Up Using</p>
          <div className="flex justify-center gap-4">
           
            
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#3b5998] flex items-center justify-center text-white hover:opacity-80 transition-opacity"
            >
              <span className="font-bold text-lg">f</span>
            </a>

            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#1da1f2] flex items-center justify-center text-white hover:opacity-80 transition-opacity shadow-sm"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
            
           <a 
      href="https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fwww.google.com%2F&dsh=S119141061%3A1772245155511313&ec=futura_exp_og_so_72776762_e&hl=en&ifkv=ASfE1-rvRr1xLk7MWbjmitj7KF3rh3OenZaIsKJSFmDpxIx2cGGDfR5EdUF4lBFiGwE0QOWeXoocdw&passive=true&flowName=GlifWebSignIn&flowEntry=ServiceLogin" 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-[#ea4335] flex items-center justify-center text-white hover:opacity-80 transition-opacity shadow-sm"
    >
      <span className="font-bold text-lg italic">G</span>
    </a>
          </div>
        </div>

      
        <div className="mt-12 text-center">
          <p className="text-xs text-gray-500 mb-6">Or Sign Up Using</p>
       
          <div className="mt-12 text-center">
            <p className="text-xs text-gray-500 mb-2 uppercase tracking-tighter">New here?</p>
            <Link to="/signup" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-full text-white bg-gradient-to-r from-[#49e0e2] via-[#a367f0] to-[#ff48fb] hover:opacity-90 transition-opacity focus:outline-none shadow-md uppercase tracking-wider">
              SIGN UP
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;