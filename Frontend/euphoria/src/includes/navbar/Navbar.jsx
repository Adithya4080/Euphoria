import React from 'react';
import logo from '../../assets/Logo.svg';
import search from '../../assets/search.svg';
import wishlist from '../../assets/wishlist.svg';
import user from '../../assets/account.svg';
import cart from '../../assets/cart.svg'

function Navbar() {
    return (
        <div className='wrapper font-causten py-4 flex justify-between items-center'>
            <div className='navleft'>
                <img src={logo} alt="Logo" />
            </div>
            <div className='navmid1'>
                <ul className='flex space-x-[40px] text-[18px]'>
                    <li>Shop</li>
                    <li>Men</li>
                    <li>Women</li>
                    <li>Combos</li>
                    <li>Joggers</li>
                </ul>
            </div>
            <div className="navmid2 flex items-center bg-[#F6F6F6] py-[12px] px-[24px] space-x-4">
                <img src={search} alt='SearchBar'/>
                <input type="text" placeholder='Search' className='bg-[#F6F6F6]'/>
            </div>
        </div>
    )
}

export default Navbar