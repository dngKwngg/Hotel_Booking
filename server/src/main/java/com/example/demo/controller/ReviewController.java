package com.example.demo.controller;

import com.example.demo.dto.request.ReviewCreateDto;
import com.example.demo.dto.response.ReviewResponseDto;
import com.example.demo.service.ReviewService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.version}/reviews")
public class ReviewController {
    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/hotel/{hotelId}")
    public List<ReviewResponseDto> getAllReviewsByHotelId(@PathVariable Long hotelId) {
        return reviewService.getAllReviewsByHotelId(hotelId);
    }

    @PostMapping
    public ReviewResponseDto createOrUpdateReview(@RequestBody ReviewCreateDto reviewCreateDto) {
        return reviewService.createOrUpdateReview(reviewCreateDto);
    }
}
