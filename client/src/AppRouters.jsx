import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import Hotels from "./pages/hotel-list/Hotels";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import UserProfile from "./pages/user-profile/UserProfile";
import About from "./pages/about-us/About";
import ChangePassword from "./pages/change-password/ChangePassword";
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
        </Routes>
    );
};

export default AppRouters;
