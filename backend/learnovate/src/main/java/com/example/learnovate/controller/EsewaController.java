package com.example.learnovate.controller;

import com.example.learnovate.dto.EsewaInitiationDto;
import com.example.learnovate.dto.EsewaResponseDto;
import com.example.learnovate.dto.EsewaVerificationDto;
import com.example.learnovate.exception.UnauthorizedAccessException;
import com.example.learnovate.model.PaymentDetails;
import com.example.learnovate.service.EsewaService;
import com.example.learnovate.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class EsewaController {

    private final EsewaService esewaService;
    private final PaymentService paymentService;

    @Autowired
    public EsewaController(EsewaService esewaService, PaymentService paymentService) {
        this.esewaService = esewaService;
        this.paymentService = paymentService;
    }

    @PostMapping("/initiate")
    public ResponseEntity<?> initiatePayment(
            @RequestBody EsewaInitiationDto dto,
            @RequestParam int mentorId,
            @RequestParam int bookingId) {
        try {
            PaymentDetails payment = esewaService.initiatePayment(dto, bookingId, mentorId);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(new EsewaResponseDto(payment));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "status", "error",
                            "message", "Failed to initiate payment",
                            "error", e.getMessage()
                    ));
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(
            @RequestBody EsewaVerificationDto verificationDto) {
        try {
            PaymentDetails payment = esewaService.verifyPayment(verificationDto);
            return ResponseEntity.ok(new EsewaResponseDto(payment));
        } catch (UnauthorizedAccessException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED.value())
                    .body("You are unauthorized to access the system");
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Map.of(
                            "status", "error",
                            "message", "Payment verification failed",
                            "error", e.getMessage()
                    ));
        }
    }

    @GetMapping("/{transactionUuid}")
    public ResponseEntity<?> getPaymentStatus(
            @PathVariable String transactionUuid) {
        try {
            PaymentDetails payment = esewaService.getPaymentByTransactionId(transactionUuid);
            return ResponseEntity.ok(new EsewaResponseDto(payment));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "status", "error",
                            "message", "Payment not found",
                            "error", e.getMessage()
                    ));
        }
    }
}