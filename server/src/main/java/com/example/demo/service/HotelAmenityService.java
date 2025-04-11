package com.example.demo.service;

import com.example.demo.dto.HotelAmenityDto;
import com.example.demo.entities.HotelAmenity;

import java.util.List;

public interface HotelAmenityService {
    List<HotelAmenityDto> getAllHotelAmenities();
    HotelAmenityDto getHotelAmenityById(Long hotelId, Long amenityId);
    HotelAmenityDto createHotelAmenity(HotelAmenityDto hotelAmenityDto);
    void deleteHotelAmenity(Long hotelId, Long amenityId);

    List<HotelAmenityDto> getHotelAmenitiesByHotelId(Long hotelId);
}
