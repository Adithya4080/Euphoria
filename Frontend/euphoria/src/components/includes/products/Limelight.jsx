import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Rectangle from '../../general/Rectangle';
import Heading from '../../general/Heading';
import { useWishlist } from '../context/Context';
import { FaHeart, FaRegHeart } from "react-icons/fa";

function Limelight() {
    const [products, setProducts] = useState([]);
    const { wishlistItems, addToWishlist } = useWishlist();
    const navigate = useNavigate();
    const baseUrl = 'http://localhost:8000';

    useEffect(() => {
        fetch(`${baseUrl}/api/v1/category/products/category/14/`)
            .then(response => response.json())
            .then(data => {
                const sortedProducts = data.data.sort((a, b) => a.id - b.id).slice(0, 4);
                setProducts(sortedProducts);
            })
            .catch(error => console.error('Error fetching products:', error));

        const handleLogout = () => {
            addToWishlist([]);
        };

        window.addEventListener('storage', (event) => {
            if (event.key === 'token' && event.newValue === null) {
                handleLogout();
            }
        });

        return () => {
            window.removeEventListener('storage', handleLogout);
        };
    }, [baseUrl]);

    const handleProductClick = (productId) => {
        const token = localStorage.getItem('user_data');

        if (!token) {
            alert("Please log in to view product details.");
            return;
        }

        navigate(`/product/${productId}`);
    };

    return (
        <div className='wrapper py-20'>
            <div className='flex items-center space-x-5 mb-10'>
                <Rectangle />
                <Heading text="In The Limelight" />
            </div>
            <div className='grid grid-cols-4 max-[1000px]:grid-cols-3 max-[768px]:grid-cols-2 max-[480px]:grid-cols-1 gap-10'>
                {products.map(product => (
                    <div key={product.id} className='w-full'>
                        <div className='relative'>
                            <div className='w-full h-[370px] relative'>
                                <img src={product.featured_image} alt={product.name} className='w-full h-full' />
                            </div>
                            <div
                                className='z-1 bg-gray-100 rounded-[50%] absolute top-6 right-4 cursor-pointer p-2'
                                onClick={() => addToWishlist(product.id)}
                            >
                                {wishlistItems.includes(product.id) ? (
                                    <FaHeart className="wishlist-active text-[18px]" />
                                ) : (
                                    <FaRegHeart className="text-[18px] " />
                                )}
                            </div>
                        </div>

                        <div className='flex justify-between items-center mt-3'>
                            <div>
                                <h4
                                    className='text-[#2A2F2F] text-[14px] max-[480px]:text-[20px] max-[480px]:max-w-[230px] font-bold overflow-hidden whitespace-nowrap text-ellipsis max-w-[150px] cursor-pointer'
                                    onClick={() => handleProductClick(product.id)}
                                >
                                    {product.name}
                                </h4>
                                <p className='text-[#7F7F7F] text-[12px] max-[480px]:text-[16px] font-medium'>{product.brand}'s Brand</p>
                            </div>
                            <div>
                                <p className='text-[#2A2F2F] text-[16px] max-[480px]:text-[22px] font-bold'>${product.price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Limelight;
