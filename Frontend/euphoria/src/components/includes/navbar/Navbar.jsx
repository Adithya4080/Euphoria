import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/Logo.svg';
import search from '../../../assets/search.svg';
import wishlist from '../../../assets/wishlist.svg';
import user from '../../../assets/account.svg';
import cart from '../../../assets/cart.svg';
import LoginPrompt from '../../screens/login/LoginPrompt'  // Import your LoginPrompt component

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [showUserBox, setShowUserBox] = useState(false);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Check if token exists in localStorage
        const token = localStorage.getItem('token');
        const storedUsername= localStorage.getItem('username');
        if (token && storedUsername) {
            setIsLoggedIn(true);
            setUsername(storedUsername);
        }
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
        setIsLoggedIn(false);
        setShowUserBox(false);
        navigate('/');
    };

    return (
        <div className='font-causten py-8 sticky top-0 bg-white z-10 border-b border-[#BEBCBD]'>
            <div className="wrapper flex justify-between items-center">
                <div className='navleft cursor-pointer'>
                    <h1><Link to="/"><img src={logo} alt="Logo" /></Link></h1>
                </div>
                <div className='navmid1'>
                    <ul className='flex space-x-[40px] text-[18px] cursor-pointer'>
                        <li className='font-bold'>Shop</li>
                        <li className='font-medium text-[#807D7E]'>Men</li>
                        <li className='font-medium text-[#807D7E]'>Women</li>
                        <li className='font-medium text-[#807D7E]'>Combos</li>
                        <li className='font-medium text-[#807D7E]'>Joggers</li>
                    </ul>
                </div>
                <div className="navmid2 flex items-center bg-[#F6F6F6] py-[12px] px-[24px] space-x-4 rounded-md">
                    <img src={search} alt='SearchBar' />
                    <input type="text" placeholder='Search' className='bg-[#F6F6F6]' />
                </div>
                <div className="navright flex space-x-6 cursor-pointer">
                    <div className='bg-[#F6F6F6] p-[12px] rounded-md'>
                        <img src={wishlist} alt="wishlist" />
                    </div>
                    <div className='bg-[#F6F6F6] p-[12px] rounded-md' onClick={handleUserClick}>
                        <img src={user} alt="user" />
                    </div>
                    <div className='bg-[#F6F6F6] p-[12px] rounded-md'>
                        <img src={cart} alt="cart" />
                    </div>
                </div>
            </div>

            {showLoginPrompt && <LoginPrompt closeLoginPrompt={() => setShowLoginPrompt(false)} />}

            {isLoggedIn && showUserBox && (
                <div className="absolute right-10 top-20 bg-white shadow-md p-4 rounded-md">
                    <p className="text-gray-700">Username: {username}</p>
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
