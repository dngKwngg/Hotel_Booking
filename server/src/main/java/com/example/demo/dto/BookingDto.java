package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingDto {
    private Long bookingId;
    private Long userId;
    private Long hotelId;
    private LocalDate checkinDate;
    private LocalDate checkoutDate;
    private int totalPrice;
    private Date bookingDate;
    private String statusPayment;
    private String orderCode;
}
