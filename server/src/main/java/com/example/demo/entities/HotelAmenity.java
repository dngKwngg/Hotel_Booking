package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "hotel_amenities")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class HotelAmenity {
    @EmbeddedId
    private HotelAmenityID id = new HotelAmenityID();

    @ManyToOne // Quan hệ N - 1 với Hotel
    @MapsId("hotelId") // tham chiếu đến trường hotelId trong HotelAmenityID
    @JoinColumn(name = "hotel_id")  // hotel_id là cột trong bảng hotel_amenities tham chiếu đến bảng hotel (foreign key)
    private Hotel hotel;

    @ManyToOne
    @MapsId("amenityId")
    @JoinColumn(name = "amenity_id")
    private Amenity amenity;

    public HotelAmenity(Hotel hotel, Amenity amenity) {
        this.hotel = hotel;
        this.amenity = amenity;
        this.id = new HotelAmenityID(hotel.getHotelId(), amenity.getAmenityId());
    }


}
