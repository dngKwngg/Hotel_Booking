package com.example.demo.controller;

import com.example.demo.dto.BookingDto;
import com.example.demo.dto.request.BookingUpdateStatusRequest;
import com.example.demo.dto.request.CreatePaymentLinkRequestDto;
import com.example.demo.service.BookingService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.payos.PayOS;
import vn.payos.type.CheckoutResponseData;
import vn.payos.type.ItemData;
import vn.payos.type.PaymentData;

@RestController
@RequestMapping("${api.version}/bookings")
public class BookingController {
    private final PayOS payOS;
    private final BookingService bookingService;

    public BookingController(PayOS payOS, BookingService bookingService) {
        this.payOS = payOS;
        this.bookingService = bookingService;
    }

    @PostMapping("/create-payos")
    public ObjectNode createPaymentLink(@RequestBody CreatePaymentLinkRequestDto request){
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode response = objectMapper.createObjectNode();

        try {
            String roomName = request.getRoomName();
            String description = request.getDescription();
            String returnUrl = request.getReturnUrl();
            String cancelUrl = request.getCancelUrl();
            int price = request.getTotalPrice();

            // Gen order code
            String currentTimeString = String.valueOf(System.currentTimeMillis());
            long orderCode = Long.parseLong(currentTimeString.substring(currentTimeString.length() - 8));

            ItemData item = ItemData.builder().name(roomName).price(price).quantity(1).build();

            PaymentData paymentData = PaymentData.builder()
                    .orderCode(orderCode)
                    .item(item)
                    .description(description)
                    .amount(price)
                    .returnUrl(returnUrl)
                    .cancelUrl(cancelUrl)
                    .build();

            CheckoutResponseData data = payOS.createPaymentLink(paymentData);
            response.put("error", 0);
            response.put("message", "Payment link created successfully");
            response.put("data", objectMapper.valueToTree(data));
            return response;

//            String paymentLink = payOS.createPaymentLink(request.getPrice(), request.getDescription());
//            objectNode.put("paymentLink", paymentLink);
        } catch (Exception e) {
            response.put("error", -1);
            response.put("message", "Failed to create payment link");
            response.put("exception", e.getMessage());
            return response;
        }
    }

    @PostMapping("/create/{orderCode}")
    public BookingDto createBooking(@RequestBody BookingDto bookingDto, @PathVariable String orderCode) {
        // Implement your logic to create a booking
        return bookingService.createBooking(bookingDto, orderCode);
    }

    @PutMapping("/update-status")
    public ResponseEntity<?> updateBookingStatus(@RequestBody BookingUpdateStatusRequest request) {
        bookingService.updateStatusByOrderCode(request);
        // Implement your logic to update the booking status
        return ResponseEntity.ok("Booking status updated");
    }
}
