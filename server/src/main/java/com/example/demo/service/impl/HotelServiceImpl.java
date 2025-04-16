package com.example.demo.service.impl;

import com.example.demo.dto.request.HotelRequestDto;
import com.example.demo.dto.response.HotelResponseDto;
import com.example.demo.dto.response.HotelRoomResponseDto;
import com.example.demo.entities.Hotel;
import com.example.demo.entities.Province;
import com.example.demo.mapper.HotelMapper;
import com.example.demo.mapper.HotelRoomMapper;
import com.example.demo.repository.HotelRepository;
import com.example.demo.repository.HotelRoomRepository;
import com.example.demo.repository.ProvinceRepository;
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

    public HotelServiceImpl(HotelRepository hotelRepository, ProvinceRepository provinceRepository, HotelRoomRepository hotelRoomRepository) {
        this.hotelRepository = hotelRepository;
        this.provinceRepository = provinceRepository;
        this.hotelRoomRepository = hotelRoomRepository;
    }


    @Override
    public List<HotelResponseDto> getAllHotels() {
        List<Hotel> hotels = hotelRepository.findAll();

        List<HotelResponseDto> hotelResponseDtos = new ArrayList<>();
        for (Hotel hotel : hotels) {
            HotelResponseDto hotelResponseDto = HotelMapper.toHotelDto(hotel);
            List<HotelRoomResponseDto> hotelRoomResponseDtos = hotelRoomRepository.findByHotelId(hotel.getHotelId())
                    .stream()
                    .map(HotelRoomMapper::mapToHotelRoomResponseDto)
                    .collect(Collectors.toList());
            hotelResponseDto.setHotelRooms(hotelRoomResponseDtos);
            hotelResponseDtos.add(hotelResponseDto);
        }

        return hotelResponseDtos;
    }

    @Override
    public HotelResponseDto getHotelById(Long id) {
        Hotel hotel = hotelRepository.findById(id).orElseThrow(() -> new RuntimeException("Hotel not found"));

        HotelResponseDto hotelResponseDto = HotelMapper.toHotelDto(hotel);
        List<HotelRoomResponseDto> hotelRoomResponseDtos = hotelRoomRepository.findByHotelId(hotel.getHotelId())
                .stream()
                .map(HotelRoomMapper::mapToHotelRoomResponseDto)
                .collect(Collectors.toList());

        hotelResponseDto.setHotelRooms(hotelRoomResponseDtos);
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
}
