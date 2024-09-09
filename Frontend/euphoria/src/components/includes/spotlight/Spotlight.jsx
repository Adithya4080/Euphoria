import React, { useState } from 'react';
import bg1 from '../../../assets/bg-1.jpg';
import bg2 from '../../../assets/bg-2.jpg';
import rightarrow from "../../../assets/right-arrow-bold.svg";
import leftarrow from "../../../assets/left-arrow-bold.svg";
import Button from '../../general/Button';

function Spotlight() {
    const [currentBg, setCurrentBg] = useState(bg1);

    const handleNext = () => {
        setCurrentBg(currentBg === bg1 ? bg2 : bg1);
    };

    const handlePrev = () => {
        setCurrentBg(currentBg === bg1 ? bg2 : bg1);
    };

    return (
        <>
            <div className='h-[750px] bg-cover bg-center relative' style={{backgroundImage: `url(${currentBg})`}}>
                <div className='flex justify-between items-center h-full px-6 max-[768px]:hidden'>
                    <img src={leftarrow} alt="Left Arrow" onClick={handlePrev} className="cursor-pointer " />
                    <img src={rightarrow} alt="Right Arrow" onClick={handleNext} className="cursor-pointer" />
                </div>
                <div className="wrapper">
                    <div className="absolute top-[130px] max-[768px]:left-[120px] max-[620px]:left-[50px] left-[190px] py-6 text-white font-causten">
                        <h4 className="text-[32px] max-[768px]:text-[28px] max-[560px]:text-[20px] font-medium leading-9">T-shirt / Tops</h4>
                        <h2 className='text-[78px] max-[768px]:text-[50px] max-[560px]:text-[40px] font-[800px] max-[768px]:leading-[48px] leading-[93px] my-8 max-[768px]:my-4'>Summer<br />Value Pack</h2>
                        <h4 className="text-[32px] max-[768px]:text-[28px] max-[560px]:text-[20px] font-medium leading-9">cool / colorful / comfy</h4>
                        <Button text="Shop Now" className="mt-8 py-[16px] px-[72px] max-[560px]:px-[40px]" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Spotlight;
