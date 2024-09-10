import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/Logo.svg';
import search from '../../../assets/search.svg';
import wishlist from '../../../assets/wishlist.svg';
import user from '../../../assets/account.svg';
import cart from '../../../assets/cart.svg';
import LoginPrompt from '../../screens/login/LoginPrompt';  // Import your LoginPrompt component

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [showUserBox, setShowUserBox] = useState(false);
    const [username, setUsername] = useState('');
    const [wishlistCount, setWishlistCount] = useState(0); // Track wishlist count
    const navigate = useNavigate();

    useEffect(() => {
        // Check if token exists in localStorage
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            // Fetch username from localStorage or API
            const storedUsername = localStorage.getItem('username');
            if (storedUsername) {
                setUsername(storedUsername);
            }
        }

        // Get wishlist from localStorage and update count
        const handleWishlistUpdate = () => {
            const updatedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            setWishlistCount(updatedWishlist.length);
        };

        handleWishlistUpdate(); // Initial count update

        window.addEventListener('wishlistUpdated', handleWishlistUpdate);

        return () => {
            window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
        };
    }, []);

    const handleUserClick = () => {
        if (isLoggedIn) {
            setShowUserBox(!showUserBox);
        } else {
            setShowLoginPrompt(true);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username'); 
        localStorage.removeItem('wishlist');  
        setIsLoggedIn(false);
        setShowUserBox(false);
        setWishlistCount(0);
        navigate('/');
    };

    return (
        <div className='font-causten py-8 sticky top-0 bg-white z-10 border-b border-[#BEBCBD]'>
            <div className="wrapper flex justify-between items-center">
                <div className='navleft cursor-pointer'>
                    <h1><Link to="/"><img src={logo} alt="Logo" /></Link></h1>
                </div>
                <div className='navmid1 block max-[1100px]:hidden'>
                    <ul className='flex space-x-[40px] text-[18px] cursor-pointer'>
                        <li className='font-bold'>Shop</li>
                        <li className='font-medium text-[#807D7E]'>Men</li>
                        <li className='font-medium text-[#807D7E]'>Women</li>
                        <li className='font-medium text-[#807D7E]'>Combos</li>
                        <li className='font-medium text-[#807D7E]'>Joggers</li>
                    </ul>
                </div>
                <div className="navmid2 flex items-center bg-[#F6F6F6] py-[12px] px-[24px] space-x-4 rounded-md max-[680px]:hidden">
                    <img src={search} alt='SearchBar' />
                    <input type="text" placeholder='Search' className='bg-[#F6F6F6]' />
                </div>
                <div className="navright flex space-x-6 cursor-pointer">
                    <div className='relative bg-[#F6F6F6] p-[12px] rounded-md'>
                        <img src={wishlist} alt="wishlist" />
                        {wishlistCount > 0 && (
                            <span className='absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                                {wishlistCount}
                            </span>
                        )}
                    </div>
                    <div className='bg-[#F6F6F6] p-[12px] rounded-md' onClick={handleUserClick}>
                        <img src={user} alt="user" />
                    </div>
                    <div className='bg-[#F6F6F6] p-[12px] rounded-md'>
                        <Link to='/cart'>
                            <img src={cart} alt="cart" />
                        </Link>
                    </div>
                </div>
            </div>

            {showLoginPrompt && <LoginPrompt closeLoginPrompt={() => setShowLoginPrompt(false)} />}

            {isLoggedIn && showUserBox && (
                <div className="absolute right-10 top-20 bg-white shadow-md p-4 rounded-md">
                    <p className="text-gray-700">Logged in as: {username}</p>
                    <button
                        className="mt-2 px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-400"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}

export default Navbar;

