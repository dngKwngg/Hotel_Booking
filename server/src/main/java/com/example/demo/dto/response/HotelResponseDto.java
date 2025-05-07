package com.example.demo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HotelResponseDto {
    private Long hotelId;
    private String name;
    private String description;
    private String provinceName;
    private Double rating;
    private List<HotelRoomResponseDto> hotelRooms;
    private List<HotelAmenityResponseDto> hotelAmenities;
}
