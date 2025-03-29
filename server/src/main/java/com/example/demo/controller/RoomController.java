package com.example.demo.controller;

import com.example.demo.dto.RoomDto;
import com.example.demo.service.RoomService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // cho phép controller gọi đến api
@RequestMapping("${api.version}/rooms") // dẫn đến api localhost:8080/api/v1/rooms
public class RoomController {
    private final RoomService roomService;

    // Tiêm RoomService vào dùng để gọi các hàm trong RoomService
    // tức là khi khởi tạo RoomController thì Spring sẽ tự động khởi tạo RoomService
    // chứ không cần phải khởi tạo RoomService trước rồi mới truyền vào RoomController
    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    // GET /api/v1/rooms
    @GetMapping
    public List<RoomDto> getAllRooms() {
        return roomService.getAllRooms();
    }

    // GET /api/v1/rooms/{roomId}
    @GetMapping("/{roomId}")
    public RoomDto getRoomById(@PathVariable Long roomId) {
        return roomService.getRoomById(roomId);
    }

    // POST /api/v1/rooms
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED) // trả về status 201
    public RoomDto createRoom(@RequestBody RoomDto roomDto) {
        return roomService.createRoom(roomDto);
    }

    // PUT /api/v1/rooms/{roomId}
    @PutMapping("/{roomId}")
    public RoomDto updateRoom(@PathVariable Long roomId, @RequestBody RoomDto roomDto) {
        return roomService.updateRoom(roomId, roomDto);
    }

    // DELETE /api/v1/rooms/{roomId}
    @DeleteMapping("/{roomId}")
    public ResponseEntity<?> deleteRoom(@PathVariable Long roomId) {
        roomService.deleteRoom(roomId);
        return ResponseEntity.ok("Room deleted");
    }
}
