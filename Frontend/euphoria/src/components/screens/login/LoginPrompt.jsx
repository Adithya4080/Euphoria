import React from 'react';
import { IoWarning } from "react-icons/io5";
import Button from '../../general/Button';
import { useNavigate } from 'react-router-dom';


const LoginPrompt = ({closeLoginPrompt}) => {
    const navigate = useNavigate()

    const handleSignIn = () => {
        try {
            navigate('/login');
        } catch (error) {
            console.error('Error during navigation:', error)
        }
    };
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
            <div className='bg-sky-300 text-white rounded-md text-center p-8 space-y-2'>
                <div className='flex justify-center items-center text-4xl text-red-700'>
                    <IoWarning />
                </div>
                <h2 className='font-bold text-2xl'>Sign In Required</h2>
                <div onClick={handleSignIn}><Button text='Sign In'  /></div>
                <button onClick={closeLoginPrompt} className='bg-blue-900 px-4 py-1 rounded-md'>
                    Close
                </button>
            </div>
        </div>
    )
};

export default LoginPrompt