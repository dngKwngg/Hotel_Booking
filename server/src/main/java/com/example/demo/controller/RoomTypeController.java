package com.example.demo.controller;

import com.example.demo.dto.RoomTypeDto;
import com.example.demo.service.RoomTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // cho phép controller gọi đến api
@RequestMapping("${api.version}/room-types") // dẫn đến api localhost:8080/api/v1/room-types

public class RoomTypeController {

    private RoomTypeService roomTypeService;

    @Autowired // Tiêm RoomTypeService vào dùng để gọi các hàm trong RoomTypeService
    // tức là khi khởi tạo RoomTypeController thì Spring sẽ tự động khởi tạo RoomTypeService
    // chứ không cần phải khởi tạo RoomTypeService trước rồi mới truyền vào RoomTypeController
    public RoomTypeController(RoomTypeService roomTypeService) {
        this.roomTypeService = roomTypeService;
    }
    @GetMapping //GET /api/v1/room-types
    public List<RoomTypeDto> getAllRoomTypes() {
        return roomTypeService.getAllRoomTypes();
    }

    @GetMapping("/{id}") //GET /api/v1/room-types/{id}
    public  RoomTypeDto getRoomTypeById(@PathVariable Long id) {
        return roomTypeService.getRoomTypeById(id);
    }

    @PostMapping // POST /api/v1/room-types
    @ResponseStatus(HttpStatus.CREATED) // trả về status 201
    public RoomTypeDto createRoomType(@RequestBody RoomTypeDto roomTypeDto) {
        return roomTypeService.createRoomType(roomTypeDto);
    }

    @PutMapping("/{id}") // PUT /api/v1/room-types/{id}
    public RoomTypeDto updateRoomType(@PathVariable Long id, @RequestBody RoomTypeDto roomTypeDto) {
        return roomTypeService.updateRoomType(id, roomTypeDto);
    }

    @DeleteMapping("/{id}") // DELETE /api/v1/room-types/{id}
    public ResponseEntity<?> deleteRoomType(@PathVariable Long id) {
        roomTypeService.deleteRoomType(id);
        return ResponseEntity.ok("Room type deleted");
    }
}
