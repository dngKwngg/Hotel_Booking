package com.example.demo.service.impl;

import com.example.demo.dto.HotelDto;
import com.example.demo.entities.Hotel;
import com.example.demo.mapper.HotelMapper;
import com.example.demo.repository.HotelRepository;
import com.example.demo.service.HotelService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HotelServiceImpl implements HotelService {
    private final HotelRepository hotelRepository;

    public HotelServiceImpl(HotelRepository hotelRepository) {
        this.hotelRepository = hotelRepository;
    }


    @Override
    public List<HotelDto> getAllHotels() {
        List<Hotel> hotels = hotelRepository.findAll();

        return hotels.stream()
                .map(HotelMapper::toHotelDto)
                .collect(Collectors.toList());
    }

    @Override
    public HotelDto getHotelById(Long id) {
        Hotel hotel = hotelRepository.findById(id).orElseThrow(() -> new RuntimeException("Hotel not found"));
        return HotelMapper.toHotelDto(hotel);
    }

    @Override
    public HotelDto createHotel(HotelDto hotelDto) {
        Hotel hotel = HotelMapper.toHotel(hotelDto);
        Hotel savedHotel = hotelRepository.save(hotel);
        return HotelMapper.toHotelDto(savedHotel);
    }

    @Override
    public HotelDto updateHotel(Long id, HotelDto hotelDto) {
        Hotel hotel = hotelRepository.findById(id).orElseThrow(() -> new RuntimeException("Hotel not found"));
        hotel.setName(hotelDto.getName());
        hotel.setDescription(hotelDto.getDescription());
        Hotel savedHotel = hotelRepository.save(hotel);
        return HotelMapper.toHotelDto(savedHotel);
    }

    @Override
    public void deleteById(Long id) {
        Hotel hotel = hotelRepository.findById(id).orElseThrow(() -> new RuntimeException("Hotel not found"));
        hotelRepository.deleteById(id);
    }
}
