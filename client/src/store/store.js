
import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/authSlice';
import userReducer from './user/userSlice';
import cityReducer from './city/citySlice';
import hotelsReducer from './hotel/hotelSlice';
import nearbyHotelReducer from './hotel/nearbyHotelSlice';
import reviewReducer from './review/reviewSlice';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        city: cityReducer,
        hotels: hotelsReducer,
        nearbyHotels: nearbyHotelReducer,
        reviews: reviewReducer
    },
});

export default store;