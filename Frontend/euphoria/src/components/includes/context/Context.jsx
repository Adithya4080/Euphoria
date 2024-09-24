import React, { createContext, useContext, useState } from 'react';

// Wishlist context
const WishlistContext = createContext();

// Wishlist Provider
export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState(() => JSON.parse(localStorage.getItem('wishlist')) || []);

    const addToWishlist = (productId) => {
        const updatedWishlist = wishlistItems.includes(productId)
            ? wishlistItems.filter(id => id !== productId)
            : [...wishlistItems, productId];

        setWishlistItems(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));

        const event = new Event ('wishlistUpdated');
        window.dispatchEvent(event);
    };

    return (
        <WishlistContext.Provider value={{ wishlistItems, addToWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

// Custom hooks for using the contexts
export const useWishlist = () => useContext(WishlistContext);



