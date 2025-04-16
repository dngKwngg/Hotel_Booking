package com.example.demo.service;

import com.example.demo.dto.request.HotelRequestDto;
import com.example.demo.dto.response.HotelResponseDto;

import java.util.List;

public interface HotelService {
    List<HotelResponseDto> getAllHotels();
    HotelResponseDto getHotelById(Long id);
    HotelResponseDto createHotel(HotelRequestDto hotelRequestDto);
    HotelResponseDto updateHotel(Long id, HotelRequestDto hotelRequestDto);
    void deleteById(Long id);

}
