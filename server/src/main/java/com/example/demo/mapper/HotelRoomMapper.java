package com.example.demo.mapper;

import com.example.demo.dto.request.HotelRoomRequestDto;
import com.example.demo.dto.response.HotelRoomResponseDto;
import com.example.demo.entities.Hotel;
import com.example.demo.entities.HotelRoom;
import com.example.demo.entities.Room;

public class HotelRoomMapper {
    public static HotelRoomResponseDto mapToHotelRoomResponseDto(HotelRoom hotelRoom) {
        return new HotelRoomResponseDto(
                hotelRoom.getHotel().getName(),
                hotelRoom.getRoom().getName(),
                hotelRoom.getPrice(),
                hotelRoom.getNumberRooms()
        );
    }

    public static HotelRoom mapToHotelRoom(Hotel hotel, Room room, HotelRoomRequestDto hotelRoomRequestDto) {
        return new HotelRoom(hotel, room, hotelRoomRequestDto.getPrice(), hotelRoomRequestDto.getNumberRooms());
    }
}
