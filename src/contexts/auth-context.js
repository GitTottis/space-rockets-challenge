import React, { useEffect, useState, createContext, useContext } from 'react'
import firebaseApp from '../firebase/firebase-app'

const AuthContext = createContext();

export function useUserContext() {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        firebaseApp.auth().onAuthStateChanged(setUser);
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            { children }
        </AuthContext.Provider>
    )
}