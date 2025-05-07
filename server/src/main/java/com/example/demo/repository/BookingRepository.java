package com.example.demo.repository;

import com.example.demo.entities.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    Optional<Booking> findByOrderCode(String orderCode);

    // Get all bookings by user ID
    @Query("SELECT b FROM Booking b WHERE b.user.userId = ?1")
    List<Booking> findByUserId(Long userId);
}
