import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Hotels from "./pages/Hotels";
import Login from "./pages/account/Login";
import Register from "./pages/account/Register";
import UserProfile from "./pages/account/UserProfile";
import About from "./pages/About";
import ChangePassword from "./pages/account/ChangePassword";
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
