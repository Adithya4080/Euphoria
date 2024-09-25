import React, { createContext, useContext, useState } from 'react';
import { Store } from'./Store'
import { toast, Bounce } from 'react-toastify'

const WishlistContext = createContext();


export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState(() => JSON.parse(localStorage.getItem('wishlist')) || []);
    const { userData } = useContext(Store)

    const customToast = (message, type) => {
        toast(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            type: type, 
        });
    };

    const addToWishlist = (productId) => {
        if (!userData) {
            customToast("Please log in to add products to wishlist.", "error");
            return;
        }

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



