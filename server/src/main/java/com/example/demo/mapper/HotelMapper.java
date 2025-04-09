package com.example.demo.mapper;

import com.example.demo.dto.HotelDto;
import com.example.demo.entities.Hotel;
import com.example.demo.entities.Province;

public class HotelMapper {
    public static HotelDto toHotelDto(Hotel hotel) {
        HotelDto hotelDto = new HotelDto();
        hotelDto.setHotelId(hotel.getHotelId());
        hotelDto.setName(hotel.getName());
        hotelDto.setDescription(hotel.getDescription());
        hotelDto.setProvinceId(hotel.getProvince().getProvinceId());
        return hotelDto;
    }

    public static Hotel toHotel(HotelDto hotelDto, Province province) {
        Hotel hotel = new Hotel();
        hotel.setHotelId(hotelDto.getHotelId());
        hotel.setName(hotelDto.getName());
        hotel.setDescription(hotelDto.getDescription());
        hotel.setProvince(province);
        return hotel;
    }
}
