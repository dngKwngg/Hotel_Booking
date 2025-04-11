import { useRef } from 'react';
import { Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { FaMapMarkerAlt, FaCalendarAlt, FaUser } from 'react-icons/fa';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style
import 'react-date-range/dist/theme/default.css'; // theme style

const SearchBar = ({
    locationInputValue,
    numGuestsInputValue,
    isDatePickerVisible,
    setisDatePickerVisible,
    onLocationChangeInput,
    onNumGuestsInputChange,
    dateRange,
    onDateChangeHandler,
    onSearchButtonAction,
}) => {
    const ref = useRef(null);

    const formatDate = (date) =>
        date ? new Date(date).toLocaleDateString() : '';

    return (
        <div className="position-relative w-100 mt-3">
            <Form>
                <Row className="gx-2 justify-content-center">
                    {/* Location */}
                    <Col xs={12} md={2}>
                        <InputGroup>
                            <InputGroup.Text><FaMapMarkerAlt /></InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Place"
                                value={locationInputValue}
                                onChange={onLocationChangeInput}
                            />
                        </InputGroup>
                    </Col>

                    {/* Check-in */}
                    <Col xs={12} md={2}>
                        <InputGroup onClick={() => setisDatePickerVisible(!isDatePickerVisible)} style={{ cursor: 'pointer' }}>
                            <InputGroup.Text><FaCalendarAlt /></InputGroup.Text>
                            <Form.Control
                                readOnly
                                placeholder="Check-in"
                                value={formatDate(dateRange?.startDate)}
                            />
                        </InputGroup>
                    </Col>

                    {/* Check-out */}
                    <Col xs={12} md={2}>
                        <InputGroup onClick={() => setisDatePickerVisible(!isDatePickerVisible)} style={{ cursor: 'pointer' }}>
                            <InputGroup.Text><FaCalendarAlt /></InputGroup.Text>
                            <Form.Control
                                readOnly
                                placeholder="Check-out"
                                value={formatDate(dateRange?.endDate)}
                            />
                        </InputGroup>
                    </Col>

                    {/* Guests */}
                    <Col xs={12} md={2}>
                        <InputGroup>
                            <InputGroup.Text><FaUser /></InputGroup.Text>
                            <Form.Control
                                type="number"
                                min={1}
                                placeholder="No. Of Guests"
                                value={numGuestsInputValue}
                                onChange={onNumGuestsInputChange}
                            />
                        </InputGroup>
                    </Col>

                    {/* Search Button */}
                    <Col xs={12} md="auto">
                        <Button
                            variant="warning"
                            className="w-100 fw-bold"
                            onClick={onSearchButtonAction}
                        >
                            SEARCH
                        </Button>
                    </Col>
                </Row>
            </Form>

            {/* 📅 Date Picker */}
            {isDatePickerVisible && (
                <div
                    ref={ref}
                    className="position-absolute bg-white z-10 shadow rounded"
                    style={{ top: '100%', left: '20%', zIndex: 1000 }}
                >
                    <DateRange
                        ranges={[dateRange]}
                        onChange={(ranges) => onDateChangeHandler(ranges.selection)}
                        moveRangeOnFirstSelection={false}
                        editableDateInputs={true}
                        months={1}
                        direction="horizontal"
                    />
                </div>
            )}
        </div>
    );
};

export default SearchBar;
