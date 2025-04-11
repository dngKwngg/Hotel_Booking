// store/hotelSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    getAllHotels,
    getHotelById,
    createNewHotel,
    updateHotel,
    deleteHotelById,
} from '../../api/hotel/hotelAPI';

// Thunks
export const fetchAllHotels = createAsyncThunk('hotels/fetchAll', async (_, thunkAPI) => {
    try {
        const data = await getAllHotels();
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch hotels');
    }
});

export const fetchHotelById = createAsyncThunk('hotels/fetchById', async (id, thunkAPI) => {
    try {
        const data = await getHotelById(id);
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch hotel');
    }
});

export const createHotel = createAsyncThunk('hotels/create', async (hotelData, thunkAPI) => {
    try {
        const data = await createNewHotel(hotelData);
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to create hotel');
    }
});

export const updateHotelData = createAsyncThunk('hotels/update', async ({ id, hotelData }, thunkAPI) => {
    try {
        const data = await updateHotel(id, hotelData);
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update hotel');
    }
});

export const deleteHotel = createAsyncThunk('hotels/delete', async (id, thunkAPI) => {
    try {
        await deleteHotelById(id);
        return id; // Return the ID for removing from state
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete hotel');
    }
});

// Slice
const hotelSlice = createSlice({
    name: 'hotels',
    initialState: {
        hotels: [],
        currentHotel: null,
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch all hotels
            .addCase(fetchAllHotels.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllHotels.fulfilled, (state, action) => {
                state.hotels = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchAllHotels.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Fetch hotel by ID
            .addCase(fetchHotelById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchHotelById.fulfilled, (state, action) => {
                state.currentHotel = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchHotelById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Create new hotel
            .addCase(createHotel.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createHotel.fulfilled, (state, action) => {
                state.hotels.push(action.payload);
                state.isLoading = false;
            })
            .addCase(createHotel.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Update hotel
            .addCase(updateHotelData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateHotelData.fulfilled, (state, action) => {
                const updatedHotel = action.payload;
                state.hotels = state.hotels.map((h) => (h.id === updatedHotel.id ? updatedHotel : h));
                state.isLoading = false;
            })
            .addCase(updateHotelData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Delete hotel
            .addCase(deleteHotel.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteHotel.fulfilled, (state, action) => {
                const deletedId = action.payload;
                state.hotels = state.hotels.filter((h) => h.id !== deletedId);
                state.isLoading = false;
            })
            .addCase(deleteHotel.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default hotelSlice.reducer;
