const BookingPanel = ({ bookings }) => {
    if (!Array.isArray(bookings)) {
        return <p>No bookings available.</p>;
    }

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
                {bookings.map((booking, index) => (
                    <li key={index} className="bg-white hover:bg-gray-50">
                        <div className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-bold text-brand truncate">
                                    {booking.hotelName}
                                </p>
                                <div className="ml-2 flex-shrink-0 flex">
                                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        Booking ID: {booking.bookingId}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-2 sm:flex sm:justify-between">
                                <div className="sm:flex gap-x-2">
                                    <p className="flex items-center text-sm text-gray-500">
                                        📅 Booking Date: {booking.bookingDate}
                                    </p>
                                    <p className="flex items-center text-sm text-gray-500">
                                        🏨 Check-in: {booking.checkInDate}
                                    </p>
                                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                        🏨 Check-out: {booking.checkOutDate}
                                    </p>
                                </div>
                                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                    <p className="flex items-center">
                                        <span className="font-medium">Total Fare: </span>{' '}
                                        <span className="ml-2">{booking.totalFare}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookingPanel;
