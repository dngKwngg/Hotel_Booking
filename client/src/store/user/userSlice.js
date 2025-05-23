// store/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserProfile, getUserBookings, getUserPaymentMethods } from '../../api/user/userAPI';
export const fetchUserProfile = createAsyncThunk(
    'user/fetchUserProfile',
    async (_, { getState, rejectWithValue }) => {
        const userId = getState().auth.user?.userId;
        if (!userId) return rejectWithValue('User ID not found');
        try {
            return await getUserProfile(userId);
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch user profile');
        }
    }
);

export const updateProfile = createAsyncThunk(
    'user/updateProfile',
    async (data, { getState, rejectWithValue }) => {
        const userId = getState().auth.user?.userId;
        if (!userId) return rejectWithValue('User ID not found');
        try {
            return await updateProfile(userId, data);
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
        }
    }
)
export const fetchUserBookings = createAsyncThunk(
    'user/fetchUserBookings',
    async (_, { getState, rejectWithValue }) => {
        const userId = getState().auth.user?.userId;
        if (!userId) return rejectWithValue('User ID not found');
        try {
            return await getUserBookings(userId);
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch bookings');
        }
    }
);

export const fetchUserPaymentMethods = createAsyncThunk(
    'user/fetchUserPaymentMethods',
    async (_, { getState, rejectWithValue }) => {
        const userId = getState().auth.user?.userId;
        if (!userId) return rejectWithValue('User ID not found');
        try {
            return await getUserPaymentMethods(userId);
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch payment methods');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
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
            .addCase(fetchUserProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.profile = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.profile = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchUserBookings.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUserBookings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.bookings = action.payload;
            })
            .addCase(fetchUserBookings.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(fetchUserPaymentMethods.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUserPaymentMethods.fulfilled, (state, action) => {
                state.isLoading = false;
                state.paymentMethods = action.payload;
            })
            .addCase(fetchUserPaymentMethods.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;
