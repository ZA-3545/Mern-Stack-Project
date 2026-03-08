import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);


useEffect(() => {
  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    
    
    if (!token) return; 

    try {
      const res = await axios.get('http://localhost:5000/api/cart', {
        headers: { 
          'x-auth-token': token 
        }
      });
      setCart(res.data); 
    } catch (err) {
      console.error("Fetch cart failed", err);
    }
  };

  fetchCart();
}, []);

const updateQuantity = async (itemId, newQuantity) => {
    console.log("Attempting to update Item ID:", itemId); 
    if (!itemId) {
        console.error("Error: itemId is undefined!");
        return;
    }
    try {
        const res = await axios.put(
            `http://localhost:5000/api/cart/${itemId}`,
            { quantity: newQuantity },
            { headers: { 'x-auth-token': localStorage.getItem('token') } }
        );
        setCart(res.data);
    } catch (err) {
        console.error("Update failed", err.response?.data);
    }
};

const addToCart = async (product) => {
  const token = localStorage.getItem('token');
  if (!token) return alert("Please login first!");

  console.log("Product received in Context:", product);

  try {
    const res = await axios.post('http://localhost:5000/api/cart', {

      productId: product._id || product.productId, 
      quantity: 1,
      image: product.img || product.image,
      size: product.size || "9.5",
      color: product.color || (product.colors?.[0]) || "Black"
    }, {
      headers: { 
        'x-auth-token': token 
      }
    });
    
    setCart(res.data); 
  } catch (err) {
    console.error("Add to cart failed", err.response?.data || err);
  }
};

const clearCart = async () => {
  const token = localStorage.getItem('token');
  if (!token) return;

  try {
    const res = await axios.delete('http://localhost:5000/api/cart', {
      headers: { 'x-auth-token': token }
    });

    setCart(res.data);
  } catch (err) {
    console.error("Clear cart failed:", err.response?.data || err.message);
  }
};

const removeFromCart = async (itemId) => {
  try {
    const res = await axios.delete(
      `http://localhost:5000/api/cart/${itemId}`,
      {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      }
    );

    setCart(res.data); 
  } catch (err) {
    console.error("Remove item failed", err.response?.data);
  }
};

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

