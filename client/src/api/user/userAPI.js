// api/userAPI.js
import axiosInstance from '../axiosInstance';

export const getUserProfile = async (userId) => {
    const response = await axiosInstance.get(`/api/v1/users/${userId}`);
    return response.data;
};

export const getUserBookings = async (userId) => {
    const response = await axiosInstance.get(`/api/v1/bookings/user/${userId}`);
    return response.data;
};

export const getUserPaymentMethods = async (userId) => {
    const response = await axiosInstance.get(`/api/users/payment-methods/${userId}`);
    return response.data;
};

export const updateProfile = async (userId, data) => {
    const response = await axiosInstance.put(`/api/v1/users/${userId}`, data);
    return response.data;
};