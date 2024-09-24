import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../../includes/navbar/Navbar';
import Footer from '../../includes/footer/Footer';
import { Link } from 'react-router-dom';

function NoMatch() {
    return (
        <div>
            <Helmet>
                <title>Error 404| Page Not Found</title>
            </Helmet>
            <Navbar />
            <div className='flex justify-center items-center mt-40 mb-20 text-black'>
                <div>
                    <div>
                    <img src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/f_auto,q_auto,d_Croma%20Assets:No_image.png/Croma%20Assets/UI%20Assets//error-404.svg" alt="Error Img" />
                    </div>
                    <div className='mt-12'>
                        <h2 className='text-2xl font-bold'>404 Error page not found</h2>
                        <Link to='/'><button className='border border-red-300 px-20 py-1 rounded-lg mt-2 text-xl font-semibold'>Retry</button></Link>
                    </div> 
                </div>               
            </div>
            <Footer />
        </div>
    )
}

export default NoMatch