import React, { useEffect, useState } from 'react';
import Rectangle from '../../general/Rectangle';
import Heading from '../../general/Heading';


function WomenCategory() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/v1/category/gender/2')
            .then(response => response.json())
            .then(data => setCategories(data.data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    return (
        <div className='wrapper'>
            <div className='flex items-center space-x-5 mb-10'>
                <Rectangle />
                <Heading text="Categories For Women" />
            </div>
            <div className='flex flex-wrap'>
                {categories.map(category => (
                    <div key={category.id} className='p-4'>
                        <img src={category.image} alt={category.name} className='w-full h-auto' />
                        <p>{category.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WomenCategory