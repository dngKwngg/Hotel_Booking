import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/auth/authSlice';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Input from '../../components/ux/input/Input';

// Schema validation
const loginSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error } = useSelector((state) => state.auth);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
    });

    const onSubmit = async (data) => {
        data.username = data.email;
        const { email, ...loginData } = data;
        const res = await dispatch(loginUser(loginData));

        if (res.meta.requestStatus === 'fulfilled') {
            navigate('/');
        } else {
            console.error("Login thất bại:", res.payload);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-start" style={{ minHeight: 'calc(100vh - 100px)', marginTop: '120px' }}>
            <Row className="w-100" style={{ maxWidth: '500px' }}>
                <Col>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded shadow-sm bg-white">
                        <h2 className="text-center" style={{ fontSize: '30px', fontWeight: 'bold', color: '#0000CC' }}>
                            Welcome Back
                        </h2>
                        <p className="text-center text-muted" style={{ fontSize: '16px' }}>
                            Log in to continue to your account
                        </p>

                        {error && <Alert variant="danger">{error}</Alert>}

                        <Input
                            type="email"
                            id="email"
                            placeholder="Email"
                            register={register('email')}
                            errorMessage={errors.email?.message}
                            isInvalid={!!errors.email}
                        />

                        <Input
                            type="password"
                            id="password"
                            placeholder="Password"
                            register={register('password')}
                            errorMessage={errors.password?.message}
                            isInvalid={!!errors.password}
                        />

                        <Button type="submit" className="w-100" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        className="me-2"
                                    />
                                    Loading...
                                </>
                            ) : (
                                'Log In'
                            )}
                        </Button>

                        <div className="text-center mt-3">
                            <Link to="/forgot-password" className="text-decoration-none text-muted">
                                Forgot your password?
                            </Link>
                        </div>

                        <hr />
                        <p className="text-center text-muted">New to HotelBooking?</p>
                        <div className="text-center">
                            <Link to="/register" className="btn btn-outline-primary w-100">Create an account</Link>
                        </div>
                    </form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
