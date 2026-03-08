import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(() => {
        const saved = localStorage.getItem('wishlist');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const toggleWishlist = (product) => {
        const isInside = wishlist.some(item => item._id === product._id);
        if (isInside) {
            setWishlist(wishlist.filter(item => item._id !== product._id));
        } else {
            setWishlist([...wishlist, product]);
        }
    };

    const isFavorited = (productId) => wishlist.some(item => item._id === productId);

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist, isFavorited }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);