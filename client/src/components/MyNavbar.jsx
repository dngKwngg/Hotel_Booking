import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyNavbar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                {/* Logo bên trái */}
                <Navbar.Brand as={Link} to="/">
                    <img
                        src="/logo.png" // Đổi thành đường dẫn logo của bạn
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
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/hotels">Hotel</Nav.Link>
                        <Nav.Link as={Link} to="/about">About Us</Nav.Link>
                        <Nav.Link as={Link} to="/login">Login/Register</Nav.Link>
                        {/* Dropdown cho Login/Register */}
                        {/* <NavDropdown title="Account" id="account-dropdown">
                            <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/register">Register</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;
