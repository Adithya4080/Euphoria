import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {Helmet} from 'react-helmet';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import Rectangle from '../../general/Rectangle';
import Heading from '../../general/Heading';
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

import wishlist from '../../../assets/wishlist.svg';
import Arrow from '../../../assets/Arrow.svg';
import Message from '../../../assets/message.svg';
import Right from '../../../assets/arrow-right.svg';
import cart from '../../../assets/shopping cart.svg';
import card from '../../../assets/credit card.svg';
import dress from '../../../assets/dress.svg';
import truck from '../../../assets/truck.svg'
import shipping from '../../../assets/shipping.svg'

function ProductSinglePage({product: initialProduct}) {
    const { id } = useParams();
    const [ product, setProduct ] = useState(initialProduct);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [selectedSize, setSelectedSize] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
   
    useEffect(() => {
        fetch(`http://localhost:8000/api/v1/category/view/${id}`)
            .then(response => response.json())
            .then(result => {
                setProduct(result.data);
                return fetch(`http://localhost:8000/api/v1/category/view/${result.data.category_id}`);
            })
            .then(response => response.json())
            .then(data => {
                if (data.status_code === 6000) {
                    setSimilarProducts(data.products);
                } else {
                    console.log('No similar products found');
                }
            })
            .catch(error => console.error('Error fetching similar products:', error));
    }, [id]); 


    const addToCart = async (productId, quantity) => {
        try {
          const response = await axios.post('http://localhost:8000/api/v1/cart/add/', {
            product_id: productId,
            quantity: quantity,
          });
          console.log('Product added to cart:', response.data);
        } catch (error) {
          console.error('Error adding product to cart:', error.response ? error.response.data : error.message);
        }
    };
    // const addToCart = () => {
    //     if (!selectedSize) {
    //         alert('Please select a Size!');
    //         return;
    //     }

    //     setIsLoading(true);

    //     const token = localStorage.getItem('token');
    //     const config = {
    //         headers: {
    //             'Authorization': `Bearer ${token}`,
    //             'Content-Type' : 'application/json'
    //         },
    //     };

    //     const payload = {
    //         product_id: product.id,
    //         size: selectedSize,
    //         quantity: 1,
    //     };

    //     axios.post('http://localhost:8000/api/v1/cart/add/',payload, config)
    //         .then(response => {
    //             if (response.data.status === 'success'){
    //                 alert('Product added to cart successfully!')
    //                 navigate('/cart');
    //             } else {
    //                 alert('Failed to add product to cart')
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Error adding product to cart:', error);
    //             alert('An error occured while adding to cart')
    //         })
    //         .finally(() => {
    //             setIsLoading(false);
    //         });

    // };
    
    if (!product) {
        return <p>Loading...</p>
    }
    return (
        <>
            <Helmet>
                <title>{product.name} | Euphoria</title>
            </Helmet>
            <Navbar />
            <div className="wrapper">
                <div className='top flex items-center pb-20 gap-10 font-causten'>
                    <div className='top_left gap-4 flex flex-col'>
                        {product.gallery.map((item, index) => (
                            <div key={item.id} className='imgs w-[68px] h-[68px] cursor-pointer'>
                                <img src={item.image} alt={`product ${index}`} className='w-full h-full' />
                            </div>
                        ))}
                        <div className='flex flex-col justify-center items-center cursor-pointer'>
                            <div>
                                <img src={Arrow} alt="Arrow" />
                            </div>
                            <div>
                                <img src={Arrow} alt="Arrow" className='rotate-180'/>
                            </div>
                        </div>
                    </div>
                    <div className="top_mid">
                        <div className='img w-[520px] h-[785px]'>
                            <img src={product.featured_image} alt={product.name} className='w-full h-full' />
                        </div>
                    </div>
                    <div className='top_right w-full pl-10'>
                        <div className='flex items-center text-[14px] font-medium text-[#807D7E]'>
                            <p>Shop</p>
                            <img src={Arrow} alt="Arrow" className='rotate-90' />
                            <p>Women</p>
                            <img src={Arrow} alt="Arrow" className='rotate-90' />
                            <p>Top</p>
                        </div>
                        <div className='py-10 '>
                            <h3 className='text-[#3C4242] text-[34px] max-w-[350px] font-semibold leading-[48px] line-clamp-2'>
                                {product.name}
                            </h3>
                        </div>
                        <div className='flex items-center space-x-10'>
                            <div className='flex space-x-4 items-center'>
                                <div className='text-[#EDD146] flex space-x-1'>
                                    {Array.from({ length: 5 }, (_, index) => {
                                        const ratingValue = product.ratings;
                                            if (index < Math.floor(ratingValue)) {
                                                return <IoStar key={index} />;
                                            } else if (index < ratingValue) {
                                                return <IoStarHalf key={index} />;
                                            } else {
                                                return <IoStarOutline key={index} />;
                                            }
                                        })
                                    }
                                </div>
                                <p className='text-[#807D7E] text-[14px]'>{product.ratings}</p>
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
                            <div className='flex mt-4 space-x-3 pointer-cursor'>
                                    {product.size && product.size.map((size,index) =>(
                                        <div 
                                            key={index} 
                                            onClick={() => setSelectedSize(size)}
                                            className={`border border-black rounded-lg w-[42px] h-[42px] flex items-center justify-center cursor-pointer ${selectedSize === size ? 'bg-gray-300' : ''} `}>
                                            <p>{size}</p>
                                        </div>
                                    ))}
                            </div>
                            <div className='mt-10'>
                                <div className='mb-6'>
                                    <p className='text-[#3F4646] text-[16px] font-semibold'>Colours Available</p>
                                </div>
                                <div className='flex space-x-6 cursor-pointer'>
                                    <div className='bg-[#3C4242] w-[22px] h-[22px] rounded-full'></div>
                                    <div className='bg-[#EDD146] w-[22px] h-[22px] rounded-full'></div>
                                    <div className='bg-[#EB84B0] w-[22px] h-[22px] rounded-full'></div>
                                    <div className='bg-[#9C1F35] w-[22px] h-[22px] rounded-full'></div>
                                </div>
                            </div>
                            <div className='mt-10 flex space-x-6'>
                                <button 
                                    onClick={addToCart}
                                    className={`flex space-x-2 items-center bg-[#8A33Fd] text-white py-2 px-10 rounded-lg ${isLoading ? 'opacity-50': ''} `}
                                    disabled={isLoading}
                                >
                                    <img src={cart} alt="Cart" className='text-white fill-current' />
                                    <p className='text-[16px] font-semibold '>{isLoading ? 'Adding to Cart...' : 'Add to cart'}</p>
                                </button>
                                <button className='border border-black rounded-lg py-2 px-10 font-semibold'>
                                    ${product.price}
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
                    <div className='flex max-[1280px]:flex-col w-full'>
                        <div className='w-1/2 space-y-10 mt-7 max-[1280px]:w-full '>
                            <div className='flex space-x-8 whitespace-nowrap'>
                                <div className=''>
                                    <p className='text-[16px] text-[#3C4242] font-semibold'>Description</p>
                                    <div className='border-b-[3px] rounded-[1px] border-[#3C4242]  w-[50px] pb-3'></div>
                                </div>
                                <div className='flex space-x-3'>
                                    <p className='text-[16px] font-normal text-[#807D7E]'>User Comments</p>
                                    <p className='w-[24px] h-[24px] bg-[#8A33Fd] text-white flex items-center justify-center rounded-lg text-[12px]'>21</p>
                                </div>
                                <div className='flex space-x-3 max-[520px]:hidden'>
                                    <p className='text-[16px] font-normal text-[#807D7E]'>Question & Answer</p>
                                    <p className='w-[24px] h-[24px] bg-[#3c4242] text-white flex items-center justify-center rounded-lg text-[12px]'>4</p>
                                </div>							
                            </div>
                            <div>
                                <p className='text-[16px] text-[#807D7E] max-w-[600px] max-[1280px]:max-w-[1000px]'>{product.description}</p>
                            </div>
                        </div>
                        <div className='w-1/2 max-[1280px]:mt-5 max-[1280px]:w-3/4 max-[900px]:w-full max-[1280px]:py-4 grid grid-cols-3 max-[680px]:hidden  bg-[#fafafa] rounded-lg py-1'>
                            <div className='border-r border-r-[#BEBCBD] space-y-4'>
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
                            <div className='border-r border-r-[#BEBCBD]  space-y-4'>
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
                            <div className=' space-y-4 block'>
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
                        <div className='grid grid-cols-4 gap-10'>
                            {similarProducts.map((product) => (
                                <div key={product.id} className='w-full'>
                                    <div className='relative'>
                                        <div className='w-full h-[370px] relative'>
                                            <img src={product.featured_image} alt={product.name} className='w-full h-full' />
                                        </div>
                                        <div className=' z-1 bg-white rounded-[50%] absolute top-6 right-4 cursor-pointer'>
                                            <img src={wishlist} alt="Wishlist"  className='p-2'/>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center mt-3'>
                                        <div>
                                            <h4 className='text-[#2A2F2F] text-[14px] font-bold overflow-hidden whitespace-nowrap text-ellipsis max-w-[150px] cursor-pointer'>{product.name}</h4>
                                            <p className='text-[#7F7F7F] text-[12px] font-medium'>{product.brand}'s Brand</p>
                                        </div>
                                        <div >
                                            <p className='text-[#2A2F2F] text-[16px] font-bold'>${product.price}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>   
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ProductSinglePage
