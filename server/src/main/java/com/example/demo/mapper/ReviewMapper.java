package com.example.demo.mapper;

import com.example.demo.dto.request.ReviewCreateDto;
import com.example.demo.dto.response.ReviewResponseDto;
import com.example.demo.entities.Hotel;
import com.example.demo.entities.Review;
import com.example.demo.entities.User;

import java.time.LocalDateTime;

public class ReviewMapper {
    public static Review mapToReviewFromRequest(ReviewCreateDto reviewCreateDto, Hotel hotel, User user) {
        Review review = new Review();
        review.setUser(user);
        review.setHotel(hotel);
        review.setRating(reviewCreateDto.getRating());
        review.setComment(reviewCreateDto.getComment());
        review.setReviewDate(LocalDateTime.now());
        return review;
    }

    public static ReviewResponseDto mapToReviewResponseDto(Review review) {
        return new ReviewResponseDto(
                review.getReviewId(),
                review.getUser().getUserId(),
                review.getHotel().getHotelId(),
                review.getRating(),
                review.getComment(),
                review.getReviewDate().toString()
        );
    }
}
