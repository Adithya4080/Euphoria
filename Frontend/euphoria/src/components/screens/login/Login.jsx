import React, { useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/Logo.svg';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from '../../includes/context/Store';



    function Login() {
        const [username, setUsername] =useState("");
        const [password, setPassword] =useState("");
        const [message, setMessage] = useState("");

        const { updateUserData } = useContext(Store) 

        const navigate = useNavigate();

        const handleSubmit = (e) => {
            setMessage("")
            e.preventDefault();
            axios.post("http://localhost:8000/api/v1/auth/token/",{username,password})
            .then((response) =>{
                let data = response.data;
                localStorage.setItem("user_data", JSON.stringify(data));
                localStorage.setItem("username", username);
                updateUserData({ type:"LOGIN",payload: data })
                toast.success("Logged in Successful!", {
                    position: "center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                });
                navigate("/")           
            })
            .catch((error) => {
                console.log(error.response.status);
                if (error.response.status === 401) {
                    setMessage(error.response.data.detail)
                }
            })
        };
    
    return (
        <>
            <Helmet>
                <title>Login | Euphoria</title>
            </Helmet>
            <div className='border-b-2 border-b-yellow-600 sticky top-0 z-1'>
                <div className='wrapper items-center flex flex-col justify-center space-x-1 space-y-3'>
                    <div className='pt-4'>
                        <h1><img src={logo} alt="Logo" /></h1>
                    </div>
                    <div className='pb-4'>
                        <h2 className='text-red-700 font-bold text-2xl font-causten'>Your One Stop Fashion Destination</h2>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center py-24 bg-gray-100">
                <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
                    <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
                            <input
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                required
                                type="text"
                                className="w-full px-3 py-2 mt-1 text-gray-700 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                                placeholder="Username"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                                type="password"
                                className="w-full px-3 py-2 mt-1 text-gray-700 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                                placeholder="••••••••"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:ring-4 focus:ring-blue-300"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    <p className="text-sm text-center text-gray-600">
                        Don't have an account? <Link to='/create' className="text-blue-600 hover:underline">Sign Up</Link>
                    </p>
                    {message && <div className='text-red-500 text-center text-sm'>{message}</div>}
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default Login;