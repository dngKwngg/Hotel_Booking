package com.example.demo.service;

import com.example.demo.dto.RoomTypeDto;
import com.example.demo.enitties.RoomType;
import org.springframework.stereotype.Service;

import java.util.List;


public interface RoomTypeService {
    public List<RoomTypeDto> getAllRoomTypes();
    public RoomTypeDto getRoomTypeById(Long id);
    public RoomTypeDto createRoomType(RoomTypeDto roomTypeDto);
    public RoomTypeDto updateRoomType(Long id, RoomTypeDto roomTypeDto);
    public void deleteRoomType(Long id);
}
