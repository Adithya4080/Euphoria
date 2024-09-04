import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Rectangle from '../../general/Rectangle';
import Heading from '../../general/Heading';
import Right from '../../../assets/Arrow 3.svg';

function MenCategory() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8000/api/v1/category/gender/1')
            .then(response => response.json())
            .then(data => setCategories(data.data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const handleCategoryClick = (categoryId) => {
        navigate(`/category/${categoryId}`);
    };

    return (
        <div className='wrapper'>
            <div className='flex items-center space-x-5 mb-10'>
                <Rectangle />
                <Heading text="Categories For Men" />
            </div>
            <div className='grid grid-cols-4 gap-6 font-causten'>
                {categories.map(category => (
                    <div key={category.id} className='mt-10'>
                        <div className='w-[300px] h-[393px]'>
                            <img src={category.image} alt={category.name} className='w-full h-full' />
                        </div>
                        <div className='flex justify-between items-center mt-3 cursor-pointer'>
                            <div>
                                <h4 className='text-[#2A2F2F] text-[16px] font-bold' onClick={() => handleCategoryClick(category.id)}>{category.name}</h4>
                                <p className='text-[#7F7F7F] text-[12px] font-medium'>Explore Now</p>
                            </div>
                            <div >
                                <img src={Right} alt="Right Arrow" className='text-[#797979]'/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MenCategory;
