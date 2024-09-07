import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/Logo.svg';
import { Link } from 'react-router-dom';

function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/v1/auth/create/', formData);
            if (response.data.status_code === 6000) {
                localStorage.setItem('username', formData.name);
                localStorage.setItem('token', response.data.token);
                navigate('/login');
            } else {
                setErrorMessage(response.data.data);  
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    return (
        <>
            <Helmet>
                <title>Signup | Euphoria</title>
            </Helmet>
            <div className='border-b-2 border-b-yellow-600 sticky top-0 z-1'>
                <div className='wrapper items-center flex flex-col justify-center space-x-1 space-y-3'>
                    <div className='pt-5'>
                        <h1><img src={logo} alt="Logo" /></h1>
                    </div>
                    <div className='pb-4'>
                        <h2 className='text-red-700 font-bold text-2xl font-causten'>Join Your Fashion Destination</h2>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center py-16 bg-gray-100">
                <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
                    <h2 className="text-2xl font-bold text-center text-gray-700">Sign Up</h2>
                    {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-600">Username</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 mt-1 text-gray-700 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                                placeholder="Username"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 mt-1 text-gray-700 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 mt-1 text-gray-700 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                                placeholder="••••••••"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:ring-4 focus:ring-blue-300"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>

                    <p className="text-sm text-center text-gray-600">
                        Already have an account? <a href="#" className="text-blue-600 hover:underline"><Link to='/login'>Login</Link></a>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Signup;

