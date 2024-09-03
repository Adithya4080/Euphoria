import React, { useEffect, useState } from 'react';
import Rectangle from '../../general/Rectangle';
import Heading from '../../general/Heading';

function Limelight() {
    const [products, setProducts] = useState([]);
    const baseUrl = 'http://localhost:8000';

    useEffect(() => {
        fetch(`${baseUrl}/api/v1/category/products/category/14/`)
            .then(response => response.json())
            .then(data => {
                // Sort products by ID in ascending order and get the first 4
                const sortedProducts = data.data.sort((a, b) => a.id - b.id).slice(0, 4);
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
            <div className='flex flex-wrap'>
                {products.map(product => (
                    <div key={product.id} className='p-4'>
                        <img 
                            src={product.featured_image}
                            alt={product.name} 
                            className='w-full h-auto'
                        />
                        <p>{product.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Limelight;
