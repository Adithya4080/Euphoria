import React, { useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/Logo.svg';
import { Link } from 'react-router-dom';
import { Store } from '../../includes/context/Store';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const { updateUserData } = useContext(Store) 

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);
        if (!name || !email || !password) {
            setMessage("Please fill in all fields.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/api/v1/auth/create/", {
                email, 
                password, 
                name,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            let data = response.data.data;
            let userName = response.data.name
            let status_code = response.data.status_code;

            if (status_code === 6000) {            
                localStorage.setItem("user_data", JSON.stringify(data));
                localStorage.setItem("username", userName);
                updateUserData({ type: "LOGIN", payload: data })
                setMessage("Account created successfully!");
                navigate("/login");
            } else {
                setMessage(response.data.message || "Account creation failed.");
            }

        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data.detail || "An error occurred.";
                setMessage(errorMessage);
            } else if (error.request) {
                setMessage("No response from the server. Please try again later.");
            } else {
                setMessage("An unexpected error occurred.");
            }
        } finally {
            setLoading(false);
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
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-600">Username</label>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                type="text"
                                className="w-full px-3 py-2 mt-1 text-gray-700 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                                placeholder="Username"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                type="email"
                                className="w-full px-3 py-2 mt-1 text-gray-700 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                type="password"
                                className="w-full px-3 py-2 mt-1 text-gray-700 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:ring-4 focus:ring-blue-300"
                                disabled={loading}
                            >
                                {loading ? "Signing Up..." : "Sign Up"}
                            </button>
                        </div>
                        {message && <div className='text-red-500 mt-3 text-center text-sm'>{message}</div>}
                    </form>

                    <p className="text-sm text-center text-gray-600">
                        Already have an account? <Link to='/login' className="text-blue-600 hover:underline">Login</Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Signup;
