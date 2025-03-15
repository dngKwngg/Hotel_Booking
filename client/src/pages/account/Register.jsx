import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

// import { networkAdapter } from 'services/NetworkAdapter';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    // const navigate = useNavigate();
    const navigate = useNavigate();
    const [registerData, setRegisterData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    });
    const [errorMessage, setErrorMessage] = useState(null);

    const handleInputChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    const handleRegisterSubmit = async (e) => {

    };

    return (
        <Container className="d-flex justify-content-center align-items-center">
            <Row className="w-100" style={{ maxWidth: '500px' }}>
                <Col>
                    <Form onSubmit={handleRegisterSubmit} className="p-4 border rounded shadow-sm bg-white">
                        <h2 className="text-center mb-3">Join the Adventure!</h2>
                        <p className="text-center text-muted">Create your account and start your journey with us</p>
                        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={registerData.firstName}
                                        onChange={handleInputChange}
                                        autoComplete="given-name"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={registerData.lastName}
                                        onChange={handleInputChange}
                                        autoComplete="family-name"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={registerData.email}
                                onChange={handleInputChange}
                                autoComplete="email"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                name="phoneNumber"
                                placeholder="Phone"
                                value={registerData.phoneNumber}
                                onChange={handleInputChange}
                                autoComplete="tel"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={registerData.password}
                                onChange={handleInputChange}
                                autoComplete="new-password"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={registerData.confirmPassword}
                                onChange={handleInputChange}
                                autoComplete="new-password"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">Register</Button>
                        <div className="text-center mt-3">
                            <Link to="/login" className="text-decoration-none text-muted">Back to login</Link>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
