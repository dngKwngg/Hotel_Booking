package com.example.demo.repository;

import com.example.demo.entities.HotelRoom;
import com.example.demo.entities.HotelRoomID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HotelRoomRepository extends JpaRepository<HotelRoom, HotelRoomID> {
    @Query("SELECT hr FROM HotelRoom hr WHERE hr.hotel.hotelId = :hotelId")
    List<HotelRoom> findByHotelId(Long hotelId);
}
