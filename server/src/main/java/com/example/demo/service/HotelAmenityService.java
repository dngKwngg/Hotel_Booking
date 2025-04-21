package com.example.demo.service;

import com.example.demo.dto.request.HotelAmenityRequestDto;
import com.example.demo.dto.response.HotelAmenityResponseDto;

import java.util.List;

public interface HotelAmenityService {
    List<HotelAmenityResponseDto> getAllHotelAmenities();
    HotelAmenityResponseDto getHotelAmenityById(Long hotelId, Long amenityId);
    HotelAmenityResponseDto createHotelAmenity(HotelAmenityRequestDto hotelAmenityRequestDto);
    void deleteHotelAmenity(Long hotelId, Long amenityId);

    List<HotelAmenityResponseDto> getHotelAmenitiesByHotelId(Long hotelId);
}
