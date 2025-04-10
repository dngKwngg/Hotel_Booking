import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { BsPersonCircle } from "react-icons/bs";
const MyNavbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user); // ✅ Dùng user từ Redux

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <Navbar variant="dark" expand="lg" style={{ backgroundColor: "#0066CC" }}>
            <Container>
                <Navbar.Brand as={NavLink} to="/">
                    <img
                        src="/logo.png"
                        alt="Logo"
                        width="40"
                        height="40"
                        className="d-inline-block align-top"
                    />{" "}
                    MyHotel
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto gap-3 align-items-center" style={{ fontSize: "16px", fontWeight: "500" }}>
                        <Nav.Link as={NavLink} to="/" style={({ isActive }) => ({
                            color: "#FFFFFF",
                            textDecoration: isActive ? "underline" : "none"
                        })}>HOME</Nav.Link>

                        <Nav.Link as={NavLink} to="/hotels" style={({ isActive }) => ({
                            color: "#FFFFFF",
                            textDecoration: isActive ? "underline" : "none"
                        })}>HOTEL</Nav.Link>

                        <Nav.Link as={NavLink} to="/about" style={({ isActive }) => ({
                            color: "#FFFFFF",
                            textDecoration: isActive ? "underline" : "none"
                        })}>ABOUT US</Nav.Link>

                        {!user ? (
                            <Nav.Link as={NavLink} to="/login" style={({ isActive }) => ({
                                color: "#FFFFFF",
                                textDecoration: isActive ? "underline" : "none"
                            })}>
                                LOGIN / REGISTER
                            </Nav.Link>
                        ) : (
                            <>
                                <BsPersonCircle
                                    size={26}
                                    style={{ cursor: "pointer", color: "white" }}
                                    onClick={() => navigate("/user-profile")}
                                />

                                <Dropdown align="end">
                                    <Dropdown.Toggle
                                        variant="link"
                                        style={{ color: "white", padding: 0 }}
                                        id="user-dropdown"
                                    >
                                        <i className="bi bi-caret-down-fill"></i>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => navigate("/change-password")}>
                                            Change Password
                                        </Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item onClick={handleLogout}>
                                            Logout
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MyNavbar;