import React, { useEffect, useState } from 'react';
import Rectangle from '../../general/Rectangle';
import Heading from '../../general/Heading';
import wishlist from '../../../assets/wishlist.svg';

function Limelight() {
    const [products, setProducts] = useState([]);
    const baseUrl = 'http://localhost:8000';

    useEffect(() => {
        fetch(`${baseUrl}/api/v1/category/products/category/14/`)
            .then(response => response.json())
            .then(data => {
                const sortedProducts = data.data.sort((a, b) => a.id - b.id).slice(0,4);
                setProducts(sortedProducts);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);
    
    return (
        <div className='wrapper'>
            <div className='flex items-center space-x-5 mb-10'>
                <Rectangle />
                <Heading text="In The Limelight" />
            </div>
            <div className='grid grid-cols-4 gap-10'>
                {products.map(product => (
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
    );
}

export default Limelight;
