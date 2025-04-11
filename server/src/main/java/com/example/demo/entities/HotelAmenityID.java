package com.example.demo.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class HotelAmenityID implements Serializable {
    @Column(name = "hotel_id")
    private Long hotelId;

    @Column(name= "amenity_id")
    private Long amenityId;
}

