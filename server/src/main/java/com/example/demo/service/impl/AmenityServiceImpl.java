package com.example.demo.service.impl;

import com.example.demo.dto.AmenityDto;
import com.example.demo.entities.Amenity;
import com.example.demo.mapper.AmenityMapper;
import com.example.demo.repository.AmenityRepository;
import com.example.demo.service.AmenityService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AmenityServiceImpl implements AmenityService {
    private final AmenityRepository amenityRepository;

    public AmenityServiceImpl(AmenityRepository amenityRepository) {
        this.amenityRepository = amenityRepository;
    }

    @Override
    public List<AmenityDto> getAmenities() {
        List<Amenity> amenities = amenityRepository.findAll();
        return amenities.stream().map(AmenityMapper::mapToAmenityDto).collect(Collectors.toList());
    }

    @Override
    public AmenityDto getAmenityById(Long id) {
        Amenity amenity = amenityRepository.findById(id).orElseThrow(() -> new RuntimeException("Amenity not found"));
        return AmenityMapper.mapToAmenityDto(amenity);
    }

    @Override
    public AmenityDto createAmenity(AmenityDto amenityDto) {
        Amenity amenity = AmenityMapper.mapToAmenity(amenityDto);
        Amenity savedAmenity = amenityRepository.save(amenity);
        return AmenityMapper.mapToAmenityDto(savedAmenity);
    }

    @Override
    public AmenityDto updateAmenity(Long id, AmenityDto amenityDto) {
        Amenity amenity = amenityRepository.findById(id).orElseThrow(() -> new RuntimeException("Amenity not found"));
        amenity.setName(amenityDto.getName());
        amenity.setDescription(amenityDto.getDescription());
        Amenity savedAmenity = amenityRepository.save(amenity);
        return AmenityMapper.mapToAmenityDto(savedAmenity);
    }

    @Override
    public void deleteAmenity(Long id) {
        Amenity amenity = amenityRepository.findById(id).orElseThrow(() -> new RuntimeException("Amenity not found"));
        amenityRepository.deleteById(id);
    }
}
