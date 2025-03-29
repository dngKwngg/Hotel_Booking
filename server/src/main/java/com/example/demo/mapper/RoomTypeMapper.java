package com.example.demo.mapper;

import com.example.demo.dto.RoomTypeDto;
import com.example.demo.enitties.RoomType;

public class RoomTypeMapper {
    public static RoomTypeDto mapToRoomTypeDto(RoomType roomType) {
        return new RoomTypeDto(
                roomType.getId(),
                roomType.getName(),
                roomType.getPrice(),
                roomType.getDescription()
        );
    }
    public static  RoomType mapToRoomType(RoomTypeDto roomTypeDto){
        return new RoomType(
                roomTypeDto.getId(),
                roomTypeDto.getName(),
                roomTypeDto.getPrice(),
                roomTypeDto.getDescription()
        );
    }
}
