package com.example.demo.service.impl;

import com.example.demo.dto.RoomTypeDto;
import com.example.demo.enitties.RoomType;
import com.example.demo.mapper.RoomTypeMapper;
import com.example.demo.repository.RoomTypeRepository;
import com.example.demo.service.RoomTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
public class RoomTypeServiceImpl implements RoomTypeService {
    private final RoomTypeRepository roomTypeRepository;

    @Autowired
    public RoomTypeServiceImpl(RoomTypeRepository roomTypeRepository) {
        this.roomTypeRepository = roomTypeRepository;
    }

    @Override
    public List<RoomTypeDto> getAllRoomTypes() {
        List<RoomType> roomTypes = roomTypeRepository.findAll();
        return roomTypes.stream().map(RoomTypeMapper::mapToRoomTypeDto).collect(Collectors.toList());
    }

    @Override
    public RoomTypeDto getRoomTypeById(Long id) {
        RoomType roomType = roomTypeRepository.findById(id).orElseThrow(() -> new RuntimeException("Room type not found"));
        return RoomTypeMapper.mapToRoomTypeDto(roomType);
    }

    @Override
    public RoomTypeDto createRoomType(RoomTypeDto roomTypeDto) {
        RoomType roomType = RoomTypeMapper.mapToRoomType(roomTypeDto);
        roomTypeRepository.save(roomType);
        return RoomTypeMapper.mapToRoomTypeDto(roomType);
    }

    @Override
    public RoomTypeDto updateRoomType(Long id, RoomTypeDto roomTypeDto) {
        RoomType roomType = roomTypeRepository.findById(id).orElseThrow(() -> new RuntimeException("Room type not found"));
        roomType.setName(roomTypeDto.getName());
        roomType.setPrice(roomTypeDto.getPrice());
        roomType.setDescription(roomTypeDto.getDescription());
        roomTypeRepository.save(roomType);

        return RoomTypeMapper.mapToRoomTypeDto(roomType);
    }

    @Override
    public void deleteRoomType(Long id) {
        RoomType roomType = roomTypeRepository.findById(id).orElseThrow(() -> new RuntimeException("Room type not found"));
        roomTypeRepository.deleteById(id);
    }
}
