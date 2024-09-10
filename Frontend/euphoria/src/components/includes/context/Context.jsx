// context.jsx
import React, { createContext, useContext, useState } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState(() => JSON.parse(localStorage.getItem('wishlist')) || []);

    const addToWishlist = (productId) => {
        const updatedWishlist = wishlistItems.includes(productId)
            ? wishlistItems.filter(id => id !== productId)
            : [...wishlistItems, productId];
        setWishlistItems(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    };

    return (
        <WishlistContext.Provider value={{ wishlistItems, addToWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);
