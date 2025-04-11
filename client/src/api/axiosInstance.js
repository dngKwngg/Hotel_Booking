import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: 10000, // 10 giây timeout
    headers: {
        'Content-Type': 'application/json',
        // Authorization can be dynamically added using interceptors
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
