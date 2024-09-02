import React from 'react'
import {Helmet} from 'react-helmet'
import Navbar from '../../includes/navbar/Navbar'

function Home() {
    return (
        <>
            <Helmet>
                <title>Euphoria | Home</title>
            </Helmet>
            <Navbar />
        </>
    )
}

export default Home