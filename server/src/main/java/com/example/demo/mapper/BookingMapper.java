package com.example.demo.mapper;

import com.example.demo.dto.BookingDto;
import com.example.demo.dto.response.BookingResponseDto;
import com.example.demo.entities.Booking;
import com.example.demo.entities.Hotel;
import com.example.demo.entities.User;

public class BookingMapper {
    public static BookingResponseDto toBookingResponseDto(Booking booking) {
        return new BookingResponseDto(
                booking.getBookingId(),
                booking.getHotel().getName(),
                booking.getCheckinDate(),
                booking.getCheckoutDate(),
                booking.getTotalPrice(),
                booking.getBookingDate(),
                booking.getStatusPayment(),
                booking.getOrderCode()
        );
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
