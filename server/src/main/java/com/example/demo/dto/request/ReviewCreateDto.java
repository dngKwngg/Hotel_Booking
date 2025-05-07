package com.example.demo.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewCreateDto {
    private Long userId;
    private Long hotelId;
    private Integer rating;
    private String comment;
}
