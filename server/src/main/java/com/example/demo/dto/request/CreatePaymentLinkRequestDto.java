package com.example.demo.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreatePaymentLinkRequestDto {
    private String roomName;
    private String description;
    private String returnUrl;
    private int totalPrice;
    private String cancelUrl;
    private int hotelId;
    private int numRooms;
    private int userId;
    private Date checkinDate;
    private Date checkoutDate;
    private Date bookingDate;
}
