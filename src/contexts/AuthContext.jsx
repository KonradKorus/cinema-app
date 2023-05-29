import React, { createContext, useState, useContext } from 'react'

const AuthContext = createContext();

export const useAuth = () =>
{
    return useContext(AuthContext);
}

export const AuthProvider = (props) => 
{
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const value = 
    {
        isLogged,
        setIsLogged,
        isAdmin,
        setIsAdmin
    }
    
    return (
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    )
}
