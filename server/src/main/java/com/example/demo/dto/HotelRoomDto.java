package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class HotelRoomDto {
    private Long hotelId;
    private Long roomId;

    private String hotelName;
    private String roomName;
}
