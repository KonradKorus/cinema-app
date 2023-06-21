import React, { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext();

export const useAuth = () =>
{
    return useContext(AuthContext);
}

export const AuthProvider = (props) => 
{
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if(localStorage.hasOwnProperty("token") && localStorage.hasOwnProperty("user"))
        {
            setIsLogged(true)

            if(JSON.parse(localStorage.getItem("user")).role === "admin")
            {
                setIsAdmin(true)
            }
        }
    }, [])

    const value = 
    {
        isLogged,
        setIsLogged,
        isAdmin,
        setIsAdmin,
    }
    
    return (
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    )
}
