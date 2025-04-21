package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class ReviewDto {
    private Long reviewId;
    private UserDto user;
    private HotelDto hotel;
    private Long rating;
    private String title;
    private String text;
    private LocalDateTime reviewDate;
}
