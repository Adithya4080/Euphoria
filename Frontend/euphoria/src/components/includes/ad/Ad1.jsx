import React from 'react';
import bg2 from '../../../assets/bg-2.jpg';
import bg3 from '../../../assets/bg-3.jpg';

function Ad1() {
    return (
        <div className='wrapper flex max-[900px]:flex-col max-[900px]:space-x-0 max-[900px]:space-y-4 pt-20 pb-12 w-full space-x-8'>
            <div className='w-1/2 max-[1080px]:w-full h-[350px] bg-cover bg-no-repeat rounded-xl' style={{backgroundImage: `url(${bg2})`, backgroundSize: '150%', backgroundPosition: 'left top'}}>
                    <div className="px-6 pt-20 text-white font-causten items-center max-[480px]:pt-10">
                        <h4 className="text-[18px] max-[900px]:text-[24px] max-[560px]:text-[20px] font-semibold leading-9">Low Price</h4>
                        <h2 className='text-[34px] max-[900px]:text-[48px] max-[720px]:text-[36px] max-[560px]:text-[26px] font-bold leading-[45px] mt-5 mb-2'>High Coziness</h2>
                        <h4 className="text-[18px] max-[900px]:text-[24px] max-[560px]:text-[18px] font-medium ">UPTO 50% OFF</h4>
                        <h4 className="text-[20px] max-[900px]:text-[26px] max-[560px]:text-[22px] font-bold mt-7 cursor-pointer" style={{textDecoration:'underline', textUnderlineOffset:'5px', textDecorationThickness:'1px'}}>Explore Items</h4>
                    </div>
            </div>
            <div className='w-1/2 max-[1080px]:w-full h-[350px] bg-no-repeat bg-cover rounded-xl' style={{backgroundImage: `url(${bg3})`, backgroundSize: '140%', backgroundPosition: 'left top'}}>
                <div className="px-6 pt-16 text-white font-causten items-center max-[480px]:pt-10">
                    <h4 className="text-[18px] max-[900px]:text-[24px] max-[560px]:text-[20px] font-semibold leading-9">Beyoung Presents</h4>
                    <h2 className='text-[34px] max-[900px]:text-[48px] max-[720px]:text-[36px] max-[560px]:text-[26px] font-bold leading-[45px] mt-5 mb-2 max-w-[300px] max-[480px]:mt-2'>Breezy Summer Style</h2>
                    <h4 className="text-[18px] max-[900px]:text-[24px] max-[560px]:text-[18px] font-medium ">UPTO 50% OFF</h4>
                    <h4 className="text-[20px] max-[900px]:text-[24px] max-[560px]:text-[22px] font-bold mt-7 cursor-pointer max-[480px]:mt-2" style={{textDecoration:'underline', textUnderlineOffset:'5px', textDecorationThickness:'1px'}}>Explore Items</h4>
                </div>
            </div>
        </div>
    )
}

export default Ad1