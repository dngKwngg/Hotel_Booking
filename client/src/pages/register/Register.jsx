import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../store/auth/authSlice';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Input from '../../components/ux/input/Input';
// Schema validation
const registerSchema = z.object({
    firstName: z.string().min(1, 'First Name is required'),
    lastName: z.string().min(1, 'Last Name is required'),
    email: z.string().email('Invalid email'),
    phoneNumber: z.string().min(10, 'Invalid phone number'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error } = useSelector((state) => state.auth);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(registerSchema),
        mode: 'onChange',
    });

    const onSubmit = async (data) => {
        // console.table(data);
        const { confirmPassword, ...updatedData } = data;
        // Spring boot backend requires username field
        updatedData.username = updatedData.email;
        // User role: 1 - Admin, 2 - User
        updatedData.roleId = 2;
        console.log(confirmPassword)
        const resultAction = await dispatch(registerUser(updatedData));
        if (registerUser.fulfilled.match(resultAction)) {
            navigate('/login'); // Chuyển hướng sau khi đăng ký thành công
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-start" style={{ minHeight: 'calc(100vh - 100px)', marginTop: '120px' }}>
            <Row className="w-100" style={{ maxWidth: '500px' }}>
                <Col>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded shadow-sm bg-white">
                        <h2 className="text-center mb-3" style={{ fontSize: '30px', fontWeight: 'bold', color: '#0000CC' }}>
                            Join the Adventure!
                        </h2>
                        <p className="text-center text-muted">
                            Create your account and start your journey with us
                        </p>

                        {error && <Alert variant="danger">{error}</Alert>}

                        <Row>
                            <Col md={6}>
                                <Input
                                    type="text"
                                    id="firstName"
                                    placeholder="First Name"
                                    register={register('firstName')}
                                    errorMessage={errors.firstName?.message}
                                    isInvalid={!!errors.firstName}
                                />
                            </Col>
                            <Col md={6}>
                                <Input
                                    type="text"
                                    id="lastName"
                                    placeholder="Last Name"
                                    register={register('lastName')}
                                    errorMessage={errors.lastName?.message}
                                    isInvalid={!!errors.lastName}
                                />
                            </Col>
                        </Row>

                        <Input
                            type="email"
                            id="email"
                            placeholder="Email"
                            register={register('email')}
                            errorMessage={errors.email?.message}
                            isInvalid={!!errors.email}
                        />

                        <Input
                            type="text"
                            id="phoneNumber"
                            placeholder="Phone"
                            register={register('phoneNumber')}
                            errorMessage={errors.phoneNumber?.message}
                            isInvalid={!!errors.phoneNumber}
                        />

                        <Input
                            type="password"
                            id="password"
                            placeholder="Password"
                            register={register('password')}
                            errorMessage={errors.password?.message}
                            isInvalid={!!errors.password}
                        />

                        <Input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            register={register('confirmPassword')}
                            errorMessage={errors.confirmPassword?.message}
                            isInvalid={!!errors.confirmPassword}
                        />

                        <Button type="submit" className="w-100" isLoading={isLoading}>
                            Register
                        </Button>

                        <div className="text-center mt-3">
                            <Link to="/login" className="text-decoration-none text-muted">
                                Back to login
                            </Link>
                        </div>
                    </form>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
