import React from 'react'
import {Helmet} from 'react-helmet'
import Navbar from '../../includes/navbar/Navbar'
import Spotlight from '../../includes/spotlight/Spotlight'
import Ad1 from '../../includes/ad/Ad1'
import Ad2 from '../../includes/ad/Ad2'

function Home() {
    return (
        <>
            <Helmet>
                <title>Euphoria | Home</title>
            </Helmet>
            <Navbar />
            <Spotlight />
            <Ad1 />
            <Ad2 />
        </>
    )
}

export default Home