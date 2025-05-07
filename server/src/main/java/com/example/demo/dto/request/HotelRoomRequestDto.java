package com.example.demo.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HotelRoomRequestDto {
    private Long hotelId;
    private Long roomId;

    private Long price;
    private Integer numberRooms;
}
