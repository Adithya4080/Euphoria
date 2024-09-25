import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { PropagateLoader } from 'react-spinners';
import { useNavigate} from 'react-router-dom';
import { toast, Bounce } from 'react-toastify';
import Navbar from '../../includes/navbar/Navbar';
import Footer from '../../includes/footer/Footer';
import Rectangle from '../../general/Rectangle';
import Heading from '../../general/Heading';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

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
            type: 'success', 
        });
    };

    useEffect(() => {
        const fetchCartItems = async () => {
            const token = JSON.parse(localStorage.getItem('user_data'));

            const config = {
                headers: {
                    'Authorization': `Bearer ${token.access}`,
                    'Content-Type': 'application/json',
                },
            };

            try {
                const response = await axios.get('http://localhost:8000/api/v1/cart/view-cart/', config);
                console.log('Cart items response:', response.data);
                const items = response.data.cart_items.map(item => ({
                    ...item,
                    productId: item.id,
                    quantity: item.quantity,
                }));
                setCartItems(items);
                const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                setTotalPrice(total);
            } catch (error) {
                console.error('Error fetching cart items:', error);
                setError('Failed to fetch cart items');
            }
        };

        fetchCartItems();

        const loadingTimeout = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(loadingTimeout);
    }, []);

    const updateTotalPrice = (items) => {
        const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setTotalPrice(total);
    };

    const handleQuantityChange = (productId, change) => {
        setCartItems(prevCartItems => {
            const updatedItems = prevCartItems.map(item => {
                if (item.id === productId) {
                    const newQuantity = item.quantity + change;
                    if (newQuantity < 1 || newQuantity > item.stock) return item;
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
            updateTotalPrice(updatedItems);
            return updatedItems;
        });
    };

    const handleRemoveFromCart = async (productId) => {
        const token = JSON.parse(localStorage.getItem('user_data'));
        const config = {
            headers: {
                'Authorization': `Bearer ${token.access}`,
                'Content-Type': 'application/json',
            },
        };
    
        try {
            const response = await axios.delete(`http://localhost:8000/api/v1/cart/remove/${productId}/`, config);
            console.log('Response:', response.data);

            setCartItems(prevCartItems => {
                const updatedItems = prevCartItems.filter(item => item.id !== productId);
                updateTotalPrice(updatedItems);
                return updatedItems;
            });
        } catch (error) {
            console.error('Error removing item from cart:', error.response ? error.response.data : error.message);
            alert(error.response?.data?.error || 'Failed to remove item from cart');
            setError('Failed to remove item from cart');
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
            const response = await axios.post('http://localhost:8000/api/v1/cart/buy/', {}, config);
            console.log('Order Response:', response.data);
            customToast('Order placed successfully');
            navigate('/success')
        } catch (error) {
            console.error('Error placing order:', error.response ? error.response.data : error.message);
            alert(error.response?.data?.error || 'Failed to place order');
        }
    }; 
    

    if (isLoading) {
        return (
            <div className='flex items-center justify-center min-h-screen bg-gray-100'>
                <div className='flex flex-col items-center'>
                    <PropagateLoader color="#36d7b7" size={15} />
                    <p className='mt-4 text-lg font-semibold text-gray-700 uppercase'>Loading your cart...</p>
                </div>
            </div>
        );
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
                        <div className='w-full flex gap-20 max-[900px]:gap-12 max-[480px]:flex-col-reverse'>
                            <div className='grid grid-cols-3 w-[75%] font-causten gap-6 max-[1080px]:grid-cols-2 max-[730px]:grid-cols-1'>
                                {cartItems.map(item => {
                                    console.log(item);                                    
                                    const imageUrl = `http://localhost:8000${item.image}`; 
                                    return (
                                        <div key={item.id} className='space-y-1 mt-4 p-4 border border-gray-200 flex flex-col justify-center rounded-lg shadow-zinc-600'>
                                            <div className='w-[100%] h-[200px] flex items-center justify-center'>
                                                <img src={imageUrl} alt={item.product} className='w-full h-full' />
                                            </div>
                                            <h3 className='text-[#2A2F2F] text-[16px] font-bold overflow-hidden max-w-[100%] cursor-pointer h-[50px] line-clamp-2'>
                                                {item.product}
                                            </h3>
                                            <div className='flex items-center justify-between'>
                                                <span>Price:</span>
                                                <p> ${item.price}.00</p>
                                            </div>
                                            <div className='flex items-center justify-between'>
                                                <span>Available stock:</span>
                                                <span>{item.stock}</span>
                                            </div>
                                            <div className='flex items-center justify-between pb-2'>
                                                <div>
                                                    <span>Quantity:</span>
                                                </div>
                                                <div className='flex items-center space-x-2'>
                                                    <button 
                                                        className='bg-gray-300 px-2 py-1 rounded-lg'  
                                                        onClick={() => handleQuantityChange(item.id, -1)}
                                                    >
                                                        -
                                                    </button>
                                                    <span className='px-2 py-1 bg-blue-800 text-white'>{item.quantity}</span>
                                                    <button 
                                                        className='bg-gray-300 px-2 py-1 rounded-lg'  
                                                        onClick={() => handleQuantityChange(item.id, 1)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='flex flex-col space-y-2'>
                                                <button 
                                                    className='bg-blue-500 p-2 text-white text-sm font-bold rounded-lg'  
                                                    onClick={() => handleRemoveFromCart(item.id)}
                                                >
                                                    Remove From Cart
                                                </button>
                                            </div>                               
                                        </div>
                                    );
                                })}
                            </div>
                            <div className='bg-[#f1f3f6] w-[400px] h-[400px] rounded-lg p-6 font-causten max-[800px]:w-[300px] max-[800px]:h-[320px]'>
                                <h2 className='text-[18px] font-bold text-[#8c8c8c] uppercase'>Price Details</h2>
                                <div className='border-b-2 my-2'></div>
                                <div className='flex justify-between items-center py-2'>
                                    <h6 className='text-[18px] max-[800px]:text-[14px]'>Price ({cartItems.length} Items)</h6>
                                    <p className='text-xl font-bold max-[800px]:text-[14px]'>${totalPrice}.00</p>
                                </div>
                                <div className='flex items-center justify-between text-[18px] py-2'>
                                    <h6 className='max-[800px]:text-[14px]'>Delivery Charges</h6>
                                    <p className='flex space-x-1 items-center max-[800px]:text-[14px]'>
                                        <span className='line-through text-[16px] text-[#818487]'>₹80</span> 
                                        <span className='text-[#3d9141]'>Free</span>
                                    </p>
                                </div>
                                <div className='border-b-2 my-2'></div>
                                <div className='py-4 flex justify-between items-center'>
                                    <h2 className='text-[18px] max-[800px]:text-[14px] font-bold uppercase'>Total Amount</h2>
                                    <p className='text-xl font-bold max-[800px]:text-[14px]'>${totalPrice}.00</p>
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
