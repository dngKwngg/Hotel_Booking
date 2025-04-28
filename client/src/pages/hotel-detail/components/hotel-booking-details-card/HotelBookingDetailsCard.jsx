import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
// import "./HotelBookingDetailsCard.scss";

const HotelBookingDetailsCard = ({ hotelDetails }) => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    // console.log("✅ Current User:", currentUser);
    const [showCalendar, setShowCalendar] = useState(false);
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 1),
            key: "selection",
        },
    ]);
    const [selectedRoom, setSelectedRoom] = useState(hotelDetails.hotelRooms?.[0]?.roomName || "");
    const [numRooms, setNumRooms] = useState(1);
    const [error, setError] = useState("");

    const hotelRooms = hotelDetails?.hotelRooms || [];

    const getRoom = () => hotelRooms.find((r) => r.roomName === selectedRoom);
    const getRoomPrice = () => getRoom()?.price || 0;
    const maxAvailable = getRoom()?.numberRooms || 5;

    const nights =
        (dateRange[0].endDate - dateRange[0].startDate) / (1000 * 60 * 60 * 24) || 1;

    const totalPrice = getRoomPrice() * nights * numRooms;

    const handleBooking = () => {
        if (!currentUser) {
            setError("⚠ Bạn cần đăng nhập để đặt phòng.");
            return;
        }

        if (numRooms < 1 || nights < 1) {
            setError("⚠ Vui lòng chọn ngày hợp lệ và số phòng.");
            return;
        }

        const bookingData = {
            userId: currentUser.userId,
            // userId: currentUser.id,
            hotelId: hotelDetails.hotelId,
            roomName: selectedRoom,
            numRooms,
            startDate: dateRange[0].startDate,
            endDate: dateRange[0].endDate,
            totalPrice,
        };

        console.log("✅ Booking Data:", bookingData);
        setError("");
        // 👉 call API ở đây để gửi bookingData
        alert("🎉 Đặt phòng thành công!");
    };

    return (
        <div className="mx-2 bg-white shadow rounded p-4 border">
            <h5 className="fw-bold mb-3">Booking Details</h5>

            {currentUser && (
                <div className="mb-3 text-success fw-semibold">
                    Đặt phòng với tài khoản: {currentUser.firstName} {currentUser.lastName}
                </div>
            )}

            {error && <div className="alert alert-danger py-2">{error}</div>}

            {/* Room Type */}
            <div className="mb-3">
                <label className="form-label fw-semibold">Room Type</label>
                <select
                    className="form-select"
                    value={selectedRoom}
                    onChange={(e) => {
                        setSelectedRoom(e.target.value);
                        setNumRooms(1);
                    }}
                >
                    {hotelRooms.map((room, index) => (
                        <option key={index} value={room.roomName}>
                            {room.roomName} - {room.price.toLocaleString()} VND
                        </option>
                    ))}
                </select>
            </div>

            {/* Number of Rooms */}
            <div className="mb-3">
                <label className="form-label fw-semibold">Number of Rooms</label>
                <select
                    className="form-select"
                    value={numRooms}
                    onChange={(e) => setNumRooms(Number(e.target.value))}
                >
                    {[...Array(maxAvailable).keys()].map((i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1}
                        </option>
                    ))}
                </select>
            </div>

            {/* Dates */}
            <div className="mb-3">
                <label className="form-label fw-semibold">Dates</label>
                <div
                    className="border rounded p-2 text-muted"
                    onClick={() => setShowCalendar(!showCalendar)}
                    style={{ cursor: "pointer" }}
                >
                    {dateRange[0].startDate.toLocaleDateString()} -{" "}
                    {dateRange[0].endDate.toLocaleDateString()}
                </div>
                {showCalendar && (
                    <div className="mt-2">
                        <DateRange
                            editableDateInputs={true}
                            onChange={(item) => setDateRange([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={dateRange}
                        />
                    </div>
                )}
            </div>

            {/* Total Price */}
            <div className="my-4 text-center">
                <div className="fw-semibold">Total Price</div>
                <div className="h4 text-primary fw-bold">
                    {totalPrice.toLocaleString()} VND
                </div>
                <div className="text-success">
                    Free cancellation up to 24 hours before check-in
                </div>
            </div>

            {/* Confirm Button */}
            <button className="btn btn-warning w-100 fw-bold" onClick={handleBooking}>
                Confirm Booking
            </button>
        </div>
    );
};

export default HotelBookingDetailsCard;
