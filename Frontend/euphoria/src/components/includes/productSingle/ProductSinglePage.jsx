import React from 'react';
import {Helmet} from 'react-helmet';

import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import Rectangle from '../../general/Rectangle';
import Heading from '../../general/Heading';
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";
import pic1 from '../../../assets/img-20.jpg';
import pic2 from '../../../assets/img-23.jpg';
import pic3 from '../../../assets/img-22.jpg';
import Arrow from '../../../assets/Arrow.svg';
import Message from '../../../assets/message.svg';
import Right from '../../../assets/arrow-right.svg';
import cart from '../../../assets/shopping cart.svg';
import card from '../../../assets/credit card.svg';
import dress from '../../../assets/dress.svg';
import truck from '../../../assets/truck.svg'
import shipping from '../../../assets/shipping.svg'

function ProductSinglePage() {
    return (
        <>
            <Helmet>
                <title>Single | Euphoria</title>
            </Helmet>
            <Navbar />
            <div className="wrapper">
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
                            <div className='mt-10 flex space-x-6'>
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
                        <div className='py-5 flex items-center space-x-20'>
                            <div className='flex flex-col space-y-6'>
                                <div className='flex items-center space-x-6'>
                                    <div className='w-[24px] h-[24px]'>
                                        <img src={card} alt="Payment" className='w-full h-full' />
                                    </div>
                                    <p className='text-[16px] text-[#3C4242] font-medium'>Secure payment</p>
                                </div>
                                <div className='flex items-center space-x-6'>
                                    <div className='w-[24px] h-[24px]'>
                                        <img src={truck} alt="Shipping" className='w-full h-full' />
                                    </div>
                                    <p className='text-[16px] text-[#3C4242] font-medium'>Free Shipping</p>
                                </div>
                            </div>
                            <div className='flex flex-col space-y-6'>
                                <div className='flex items-center space-x-6'>
                                    <div className='w-[24px] h-[24px]'>
                                        <img src={dress} alt="Dress" className='w-full h-full' />
                                    </div>
                                    <p className='text-[16px] text-[#3C4242] font-medium'>Size & Fit</p>
                                </div>
                                <div className='flex items-center space-x-6'>
                                    <div className='w-[24px] h-[24px]'>
                                        <img src={shipping} alt="Shipping" className='w-full h-full' />
                                    </div>
                                    <p className='text-[16px] text-[#3C4242] font-medium'>Free Shipping & Returns</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='pb-20 font-causten'>
                    <div className='flex items-center space-x-5 mb-10'>
                        <Rectangle />
                        <Heading text="Product Description" />
                    </div>
                    <div className='flex w-full'>
                        <div className='w-1/2 space-y-10 mt-7'>
                            <div className='flex space-x-8'>
                                <div className=''>
                                    <p className='text-[16px] text-[#3C4242] font-semibold'>Description</p>
                                    <div className='border-b-[3px] rounded-[1px] border-[#3C4242]  w-[50px] pb-3'></div>
                                </div>
                                <div className='flex space-x-3'>
                                    <p className='text-[16px] font-normal text-[#807D7E]'>User Comments</p>
                                    <p className='w-[24px] h-[24px] bg-[#8A33Fd] text-white flex items-center justify-center rounded-lg text-[12px]'>21</p>
                                </div>
                                <div className='flex space-x-3'>
                                    <p className='text-[16px] font-normal text-[#807D7E]'>Question & Answer</p>
                                    <p className='w-[24px] h-[24px] bg-[#8A33Fd] text-white flex items-center justify-center rounded-lg text-[12px]'>21</p>
                                </div>							
                            </div>
                            <div>
                                <p className='text-[16px] text-[#807D7E]'>100% Bio-washed Cotton - makes the fabric extra soft & silky. Flexible ribbed crew neck. Precisely stitched with no pilling & no fading. Provide  all-time comfort. Anytime, anywhere. Infinite range of matte-finish HD prints.</p>
                            </div>
                        </div>
                        <div className='w-1/2 flex'>
                            <div className='border-r border-r-[#BEBCBD] w-1/3 space-y-4 '>
                                <div className='ml-10'>
                                    <p className='text-[16px] text-[#807D7E] pb-4'>Fabric</p>
                                    <p className='text-[16px] font-medium leading-[16px] pb-2'>Bio-Washed Cotton</p>
                                </div>
                                <div className='border-b border-b-[#BEBCBD]'></div>
                                <div className='ml-10'>
                                    <p className='text-[16px] text-[#807D7E] pb-4'>Neck</p>
                                    <p className='text-[16px] font-medium leading-[16px]'>Round Neck</p>
                                </div>
                            </div>
                            <div className='border-r border-r-[#BEBCBD] w-1/3 space-y-4'>
                                <div className='ml-10'>
                                    <p className='text-[16px] text-[#807D7E] pb-4'>Pattern</p>
                                    <p className='text-[16px] font-medium leading-[16px] pb-2'>Printed</p>
                                </div>
                                <div className='border-b border-b-[#BEBCBD]'></div>
                                <div className='ml-10'>
                                    <p className='text-[16px] text-[#807D7E] pb-4'>Sleeve</p>
                                    <p className='text-[16px] font-medium leading-[16px]'>Half-sleeves</p>
                                </div>
                            </div>
                            <div className='w-1/3 space-y-4'>
                                <div className='ml-10'>
                                    <p className='text-[16px] text-[#807D7E] pb-4'>Fit</p>
                                    <p className='text-[16px] font-medium leading-[16px] pb-2'>Regular-fit</p>
                                </div>
                                <div className='border-b border-b-[#BEBCBD]'></div>
                                <div className='ml-10'>
                                    <p className='text-[16px] text-[#807D7E] pb-5'>Style</p>
                                    <p className='text-[16px] font-medium leading-[16px]'>Casual Wear</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-10'>
                        <div className='flex items-center space-x-5 mb-10'>
                            <Rectangle />
                            <Heading text="Similar Products" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ProductSinglePage