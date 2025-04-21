
import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/authSlice';
import userReducer from './user/userSlice';
import cityReducer from './city/citySlice';
import hotelsReducer from './hotel/hotelSlice';
import nearbyHotelReducer from './hotel/nearbyHotelSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        city: cityReducer,
        hotels: hotelsReducer,
        nearbyHotels: nearbyHotelReducer
    },
});

export default store;