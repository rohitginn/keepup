// src/context/authContextAndApi.js
import React, { createContext, useContext } from 'react';
import axios from 'axios';

// --- Configuration ---
const API_URL = 'https://keepup-backend.onrender.com'; 

// 1. Export the Context
export const AuthContext = createContext(null); 

// 2. Export the configured Axios instance
export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

// 3. Export the custom hook
export const useAuth = () => {
    return useContext(AuthContext);
};