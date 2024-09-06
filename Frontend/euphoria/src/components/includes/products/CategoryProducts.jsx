import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Helmet} from 'react-helmet';
import { Link } from 'react-router-dom';

import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import wishlist from '../../../assets/wishlist.svg';
import Rectangle from '../../general/Rectangle';
import Heading from '../../general/Heading';

function CategoryProducts() {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        fetch(`http://localhost:8000/api/v1/category/products/category/${id}/`)
            .then(response => response.json())
            .then(data => {
                setProducts(data.data);
                setCategoryName(data.category_name)
            })
            .catch(error => console.error('Error fetching products:', error));
    }, [id]);

    return (
        <>  
            <Helmet>
                <title>{categoryName} | Euphoria</title>
            </Helmet>
            <Navbar />
            <div className='wrapper'>
                <div className='flex items-center space-x-5 mt-5 mb-10'>
                    <Rectangle />
                    <Heading text={categoryName} />
                </div>
                <div className='grid grid-cols-4 gap-10 mb-10'>
                    {products.map(product => (
                        <div key={product.id}>
                            <div className='relative'>
                                <div className='w-full h-[370px] relative'>
                                    <Link to={`/product/${product.id}`}>
                                        <img src={product.featured_image} alt={product.name} className='w-full h-full' />
                                    </Link>
                                </div>
                                <div className=' z-1 bg-white rounded-[50%] absolute top-6 right-4 cursor-pointer'>
                                    <img src={wishlist} alt="Wishlist"  className='p-2'/>
                                </div>
                            </div>
                            <div className='flex justify-between items-center mt-3'>
                                <div>
                                    <Link to={`/product/${product.id}`}>
                                        <h4 className='text-[#2A2F2F] text-[14px] font-bold overflow-hidden whitespace-nowrap text-ellipsis max-w-[150px] cursor-pointer'>
                                            {product.name}
                                        </h4>
                                    </Link>
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
            <Footer />
        </>
    );
}

export default CategoryProducts;
