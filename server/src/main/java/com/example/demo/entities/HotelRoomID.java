package com.example.demo.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class HotelRoomID implements Serializable {

    @Column(name = "hotel_id")
    private Long hotelId;

    @Column(name = "room_id")
    private Long roomId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof HotelRoomID)) return false;
        HotelRoomID that = (HotelRoomID) o;
        return hotelId.equals(that.hotelId) && roomId.equals(that.roomId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(hotelId, roomId);
    }
}
