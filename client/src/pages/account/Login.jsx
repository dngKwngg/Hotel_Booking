import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
// import { networkAdapter } from 'services/NetworkAdapter';
// import React, { useContext } from 'react';
// import { AuthContext } from 'contexts/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import validations from 'utils/validations';


const Login = () => {
    // const context = useContext(AuthContext);
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState(false);

    /**
     * Handles input changes for the login form fields.
     * Updates the loginData state with the field values.
     * @param {Object} e - The event object from the input field.
     */
    const handleInputChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    /**
     * Handles the submission of the login form.
     * Attempts to authenticate the user with the provided credentials.
     * Navigates to the user profile on successful login or sets an error message on failure.
     * @param {Object} e - The event object from the form submission.
     */
    const handleLoginSubmit = async (e) => {
        // e.preventDefault();

        // // if (validations.validate('email', loginData.email)) {
        // //     const response = await networkAdapter.post('api/users/login', loginData);
        // //     if (response && response.data.token) {
        // //         context.triggerAuthCheck();
        // //         navigate('/user-profile');
        // //     } else if (response && response.errors.length > 0) {
        // //         setErrorMessage(response.errors[0]);
        // //     }
        // // } else {
        // //     setErrorMessage(LOGIN_MESSAGES.FAILED);
        // // }
    };

    /**
     * Clears the current error message displayed to the user.
     */

    return (
        <Container className="d-flex justify-content-center align-items-center mt-3">
            <Row className="w-100" style={{ maxWidth: '500px' }}>
                <Col>
                    <Form onSubmit={handleLoginSubmit} className="p-4 border rounded shadow-sm bg-white">
                        <h2 className="text-center mb-3">Welcome Back</h2>
                        <p className="text-center text-muted">Log in to continue to your account</p>
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
                        <Button variant="primary" type="submit" className="w-100">Log In</Button>
                        <div className="text-center mt-3">
                            <Link to="/forgot-password" className="text-decoration-none text-muted">Forgot your password?</Link>
                        </div>
                        <hr />
                        <p className="text-center text-muted">New to HotelBooking?</p>
                        <div className="text-center">
                            <Link to="/register" className="btn btn-outline-primary w-100">Create an account</Link>
                        </div>
                    </Form>

                </Col>
            </Row>
        </Container>
    );
};

export default Login;
