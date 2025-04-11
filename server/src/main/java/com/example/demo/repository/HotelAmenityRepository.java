package com.example.demo.repository;

import com.example.demo.entities.HotelAmenity;
import com.example.demo.entities.HotelAmenityID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HotelAmenityRepository extends JpaRepository<HotelAmenity, HotelAmenityID> {
    @Query("SELECT ha FROM HotelAmenity ha WHERE ha.hotel.hotelId = :hotelId")
    List<HotelAmenity> findByHotelId(Long hotelId);
}
