package com.example.demo.controller;

import com.example.demo.dto.request.HotelAmenityRequestDto;
import com.example.demo.dto.response.HotelAmenityResponseDto;
import com.example.demo.service.HotelAmenityService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.version}/hotel-amenities")
public class HotelAmenityCotroller {
    private final HotelAmenityService hotelAmenityService;

    public HotelAmenityCotroller(HotelAmenityService hotelAmenityService) {
        this.hotelAmenityService = hotelAmenityService;
    }

    @GetMapping("/{hotelId}/{amenityId}")
    public HotelAmenityResponseDto getHotelAmenityById(@PathVariable Long hotelId, @PathVariable Long amenityId) {
        return hotelAmenityService.getHotelAmenityById(hotelId, amenityId);
    }

    @GetMapping
    public List<HotelAmenityResponseDto> getAllHotelAmenities() {
        return hotelAmenityService.getAllHotelAmenities();
    }

    @GetMapping("/amenity/{hotelId}")
    public List<HotelAmenityResponseDto> getHotelAmenitiesByHotelId(@PathVariable Long hotelId) {
        return hotelAmenityService.getHotelAmenitiesByHotelId(hotelId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public HotelAmenityResponseDto createHotelAmenity(@RequestBody HotelAmenityRequestDto hotelAmenityRequestDto) {
        return hotelAmenityService.createHotelAmenity(hotelAmenityRequestDto);
    }

    @DeleteMapping("/{hotelId}/{amenityId}")
    public ResponseEntity<?> deleteHotelAmenity(@PathVariable Long hotelId, @PathVariable Long amenityId) {
        hotelAmenityService.deleteHotelAmenity(hotelId, amenityId);
        return ResponseEntity.ok("Hotel amenity deleted successfully");
    }
}
