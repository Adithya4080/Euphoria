import React from 'react';
import bg4 from '../../../assets/bg-4.jpg';
import bg5 from '../../../assets/bg-5.jpg';

function Ad2() {
    return (
        <>
            <div className='wrapper w-full flex'>
                <div className='w-1/2 bg-cover bg-no-repeat' style={{backgroundImage: `url(${bg4})`}}>
                
                </div>
                <div className='w-1/2'>
                    <img src={bg5} alt="Background"  className='w-full'/>
                </div>
            </div>
        </>
    )
}

export default Ad2