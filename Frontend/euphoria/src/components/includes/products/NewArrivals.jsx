import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Rectangle from '../../general/Rectangle';
import Heading from '../../general/Heading';
import Left from '../../../assets/arrow-left.svg';
import Right from '../../../assets/arrow-right.svg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function NewArrivals() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/v1/category/')
            .then(response => response.json())
            .then(data => {
                const filteredCategories = data.data.filter(category => category.id >= 2 && category.id <= 9);
                setCategories(filteredCategories);
            })
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <img src={Right} alt="Next" className="arrow-next" />,
        prevArrow: <img src={Left} alt="Previous" className="arrow-prev" />,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <div className='wrapper pb-10'>
            <div className='flex items-center space-x-5 mb-10'>
                <Rectangle />
                <Heading text="New Arrival" />
            </div>
            <Slider {...sliderSettings} className="w-full">
                {categories.map(category => (
                    <div key={category.id} className="px-2 w-full">
                        <div className='w-[290px] h-[262px] max-[1000px]:w-[240px] max-[810px]:w-[200px] max-[768px]:w-[250px] max-[590px]:w-[220px] max-[480px]:w-[300px]'>
                            <img src={category.image} alt={category.name} className="w-full h-full" />
                        </div>
                        <p className="text-[16px] font-semibold mt-2 cursor-pointer">{category.name}</p>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default NewArrivals;