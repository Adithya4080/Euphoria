import React from 'react'
import {Helmet} from 'react-helmet'
import { BrowserRouter as Router } from 'react-router-dom';

import Navbar from '../../includes/navbar/Navbar'
import Spotlight from '../../includes/spotlight/Spotlight'
import Ad1 from '../../includes/ad/Ad1'
import Ad2 from '../../includes/ad/Ad2'
import Ad3 from '../../includes/ad/Ad3'
import Feedback from '../../includes/ad/Feedback'
import Footer from '../../includes/footer/Footer'
import NewArrivals from '../../includes/products/NewArrivals';
import MenCategory from '../../includes/products/MenCategory';
import WomenCategory from '../../includes/products/WomenCategory';
import Limelight from '../../includes/products/Limelight';

function Home() {
    return (
        <>
            <Helmet>
                <title>Euphoria | Home</title>
            </Helmet>
            <Router>
                <Navbar />
                <Spotlight />
                <Ad1 />
                <NewArrivals />
                <Ad2 />
                <MenCategory />
                <WomenCategory />
                <Ad3 />
                <Limelight />
                <Feedback />
                <Footer />
            </Router>
        </>
    )
}

export default Home