import React, { useEffect, useState, createContext, useContext } from 'react'
import app from '../firebase/firebase-app'

export const AuthContext = createContext();

export function useUserContext() {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        app.auth().onAuthStateChanged(setUser);
    }, [])

    return (
        <AuthContext.Provider value={{ user }}>
            { children }
        </AuthContext.Provider>
    )
}