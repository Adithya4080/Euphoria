import React, { useReducer, createContext, useEffect, useState } from "react";

export const Store = createContext();

export const Context = ({ children }) => {

    // Login Logout
    const [userData, setUserData] = useState({})
    const updateUserData = (action) => {
        switch (action.type) {
            case "LOGOUT":
                setUserData(null);
                localStorage.clear()
                break;
            case "LOGIN":
                setUserData(action.payload)
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem("user_data")));
    }, [])

    const value = {
        userData,
        updateUserData
    }

    return (
        <Store.Provider value={value}>
            {children}
        </Store.Provider>
    )
}