import React, { useCallback, useEffect, useState } from 'react';
import { api , AuthContext } from './context/authContextAndApi'
import toast from 'react-hot-toast';


export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState(null);

    

    const initialzeAuth = useCallback(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Error parsing stored user data", error);
                localStorage.removeItem('user');
            }
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        initialzeAuth();
    }, [initialzeAuth]);

    const handleAuthResponse = (data) => {
        const userData = { _id: data._id, username: data.username, email: data.email };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);  
        return data;
    }

    const login  = async (email, password) => {
        setAuthError(null);
        setIsLoading(true);
        try {
            const { data } = await api.post('/auth/login', { email, password});
            toast.success(`Login successful! Welcome, ${data.username}.`);
            return handleAuthResponse(data);
        } catch (error) {
            const message = error.response?.data?.message || 'A login error occurred';
            toast.error(message);
            throw message;
        } finally {
            setIsLoading(false);
        }
    }

    const register = async (username, email, password) => {
        setAuthError(null);
        setIsLoading(true);
        try {
            const { data } = await api.post('/auth/register', { username, email, password });
            toast.success("Account created successfully!");
            return handleAuthResponse(data);
        } catch (error) {
            const message = error.response?.data?.message || 'Registration failed';
            toast.error(message);
            throw message;
        } finally {
            setIsLoading(false);
        }
    }
    const logout = async () => {
        try {
            await api.get('/auth/logout');
            toast.success("Logout successful!");
        } catch (error) {
            console.error("Logout failed on server side:", error);          
        }
        localStorage.removeItem('user');
        setUser(null);
        setAuthError(null);
        setIsLoading(false);
    };

    const value = {
        user,
        isLoading,
        authError,
        login,
        register,
        logout,
        api
    }
    
  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
};
