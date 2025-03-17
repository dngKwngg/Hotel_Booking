import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom"; // Dùng NavLink thay vì Link

const MyNavbar = () => {
    return (
        <Navbar variant="dark" expand="lg" style={{ backgroundColor: "#0066CC" }}>
            <Container>
                {/* Logo bên trái */}
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

                {/* Button Toggle cho mobile */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {/* Menu bên phải */}
                    <Nav className="ms-auto gap-3"
                        style={{ fontSize: "16px", fontWeight: "500" }}>
                        <Nav.Link as={NavLink} to="/"
                            style={({ isActive }) => ({
                                color: "#FFFFFF",
                                textDecoration: isActive ? "underline" : "none"
                            })}
                        >HOME</Nav.Link>

                        <Nav.Link as={NavLink} to="/hotels"
                            style={({ isActive }) => ({
                                color: "#FFFFFF",
                                textDecoration: isActive ? "underline" : "none"
                            })}
                        >HOTEL</Nav.Link>

                        <Nav.Link as={NavLink} to="/about"
                            style={({ isActive }) => ({
                                color: "#FFFFFF",
                                textDecoration: isActive ? "underline" : "none"
                            })}
                        >ABOUT US</Nav.Link>

                        <Nav.Link as={NavLink} to="/login"
                            style={({ isActive }) => ({
                                color: "#FFFFFF",
                                textDecoration: isActive ? "underline" : "none"
                            })}
                        >LOGIN/REGISTER</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;
