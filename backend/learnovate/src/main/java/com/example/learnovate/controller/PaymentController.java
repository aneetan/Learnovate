package com.example.learnovate.controller;

import com.example.learnovate.config.EsewaConfig;
import com.example.learnovate.dto.PaymentRequestDto;
import com.example.learnovate.dto.PaymentResponseDto;
import com.example.learnovate.model.Mentor;
import com.example.learnovate.model.MentorBookings;
import com.example.learnovate.model.PaymentDetails;
import com.example.learnovate.model.RegisteredUser;
import com.example.learnovate.service.MenteeServiceImplements;
import com.example.learnovate.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;
    private final EsewaConfig esewaConfig;
    private final MenteeServiceImplements menteeService;

    @PostMapping("/initiate/{mentorId}")
    public ResponseEntity<?> initiatePayment(@RequestBody PaymentRequestDto request,
                                                              @PathVariable int mentorId ){
        try {
            // Create transaction record in database
            PaymentDetails paymentDetails = paymentService.initiateTransaction(request, mentorId);

            // Generate eSewa payment parameters
            Map<String, String> paymentParams = paymentService.initiatePayment(request);

            // Combine responses
            Map<String, Object> response = new HashMap<>();
            response.put("transaction", paymentDetails);
            response.put("payment_params", paymentParams);
            response.put("esewa_url", esewaConfig.getBaseUrl() + "/api/epay/main/v2/form");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of(
                            "error", e.getMessage(),
                            "status", "PAYMENT_INITIATION_FAILED"
                    ));
        }
    }

    @GetMapping("/success")
    public ResponseEntity<?> paymentSuccess(
            @RequestParam("transaction_uuid") String transactionUuid) {

        try {
            if (!paymentService.verifyPayment(transactionUuid)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of(
                                "status", HttpStatus.FORBIDDEN.value(),
                                "message", "Payment signature verification failed"
                        ));
            }

            // Update transaction status
            PaymentDetails updatedPayment = paymentService.updateTransactionStatus(
                    transactionUuid,
                    "SUCCESS");

            menteeService.updatePaymentForBookings(updatedPayment.getMentorBookings().getBookingId());

            return ResponseEntity.ok(Map.of(
                    "status", HttpStatus.OK.value(),
                    "message", "Payment completed successfully"
            ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of(
                            "status", HttpStatus.BAD_REQUEST.value(),
                            "error", e.getMessage()
                    ));
        }
    }

    @GetMapping("/failure")
    public ResponseEntity<?> paymentFailure(
            @RequestParam("transaction_uuid") String transactionUuid,
            @RequestParam("amount") String amount) {

        try {
            PaymentDetails updatedPayment = paymentService.updateTransactionStatus(
                    transactionUuid,
                    "FAILED");

            return ResponseEntity.ok(Map.of(
                    "status", "FAILED",
                    "message", "Payment was not completed",
                    "transaction", updatedPayment
            ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of(
                            "status", "ERROR",
                            "error", "Failed to update payment status"
                    ));
        }
    }
}
