import React from 'react';
import nike from '../../../assets/nike.jpg';
import hm from '../../../assets/H&M.jpg';
import levis from '../../../assets/levis.jpg';
import USPA from '../../../assets/USPA.jpg'
import puma from '../../../assets/puma.jpg'

function Ad3() {
    return (
        <div className='py-4'>
            <div className='wrapper bg-[#3C4242] rounded-xl py-4'>
                <div className='p-4 flex flex-col items-center text-white'>
                    <h2 className='text-[50px] font-extrabold max-[768px]:text-[30px]'>Top Brands Deal</h2>
                    <p className='text-[22px] font-semibold max-[768px]:text-[18px] max-[768px]:mt-4 mt-8 mb-10'>Up To <span className='text-yellow-300'>60%</span> off on brands</p>
                    <div className='grid grid-cols-5 max-[620px]:grid-cols-3 gap-6 cursor-pointer '>
                        <div className='max-[768px]:w-[80px]'>
                            <img src={nike} alt="Nike" className='rounded-xl w-full' />
                        </div>
                        <div className='max-[768px]:w-[80px]'>
                            <img src={hm} alt="H & M" className='rounded-xl' />
                        </div>
                        <div className='max-[768px]:w-[80px]'>
                            <img src={levis} alt="Levis" className='rounded-xl'/>
                        </div>
                        <div className='max-[768px]:w-[80px]'>
                            <img src={USPA} alt="USPA" className='rounded-xl'/>
                        </div>
                        <div className='max-[768px]:w-[80px]'>
                            <img src={puma} alt="Puma" className='rounded-xl'/>
                        </div>                   
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ad3