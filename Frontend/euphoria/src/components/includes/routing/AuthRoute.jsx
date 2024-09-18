import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthRoute = ({ children }) => {
    const userData = JSON.parse(localStorage.getItem("user_data"));
    const [componentMounted, setComponentMounted] = useState(false);

    useEffect(() => {
        setComponentMounted(true);
    },[])

    useEffect(() =>{
        if(componentMounted && !userData){
        toast.warn("Please Log In First")
        }
    },[componentMounted,userData])

    if(!userData){
        return <Navigate to='/login' />
    }

    return (
        children
    )
}

export default AuthRoute