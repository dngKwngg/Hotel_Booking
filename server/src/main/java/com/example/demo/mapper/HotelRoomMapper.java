package com.example.demo.mapper;

import com.example.demo.dto.HotelRoomDto;
import com.example.demo.entities.Hotel;
import com.example.demo.entities.HotelRoom;
import com.example.demo.entities.Room;

public class HotelRoomMapper {
    public static HotelRoomDto mapToHotelRoomDto(HotelRoom hotelRoom) {
        return new HotelRoomDto(hotelRoom.getHotel().getHotelId(), hotelRoom.getRoom().getRoomId(), hotelRoom.getHotel().getName(), hotelRoom.getRoom().getName());
    }

    public static HotelRoom mapToHotelRoom(Hotel hotel, Room room) {
        return new HotelRoom(hotel, room);
    }
}
