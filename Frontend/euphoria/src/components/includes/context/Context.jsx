import React, { createContext, useState, useEffect, useContext } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState(() => JSON.parse(localStorage.getItem('wishlist')) || []);

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === 'wishlist') {
                setWishlistItems(JSON.parse(localStorage.getItem('wishlist')) || []);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const addToWishlist = (productId) => {
        const updatedWishlist = wishlistItems.includes(productId)
            ? wishlistItems.filter(id => id !== productId)
            : [...wishlistItems, productId];

        setWishlistItems(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        window.dispatchEvent(new Event('wishlistUpdated'));
    };

    return (
        <WishlistContext.Provider value={{ wishlistItems, addToWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};
