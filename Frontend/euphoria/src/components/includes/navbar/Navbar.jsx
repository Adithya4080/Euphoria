import React from 'react';
import logo from '../../../assets/Logo.svg'
import search from '../../../assets/search.svg';
import wishlist from '../../../assets/wishlist.svg';
import user from '../../../assets/account.svg';
import cart from '../../../assets/cart.svg'

function Navbar() {
    return (
        <div className='font-causten py-4 sticky top-0 bg-white z-10'>
            <div className="wrapper  flex justify-between items-center">
                <div className='navleft cursor-pointer'>
                    <h1><img src={logo} alt="Logo" /></h1>
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
                    <img src={search} alt='SearchBar'/>
                    <input type="text" placeholder='Search' className='bg-[#F6F6F6]'/>
                </div>
                <div className="navright flex space-x-6 cursor-pointer">
                    <div className='bg-[#F6F6F6] p-[12px] rounded-md'>
                        <img src={wishlist} alt="wishlist" />
                    </div>
                    <div className='bg-[#F6F6F6] p-[12px] rounded-md'>
                        <img src={user} alt="user" />
                    </div>
                    <div className='bg-[#F6F6F6] p-[12px] rounded-md'>
                        <img src={cart} alt="cart" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar