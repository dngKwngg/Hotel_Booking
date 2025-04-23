import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getReviewsByHotelId, addOrUpdateReview } from "../../api/review/ReviewAPI";
export const fetchReviews = createAsyncThunk("reviews/fetch", async (hotelId) => {
    const res = await getReviewsByHotelId(hotelId);
    return res;
});

export const submitReview = createAsyncThunk(
    "reviews/submit",
    async ({ hotelId, userId, rating, comment }) => {
        const res = await addOrUpdateReview({ hotelId, userId, rating, comment });
        return res;
    }
);

const reviewSlice = createSlice({
    name: "reviews",
    initialState: {
        items: [],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(submitReview.fulfilled, (state, action) => {
                state.items = action.payload;
            });
    },
});

export default reviewSlice.reducer;
