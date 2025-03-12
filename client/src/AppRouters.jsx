import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Hotels from "./pages/Hotels";
import Login from "./pages/account/Login";
import Register from "./pages/account/Register";
const AppRouters = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

        </Routes>
    );
};

export default AppRouters;
