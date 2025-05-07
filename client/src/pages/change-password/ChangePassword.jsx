import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Container, Row, Col, Alert, Spinner, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../store/auth/authSlice'; // chỉnh path nếu khác
import Input from '../../components/ux/input/Input';
import { useNavigate } from 'react-router-dom';
const schema = z
    .object({
        currentPassword: z.string().min(6, 'Current password is required'),
        newPassword: z.string().min(6, 'New password must be at least 6 characters'),
        confirmPassword: z.string().min(6, 'Please confirm your new password'),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

const ChangePassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(schema),
        mode: 'onChange',
    });

    const onSubmit = async (data) => {
        const { currentPassword, newPassword } = data;
        // console.log(data);
        const res = await dispatch(changePassword({ currentPassword, newPassword }));

        if (res.meta.requestStatus === 'fulfilled') {
            reset();
            navigate('/')
            alert('Password changed successfully!');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-start" style={{ minHeight: 'calc(100vh - 100px)', marginTop: '120px' }}>
            <Row className="w-100" style={{ maxWidth: '500px' }}>
                <Col>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded shadow-sm bg-white">
                        <h2 className="text-center" style={{ fontSize: '30px', fontWeight: 'bold', color: '#0000CC' }}>
                            Change Password
                        </h2>
                        <p className="text-center text-muted" style={{ fontSize: '16px' }}>
                            Secure your account by updating your password
                        </p>

                        {error && <Alert variant="danger">{error}</Alert>}

                        <Input
                            type="password"
                            id="currentPassword"
                            placeholder="Current Password"
                            register={register('currentPassword')}
                            errorMessage={errors.currentPassword?.message}
                            isInvalid={!!errors.currentPassword}
                        />

                        <Input
                            type="password"
                            id="newPassword"
                            placeholder="New Password"
                            register={register('newPassword')}
                            errorMessage={errors.newPassword?.message}
                            isInvalid={!!errors.newPassword}
                        />

                        <Input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm New Password"
                            register={register('confirmPassword')}
                            errorMessage={errors.confirmPassword?.message}
                            isInvalid={!!errors.confirmPassword}
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
                                'Update Password'
                            )}
                        </Button>
                    </form>
                </Col>
            </Row>
        </Container>
    );
};

export default ChangePassword;
