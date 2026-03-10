import React, { useState } from 'react'; 
import { User, Mail, Lock, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const SignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match!");
    }

    try {
    
      const response = await axios.post('https://mern-stack-project-1-q0q4.onrender.com/api/users/signup', {
        name: formData.fullName,
        email: formData.email,
        password: formData.password
      });

      if (response.status === 201 || response.status === 200) {
        alert("Account Created!");
        navigate('/');
      }
    } catch (err) {
      console.error("Signup Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-sm">
        <div className="text-center">
          <h2 className="text-4xl font-black text-[#333333] mb-2">Sign Up</h2>
          <p className="text-gray-400 text-sm">Create your account to start shopping</p>
        </div>

        <form className="mt-10 space-y-7" onSubmit={handleSubmit}>
          <div className="space-y-6">

    
            <div className="relative border-b border-gray-300 focus-within:border-purple-500 transition-colors pb-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Full Name</label>
              <div className="flex items-center">
                <span className="text-gray-400 mr-3"><User size={18} /></span>
                <input
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 focus:outline-none text-sm"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

       
            <div className="relative border-b border-gray-300 focus-within:border-purple-500 transition-colors pb-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Email Address</label>
              <div className="flex items-center">
                <span className="text-gray-400 mr-3"><Mail size={18} /></span>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 focus:outline-none text-sm"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="relative border-b border-gray-300 focus-within:border-purple-500 transition-colors pb-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Password</label>
              <div className="flex items-center">
                <span className="text-gray-400 mr-3"><Lock size={18} /></span>
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 focus:outline-none text-sm"
                  placeholder="Create a password"
                />
              </div>
            </div>

            <div className="relative border-b border-gray-300 focus-within:border-purple-500 transition-colors pb-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Confirm Password</label>
              <div className="flex items-center">
                <span className="text-gray-400 mr-3"><ShieldCheck size={18} /></span>
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 focus:outline-none text-sm"
                  placeholder="Repeat your password"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-full text-white bg-gradient-to-r from-[#49e0e2] via-[#a367f0] to-[#ff48fb] hover:opacity-90 transition-all focus:outline-none shadow-lg active:scale-[0.98] uppercase tracking-wider"
            >
              CREATE ACCOUNT
            </button>
          </div>
        </form>
       
      </div>
    </div>
  );
};

export default SignUpPage;