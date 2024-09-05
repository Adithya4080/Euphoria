import React from 'react';
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";
import pic1 from '../../../assets/img-20.jpg';
import pic2 from '../../../assets/img-23.jpg';
import pic3 from '../../../assets/img-22.jpg';
import Arrow from '../../../assets/Arrow.svg';
import Message from '../../../assets/message.svg';
import Right from '../../../assets/arrow-right.svg';
import cart from '../../../assets/Icon.svg';

function SingleTop() {
    return (
        <div className='wrapper top flex items-center pb-20 space-x-10 font-causten'>
            <div className='top_left flex flex-col space-y-4'>
                <div className='w-[68px] h-[68px]'>
                    <img src={pic1} alt="P" className='w-full h-full' />
                </div>
                <div className='w-[68px] h-[68px]'>
                    <img src={pic2} alt="p" className='w-full h-full' />
                </div>
                <div className='w-[68px] h-[68px]'>
                    <img src={pic3} alt="p" className='w-full h-full' />
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <div>
                        <img src={Arrow} alt="Arrow" />
                    </div>
                    <div>
                        <img src={Arrow} alt="Arrow" className='rotate-180'/>
                    </div>
                </div>
            </div>
            <div className="top_mid">
                <div className='w-[520px] h-[785px]'>
                    <img src={pic1} alt='pic' className='w-full h-full' />
                </div>
            </div>
            <div className='top_right w-full'>
                <div className='flex items-center text-[14px] font-medium text-[#807D7E]'>
                    <p>Shop</p>
                    <img src={Arrow} alt="Arrow" className='rotate-90' />
                    <p>Women</p>
                    <img src={Arrow} alt="Arrow" className='rotate-90' />
                    <p>Top</p>
                </div>
                <div className='py-10 '>
                    <h3 className='text-[#3C4242] text-[34px] max-w-[350px] font-semibold leading-[48px]'>
                        Raven Hoodie With Black colored Design
                    </h3>
                </div>
                <div className='flex items-center space-x-10'>
                    <div className='flex space-x-4 items-center'>
                        <div className='text-[#EDD146] flex space-x-1'>
                            <IoStar /><IoStar /><IoStar /><IoStar /><IoStar />
                        </div>
                        <p className='text-[#807D7E] text-[14px] '>3.5</p>
                    </div>
                    <div className='flex items-center space-x-2 text-[#807D7E] text-[14px]'>
                        <div><img src={Message} alt="Message" /></div>
                        <p>120 comment</p>
                    </div>
                </div>
                <div>
                    <div className='flex mt-10 space-x-6'>
                        <p className='text-[#3F4646] text-[16px] font-semibold'>Select Size</p>
                        <div className='flex space-x-2 items-center text-[#807D7E]'>
                            <p className='text-[16px] font-semibold'>Size Guide</p>
                            <div><img src={Right} alt=" Right" /></div>
                        </div>
                    </div>
                    <div className='flex mt-4 space-x-3'>
                        <div className='border border-black rounded-lg w-[42px] h-[42px] items-center flex justify-center'>
                            <p>XS</p>
                        </div>
                        <div className='border border-black rounded-lg w-[42px] h-[42px] items-center flex justify-center'>
                            <p>S</p>
                        </div>
                        <div className='border border-black rounded-lg w-[42px] h-[42px] items-center flex justify-center'>
                            <p>M</p>
                        </div>
                        <div className='border border-black rounded-lg w-[42px] h-[42px] items-center flex justify-center'>
                            <p>L</p>
                        </div>
                        <div className='border border-black rounded-lg w-[42px] h-[42px] items-center flex justify-center'>
                            <p>XL</p>
                        </div>
                    </div>
                    <div className='mt-10'>
                        <div className='mb-6'>
                            <p className='text-[#3F4646] text-[16px] font-semibold'>Colours Available</p>
                        </div>
                        <div className='flex space-x-6'>
                            <div className='bg-[#3C4242] w-[22px] h-[22px] rounded-full'></div>
                            <div className='bg-[#EDD146] w-[22px] h-[22px] rounded-full'></div>
                            <div className='bg-[#EB84B0] w-[22px] h-[22px] rounded-full'></div>
                            <div className='bg-[#9C1F35] w-[22px] h-[22px] rounded-full'></div>
                        </div>
                    </div>
                    <div className='mt-10 flex space-x-4'>
                        <button className='flex space-x-2 items-center bg-[#8A33Fd] text-white py-2 px-10 rounded-lg'>
                            <img src={cart} alt="Cart" className='text-white fill-current' />
                            <p className='text-[16px] font-semibold '>Add to cart</p>
                        </button>
                        <button className='border border-black rounded-lg py-2 px-10 font-semibold'>
                            $63.00
                        </button>
                    </div>
                    <div className='border-b border-[#BEBCBD] mt-7'></div>
                </div>

            </div>
        </div>
    )
}

export default SingleTop