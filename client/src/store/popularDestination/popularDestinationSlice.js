import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fake data
const fakePopularDestinations = [
    { id: 1, name: 'Hà Nội', imageUrl: 'https://duonggiahotel.vn/wp-content/uploads/2023/11/dia-diem-du-lich-da-nang-avt.jpg' },
    { id: 2, name: 'Hồ Chí Minh', imageUrl: 'https://duonggiahotel.vn/wp-content/uploads/2023/11/dia-diem-du-lich-da-nang-avt.jpg' },
    { id: 3, name: 'Đà Nẵng', imageUrl: 'https://duonggiahotel.vn/wp-content/uploads/2023/11/dia-diem-du-lich-da-nang-avt.jpg' },
];

export const fetchPopularDestinations = createAsyncThunk(
    'popularDestinations/fetch',
    async () => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(fakePopularDestinations), 500);
        });
    }
);

const popularDestinationSlice = createSlice({
    name: 'popularDestinations',
    initialState: {
        data: [],
        isLoading: false,
        errors: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPopularDestinations.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchPopularDestinations.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchPopularDestinations.rejected, (state, action) => {
                state.errors = action.error;
                state.isLoading = false;
            });
    },
});

export default popularDestinationSlice.reducer;
