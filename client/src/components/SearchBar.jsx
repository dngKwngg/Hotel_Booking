import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

function SearchBar({ onSearch }) {
    const [location, setLocation] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [roomType, setRoomType] = useState("standard");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({ location, checkIn, checkOut, roomType });
    };

    return (
        <Form onSubmit={handleSubmit} className="search-bar p-3 bg-light rounded">
            <Row className="g-2">
                {/* Địa điểm */}
                <Col md={3}>
                    <Form.Group>
                        <Form.Label>Địa điểm</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập địa điểm..."
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </Form.Group>
                </Col>

                {/* Ngày đến */}
                <Col md={2}>
                    <Form.Group>
                        <Form.Label>Ngày đến</Form.Label>
                        <Form.Control
                            type="date"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            required
                        />
                    </Form.Group>
                </Col>

                {/* Ngày đi */}
                <Col md={2}>
                    <Form.Group>
                        <Form.Label>Ngày đi</Form.Label>
                        <Form.Control
                            type="date"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            required
                        />
                    </Form.Group>
                </Col>

                {/* Loại phòng */}
                <Col md={2}>
                    <Form.Group>
                        <Form.Label>Loại phòng</Form.Label>
                        <Form.Select
                            value={roomType}
                            onChange={(e) => setRoomType(e.target.value)}
                        >
                            <option value="standard">Standard</option>
                            <option value="deluxe">Deluxe</option>
                            <option value="suite">Suite</option>
                        </Form.Select>
                    </Form.Group>
                </Col>

                {/* Nút Tìm kiếm */}
                <Col md={3} className="d-flex align-items-end">
                    <Button variant="primary" type="submit" className="w-100">
                        Tìm kiếm
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}

export default SearchBar;
