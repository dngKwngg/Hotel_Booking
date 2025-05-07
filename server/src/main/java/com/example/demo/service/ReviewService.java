package com.example.demo.service;

import com.example.demo.dto.request.ReviewCreateDto;
import com.example.demo.dto.response.ReviewResponseDto;

import java.util.List;

public interface ReviewService {
    List<ReviewResponseDto> getAllReviewsByHotelId(Long hotelId);
    ReviewResponseDto createOrUpdateReview(ReviewCreateDto reviewCreateDto);
}
