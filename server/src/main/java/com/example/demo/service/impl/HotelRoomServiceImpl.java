package com.example.demo.service.impl;

import com.example.demo.dto.HotelRoomDto;
import com.example.demo.entities.Hotel;
import com.example.demo.entities.HotelRoom;
import com.example.demo.entities.HotelRoomID;
import com.example.demo.entities.Room;
import com.example.demo.mapper.HotelRoomMapper;
import com.example.demo.repository.HotelRepository;
import com.example.demo.repository.HotelRoomRepository;
import com.example.demo.repository.RoomRepository;
import com.example.demo.service.HotelRoomService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HotelRoomServiceImpl implements HotelRoomService {
    private final HotelRoomRepository hotelRoomRepository;
    private final HotelRepository hotelRepository;
    private final RoomRepository roomRepository;

    public HotelRoomServiceImpl(HotelRoomRepository hotelRoomRepository, HotelRepository hotelRepository, RoomRepository roomRepository) {
        this.hotelRoomRepository = hotelRoomRepository;
        this.hotelRepository = hotelRepository;
        this.roomRepository = roomRepository;
    }

    @Override
    public List<HotelRoomDto> getAllHotelRooms() {
        List<HotelRoom> hotelRooms = hotelRoomRepository.findAll();
        return hotelRooms.stream()
                .map(HotelRoomMapper::mapToHotelRoomDto)
                .collect(Collectors.toList());
    }

    @Override
    public HotelRoomDto getHotelRoomById(Long hotelId, Long roomId) {
        HotelRoomID id = new HotelRoomID(hotelId, roomId);
        HotelRoom hotelRoom = hotelRoomRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Hotel room not found")
        );
        return HotelRoomMapper.mapToHotelRoomDto(hotelRoom);
    }

    @Override
    public HotelRoomDto createHotelRoom(HotelRoomDto hotelRoomDto) {
        Hotel hotel = hotelRepository.findById(hotelRoomDto.getHotelId()).orElseThrow(
                () -> new RuntimeException("Hotel not found")
        );

        Room room = roomRepository.findById(hotelRoomDto.getRoomId()).orElseThrow(
                () -> new RuntimeException("Room not found")
        );

        HotelRoom hotelRoom = new HotelRoom(hotel, room);
        hotelRoomRepository.save(hotelRoom);
        return HotelRoomMapper.mapToHotelRoomDto(hotelRoom);
    }

    @Override
    public void deleteHotelRoom(Long hotelId, Long roomId) {
        HotelRoomID id = new HotelRoomID(hotelId, roomId);
        HotelRoom hotelRoom = hotelRoomRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Hotel room not found")
        );
        hotelRoomRepository.deleteById(id);
    }

    @Override
    public List<HotelRoomDto> getHotelRoomsByHotelId(Long hotelId) {
        List<HotelRoom> hotelRooms = hotelRoomRepository.findByHotelId(hotelId);
        return hotelRooms.stream()
                .map(HotelRoomMapper::mapToHotelRoomDto)
                .collect(Collectors.toList());
    }
}
