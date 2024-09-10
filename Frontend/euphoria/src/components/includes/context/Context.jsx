import React, { createContext, useContext, useState } from 'react';

// Wishlist context
const WishlistContext = createContext();

// Cart context
const CartContext = createContext();

// Wishlist Provider
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


export const CartProvider = ({ children }) => {
    // Initialize cart state from localStorage
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);

    // Function to add an item to the cart
    const addToCart = (product, quantity = 1) => {
        // Check if the product already exists in the cart
        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            // If it exists, update the quantity
            const updatedCart = cart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
            );
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        } else {
            // If it does not exist, add the new product with quantity
            const newProduct = { ...product, quantity };
            const updatedCart = [...cart, newProduct];
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    };

    // Function to remove an item from the cart
    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // Function to clear the cart
    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};


// Custom hooks for using the contexts
export const useWishlist = () => useContext(WishlistContext);
export const useCart = () => useContext(CartContext);



