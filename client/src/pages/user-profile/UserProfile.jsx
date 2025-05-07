import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, fetchUserBookings, fetchUserPaymentMethods } from '../../store/user/userSlice';
import { Container, Row, Col, Nav, Tab, Spinner, Alert, Card } from 'react-bootstrap';
import BookingPanel from './components/BookingPanel';
import ProfileDetailsPanel from './components/ProfileDetailsPanel';
import PaymentMethodsPanel from './components/PaymentMethodsPanel';

const UserProfile = () => {
    const dispatch = useDispatch();
    const { profile, bookings, paymentMethods, isLoading, error } = useSelector((state) => state.user);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user?.userId) {
            dispatch(fetchUserProfile(user.userId));
            dispatch(fetchUserBookings(user.userId));
        }
    }, [dispatch, user]);

    if (isLoading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <Container fluid className="px-4 mt-4" style={{ maxWidth: '1200px', fontSize: '0.9rem' }}>
            <Card className="shadow-sm border-0">
                <Card.Body>
                    <Tab.Container defaultActiveKey="profile">
                        <Row>
                            {/* Sidebar navigation */}
                            <Col md={3} className="border-end pe-3">
                                <Nav variant="pills" className="flex-column" defaultActiveKey="profile">
                                    <Nav.Item>
                                        <Nav.Link eventKey="profile">👤 Personal Details</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="bookings">📅 Bookings</Nav.Link>
                                    </Nav.Item>
                                    {/*<Nav.Item>*/}
                                    {/*    <Nav.Link eventKey="payments">💳 Payment Methods</Nav.Link>*/}
                                    {/*</Nav.Item>*/}
                                </Nav>
                            </Col>

                            {/* Content */}
                            <Col md={9}>
                                <Tab.Content className="ps-md-4 pt-2">
                                    <Tab.Pane eventKey="profile">
                                        <ProfileDetailsPanel userDetails={profile} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="bookings">
                                        <BookingPanel bookings={bookings} />
                                    </Tab.Pane>
                                    {/*<Tab.Pane eventKey="payments">*/}
                                    {/*    <PaymentMethodsPanel paymentMethods={paymentMethods} />*/}
                                    {/*</Tab.Pane>*/}
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default UserProfile;
