import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, Button, Card, Toast, Row, Col, Spinner } from 'react-bootstrap';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../../store/userSlice';// Schema validation
const formSchema = z.object({
    firstName: z.string().min(1, 'Firstname is required'),
    lastName: z.string().min(1, 'Lastname is required'),
    phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
    dateOfBirth: z.string().min(1, 'Date of birth is required'),
    nationality: z.string().min(1, 'Nationality is required')
});

const ProfileDetailsPanel = () => {
    const dispatch = useDispatch();
    const { user, isLoading, error } = useSelector((state) => state.user);

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            dateOfBirth: '',
            nationality: ''
        }
    });

    const [isEditMode, setIsEditMode] = useState(false);
    const [countries, setCountries] = useState([]);
    const [toastMessage, setToastMessage] = useState(null);

    useEffect(() => {
        if (user) {
            setValue('firstName', user.firstName);
            setValue('lastName', user.lastName);
            setValue('phoneNumber', user.phoneNumber);
            setValue('dateOfBirth', user.dateOfBirth);
            setValue('nationality', user.nationality);
        }
    }, [user, setValue]);

    const onSubmit = async (data) => {
        const resultAction = await dispatch(updateProfile(data));
        if (updateProfile.fulfilled.match(resultAction)) {
            setToastMessage({ type: 'success', message: 'Profile updated successfully!' });
            setIsEditMode(false);
        } else {
            setToastMessage({ type: 'danger', message: resultAction.payload || 'Failed to update profile!' });
        }
    };

    return (
        <Card className="shadow-sm border rounded-3">
            <Card.Body>
                <Card.Title className="mb-4">Personal Details</Card.Title>
                {isEditMode ? (
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Firstname</Form.Label>
                            <Col sm={9}>
                                <Form.Control {...register('firstName')} isInvalid={!!errors.firstName} />
                                <Form.Control.Feedback type="invalid">{errors.firstName?.message}</Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Lastname</Form.Label>
                            <Col sm={9}>
                                <Form.Control {...register('lastName')} isInvalid={!!errors.lastName} />
                                <Form.Control.Feedback type="invalid">{errors.lastName?.message}</Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Phone Number</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="tel" {...register('phoneNumber')} isInvalid={!!errors.phoneNumber} />
                                <Form.Control.Feedback type="invalid">{errors.phoneNumber?.message}</Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Date of Birth</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="date" {...register('dateOfBirth')} isInvalid={!!errors.dateOfBirth} />
                                <Form.Control.Feedback type="invalid">{errors.dateOfBirth?.message}</Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-4">
                            <Form.Label column sm={3}>Country</Form.Label>
                            <Col sm={9}>
                                <Select
                                    options={countries}
                                    value={countries.find(c => c.value === watch('nationality'))}
                                    onChange={(e) => setValue('nationality', e.value)}
                                />
                                {errors.nationality && <div className="text-danger">{errors.nationality.message}</div>}
                            </Col>
                        </Form.Group>

                        <div className="d-flex justify-content-end">
                            <Button variant="secondary" onClick={() => setIsEditMode(false)}>Cancel</Button>
                            <Button type="submit" variant="primary" className="ms-2" disabled={isLoading}>
                                {isLoading ? <Spinner as="span" animation="border" size="sm" /> : 'Save'}
                            </Button>
                        </div>
                    </Form>
                ) : (
                    <div>
                        <p>Firstname: {watch('firstName')}</p>
                        <p>Lastname: {watch('lastName')}</p>
                        <p>Email: {user?.email}</p>
                        <p>Phone Number: {watch('phoneNumber')}</p>
                        <p>Date of Birth: {watch('dateOfBirth')}</p>
                        <p>Nationality: {watch('nationality')}</p>
                        <div className="d-flex justify-content-end">
                            <Button variant="primary" onClick={() => setIsEditMode(true)}>Edit</Button>
                        </div>
                    </div>
                )}
            </Card.Body>
            {toastMessage && (
                <Toast className="position-fixed bottom-0 end-0 p-3 shadow-sm" bg={toastMessage.type}>
                    <Toast.Body>{toastMessage.message}</Toast.Body>
                </Toast>
            )}
        </Card>
    );
};

export default ProfileDetailsPanel;
