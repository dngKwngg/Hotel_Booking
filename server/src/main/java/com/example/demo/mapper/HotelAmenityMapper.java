package com.example.demo.mapper;

import com.example.demo.dto.request.HotelAmenityRequestDto;
import com.example.demo.dto.response.HotelAmenityResponseDto;
import com.example.demo.entities.Amenity;
import com.example.demo.entities.Hotel;
import com.example.demo.entities.HotelAmenity;

public class HotelAmenityMapper {
    public static HotelAmenityResponseDto mapToHotelAmenityDto(HotelAmenity hotelAmenity) {
        return new HotelAmenityResponseDto(
                hotelAmenity.getHotel().getName(),
                hotelAmenity.getAmenity().getName()
        );
    }
    public static HotelAmenity mapToHotelAmenity(Hotel hotel, Amenity amenity) {
        return new HotelAmenity(hotel, amenity);
    }
}
