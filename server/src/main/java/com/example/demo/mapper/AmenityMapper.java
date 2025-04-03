package com.example.demo.mapper;

import com.example.demo.dto.AmenityDto;
import com.example.demo.entities.Amenity;

public class AmenityMapper {
    public static AmenityDto mapToAmenityDto(Amenity amenity) {
        return new AmenityDto(
                amenity.getAmenityId(),
                amenity.getName(),
                amenity.getDescription()
        );
    }
    public static Amenity mapToAmenity(AmenityDto amenityDto) {
        return new Amenity(
                amenityDto.getAmenityId(),
                amenityDto.getName(),
                amenityDto.getDescription()
        );
    }
}
