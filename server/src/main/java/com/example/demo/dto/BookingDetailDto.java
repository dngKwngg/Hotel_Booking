package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingDetailDto {
    private Long bookingDetailId;
    private BookingDto booking;
    private Long roomId;
}
