import React, { useEffect, useState } from 'react';
import Rectangle from '../../general/Rectangle';
import Heading from '../../general/Heading';
import Left from '../../../assets/arrow-left.svg';
import Right from '../../../assets/arrow-right.svg'

function NewArrivals() {
    const [categories, setCategories] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 4;

    useEffect(() => {
        fetch('http://localhost:8000/api/v1/category/')
            .then(response => response.json())
            .then(data => {
                const filteredCategories = data.data.filter(category => category.id >= 2 && category.id <= 8);
                console.log('Filtered Categories:', filteredCategories); 
                setCategories(filteredCategories);
            })
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const handlePrev = () => {
        setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
    };

    const handleNext = () => {
        setCurrentIndex(prevIndex => Math.min(prevIndex + 1, categories.length - itemsPerPage));
    };

    return (
        <div className='wrapper'>
            <div className='flex items-center space-x-5 mb-10'>
                <Rectangle />
                <Heading text="New Arrival" />
            </div>
            <div className='relative flex space-x-5 items-center w-full'>
                <button onClick={handlePrev} className='absolute left-0 z-9'>
                     <img src={Left} alt="Left Arrow" />
                </button>
                <div className='overflow-hidden flex  w-full'>
                    <div className='flex space-x-6 transition-transform' style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`, width: `${categories.length * (100 / itemsPerPage)}%` }}>
                        {categories.map(category => (
                            <div key={category.id} className="">
                                <div className='w-[292px] h-[262px]'>
                                    <img src={category.image} alt={category.name} className="w-full h-full" />
                                </div>
                                <p className="text-[16px] font-semibold mt-2">{category.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <button onClick={handleNext} className='absolute right-0 z-9'>
                     <img src={Right} alt="Right Arrow" />
                </button>
            </div>
        </div>
    );
}

export default NewArrivals;
