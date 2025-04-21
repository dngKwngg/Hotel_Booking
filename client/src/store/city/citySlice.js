import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const fakeCities = ['Pune', 'Mumbai', 'Goa', 'Delhi', 'Bangalore'];

export const fetchAvailableCities = createAsyncThunk(
    'cities/fetch',
    async () => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(fakeCities), 500);
        });
    }
);

const citySlice = createSlice({
    name: 'cities',
    initialState: {
        data: [],
        isLoading: false,
        errors: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAvailableCities.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAvailableCities.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchAvailableCities.rejected, (state, action) => {
                state.errors = action.error;
                state.isLoading = false;
            });
    },
});

export default citySlice.reducer;