package com.example.demo.mapper;

import com.example.demo.dto.RoomDto;
import com.example.demo.entities.Room;

public class RoomMapper {
    public static RoomDto mapToRoomDto(Room room) {
        return new RoomDto(room.getRoomId(), room.getName(), room.getDescription());
    }

    public static Room mapToRoom(RoomDto roomDto) {
        return new Room(roomDto.getRoomId(), roomDto.getName(), roomDto.getDescription());
    }
}
