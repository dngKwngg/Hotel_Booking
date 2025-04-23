import reviewsMock from "./reviewsMock";
let reviews = [...reviewsMock];

export const getReviewsByHotelId = async (hotelId) => {
    const result = reviews.filter((r) => r.hotelId === hotelId);
    console.log("Fetching reviews for hotelId:", hotelId, result); // Log to check result
    return result;
};

export const addOrUpdateReview = async ({ hotelId, userId, rating, comment }) => {
    const index = reviews.findIndex((r) => r.hotelId === hotelId && r.userId === userId);
    if (index !== -1) {
        reviews[index] = { ...reviews[index], rating, comment };
    } else {
        reviews.push({
            id: reviews.length + 1,
            hotelId,
            userId,
            userName: "Current User",
            rating,
            comment,
        });
    }
    return reviews.filter((r) => r.hotelId === hotelId);
};
