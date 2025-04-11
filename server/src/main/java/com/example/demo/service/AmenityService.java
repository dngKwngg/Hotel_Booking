package com.example.demo.service;

import com.example.demo.dto.AmenityDto;

import java.util.List;

public interface AmenityService {
    public List<AmenityDto> getAmenities();
    public AmenityDto getAmenityById(Long id);
    public AmenityDto createAmenity(AmenityDto amenityDto);
    public AmenityDto updateAmenity(Long id, AmenityDto amenityDto);
    public void deleteAmenity(Long id);
}
