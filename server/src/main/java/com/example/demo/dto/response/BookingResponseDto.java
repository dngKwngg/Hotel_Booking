package com.example.demo.dto.response;

import com.example.demo.dto.BookingDto;
import com.example.demo.entities.Hotel;
import com.example.demo.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingResponseDto {
    private Long bookingId;
    private String hotelName;
    private LocalDate checkinDate;
    private LocalDate checkoutDate;
    private int totalPrice;
    private Date bookingDate;
    private String statusPayment;
    private String orderCode;
}


