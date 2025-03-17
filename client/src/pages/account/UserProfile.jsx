import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, Tab, Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faHotel, faCreditCard, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import BookingPanel from './components/BookingPanel';
import PaymentMethodsPanel from './components/PaymentMethodsPanel';
import ProfileDetailsPanel from './components/ProfileDetailsPanel';
const UserProfile = () => {
    const [isTabsVisible, setIsTabsVisible] = useState(false);

    const navigate = useNavigate();

    const wrapperRef = useRef();
    const buttonRef = useRef();
    const onTabsMenuButtonAction = () => {

    }
    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col md={8}>
                    <div className="text-center mb-3">
                        <Button
                            ref={buttonRef}
                            onClick={onTabsMenuButtonAction}
                            variant="outline-secondary"
                            className="d-md-none"
                        >
                            <FontAwesomeIcon icon={isTabsVisible ? faXmark : faBars} size="lg" />
                        </Button>
                    </div>

                    {/* Tabs Component */}
                    <Tabs defaultActiveKey="profile" className="mb-3">
                        <Tab eventKey="profile" title={<><FontAwesomeIcon icon={faAddressCard} /> Personal Details</>}>
                            <ProfileDetailsPanel />
                        </Tab>
                        <Tab eventKey="bookings" title={<><FontAwesomeIcon icon={faHotel} /> Bookings</>}>
                            <BookingPanel />
                        </Tab>
                        <Tab eventKey="payments" title={<><FontAwesomeIcon icon={faCreditCard} /> Payment Details</>}>
                            <PaymentMethodsPanel


                            />
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Container>
    );
};

export default UserProfile;
