package com.example.demo.mapper;

import com.example.demo.dto.BookingDto;
import com.example.demo.entities.Booking;
import com.example.demo.entities.Hotel;
import com.example.demo.entities.User;

public class BookingMapper {
    public static BookingDto toBookingDto(Booking booking) {
        if (booking == null) {
            return null;
        }

        BookingDto bookingDto = new BookingDto();
        bookingDto.setBookingId(booking.getBookingId());
        bookingDto.setUserId(booking.getUser().getUserId());
        bookingDto.setHotelId(booking.getHotel().getHotelId());
        bookingDto.setCheckinDate(booking.getCheckinDate());
        bookingDto.setCheckoutDate(booking.getCheckoutDate());
        bookingDto.setTotalPrice(booking.getTotalPrice());
        bookingDto.setBookingDate(booking.getBookingDate());
        bookingDto.setStatusPayment(booking.getStatusPayment());
        bookingDto.setOrderCode(booking.getOrderCode());

        return bookingDto;
    }

    public static Booking toBooking(BookingDto bookingDto, User user, Hotel hotel) {
        if (bookingDto == null) {
            return null;
        }

        Booking booking = new Booking();
        booking.setBookingId(bookingDto.getBookingId());
        booking.setUser(user);
        booking.setHotel(hotel);
        booking.setCheckinDate(bookingDto.getCheckinDate());
        booking.setCheckoutDate(bookingDto.getCheckoutDate());
        booking.setTotalPrice(bookingDto.getTotalPrice());
        booking.setBookingDate(bookingDto.getBookingDate());
        booking.setOrderCode(bookingDto.getOrderCode());
        booking.setStatusPayment("pending");

        return booking;
    }
}
