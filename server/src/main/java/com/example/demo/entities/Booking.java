package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.grammars.hql.HqlParser;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Locale;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long bookingId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "hotel_id", nullable = false)
    private Hotel hotel;

    @Column(name = "checkin_date", nullable = false)
    private Date checkinDate;

    @Column(name = "checkout_date", nullable = false)
    private Date checkoutDate;

    @Column(name = "total_fare", nullable = false)
    private Long totalFare;

    @Column(name= "booking_date")
    private LocalDateTime bookingDate;

    @Column(name= "status_payment")
    private String statusPayment;


}
