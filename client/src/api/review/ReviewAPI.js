import reviewsMock from "./reviewsMock";
import axiosInstance from "../axiosInstance.js";
let reviews = [...reviewsMock];

export const getReviewsByHotelId = async (hotelId) => {
    const response = await axiosInstance.get(`/api/v1/reviews/hotel/${hotelId}`);
    return response.data;
};

export const addOrUpdateReview = async ({ hotelId, userId, rating, comment }) => {
    const response = await axiosInstance.post("/api/v1/reviews", {
        hotelId,
        userId,
        rating,
        comment,
    });

    return response.data;
};
