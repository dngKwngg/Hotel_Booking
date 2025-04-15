package com.example.demo.controller;

import com.example.demo.dto.HotelAmenityDto;
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
    public HotelAmenityDto getHotelAmenityById(@PathVariable Long hotelId, @PathVariable Long amenityId) {
        return hotelAmenityService.getHotelAmenityById(hotelId, amenityId);
    }
    @GetMapping
    public List<HotelAmenityDto> getAllHotelAmenities() {
        return hotelAmenityService.getAllHotelAmenities();
    }

    @GetMapping("/{hotelId}")
    public List<HotelAmenityDto> getHotelAmenitiesByHotelId(@PathVariable Long hotelId) {
        return hotelAmenityService.getHotelAmenitiesByHotelId(hotelId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public HotelAmenityDto createHotelAmenity(@RequestBody HotelAmenityDto hotelAmenityDto) {
        return hotelAmenityService.createHotelAmenity(hotelAmenityDto);
    }

    @DeleteMapping("/{hotelId}/{amenityId}")
    public ResponseEntity<?> deleteHotelAmenity(@PathVariable Long hotelId, @PathVariable Long amenityId) {
        hotelAmenityService.deleteHotelAmenity(hotelId, amenityId);
        return ResponseEntity.ok("Hotel amenity deleted successfully");
    }
}
