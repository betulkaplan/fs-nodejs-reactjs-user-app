import React, { useContext, useState, useEffect } from "react";
import { useCookies } from 'react-cookie';

export const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState('Dummy user');
    const [cookies] = useCookies();
    const value = {
        name: 'betul',
        user: user,
        setUser: setUser
    };

    useEffect(() => {
        fetch('http://localhost:5000/auth/checkLogin',
            {
                credentials: 'include'
            }).then(res => res.json()).then(res => {
                console.log('useEffect of context checkLogin', res);
                setUser(res);
            }).catch(err => {
                console.log('useEffect of context', err);
            });
    }, []);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}