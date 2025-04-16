package com.example.demo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HotelRoomResponseDto {
    private String hotelName;
    private String roomName;
    private Long price;
    private Integer numberRooms;
}
