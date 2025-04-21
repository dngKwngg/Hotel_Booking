package com.example.demo.mapper;

import com.example.demo.dto.HotelDto;
import com.example.demo.entities.Hotel;

public class HotelMapper {
    public static HotelDto toHotelDto(Hotel hotel) {
        HotelDto hotelDto = new HotelDto();
        hotelDto.setHotelId(hotel.getHotelId());
        hotelDto.setName(hotel.getName());
        hotelDto.setDescription(hotel.getDescription());
        hotelDto.setProvince(ProvinceMapper.mapToProvinceDto(hotel.getProvince()));
        return hotelDto;
    }

    public static Hotel toHotel(HotelDto hotelDto) {
        Hotel hotel = new Hotel();
        hotel.setHotelId(hotelDto.getHotelId());
        hotel.setName(hotelDto.getName());
        hotel.setDescription(hotelDto.getDescription());
        hotel.setProvince(ProvinceMapper.mapToProvince(hotelDto.getProvince()));
        return hotel;
    }
}
