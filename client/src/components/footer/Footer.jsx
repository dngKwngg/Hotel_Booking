import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const FooterLink = ({ to, label }) => (
    <Link to={to} className="d-block text-secondary text-decoration-none hover:text-primary">
        {label}
    </Link>
);

const Footer = () => {
    return (
        <footer className="bg-light text-secondary mt-3 py-2 small">
            <Container>
                <Row className="justify-content-between">
                    <Col md={4} className="mb-3">
                        <h5 className="fw-bold">Company Info</h5>
                        <FooterLink to="/about-us" label="About Us" />
                        <FooterLink to="/" label="Contact" />
                        <FooterLink to="/" label="Privacy Policy" />
                    </Col>
                    <Col md={4} className="mb-3">
                        <h5 className="fw-bold">Support</h5>
                        <FooterLink to="/" label="FAQs" />
                    </Col>
                    <Col md={4} className="mb-3">
                        <h5 className="fw-bold">Newsletter</h5>
                        <p>Stay updated with our latest trends</p>
                        <Form>
                            <Form.Group className="d-flex">
                                <Form.Control type="email" placeholder="Enter email" className="me-2 w-50" />
                                <Button variant="primary">Subscribe</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row className="text-center mt-4">
                    <Col>
                        <p>Designed and styled by DuAnUet</p>
                        <p>&copy; {new Date().getFullYear()} DuAnUet. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
