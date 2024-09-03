import React from 'react';
import { Link } from "react-router-dom";
import Facebook from '../../../assets/facebook.svg';
import Instagram from '../../../assets/instagram.svg';
import Twitter from '../../../assets/twitter.svg';
import Linkedin from '../../../assets/linkedin.svg';

function Footer() {
    return (
        <div className='bg-[#3C4242] py-20'>
            <div className="wrapper font-causten text-white">
                <div className="footer_top">
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

                <div className="footer_mid py-10">
                    <div className='flex space-x-[600px]'>
                        <div className='flex space-x-3'>
                            <div className='bg-white w-[37px] h-[37px]  rounded-[10px] flex items-center justify-center'>
                                <Link to='https://www.facebook.com/'>
                                    <img src={Facebook} alt="Facebook" className='w-full h-full object-contain'/>
                                </Link>
                            </div>
                            <div className='bg-white w-[37px] h-[37px]  rounded-[10px] flex items-center justify-center'>
                                <Link to='https://www.instagram.com/'>
                                    <img src={Instagram} alt="Instagram" className='w-full h-full object-contain'/>
                                </Link>
                            </div>
                            <div className='bg-white w-[37px] h-[37px]  rounded-[10px] flex items-center justify-center'>
                                <Link to='https://twitter.com/'>
                                    <img src={Twitter} alt="Twitter" className='w-full h-full object-contain'/>
                                </Link>
                            </div>
                            <div className='bg-white w-[37px] h-[37px]  rounded-[10px] flex items-center justify-center'>
                                <Link to ='https://in.linkedin.com/'>   
                                    <img src={Linkedin} alt="Linkedin" className='w-full h-full object-contain'/>
                                </Link>
                            </div>
                        </div>
                        <div>
                        <h6 className='text-[24px] font-bold mb-6'>Download The App</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer