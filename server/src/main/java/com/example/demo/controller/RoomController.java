package com.example.demo.controller;

import com.example.demo.dto.RoomDto;
import com.example.demo.service.RoomService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.version}/rooms")
public class RoomController {
    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping
    public List<RoomDto> getAllRooms() {
        return roomService.getAllRooms();
    }

    @GetMapping("/{roomId}")
    public RoomDto getRoomById(@PathVariable Long roomId) {
        return roomService.getRoomById(roomId);
    }

    @PostMapping
    public RoomDto createRoom(@RequestBody RoomDto roomDto) {
        return roomService.createRoom(roomDto);
    }

    @PutMapping("/{roomId}")
    public RoomDto updateRoom(@PathVariable Long roomId, @RequestBody RoomDto roomDto) {
        return roomService.updateRoom(roomId, roomDto);
    }

    @DeleteMapping("/{roomId}")
    public void deleteRoom(@PathVariable Long roomId) {
        roomService.deleteRoom(roomId);
    }
}
