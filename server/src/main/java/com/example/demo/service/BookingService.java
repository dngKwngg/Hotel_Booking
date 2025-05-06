package com.example.demo.service;

import com.example.demo.dto.BookingDto;
import com.example.demo.dto.request.BookingUpdateStatusRequest;

public interface BookingService {
    BookingDto createBooking(BookingDto bookingDto, String orderCode);
    BookingDto updateStatusByOrderCode(BookingUpdateStatusRequest request);
}
