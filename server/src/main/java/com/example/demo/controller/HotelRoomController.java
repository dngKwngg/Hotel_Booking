package com.example.demo.controller;

import com.example.demo.dto.request.HotelRoomRequestDto;
import com.example.demo.dto.response.HotelRoomResponseDto;
import com.example.demo.service.HotelRoomService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.version}/hotel-rooms")
public class HotelRoomController {
    private final HotelRoomService hotelRoomService;

    public HotelRoomController(HotelRoomService hotelRoomService) {
        this.hotelRoomService = hotelRoomService;
    }

    @GetMapping
    public List<HotelRoomResponseDto> getAllHotelRooms() {
        return hotelRoomService.getAllHotelRooms();
    }

    @GetMapping("/hotel/{hotelId}")
    public List<HotelRoomResponseDto> getHotelRoomsByHotelId(@PathVariable Long hotelId) {
        return hotelRoomService.getHotelRoomsByHotelId(hotelId);
    }

    @GetMapping("/{hotelId}/{roomId}")
    public HotelRoomResponseDto getHotelRoomById(@PathVariable Long hotelId, @PathVariable Long roomId) {
        return hotelRoomService.getHotelRoomById(hotelId, roomId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public HotelRoomResponseDto createHotelRoom(@RequestBody HotelRoomRequestDto hotelRoomRequestDto) {
        return hotelRoomService.createHotelRoom(hotelRoomRequestDto);
    }

    @DeleteMapping("/{hotelId}/{roomId}")
    public ResponseEntity<?> deleteHotelRoom(@PathVariable Long hotelId, @PathVariable Long roomId) {
        hotelRoomService.deleteHotelRoom(hotelId, roomId);
        return ResponseEntity.ok("Hotel room deleted");
    }

}
