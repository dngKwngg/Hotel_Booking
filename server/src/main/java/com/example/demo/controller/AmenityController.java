package com.example.demo.controller;

import com.example.demo.dto.AmenityDto;
import com.example.demo.service.AmenityService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.version}/amenities")
public class AmenityController {
    private final AmenityService amenityService;
    public AmenityController(AmenityService amenityService) {
        this.amenityService = amenityService;
    }
    @GetMapping
    public List<AmenityDto> getAmenities() {
        return amenityService.getAmenities();
    }
    @GetMapping("/{id}")
    public AmenityDto getAmenityById(@PathVariable Long id){
        return amenityService.getAmenityById(id);
    }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED) // trả về status 201
    public AmenityDto createAmenity(@RequestBody AmenityDto amenityDto) {
        return amenityService.createAmenity(amenityDto);
    }
    @PutMapping("/{id}")
    public AmenityDto updateAmenity(@PathVariable Long id,@RequestBody AmenityDto amenityDto){
        return amenityService.updateAmenity(id, amenityDto);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAmenity(@PathVariable Long id) {
        amenityService.deleteAmenity(id);
        return ResponseEntity.ok("Amenity deleted");
    }
}
