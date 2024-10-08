import React from 'react';
import bg4 from '../../../assets/bg-4.jpg';
import bg5 from '../../../assets/bg-5.jpg';
import Button from '../../general/Button';

function Ad2() {
    return (
        <>
            <div className='wrapper w-full flex py-5'>
                <div className='w-1/2 max-[1080px]:w-full  bg-cover bg-no-repeat max-[1080px]:rounded-2xl' style={{backgroundImage: `url(${bg4})`}}>
                    <div className="px-20 max-[1080px]:py-40 text-white font-causten flex flex-col justify-center h-full">
                        <h2 className='text-[34px] font-bold leading-[45px] max-[768px]:text-[30px] max-[768px]:leading-[35px] mt-5 mb-2'>WE MADE YOUR EVERYDAY FASHION BETTER!</h2>
                        <p className="text-[18px] font-thin leading-[24px] mt-8 max-[400px]:hidden">In our journey to improve everyday fashion, euphoria presents EVERYDAY wear range - Comfortable & Affordable fashion 24/7</p>
                        <Button text="Shop Now" className="mt-8 py-[12px] items-start w-1/3 text-[16px] whitespace-nowrap max-[640px]:py-[16px] max-[640px]:w-1/2 max-[400px]:w-3/4" />
                    </div>
                </div>
                <div className='w-1/2 block max-[1080px]:hidden'>
                    <img src={bg5} alt="Background"  className='w-full'/>
                </div>
            </div>
        </>
    )
}

export default Ad2