import axios from 'axios';
import Cookies from "js-cookie";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || '';

const axiosInstance = axios.create({
    baseURL: `${BASE_URL}/api/v1`, // optional if BASE_URL is global
    headers: {
        'Content-Type': 'application/json',
        // Authorization can be dynamically added using interceptors
    },
});

// 🔒 Add request interceptor for adding token
axiosInstance.interceptors.request.use((config) => {
    const token = Cookies.get('accessToken');
    console.log('token', token);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export {axiosInstance}
