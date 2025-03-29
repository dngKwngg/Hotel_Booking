package com.example.demo.service;

import com.example.demo.dto.HotelRoomDto;

import java.util.List;

public interface HotelRoomService {
    List<HotelRoomDto> getAllHotelRooms();
    HotelRoomDto getHotelRoomById(Long hotelId, Long roomId);
    HotelRoomDto createHotelRoom(HotelRoomDto hotelRoomDto);
    void deleteHotelRoom(Long hotelId, Long roomId);

    List<HotelRoomDto> getHotelRoomsByHotelId(Long hotelId);
}
