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
                    <h2 className='text-[50px] font-extrabold '>Top Brands Deal</h2>
                    <p className='text-[22px] font-semibold mt-8 mb-10'>Up To <span className='text-yellow-300'>60%</span> off on brands</p>
                    <div className='flex space-x-6 cursor-pointer'>
                        <div>
                            <img src={nike} alt="Nike" className='rounded-xl' />
                        </div>
                        <div>
                            <img src={hm} alt="H & M" className='rounded-xl' />
                        </div>
                        <div>
                            <img src={levis} alt="Levis" className='rounded-xl'/>
                        </div>
                        <div>
                            <img src={USPA} alt="USPA" className='rounded-xl'/>
                        </div>
                        <div>
                            <img src={puma} alt="Puma" className='rounded-xl'/>
                        </div>                   
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ad3