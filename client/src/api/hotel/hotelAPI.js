// api/hotelAPI.js
import axiosInstance from '../axiosInstance';

export const getAllHotels = async () => {
    const response = await axiosInstance.get('/api/v1/hotels');
    // console.log(response.data);
    return response.data;
};

export const getHotelById = async (id) => {
    const response = await axiosInstance.get(`/api/v1/hotels/${id}`);
    console.log(response.data);
    return response.data;
};

export const createNewHotel = async (data) => {
    const response = await axiosInstance.post('/api/v1/hotels', data);
    return response.data;
};

export const updateHotel = async (id, data) => {
    const response = await axiosInstance.put(`/api/v1/hotels/${id}`, data);
    return response.data;
};

export const deleteHotelById = async (id) => {
    const response = await axiosInstance.delete(`/api/v1/hotels/${id}`);
    return response.data;
};
