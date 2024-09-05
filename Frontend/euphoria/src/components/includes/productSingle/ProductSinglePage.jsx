import React from 'react';
import {Helmet} from 'react-helmet';

import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import SingleTop from './SingleTop';
import SingleBot from './SingleBot';

function ProductSinglePage() {
    return (
        <>
            <Helmet>
                <title>Single | Euphoria</title>
            </Helmet>
            <Navbar />
            <SingleTop />
            {/* <SingleBot /> */}
            <Footer />
        </>
    )
}

export default ProductSinglePage