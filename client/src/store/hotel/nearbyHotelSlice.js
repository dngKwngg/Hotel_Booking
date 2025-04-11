import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getNearbyHotels } from '../../api/hotel/nearByHotelAPI';

export const fetchNearbyHotels = createAsyncThunk(
    'nearbyHotels/fetchNearbyHotels',
    async () => {
        const response = await getNearbyHotels();
        return response.elements;
    }
);

const nearbyHotelSlice = createSlice({
    name: 'nearbyHotels',
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNearbyHotels.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchNearbyHotels.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchNearbyHotels.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default nearbyHotelSlice.reducer;
