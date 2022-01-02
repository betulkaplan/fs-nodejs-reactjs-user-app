import React, { useContext, useState, useEffect } from "react";

export const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState('Dummy user');
    const value = {
        name: 'betul',
        user: user,
        thefunction: setUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}