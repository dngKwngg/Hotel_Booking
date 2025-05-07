package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name="bookings")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long bookingId;

    // A user can have many bookings
    // Each booking belongs to one user
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // A hotel can have many bookings
    // Each booking belongs to one hotel
    @ManyToOne
    @JoinColumn(name = "hotel_id", nullable = false)
    private Hotel hotel;

    @Column(name="checkin_date")
    private LocalDate checkinDate;

    @Column(name="checkout_date")
    private LocalDate checkoutDate;

    @Column(name="total_price")
    private int totalPrice;

    @Column(name="booking_date")
    private Date bookingDate;

    @Column(name="status_payment")
    private String statusPayment;

    @Column(name="order_code")
    private String orderCode;
}
