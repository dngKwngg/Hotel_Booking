package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="hotel_rooms")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class HotelRoom {
    @EmbeddedId
    private HotelRoomID id = new HotelRoomID();

    @ManyToOne
    @MapsId("hotelId")
    @JoinColumn(name = "hotel_id")
    private Hotel hotel;

    @ManyToOne
    @MapsId("roomId")
    @JoinColumn(name = "room_id")
    private Room room;

    private Long price;
    @Column(name = "number_rooms")
    private Integer numberRooms;

    public HotelRoom(Hotel hotel, Room room, Long price, Integer numberRooms) {
        this.hotel = hotel;
        this.room = room;
        this.price = price;
        this.numberRooms = numberRooms;
        this.id = new HotelRoomID(hotel.getHotelId(), room.getRoomId());
    }
}
