import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, fetchUserBookings, fetchUserPaymentMethods } from '../../store/userSlice';
import { Container, Row, Col, Nav, Tab, Spinner, Alert } from 'react-bootstrap';
import BookingPanel from './components/BookingPanel';
import ProfileDetailsPanel from './components/ProfileDetailsPanel';
import PaymentMethodsPanel from './components/PaymentMethodsPanel';

const UserProfile = () => {
    const dispatch = useDispatch();
    const { profile, bookings, paymentMethods, isLoading, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(fetchUserProfile());
        dispatch(fetchUserBookings());
        dispatch(fetchUserPaymentMethods());
    }, [dispatch]);

    if (isLoading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <Container className="mt-4">
            <Tab.Container defaultActiveKey="profile">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="profile">Personal Details</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="bookings">Bookings</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="payments">Payment Methods</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="profile">
                                <ProfileDetailsPanel userDetails={profile} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="bookings">
                                <BookingPanel bookings={bookings} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="payments">
                                <PaymentMethodsPanel paymentMethods={paymentMethods} />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );
};

export default UserProfile;
