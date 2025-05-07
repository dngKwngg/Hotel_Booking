import {Table, Typography} from 'antd';

const {Text} = Typography;
const BookingPanel = ({ bookings }) => {
    if (!Array.isArray(bookings)) {
        return <p>No bookings available.</p>;
    }

    // bookings
    // [
    //     {
    //         "bookingId": 16,
    //         "hotelName": "Ohana Hotel",
    //         "checkinDate": "2025-05-06",
    //         "checkoutDate": "2025-05-07",
    //         "totalPrice": 589000,
    //         "bookingDate": "2025-05-06T18:05:54.929+00:00",
    //         "statusPayment": "paid",
    //         "orderCode": "54754956"
    //     },
    //     {
    //         "bookingId": 17,
    //         "hotelName": "The Poppy Villa & Hotel",
    //         "checkinDate": "2025-05-06",
    //         "checkoutDate": "2025-05-07",
    //         "totalPrice": 661000,
    //         "bookingDate": "2025-05-06T22:46:31.179+00:00",
    //         "statusPayment": "paid",
    //         "orderCode": "71591214"
    //     }
    // ]
     // create table in ant design
    const columns = [
        {
            title: 'Order Code',
            dataIndex: 'orderCode',
            key: 'orderCode',
        },
        {
            title: 'Hotel Name',
            dataIndex: 'hotelName',
            key: 'hotelName',
            render: (text) => (
                <Text strong style={{ color: "#1890ff" }}>
                    {text}
                </Text>
            ),
        },
        {
            title: 'Booking Date',
            dataIndex: 'bookingDate',
            key: 'bookingDate',
            render: (date) => (
                <span>
                    {new Date(date).toLocaleDateString("en-GB").replace(/\//g, "-")}
                </span>
            ),
        },
        {
            title: 'Check-in Date',
            dataIndex: 'checkinDate',
            key: 'checkinDate',
            render: (date) => (
                <span>
                    {date.split("-").reverse().join("-")}
                </span>
            ),
        },
        {
            title: 'Check-out Date',
            dataIndex: 'checkoutDate',
            key: 'checkoutDate',
            render: (date) => (
                <span>
                    {date.split("-").reverse().join("-")}
                </span>
            ),
        },
        {
            title: 'Total Price',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            align: "right",
            render: (text) => <span>{text.toLocaleString()} VND</span>,
        },
    ]

    return (
        // <div className="bg-white shadow overflow-hidden sm:rounded-md">
        //     <ul className="divide-y divide-gray-200">
        //         {bookings.map((booking, index) => (
        //             <li key={index} className="bg-white hover:bg-gray-50">
        //                 <div className="px-4 py-4 sm:px-6">
        //                     <div className="flex items-center justify-between">
        //                         <p className="text-sm font-bold text-brand truncate">
        //                             {booking.hotelName}
        //                         </p>
        //                     </div>
        //                     <div className="mt-2 sm:flex sm:justify-between">
        //                         <div className="sm:flex gap-x-2">
        //                             <p className="flex items-center text-sm text-gray-500">
        //                                 📅 Booking Date: {new Date(booking.bookingDate).toLocaleDateString('en-GB').replace(/\//g, '-')}
        //                             </p>
        //
        //                             <p className="flex items-center text-sm text-gray-500">
        //                                 🏨 Check-in: {booking.checkinDate.split('-').reverse().join('-')}
        //                             </p>
        //
        //                             <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
        //                                 🏨 Check-out: {booking.checkoutDate.split('-').reverse().join('-')}
        //                             </p>
        //                         </div>
        //                         <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
        //                             <p className="flex items-center">
        //                                 <span className="font-medium">Total Price: </span>{' '}
        //                                 <span className="ml-2">{booking.totalPrice.toLocaleString()}</span>
        //                                 <span className="ml-1"> VND</span>
        //                             </p>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </li>
        //         ))}
        //     </ul>
        // </div>
        <Table
            dataSource={bookings}
            columns={columns}
            pagination={false}
            // rowKey="bookingId"
            className="mt-4"
            bordered
            // style={{ marginTop: 0 }}
        />
    );
};

export default BookingPanel;
