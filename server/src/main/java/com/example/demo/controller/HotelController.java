package com.example.demo.controller;

import com.example.demo.dto.request.HotelRequestDto;
import com.example.demo.dto.response.HotelResponseDto;
import com.example.demo.service.HotelService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/${api.version}/hotels")
public class HotelController {
    private final HotelService hotelService;

    public HotelController(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    @GetMapping
    public List<HotelResponseDto> getAllHotels() {
        return hotelService.getAllHotels();
    }

    @GetMapping("/{id}")
    public HotelResponseDto getHotelById(@PathVariable Long id) {
        return hotelService.getHotelById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public HotelResponseDto createHotel(@RequestBody HotelRequestDto hotelRequestDto) {
        return hotelService.createHotel(hotelRequestDto);
    }

    @PutMapping("/{id}")
    public HotelResponseDto updateHotel(@PathVariable Long id, @RequestBody HotelRequestDto hotelRequestDto) {
        return hotelService.updateHotel(id, hotelRequestDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteHotel(@PathVariable Long id) {
        hotelService.deleteById(id);
        return ResponseEntity.ok("Hotel deleted");
    }
}
