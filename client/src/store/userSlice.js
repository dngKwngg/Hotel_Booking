import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {axiosInstance} from "../api/axiosInstance.js";

// Async Thunk: Lấy thông tin người dùng
export const fetchUserProfile = createAsyncThunk("user/fetchUserProfile", async () => {
    const userId = localStorage.getItem("id");
    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data;
});

// Async Thunk: Lấy danh sách bookings
export const fetchUserBookings = createAsyncThunk("user/fetchBookings", async () => {
    const response = await axios.get("/api/users/bookings");
    return response.data.elements;
});

// Async Thunk: Lấy danh sách payment methods
export const fetchUserPaymentMethods = createAsyncThunk("user/fetchPaymentMethods", async () => {
    const response = await axios.get("/api/users/payment-methods");
    return response.data.elements;
});

const userSlice = createSlice({
    name: "user",
    initialState: {
        profile: null,
        bookings: [],
        paymentMethods: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch User Profile
            .addCase(fetchUserProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.profile = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            // Fetch Bookings
            .addCase(fetchUserBookings.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUserBookings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.bookings = action.payload;
            })
            .addCase(fetchUserBookings.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            // Fetch Payment Methods
            .addCase(fetchUserPaymentMethods.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUserPaymentMethods.fulfilled, (state, action) => {
                state.isLoading = false;
                state.paymentMethods = action.payload;
            })
            .addCase(fetchUserPaymentMethods.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default userSlice.reducer;
