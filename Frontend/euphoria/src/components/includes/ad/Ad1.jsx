import React from 'react';
import bg2 from '../../../assets/bg-2.jpg';
import bg3 from '../../../assets/bg-3.jpg';

function Ad1() {
    return (
        <div className='wrapper flex pt-20 pb-12 w-full space-x-8'>
            <div className='w-1/2 h-[350px] bg-cover bg-no-repeat rounded-xl' style={{backgroundImage: `url(${bg2})`, backgroundSize: '150%', backgroundPosition: 'left top'}}>
                    <div className="px-6 pt-20 text-white font-causten items-center">
                        <h4 className="text-[18px] font-semibold leading-9">Low Price</h4>
                        <h2 className='text-[34px] font-bold leading-[45px] mt-5 mb-2'>High Coziness</h2>
                        <h4 className="text-[18px] font-medium ">UPTO 50% OFF</h4>
                        <h4 className="text-[20px] font-bold mt-7 cursor-pointer" style={{textDecoration:'underline', textUnderlineOffset:'5px', textDecorationThickness:'1px'}}>Explore Items</h4>
                    </div>
            </div>
            <div className='w-1/2 h-[350px] bg-no-repeat bg-cover rounded-xl' style={{backgroundImage: `url(${bg3})`, backgroundSize: '140%', backgroundPosition: 'left top'}}>
                <div className="px-6 pt-16 text-white font-causten items-center">
                    <h4 className="text-[18px] font-semibold leading-9">Beyoung Presents</h4>
                    <h2 className='text-[34px] font-bold leading-[45px] mt-5 mb-2'>Breezy Summer <br /> Style</h2>
                    <h4 className="text-[18px] font-medium ">UPTO 50% OFF</h4>
                    <h4 className="text-[20px] font-bold mt-7 cursor-pointer" style={{textDecoration:'underline', textUnderlineOffset:'5px', textDecorationThickness:'1px'}}>Explore Items</h4>
                </div>
            </div>
        </div>
    )
}

export default Ad1