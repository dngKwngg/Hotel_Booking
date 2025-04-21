package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="id")
    private Long bookingDetailId;

    @ManyToOne
    @JoinColumn(table = "booking_id", nullable = false)
    private Booking booking;

    @Column(name = "room_id")
    private Long roomId;

}
