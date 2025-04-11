package com.example.demo.service.impl;

import com.example.demo.dto.HotelAmenityDto;
import com.example.demo.entities.*;
import com.example.demo.mapper.HotelAmenityMapper;
import com.example.demo.repository.AmenityRepository;
import com.example.demo.repository.HotelRepository;
import com.example.demo.service.HotelAmenityService;
import com.example.demo.service.HotelService;
import org.springframework.stereotype.Service;
import com.example.demo.repository.HotelAmenityRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HotelAmenityServiceImpl implements HotelAmenityService{
    private final HotelAmenityRepository hotelAmenityRepository;
    private final HotelRepository hotelRepository;
    private final AmenityRepository amenityRepository;
    public HotelAmenityServiceImpl(HotelAmenityRepository hotelAmenityRepository,
                                   HotelRepository hotelService,
                                   AmenityRepository amenityRepository) {
        this.hotelAmenityRepository = hotelAmenityRepository;
        this.hotelRepository = hotelService;
        this.amenityRepository = amenityRepository;
    }

    @Override
    public List<HotelAmenityDto> getAllHotelAmenities() {
        List<HotelAmenity> hotelAmenities = hotelAmenityRepository.findAll();
        return hotelAmenities.stream()
        .map(hotelAmenity -> HotelAmenityMapper.mapToHotelAmenityDto(hotelAmenity))
                .collect(Collectors.toList());
    }
    @Override
    public HotelAmenityDto getHotelAmenityById(Long hotelId, Long amenityId) {
        HotelAmenityID id = new HotelAmenityID(hotelId, amenityId);
        HotelAmenity hotelAmenity = hotelAmenityRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Hotel amenity not found")
        );
        return HotelAmenityMapper.mapToHotelAmenityDto(hotelAmenity);
    }
    @Override
    public HotelAmenityDto createHotelAmenity(HotelAmenityDto hotelAmenityDto) {
        Hotel hotel = hotelRepository.findById(hotelAmenityDto.getHotelId()).orElseThrow(()-> new RuntimeException("Hotel not found"));
        Amenity amenity = amenityRepository.findById(hotelAmenityDto.getAmenityId()).orElseThrow(()-> new RuntimeException("Amenity not found"));

        HotelAmenity hotelAmenity = new HotelAmenity(hotel, amenity);
        hotelAmenityRepository.save(hotelAmenity);
        return HotelAmenityMapper.mapToHotelAmenityDto(hotelAmenity);
    }
    @Override
    public void deleteHotelAmenity(Long hotelId, Long amenityId) {
        HotelAmenityID id = new HotelAmenityID(hotelId, amenityId);

        HotelAmenity hotelAmenity = hotelAmenityRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Hotel amenity not found")
        );
        hotelAmenityRepository.deleteById(id);
    }
    @Override
    public List<HotelAmenityDto> getHotelAmenitiesByHotelId(Long hotelId) {
        List<HotelAmenity> hotelAmenities = hotelAmenityRepository.findByHotelId(hotelId);
        return hotelAmenities.stream().map(hotelAmenity -> HotelAmenityMapper.mapToHotelAmenityDto(hotelAmenity))
                .collect(Collectors.toList());
    }

}
