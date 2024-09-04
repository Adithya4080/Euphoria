import React from 'react';
import { Link } from "react-router-dom";
import Facebook from '../../../assets/facebook.svg';
import Instagram from '../../../assets/instagram.svg';
import Twitter from '../../../assets/twitter.svg';
import Linkedin from '../../../assets/linkedin.svg';
import Playstore from '../../../assets/playstore.svg';
import Appstore from '../../../assets/phone.svg';
import Arrow from '../../../assets/arrow-down.svg';

function Footer() {
    return (
        <div className='bg-[#3C4242] py-24'>
            <div className="wrapper font-causten text-white">
                <div className="footer_top px-24">
                    <div className='flex space-x-32'>
                        <div>
                            <h6 className='text-[24px] font-bold mb-6'>Need Help</h6>
                            <ul className='space-y-3 text-[16px] font-medium'>
                                <li><a href="#">Contact Us</a></li>
                                <li><a href="#">Track Order</a></li>
                                <li><a href="#">Returns & Refunds</a></li>
                                <li><a href="#">FAQ's</a></li>
                                <li><a href="#">Career</a></li>
                            </ul>
                        </div>
                        <div>
                            <h6 className='text-[24px] font-bold mb-6'>Company</h6>
                            <ul className='space-y-3 text-[16px] font-medium'>
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">euphoria Blog</a></li>
                                <li><a href="#">euphoriastan</a></li>
                                <li><a href="#">Collaboration</a></li>
                                <li><a href="#">Media</a></li>
                            </ul>
                        </div>
                        <div>
                            <h6 className='text-[24px] font-bold mb-6'>More Info</h6>
                            <ul className='space-y-3 text-[16px] font-medium'>
                                <li><a href="#">Terms and Conditions</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">Shipping Policy</a></li>
                                <li><a href="#">Sitemap</a></li>
                            </ul>
                        </div>
                        <div>
                            <h6 className='text-[24px] font-bold mb-6'>Location</h6>
                            <ul className='space-y-3 text-[16px] font-medium'>
                                <li><a href="#">support@euphoria.in</a></li>
                                <li>Eklingpura Chouraha, Ahmedabad Main Road</li>
                                <li>(NH 8- Near Mahadev Hotel) Udaipur, India- 313002</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer_mid py-10 px-24">
                    <div className='flex space-x-[565px]'>
                        <div className='flex space-x-3 mt-20'>
                            <div className='bg-white w-[37px] h-[37px]  rounded-[10px] flex items-center justify-center cursor-pointer'>
                                <Link to='https://www.facebook.com/'>
                                    <img src={Facebook} alt="Facebook" className='w-full h-full object-contain'/>
                                </Link>
                            </div>
                            <div className='bg-white w-[37px] h-[37px]  rounded-[10px] flex items-center justify-center cursor-pointer'>
                                <Link to='https://www.instagram.com/'>
                                    <img src={Instagram} alt="Instagram" className='w-full h-full object-contain'/>
                                </Link>
                            </div>
                            <div className='bg-white w-[37px] h-[37px]  rounded-[10px] flex items-center justify-center cursor-pointer'>
                                <Link to='https://twitter.com/'>
                                    <img src={Twitter} alt="Twitter" className='w-full h-full object-contain'/>
                                </Link>
                            </div>
                            <div className='bg-white w-[37px] h-[37px]  rounded-[10px] flex items-center justify-center cursor-pointer'>
                                <Link to ='https://in.linkedin.com/'>   
                                    <img src={Linkedin} alt="Linkedin" className='w-full h-full object-contain'/>
                                </Link>
                            </div>
                        </div>
                        <div>
                            <div>
                                <h6 className='text-[24px] font-bold mb-6 whitespace-nowrap'>Download The App</h6>
                            </div>
                            <div className='pt-3 font-causten flex space-x-4'>
                                <div className='bg-[#424242]'>
                                    <div className='flex items-center space-x-4 p-2'>
                                        <div>
                                            <Link to = 'https://play.google.com/'>
                                                <img src={Playstore} alt="Playstore" />
                                            </Link>
                                        </div>
                                        <div className='cursor-pointer'>
                                            <p className='text-[10px]'>Android App on</p>
                                            <h6 className='text-[16px] font-normal'>Google Play</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className='bg-[#424242]'>
                                    <div className='flex items-center space-x-4 p-2'>
                                        <div>
                                            <Link to='https://www.apple.com/in/app-store/'>
                                                <img src={Appstore} alt="Appstore" />
                                            </Link>   
                                        </div>
                                        <div className='cursor-pointer'>
                                            <p className='text-[10px]'>Available on the</p>
                                            <h6 className='text-[16px] font-normal'>App Store</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer_mid2 py-10">
                    <div className='flex justify-between items-center border-t border-b  border-[#BEBCBD] py-8'>
                        <div >
                            <h6 className='text-[24px] font-bold px-24'>Popular categories</h6>
                        </div>
                        <div>
                            <img src={Arrow} alt="Arrow" />
                        </div>                        
                    </div>
                </div>

                <div className="footer_bot">
                    <p className='text-[18px] leading-[36px] font-bold text-center'>Copyright © 2023 Euphoria Folks Pvt Ltd. All rights reserved.</p>
                </div>
            </div>
        </div>
    )
}

export default Footer