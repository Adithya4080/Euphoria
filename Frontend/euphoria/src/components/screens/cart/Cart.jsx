import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Navbar from '../../includes/navbar/Navbar';
import Footer from '../../includes/footer/Footer'
import Rectangle from '../../general/Rectangle';
import Heading from '../../general/Heading';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchCartItems = async () => {
            const token = JSON.parse(localStorage.getItem('user_data'));

            if (!token) {
                setError('Unauthorized');
                setIsLoading(false);
                return;
            }

            const config = {
                headers: {
                    'Authorization': `Bearer ${token.access}`,
                    'Content-Type': 'application/json',
                },
            };

            try {
                const response = await axios.get('http://localhost:8000/api/v1/cart/view-cart/', config);
                console.log('Cart items response:', response.data);
                setCartItems(response.data.cart_items || []);
                const total = response.data.cart_items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                setTotalPrice(total);
            } catch (error) {
                console.error('Error fetching cart items:', error);
                setError('Failed to fetch cart items');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    const handleRemoveFromCart = async (productId) => {
        console.log("Removing product with ID:", productId);
        const token = JSON.parse(localStorage.getItem('user_data'));
        const config = {
            headers: {
                'Authorization': `Bearer ${token.access}`,
                'Content-Type': 'application/json',
            },
        };
    
        try {
            const response = await axios.delete(`http://localhost:8000/api/v1/cart/remove/${productId}/`, config);
            console.log("Remove response:", response.data);
    
            setCartItems(prevCartItems => {
                const updatedItems = prevCartItems.filter(item => item.id !== productId);
                const updatedTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                setTotalPrice(updatedTotal);
                return updatedItems;
            });
        } catch (error) {
            console.error('Error removing item from cart:', error.response ? error.response.data : error.message);
            setError('Failed to remove item from cart'); // Update error state
        }
    };
    
    const handleBuyNow = async () => {
        const token = JSON.parse(localStorage.getItem('user_data'));
        const config = {
            headers: {
                'Authorization': `Bearer ${token.access}`,
                'Content-Type': 'application/json',
            },
        };

        try {
            // Make POST request to checkout API
            const response = await axios.post('http://localhost:8000/api/v1/cart/checkout/', {}, config);
            console.log('Checkout response:', response.data);
            
            // Clear cart items from state and optionally make an API call to clear the cart
            setCartItems([]);
            setTotalPrice(0);
            alert('Order placed successfully!');

            // Optionally, clear the cart on the backend (if not handled in the checkout process)
            await axios.delete(`http://localhost:8000/api/v1/cart/clear/`, config); // Create this endpoint if it doesn't exist
        } catch (error) {
            console.error('Error during checkout:', error.response ? error.response.data : error.message);
            setError('Failed to place order');
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <>  
            <Helmet>
                <title>Cart | Euphoria</title>
            </Helmet>
            <Navbar />
            <div className='wrapper'>
                <div className='flex items-center space-x-5 mt-5 mb-10'>
                    <Rectangle />
                    <Heading text="Your Cart" />
                </div>
                <div className='pb-20'>
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <div className='w-full flex gap-20'>
                            <div className='grid grid-cols-3 w-[75%] font-causten'>
                                {cartItems.map(item => {
                                    console.log(item);                                    
                                    const imageUrl = `http://localhost:8000${item.image}`; 
                                    return (
                                        <div key={item.id} className='space-y-1 mt-4'>
                                            <div className='w-[200px] h-[200px]'>
                                                <img src={imageUrl} alt={item.product} className='w-full h-full rounded-lg' />
                                            </div>
                                            <h3 className='text-[#2A2F2F] text-[16px] font-bold overflow-hidden max-w-[200px] cursor-pointer h-[50px] line-clamp-2'>
                                                {item.product}
                                            </h3>
                                            <p>Price: ${item.price}.00</p>
                                            <p>Quantity: {item.quantity}</p>
                                            <div className='flex flex-col w-[200px] space-y-2'>
                                                <button 
                                                    className='bg-blue-500 p-2 text-white text-sm font-bold rounded-lg'  
                                                    onClick={() => {
                                                        alert("Button clicked!");
                                                        handleRemoveFromCart(item.id);
                                                    }}
                                                >
                                                    Remove From Cart
                                                </button>
                                            </div>                               
                                        </div>
                                    );
                                })}
                            </div>
                            <div className='bg-[#f1f3f6] w-[400px] h-[400px] rounded-lg p-6 font-causten'>
                                <h2 className='text-[18px] font-bold text-[#8c8c8c] uppercase'>Price Details</h2>
                                <div className='border-b-2 my-2'></div>
                                <div className='flex justify-between items-center py-2'>
                                    <h6 className='text-[18px]'>Price ({cartItems.length} Items)</h6>
                                    <p className='text-xl font-bold'>${totalPrice}.00</p>
                                </div>
                                <div className='flex items-center justify-between text-[18px] py-2'>
                                    <h6>Delivery Charges</h6>
                                    <p className='flex space-x-1 items-center'>
                                        <span className='line-through text-[16px] text-[#818487]'>₹80</span> 
                                        <span className='text-[#3d9141]'>Free</span>
                                    </p>
                                </div>
                                <div className='border-b-2 my-2'></div>
                                <div className='py-4 flex justify-between items-center'>
                                    <h2 className='text-[18px] font-bold uppercase'>Total Amount</h2>
                                    
                                    <p className='text-xl font-bold'>${totalPrice}.00</p>
                                </div>
                                <div className='border-b-2 my-2'></div>
                                <button 
                                    className='bg-red-600 text-white p-2 mt-4 w-full font-bold rounded-lg'
                                    onClick={handleBuyNow}
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Cart;
