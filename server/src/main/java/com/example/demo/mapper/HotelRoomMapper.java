package com.example.demo.mapper;

import com.example.demo.dto.HotelRoomDto;
import com.example.demo.entities.Hotel;
import com.example.demo.entities.HotelRoom;
import com.example.demo.entities.Room;

public class HotelRoomMapper {
    public static HotelRoomDto mapToHotelRoomDto(HotelRoom hotelRoom) {
        return new HotelRoomDto(
                hotelRoom.getId().getHotelId(),
                hotelRoom.getId().getRoomId(),
                hotelRoom.getPrice(),
                hotelRoom.getNumberRooms()
        );
    }

    public static HotelRoom mapToHotelRoom(Hotel hotel, Room room, HotelRoomDto hotelRoomDto) {
        return new HotelRoom(hotel, room, hotelRoomDto.getPrice(), hotelRoomDto.getNumberRooms());
    }
}
