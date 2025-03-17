import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
// import { networkAdapter } from 'services/NetworkAdapter';
// import React, { useContext } from 'react';
// import { AuthContext } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
// import validations from 'utils/validations';


const Login = () => {
    // const context = useContext(AuthContext);
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState(false);

    const handleInputChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };


    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        if (validations.validate('email', loginData.email)) {
            const response = await networkAdapter.post('api/users/login', loginData);
            if (response && response.data.token) {
                context.triggerAuthCheck();
                navigate('/user-profile');
            } else if (response && response.errors.length > 0) {
                setErrorMessage(response.errors[0]);
            }
        } else {
            setErrorMessage(LOGIN_MESSAGES.FAILED);
        }
    };

    /**
     * Clears the current error message displayed to the user.
     */

    return (
        <Container className="d-flex justify-content-center align-items-center"
            style={{ minHeight: '100vh', margin: '0 auto', marginTop: '-80px', marginBottom: '-80px' }}>
            <Row className="w-100" style={{ maxWidth: '500px' }}>
                <Col>
                    <Form onSubmit={handleLoginSubmit} className="p-4 border rounded shadow-sm bg-white">
                        <h2 className="text-center"
                            style={{ fontSize: '30px', fontWeight: 'bold', color: '#0000CC	' }}>Welcome Back</h2>
                        <p className="text-center text-muted"
                            style={{ fontSize: '16px', marginTop: '-8px', marginBottom: '35px' }}>Log in to continue to your account</p>
                        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={loginData.email}
                                onChange={handleInputChange}
                                autoComplete="username"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={loginData.password}
                                onChange={handleInputChange}
                                autoComplete="current-password"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className=" w-100">Log In</Button>
                        <div className="text-center mt-3">
                            <Link to="/forgot-password" className="text-decoration-none text-muted hover-text-primary">
                                Forgot your password?
                            </Link>

                        </div>
                        <hr />
                        <p className="text-center text-muted" style={{ fontSize: '16px', marginTop: '-8px', }}>New to HotelBooking?</p>
                        <div className="text-center">
                            <Link to="/register" className="btn btn-outline-primary w-100">Create an account</Link>
                        </div>
                    </Form>

                </Col>
            </Row>
        </Container >
    );
};

export default Login;
