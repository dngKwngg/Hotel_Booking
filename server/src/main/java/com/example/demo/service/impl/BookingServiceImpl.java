package com.example.demo.service.impl;

import com.example.demo.dto.request.BookingUpdateStatusRequest;
import com.example.demo.dto.response.BookingResponseDto;
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

import java.util.List;
import java.util.stream.Collectors;

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
    public BookingResponseDto createBooking(BookingDto bookingDto, String orderCode) {
        User user = userRepository.findById(bookingDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Hotel hotel = hotelRepository.findById(bookingDto.getHotelId())
                .orElseThrow(() -> new RuntimeException("Hotel not found"));

        Booking booking = BookingMapper.toBooking(bookingDto, user, hotel);
        booking.setOrderCode(orderCode);
        Booking savedBooking = bookingRepository.save(booking);

        return BookingMapper.toBookingResponseDto(savedBooking);
    }

    public BookingResponseDto updateStatusByOrderCode(BookingUpdateStatusRequest request) {
        Booking booking = bookingRepository.findByOrderCode(request.getOrderCode())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatusPayment(request.getStatus());
        Booking updatedBooking = bookingRepository.save(booking);

        return BookingMapper.toBookingResponseDto(updatedBooking);
    }

    public List<BookingResponseDto> getAllBookingsByUserId(Long userId) {
        List<Booking> bookings = bookingRepository.findByUserId(userId);
//                .orElseThrow(() -> new RuntimeException("No bookings found for user"));

        return bookings.stream()
                .filter(booking -> booking.getStatusPayment().equals("paid"))
                .map(BookingMapper::toBookingResponseDto)
                .collect(Collectors.toList());
    }
}
