import React, { useState } from 'react';
import { useCart } from './useCart';
import Navbar from '../../includes/navbar/Navbar';
import Footer from '../../includes/footer/Footer';
import Rectangle from '../../general/Rectangle';
import Heading from '../../general/Heading';

const CartPage = () => {
    const { cart, removeFromCart, clearCart } = useCart();
    const [loadingId, setLoadingId] = useState(null); // Track loading state for each item

    const handleRemove = (productId) => {
        removeFromCart(productId);
    };

    const handleBuyNow = async (product) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please log in to complete your purchase.');
            return;
        }
    
        setLoadingId(product.id); // Set loadingId to the current product ID
    
        try {
            const payload = {
                product_id: product.id,
                quantity: product.quantity || 1, // Default to 1 if quantity is not defined
                size: product.selectedSize || 'default', // Ensure size is defined
            };
    
            const response = await fetch('http://localhost:8000/api/v1/cart/orders/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload),
            });
    
            const result = await response.json();
    
            if (response.ok) {
                clearCart(); // Clear cart after successful purchase
                alert('Purchase successful!');
            } else {
                alert(result.message || 'Failed to complete purchase.');
            }
        } catch (error) {
            console.error('Error making purchase:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setLoadingId(null); // Reset loadingId after the request is complete
        }
    };

    return (
        <>
            <Navbar />
            <div className="wrapper py-10">
                <div className='flex items-center space-x-5 mb-5'>
                    <Rectangle />
                    <Heading text="My Cart" />
                </div>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div className='grid grid-cols-4 gap-4 w-full'>
                        {cart.map((item) => (
                            <div key={item.id} className="flex justify-between items-center border-b py-2">
                                <div className='flex flex-col space-y-1 mb-1'>
                                    <div className='w-[300px]'>
                                        <img src={item.featured_image} alt={item.name} className='w-full' />
                                    </div>
                                    <h2 className="text-xl font-semibold text-ellipsis overflow-hidden line-clamp-2 max-w-[250px] min-h-[50px]">{item.name}</h2>
                                    <p>Price: <span className='font-bold'>${item.price}</span></p>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                                <div className='flex space-x-8'>
                                    <button
                                        onClick={() => handleRemove(item.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                    >
                                        Remove
                                    </button>
                                    <button 
                                        onClick={() => handleBuyNow(item)}
                                        className='bg-blue-600 text-white px-4 py-2 rounded'
                                        disabled={loadingId === item.id}
                                    >
                                        {loadingId === item.id ? 'Processing...' : 'Buy Now'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default CartPage;
