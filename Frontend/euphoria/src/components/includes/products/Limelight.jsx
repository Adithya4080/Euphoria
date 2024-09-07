import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Rectangle from '../../general/Rectangle';
import Heading from '../../general/Heading';
import wishlist from '../../../assets/wishlist.svg';

function Limelight() {
    const [products, setProducts] = useState([]);
    const [wishlistItems, setWishlistItems] = useState(() => JSON.parse(localStorage.getItem('wishlist')) || []);
    const navigate = useNavigate();
    const baseUrl = 'http://localhost:8000';

    useEffect(() => {
        // Fetch products from the API
        fetch(`${baseUrl}/api/v1/category/products/category/14/`)
            .then(response => response.json())
            .then(data => {
                const sortedProducts = data.data.sort((a, b) => a.id - b.id).slice(0, 4);
                setProducts(sortedProducts);
            })
            .catch(error => console.error('Error fetching products:', error));

        // Listen for logout event and clear wishlist
        const handleLogout = () => {
            setWishlistItems([]);  // Clear wishlistItems on logout
        };

        // Listen for token removal (logout event)
        window.addEventListener('storage', (event) => {
            if (event.key === 'token' && event.newValue === null) {
                handleLogout();
            }
        });

        return () => {
            window.removeEventListener('storage', handleLogout);
        };
    }, [baseUrl]);

    const handleWishlistClick = (productId) => {
        const token = localStorage.getItem('token');

        if (!token) {
            alert("Please log in to add to the wishlist.");
            return;
        }

        let updatedWishlist;
        if (wishlistItems.includes(productId)) {
            updatedWishlist = wishlistItems.filter(id => id !== productId);
        } else {
            updatedWishlist = [...wishlistItems, productId];
        }

        setWishlistItems(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));

        window.dispatchEvent(new Event('wishlistUpdated'));
    };

    const handleProductClick = (productId) => {
        const token = localStorage.getItem('token');

        if (!token) {
            alert("Please log in to view product details.");
            return;
        }

        navigate(`/product/${productId}`);
    };

    return (
        <div className='wrapper'>
            <div className='flex items-center space-x-5 mb-10'>
                <Rectangle />
                <Heading text="In The Limelight" />
            </div>
            <div className='grid grid-cols-4 gap-10'>
                {products.map(product => (
                    <div key={product.id} className='w-full'>
                        <div className='relative'>
                            <div className='w-full h-[370px] relative'>
                                <img src={product.featured_image} alt={product.name} className='w-full h-full' />
                            </div>
                            <div
                                className={`z-1 bg-white rounded-[50%] absolute top-6 right-4 cursor-pointer`}
                                onClick={() => handleWishlistClick(product.id)}
                            >
                                <img
                                    src={wishlist}
                                    alt="Wishlist"
                                    className={`p-2 ${wishlistItems.includes(product.id) ? 'wishlist-active' : ''}`}
                                />
                            </div>
                        </div>

                        <div className='flex justify-between items-center mt-3'>
                            <div>
                                <h4
                                    className='text-[#2A2F2F] text-[14px] font-bold overflow-hidden whitespace-nowrap text-ellipsis max-w-[150px] cursor-pointer'
                                    onClick={() => handleProductClick(product.id)}
                                >
                                    {product.name}
                                </h4>
                                <p className='text-[#7F7F7F] text-[12px] font-medium'>{product.brand}'s Brand</p>
                            </div>
                            <div>
                                <p className='text-[#2A2F2F] text-[16px] font-bold'>${product.price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Limelight;
