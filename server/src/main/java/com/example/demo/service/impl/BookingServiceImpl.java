package com.example.demo.service.impl;

import com.example.demo.dto.request.BookingUpdateStatusRequest;
import com.example.demo.entities.Booking;
import com.example.demo.entities.Hotel;
import com.example.demo.entities.User;
import com.example.demo.dto.BookingDto;
import com.example.demo.mapper.BookingMapper;
import com.example.demo.repository.BookingRepository;
import com.example.demo.repository.HotelRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.BookingService;
import org.springframework.stereotype.Service;

@Service
public class BookingServiceImpl implements BookingService {
    private final BookingRepository bookingRepository;
    private final HotelRepository hotelRepository;
    private final UserRepository userRepository;

    public BookingServiceImpl(BookingRepository bookingRepository, HotelRepository hotelRepository, UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.hotelRepository = hotelRepository;
        this.userRepository = userRepository;
    }
    /**
     * Creates a new booking.
     *
     * @param bookingDto the booking data transfer object
     * @return the created booking data transfer object
     */
    @Override
    public BookingDto createBooking(BookingDto bookingDto, String orderCode) {
        User user = userRepository.findById(bookingDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Hotel hotel = hotelRepository.findById(bookingDto.getHotelId())
                .orElseThrow(() -> new RuntimeException("Hotel not found"));

        Booking booking = BookingMapper.toBooking(bookingDto, user, hotel);
        booking.setOrderCode(orderCode);
        Booking savedBooking = bookingRepository.save(booking);

        return BookingMapper.toBookingDto(savedBooking);
    }

    public BookingDto updateStatusByOrderCode(BookingUpdateStatusRequest request) {
        Booking booking = bookingRepository.findByOrderCode(request.getOrderCode())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatusPayment(request.getStatus());
        Booking updatedBooking = bookingRepository.save(booking);

        return BookingMapper.toBookingDto(updatedBooking);
    }
}
