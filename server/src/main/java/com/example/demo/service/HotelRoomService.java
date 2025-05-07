package com.example.demo.service;

import com.example.demo.dto.request.HotelRoomRequestDto;
import com.example.demo.dto.response.HotelRoomResponseDto;

import java.util.List;

public interface HotelRoomService {
    List<HotelRoomResponseDto> getAllHotelRooms();
    HotelRoomResponseDto getHotelRoomById(Long hotelId, Long roomId);
    HotelRoomResponseDto createHotelRoom(HotelRoomRequestDto hotelRoomRequestDto);
    void deleteHotelRoom(Long hotelId, Long roomId);

    List<HotelRoomResponseDto> getHotelRoomsByHotelId(Long hotelId);
}
