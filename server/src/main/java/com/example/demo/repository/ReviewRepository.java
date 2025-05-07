package com.example.demo.repository;

import com.example.demo.entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    // Find all reviews by hotel ID
    @Query("SELECT r FROM Review r WHERE r.hotel.hotelId = ?1")
    List<Review> findAllByHotelId(Long hotelId);

    @Query("SELECT r FROM Review r WHERE r.hotel.hotelId = ?1 AND r.user.userId = ?2")
    Optional<Review> findReviewByHotelIdAndUserId(Long hotelId, Long userId);
}
