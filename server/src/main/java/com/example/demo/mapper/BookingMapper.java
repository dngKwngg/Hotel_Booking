package com.example.demo.mapper;

import com.example.demo.dto.BookingDto;
import com.example.demo.entities.Booking;

public class BookingMapper {
    public static BookingDto mapToBookingDto (Booking booking) {
        BookingDto bookingDto = new BookingDto();
        bookingDto.setBookingId(booking.getBookingId());
        bookingDto.setUser(UserMapper.mapToUserDto(booking.getUser()));
        bookingDto.setHotel(HotelMapper.toHotelDto(booking.getHotel()));
        bookingDto.setCheckinDate(booking.getCheckinDate());
        bookingDto.setCheckoutDate(booking.getCheckoutDate());
        bookingDto.setTotalFare(booking.getTotalFare());
        bookingDto.setBookingDate(booking.getBookingDate());
        bookingDto.setStatusPayment(booking.getStatusPayment());
        return bookingDto;
    }

//    public static Booking mapToBooking(BookingDto bookingDto) {
//        Booking booking = new Booking();
//        booking.setBookingId(bookingDto.getBookingId());
//        booking.setUser(UserMapper.mapToUser(bookingDto.getUser()));
//        return booking;
//    }
}
