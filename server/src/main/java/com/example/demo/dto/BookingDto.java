package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingDto {
    private Long bookingId;
    private UserDto user;
    private HotelDto hotel;
    private Date checkinDate;
    private Date checkoutDate;
    private Long totalFare;
    private LocalDateTime bookingDate;
    private String statusPayment;
}
