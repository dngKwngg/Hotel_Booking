package com.example.demo.service;

import com.example.demo.dto.BookingDto;
import com.example.demo.dto.request.BookingUpdateStatusRequest;
import com.example.demo.dto.response.BookingResponseDto;

import java.util.List;

public interface BookingService {
    BookingResponseDto createBooking(BookingDto bookingDto, String orderCode);
    BookingResponseDto updateStatusByOrderCode(BookingUpdateStatusRequest request);
    List<BookingResponseDto> getAllBookingsByUserId(Long userId);
}
