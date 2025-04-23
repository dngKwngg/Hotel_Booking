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
        const data = await getAllHotels(); // Trả về mảng hotel
        return {
            hotels: data,
            pagination: {
                total: data.length,
                totalPages: 1, // Giả định đơn giản
            },
        };
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch hotels');
    }
});

export const fetchHotelById = createAsyncThunk(
    'hotels/fetchHotelById',
    async (hotelId) => {
        const res = await getHotelById(hotelId);
        return {
            ...res,
            title: res.name,
            subtitle: res.description,
            description: "Rosamia Hotel is the most beautiful 5-star hotel in Da Nang. Rosamia has a luxurious design and beautiful sea view. Therefore, this place is a place that is preferred by tourists to book a room. During the tourist season, the hotel often runs out of rooms because guests book in advance. Rosamia Hotel is located next to My Khe beach – one of the most beautiful beaches in Da Nang. Rosamia has 208 premium rooms.",
            benefits: res.hotelAmenities?.map((a) => a.amenityName) || [],
            images: [
                {
                    original: "https://lamanhhotel.com/wp-content/uploads/2024/01/DSC05356-scaled.jpg",
                    thumbnail: "https://lamanhhotel.com/wp-content/uploads/2024/01/DSC05356-scaled.jpg",
                },
                {
                    original: "https://vanangroup.com.vn/wp-content/uploads/2024/10/29df21cd740c64fda44d8e567685970b-e1729733600172.jpg",
                    thumbnail: "https://vanangroup.com.vn/wp-content/uploads/2024/10/29df21cd740c64fda44d8e567685970b-e1729733600172.jpg",
                },
                // Add more if needed
            ],
        };
    }
);


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
        return id;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete hotel');
    }
});

// Slice
const hotelSlice = createSlice({
    name: 'hotels',
    initialState: {
        hotels: [],
        currentHotel: {
            data: null,   // Hotel detail data
            loading: false,
            error: null,
        },
        pagination: null,
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch All Hotels
            .addCase(fetchAllHotels.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllHotels.fulfilled, (state, action) => {
                state.hotels = action.payload.hotels;
                state.pagination = action.payload.pagination;
                state.isLoading = false;
            })
            .addCase(fetchAllHotels.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Fetch Hotel By Id
            .addCase(fetchHotelById.pending, (state) => {
                state.currentHotel.loading = true;
                state.currentHotel.error = null;
            })
            .addCase(fetchHotelById.fulfilled, (state, action) => {
                state.currentHotel = action.payload;
                state.currentHotel.loading = false;
            })
            .addCase(fetchHotelById.rejected, (state, action) => {
                state.currentHotel.loading = false;
                state.currentHotel.error = action.payload;
            })

            // Create Hotel
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

            // Update Hotel
            .addCase(updateHotelData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateHotelData.fulfilled, (state, action) => {
                const updatedHotel = action.payload;
                state.hotels = state.hotels.map((h) => h.hotelId === updatedHotel.hotelId ? updatedHotel : h);
                state.isLoading = false;
            })
            .addCase(updateHotelData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Delete Hotel
            .addCase(deleteHotel.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteHotel.fulfilled, (state, action) => {
                const deletedId = action.payload;
                state.hotels = state.hotels.filter((h) => h.hotelId !== deletedId);
                state.isLoading = false;
            })
            .addCase(deleteHotel.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default hotelSlice.reducer;
