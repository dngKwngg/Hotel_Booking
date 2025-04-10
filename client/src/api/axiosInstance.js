import axios from 'axios';
<<<<<<< HEAD
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: 10000, // 10 giây timeout
    headers: {
        'Content-Type': 'application/json',
    },
    // withCredentials: true, // Gửi cookies nếu cần xác thực session
});

// Optional: Add request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Optional: Add response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Xử lý lỗi chung ở đây
        console.error('NETWORK ERROR', error.response || error.message);
        return Promise.reject(error);
    }
);

export default axiosInstance;
=======
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
>>>>>>> develop
