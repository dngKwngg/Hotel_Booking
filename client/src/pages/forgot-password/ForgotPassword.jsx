import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, clearAuthState } from '../../store/auth/authSlice';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import Input from '../../components/ux/input/Input';

const schema = z.object({
    email: z.string().email('Invalid email address'),
});

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const { forgotSuccess, loading, error } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        mode: 'onChange',
    });

    const onSubmit = (data) => {
        dispatch(forgotPassword(data));
    };

    useEffect(() => {
        return () => {
            dispatch(clearAuthState());
        };
    }, [dispatch]);

    return (
        <Container className="d-flex justify-content-center align-items-start" style={{ minHeight: 'calc(100vh - 100px)', marginTop: '120px' }}>
            <Row className="w-100" style={{ maxWidth: '500px' }}>
                <Col>
                    {forgotSuccess ? (
                        <div className="p-4 border rounded shadow-sm bg-white text-center">
                            <svg viewBox="0 0 24 24" className="text-success mx-auto mb-3" width="60" height="60">
                                <path
                                    fill="currentColor"
                                    d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                                />
                            </svg>
                            <h3 className="text-success">Recovery Email Sent</h3>
                            <p className="text-muted">Please check your email (including spam folder).</p>
                            <Link to="/" className="btn btn-primary mt-3 w-100">Go Back</Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded shadow-sm bg-white">
                            <h2 className="text-center" style={{ fontSize: '30px', fontWeight: 'bold', color: '#0000CC' }}>
                                Forgot Password
                            </h2>
                            <p className="text-center text-muted" style={{ fontSize: '16px' }}>
                                Enter your email to reset your password
                            </p>

                            {error && (
                                <Alert variant="danger" onClose={() => dispatch(clearAuthState())} dismissible>
                                    {error}
                                </Alert>
                            )}

                            <Input
                                type="email"
                                id="email"
                                placeholder="Email"
                                register={register('email')}
                                errorMessage={errors.email?.message}
                                isInvalid={!!errors.email}
                            />

                            <Button type="submit" className="w-100" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Spinner animation="border" size="sm" className="me-2" />
                                        Sending...
                                    </>
                                ) : (
                                    'Send Reset Link'
                                )}
                            </Button>

                            <div className="text-center mt-3">
                                <Link to="/login" className="text-decoration-none text-muted">
                                    Back to login
                                </Link>
                            </div>
                        </form>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default ForgotPassword;
