import React from 'react';
import Rectangle from '../../general/Rectangle';
import Heading from '../../general/Heading';
import user1 from '../../../assets/span-1.svg';
import user2 from '../../../assets/span-2.svg';
import user3 from '../../../assets/span-3.svg';
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


function Feedback() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    return (
        <div className='wrapper py-10'>
            <div className='flex items-center space-x-5 mb-10'>
                <Rectangle />
                <Heading text="Feedback" />
            </div>
            <Slider {...settings}>
                <div className='pr-5 h-[300px]'>
                    <div className=' border border-[#BEBCBD] p-6 rounded-lg h-full'>
                        <div className='flex justify-between'>
                            <div>
                                <img src={user1} alt="User" />
                                <h4 className='text-[#3C4242] text-[22px] font-semibold mt-3 mb-5'>Floyd Miles</h4>
                            </div>
                            <div className='flex space-x-2 text-[#EDD146]'>
                                <IoStar /><IoStar /><IoStar /><IoStarHalf /><IoStarOutline />
                            </div>
                        </div>
                        <div className='max-w-[95%]'>
                            <p className='text-[14px] text-[#807D7E] leading-[16px] font-normal'>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p> 
                            <p className='text-[14px] text-[#807D7E] font-normal leading-[16px]'>Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
                        </div>
                    </div>
                </div>
                <div className='pr-5 h-[300px]'>
                    <div className=' border border-[#BEBCBD] p-6 rounded-lg h-full'>
                        <div className='flex justify-between'>
                            <div>
                                <img src={user2} alt="User" />
                                <h4 className='text-[#3C4242] text-[22px] font-semibold mt-3 mb-5'>Ronald Richards</h4>
                            </div>
                            <div className='flex space-x-2 text-[#EDD146]'>
                                <IoStar /><IoStar /><IoStar /><IoStar /><IoStarOutline />
                            </div>
                        </div>
                        <div className='max-w-[95%]'>
                            <p className='text-[14px] text-[#807D7E] leading-[16px] font-normal'>ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p> 
                        </div>
                    </div>
                </div>
                <div className='pr-5 h-[300px]'>
                    <div className=' border border-[#BEBCBD] p-6 rounded-lg h-full'>
                        <div className='flex justify-between'>
                            <div>
                                <img src={user3} alt="User" />
                                <h4 className='text-[#3C4242] text-[22px] font-semibold mt-3 mb-5'>Savannah Nguyen</h4>
                            </div>
                            <div className='flex space-x-2 text-[#EDD146]'>
                                <IoStar /><IoStar /><IoStar /><IoStarHalf /><IoStarOutline />
                            </div>
                        </div>
                        <div className='max-w-[95%]'>
                            <p className='text-[14px] text-[#807D7E] leading-[16px] font-normal'>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p> 
                            <p className='text-[14px] text-[#807D7E] font-normal leading-[16px]'>Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
                        </div>
                    </div>
                </div>
            </Slider>
        </div>
    )
}

export default Feedback