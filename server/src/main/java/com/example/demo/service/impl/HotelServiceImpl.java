package com.example.demo.service.impl;

import com.example.demo.dto.request.HotelRequestDto;
import com.example.demo.dto.response.HotelAmenityResponseDto;
import com.example.demo.dto.response.HotelResponseDto;
import com.example.demo.dto.response.HotelRoomResponseDto;
import com.example.demo.entities.Hotel;
import com.example.demo.entities.HotelRoom;
import com.example.demo.entities.Province;
import com.example.demo.entities.Review;
import com.example.demo.mapper.HotelAmenityMapper;
import com.example.demo.mapper.HotelMapper;
import com.example.demo.mapper.HotelRoomMapper;
import com.example.demo.repository.*;
import com.example.demo.service.HotelService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HotelServiceImpl implements HotelService {
    private final HotelRepository hotelRepository;
    private final ProvinceRepository provinceRepository;
    private final HotelRoomRepository hotelRoomRepository;
    private final HotelAmenityRepository hotelAmenityRepository;
    private final ReviewRepository reviewRepository;

    public HotelServiceImpl(HotelRepository hotelRepository, ProvinceRepository provinceRepository, HotelRoomRepository hotelRoomRepository, HotelAmenityRepository hotelAmenityRepository, ReviewRepository reviewRepository) {
        this.hotelRepository = hotelRepository;
        this.provinceRepository = provinceRepository;
        this.hotelRoomRepository = hotelRoomRepository;
        this.hotelAmenityRepository = hotelAmenityRepository;
        this.reviewRepository = reviewRepository;
    }


    @Override
    public List<HotelResponseDto> getAllHotels() {
        return hotelRepository.findAll().stream().map(hotel -> {
            HotelResponseDto hotelResponseDto = HotelMapper.toHotelDto(hotel);
            hotelResponseDto.setHotelRooms(getHotelRoomsByHotelId(hotel.getHotelId()));
            hotelResponseDto.setHotelAmenities(getHotelAmenitiesByHotelId(hotel.getHotelId()));

            // Get reviews for the hotel
            List<Review> reviews = reviewRepository.findAllByHotelId(hotel.getHotelId());
            // Calculate average rating
            double averageRating = reviews.stream()
                    .mapToDouble(Review::getRating)
                    .average()
                    .orElse(0.0);

            // Round to 1 decimal place
            averageRating = Math.round(averageRating * 10.0) / 10.0;
            // Set average rating to hotel response DTO
            hotelResponseDto.setRating(averageRating);
            return hotelResponseDto;
        }).collect(Collectors.toList());
    }


    @Override
    public HotelResponseDto getHotelById(Long id) {
        Hotel hotel = hotelRepository.findById(id).orElseThrow(() -> new RuntimeException("Hotel not found"));

        HotelResponseDto hotelResponseDto = HotelMapper.toHotelDto(hotel);
        hotelResponseDto.setHotelRooms(getHotelRoomsByHotelId(hotel.getHotelId()));
        hotelResponseDto.setHotelAmenities(getHotelAmenitiesByHotelId(hotel.getHotelId()));
        return hotelResponseDto;
    }

    @Override
    public HotelResponseDto createHotel(HotelRequestDto hotelRequestDto) {
        Province province = provinceRepository.findById(hotelRequestDto.getProvinceId()).orElseThrow(() -> new RuntimeException("Province not found"));

        Hotel hotel = HotelMapper.toHotel(hotelRequestDto, province);
        Hotel savedHotel = hotelRepository.save(hotel);
        return HotelMapper.toHotelDto(savedHotel);
    }

    // Not update province of hotel
    @Override
    public HotelResponseDto updateHotel(Long id, HotelRequestDto hotelRequestDto) {
        Hotel hotel = hotelRepository.findById(id).orElseThrow(() -> new RuntimeException("Hotel not found"));
        hotel.setName(hotelRequestDto.getName());
        hotel.setDescription(hotelRequestDto.getDescription());
        Hotel savedHotel = hotelRepository.save(hotel);
        return HotelMapper.toHotelDto(savedHotel);
    }

    @Override
    public void deleteById(Long id) {
        Hotel hotel = hotelRepository.findById(id).orElseThrow(() -> new RuntimeException("Hotel not found"));
        hotelRepository.deleteById(id);
    }

    // Helper method to get hotel rooms by hotel ID
    private List<HotelRoomResponseDto> getHotelRoomsByHotelId(Long hotelId) {
        List<HotelRoom> hotelRooms = hotelRoomRepository.findByHotelId(hotelId);
        return hotelRooms.stream()
                .map(HotelRoomMapper::mapToHotelRoomResponseDto)
                .collect(Collectors.toList());
    }

    // Helper method to get hotel amenities by hotel ID
    private List<HotelAmenityResponseDto> getHotelAmenitiesByHotelId(Long hotelId) {
        return hotelAmenityRepository.findByHotelId(hotelId)
                .stream()
                .map(HotelAmenityMapper::mapToHotelAmenityDto)
                .collect(Collectors.toList());
    }
}
