package com.example.demo.service.impl;

import com.example.demo.dto.request.ReviewCreateDto;
import com.example.demo.dto.response.ReviewResponseDto;
import com.example.demo.entities.Hotel;
import com.example.demo.entities.User;
import com.example.demo.mapper.ReviewMapper;
import com.example.demo.entities.Review;
import com.example.demo.repository.HotelRepository;
import com.example.demo.repository.ReviewRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.ReviewService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;
    private final HotelRepository hotelRepository;
    private final UserRepository userRepository;

    public ReviewServiceImpl(ReviewRepository reviewRepository, HotelRepository hotelRepository, UserRepository userRepository) {
        this.reviewRepository = reviewRepository;
        this.hotelRepository = hotelRepository;
        this.userRepository = userRepository;
    }


    @Override
    public List<ReviewResponseDto> getAllReviewsByHotelId(Long hotelId) {
        List<Review> reviews = reviewRepository.findAllByHotelId(hotelId);
        return reviews.stream()
                .map(ReviewMapper::mapToReviewResponseDto)
                .toList();
    }

    @Override
    public ReviewResponseDto createOrUpdateReview(ReviewCreateDto reviewCreateDto) {
        Optional<Review> existingReview = reviewRepository.findReviewByHotelIdAndUserId(reviewCreateDto.getHotelId(), reviewCreateDto.getUserId());

//        Review review = existingReview.orElseGet(Review::new);
        Hotel hotel = hotelRepository.findById(reviewCreateDto.getHotelId())
                .orElseThrow(() -> new RuntimeException("Hotel not found"));

        User user = userRepository.findById(reviewCreateDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Review review = ReviewMapper.mapToReviewFromRequest(reviewCreateDto, hotel, user);

        // Fix: set existing ID if updating
        // Set id of review from mapToReviewFromRequest to the existing review if it exists
        existingReview.ifPresent(r -> review.setReviewId(r.getReviewId()));

        reviewRepository.save(review);
        return ReviewMapper.mapToReviewResponseDto(review);
    }
}
