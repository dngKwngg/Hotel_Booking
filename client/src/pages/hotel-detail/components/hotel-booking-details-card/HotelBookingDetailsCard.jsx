import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';

/**
 * A component that displays the booking details for a hotel, including date range, room type, and pricing.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.hotelCode - The unique code for the hotel.
 */
const HotelBookingDetailsCard = ({ hotelCode }) => {
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 1),
            key: 'selection',
        },
    ]);
    const [showDatePicker, setShowDatePicker] = useState(false);

    return (
        <Card className="mx-2 shadow-xl rounded-xl overflow-hidden mt-2 md:mt-0 w-full md:w-[380px]">
            <Card.Header className="bg-primary text-white text-center py-3">
                <h2 className="m-0">Booking Details</h2>
            </Card.Header>
            <Card.Body className="p-4">
                {/* Total Price */}
                <div className="mb-4">
                    <div className="font-weight-semibold text-gray-800 mb-2">Total Price</div>
                    <div className="text-2xl font-bold text-indigo-600">
                        ₹ 10,000
                    </div>
                    <div className="text-sm text-green-600 mt-1">
                        Free cancellation up to 24 hours before check-in
                    </div>
                </div>

                {/* Dates & Time */}
                <div className="mb-4">
                    <div className="font-weight-semibold text-gray-800 mb-2">Dates</div>
                    <div className="text-gray-600">
                        <Button
                            variant="outline-primary"
                            onClick={() => setShowDatePicker(!showDatePicker)}
                            className="w-100"
                        >
                            Select Dates
                        </Button>
                        {showDatePicker && (
                            <DateRange
                                editableDateInputs={true}
                                onChange={(item) => setDateRange([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={dateRange}
                                className="border p-4 rounded-lg shadow-sm mt-3 w-100"
                            />
                        )}
                    </div>
                </div>

                {/* Reservation */}
                <div className="mb-4">
                    <div className="font-weight-semibold text-gray-800 mb-2">Room Type</div>
                    <Form.Control as="select">
                        <option value="1 King Bed Standard Non Smoking">
                            1 King Bed Standard Non Smoking
                        </option>
                    </Form.Control>
                </div>

                {/* Per day rate */}
                <div className="mb-4">
                    <div className="font-weight-semibold text-gray-800 mb-2">Per day rate</div>
                    <div className="text-gray-600">₹ 5000</div>
                </div>
            </Card.Body>
            <Card.Footer className="bg-gray-50 text-center py-4">
                <Button className="w-100 bg-secondary text-white py-2 rounded hover:bg-yellow-600 transition duration-300">
                    Confirm Booking
                </Button>
            </Card.Footer>
        </Card>
    );
};

export default HotelBookingDetailsCard;
