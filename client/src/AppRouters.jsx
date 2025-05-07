import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import Hotels from "./pages/hotel-list/Hotels";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import UserProfile from "./pages/user-profile/UserProfile";
import About from "./pages/about-us/About";
import ChangePassword from "./pages/change-password/ChangePassword";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import HotelDetails from "./pages/hotel-detail/HotelDetail";
import PaymentSuccess from "./pages/payment-success/PaymentSuccess";
import PaymentCancel from "./pages/payment-cancel/PaymentCancel";
const AppRouters = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="about" element={<About />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="/hotel/:hotelId" element={<HotelDetails />} />
            <Route path="payment-success" element={<PaymentSuccess />} />
            <Route path="payment-cancel" element={<PaymentCancel />} />
            {/* Add more routes as needed */}
            {/* <Route path="/hotel/:hotelId" element={<HotelDetails />} /> */}
            {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
    );
};

export default AppRouters;
