import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authReady, setAuthReady] = useState(false); // ✅ track auth initialization

    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
        setAuthReady(true); // ✅ mark auth check complete
    }, []);

    const signup = async (formData) => {
        const res = await axios.post('https://datingapp-production-4dc1.up.railway.app/api/auth/signup', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        setUser(res.data.user);
        sessionStorage.setItem('user', JSON.stringify(res.data.user));
        return res.data;
    };

    const login = async (email, password) => {
        const res = await axios.post('https://datingapp-production-4dc1.up.railway.app/api/auth/login', { email, password });
        setUser(res.data.user);
        sessionStorage.setItem('user', JSON.stringify(res.data.user));
        return res.data;
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, signup, login, logout, authReady }}>
            {children}
        </AuthContext.Provider>
    );
};
