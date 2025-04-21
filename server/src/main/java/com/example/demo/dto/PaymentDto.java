package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class PaymentDto {
    private Long paymentId;
    private BookingDto booking;
    private UserDto user;
    private Long amount;
    private LocalDateTime paymentDate;
    private String paymentStatus;
    private String transactionId;
}
