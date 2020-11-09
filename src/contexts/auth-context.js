import React, { useEffect, useState, createContext, useContext } from 'react'
import app from '../firebase-app'

export const AuthContext = createContext();
// export const AuthContextSetter = createContext();

export function useUserContext() {
    return useContext(AuthContext)
}

// export function useSetUserContext() {
//     return useContext(AuthContextSetter)
// }

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        app.auth().onAuthStateChanged(setUser);
    }, [])

    return (
        <AuthContext.Provider value={{ user }}>
            {/* <AuthContextSetter.Provider value={{ setUser }}> */}
                { children }
            {/* </AuthContextSetter.Provider> */}
        </AuthContext.Provider>
    )
}