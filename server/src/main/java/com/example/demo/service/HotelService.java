package com.example.demo.service;

import com.example.demo.dto.HotelDto;

import java.util.List;

public interface HotelService {
    List<HotelDto> getAllHotels();
    HotelDto getHotelById(Long id);
    HotelDto createHotel(HotelDto hotelDto);
    HotelDto updateHotel(Long id, HotelDto hotelDto);
    void deleteById(Long id);

}
