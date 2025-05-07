package com.example.demo.mapper;

import com.example.demo.dto.request.HotelRequestDto;
import com.example.demo.dto.response.HotelResponseDto;
import com.example.demo.entities.Hotel;
import com.example.demo.entities.Province;

public class HotelMapper {
    public static HotelResponseDto toHotelDto(Hotel hotel) {
        HotelResponseDto hotelResponseDto = new HotelResponseDto();
        hotelResponseDto.setHotelId(hotel.getHotelId());
        hotelResponseDto.setName(hotel.getName());
        hotelResponseDto.setDescription(hotel.getDescription());
        hotelResponseDto.setProvinceName(hotel.getProvince().getName());
        return hotelResponseDto;
    }

    public static Hotel toHotel(HotelRequestDto hotelRequestDto, Province province) {
        Hotel hotel = new Hotel();
        hotel.setHotelId(hotelRequestDto.getHotelId());
        hotel.setName(hotelRequestDto.getName());
        hotel.setDescription(hotelRequestDto.getDescription());
        hotel.setProvince(province);
        return hotel;
    }
}
