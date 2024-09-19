import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Navbar from '../../includes/navbar/Navbar';
import Rectangle from '../../general/Rectangle';
import Heading from '../../general/Heading';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

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
        const token = JSON.parse(localStorage.getItem('user_data'));
        const config = {
            headers: {
                'Authorization': `Bearer ${token.access}`,
                'Content-Type': 'application/json',
            },
        };

        try {
            await axios.delete(`http://localhost:8000/api/v1/cart/remove/${productId}/`, config);
            setCartItems(cartItems.filter(item => item.product !== productId));
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const handleBuyNow = (productId) => {
        // Navigate to checkout or handle buy now functionality here
        console.log('Buying product with ID:', productId);
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
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
                <div>
                {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className='grid grid-cols-3'>
                    {cartItems.map(item => {
                         const imageUrl = `http://localhost:8000${item.image}`; 
                        return (
                            <div key={item.product} className='space-y-1'>
                                <div className='w-[200px] h-[200px]'>
                                    <img src={imageUrl} alt={item.product} className='w-full h-full rounded-lg' />
                                </div>
                                <h3 className='text-[#2A2F2F] text-[16px] font-bold overflow-hidden max-w-[200px] cursor-pointer h-[50px] line-clamp-2'>
                                    {item.product}
                                </h3>
                                <p>Price: ${item.price}</p>
                                <p>Quantity: {item.quantity}</p>
                                <button onClick={() => handleBuyNow(item.product)}>Buy Now</button>
                                <button onClick={() => handleRemoveFromCart(item.product)}>Remove from Cart</button>
                                
                            </div>
                        );
                    })}
                </div>
            )}
                </div>
            </div>

        </>
    );
};

export default Cart;
