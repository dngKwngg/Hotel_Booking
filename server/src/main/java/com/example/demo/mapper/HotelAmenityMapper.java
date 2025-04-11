package com.example.demo.mapper;

import com.example.demo.dto.HotelAmenityDto;
import com.example.demo.entities.Amenity;
import com.example.demo.entities.Hotel;
import com.example.demo.entities.HotelAmenity;

public class HotelAmenityMapper {
    public static HotelAmenityDto mapToHotelAmenityDto(HotelAmenity hotelAmenity) {
        return new HotelAmenityDto(
                hotelAmenity.getHotel().getHotelId(),
                hotelAmenity.getAmenity().getAmenityId()
        );
    }
    public static HotelAmenity mapToHotelAmenity(Hotel hotel, Amenity amenity) {
        return new HotelAmenity(hotel, amenity);
    }
}
