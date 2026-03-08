import React from 'react'
import About from '../Components/About'
import Categories from '../Components/Categories'
import Shop from '../Components/Shop'
import Cart from '../Components/Cart'
import LoginPage from '../Components/LoginPage'
import SignUpPage from '../Components/SignUpPage'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Homes from '../Components/Home'
import { CartProvider } from '../CartContext';
import Wishlist from '../Components/Wishlist'
import { WishlistProvider } from '../WishlistContext';
import TranstSection from '../Components/TranstSection';
import ScrollToTop from '../Components/ScrollToTop'

const App = () => {
  return (
    <BrowserRouter>
    <ScrollToTop />
     <CartProvider>
      <WishlistProvider>
      <Routes>
    
        <Route path="/" element={<Homes />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<About/>} />
        <Route path="/transt" element={<TranstSection />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/wishlist" element={<Wishlist/>} />
      </Routes>
      </WishlistProvider>
    </CartProvider>
    </BrowserRouter>
   
  )
}

export default App
