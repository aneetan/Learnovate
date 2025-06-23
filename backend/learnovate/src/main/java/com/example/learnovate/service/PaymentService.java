package com.example.learnovate.service;

import com.example.learnovate.config.EsewaConfig;
import com.example.learnovate.dto.PaymentRequestDto;
import com.example.learnovate.model.*;
import com.example.learnovate.repository.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private static final Logger logger = LoggerFactory.getLogger(PaymentService.class);

    private final PaymentDetailsRepository paymentRepo;
    private final RegisteredUserRespository uRepo;
    private final MentorRepository mRepo;
    private final MentorBookingsRepository bookingRepo;
    private final EsewaConfig esewaConfig;
    private final RestTemplate restTemplate;

    public PaymentDetails initiateTransaction(PaymentRequestDto request, int mentorId) {
        Mentor mentor = mRepo.findById(mentorId)
                .orElseThrow(() -> new RuntimeException("Mentor not found"));

        RegisteredUser user = uRepo.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        MentorBookings bookings = bookingRepo.findByUserAndMentor(user, mentor)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        // Generate a unique transaction ID
        String transactionId = generateTransactionId();
        String totalAmount = String.format("%.2f", request.getAmount());

        // Create payment record
        PaymentDetails payment = new PaymentDetails();
        payment.setTransactionUuid(transactionId);
        payment.setAmount(Double.parseDouble(totalAmount));
        payment.setStatus("PENDING");
        payment.setUser(user);
        payment.setCreatedAt(LocalDateTime.now());
        payment.setMentor(mentor);
        payment.setMentorBookings(bookings);

        // Calculate and set signature
        String signature = calculateSignature(transactionId, totalAmount);
        payment.setSignatureHash(signature);

        return paymentRepo.save(payment);
    }

    public Map<String, String> initiatePayment(PaymentRequestDto req) {
        String transactionId = generateTransactionId();
        String totalAmount = String.format("%.2f", req.getAmount());

        Map<String, String> params = new HashMap<>();
        params.put("amount", totalAmount);
        params.put("tax_amount", "0");
        params.put("total_amount", totalAmount);
        params.put("transaction_uuid", transactionId);
        params.put("product_code", "EPAYTEST");
        params.put("product_service_charge", "0");
        params.put("product_delivery_charge", "0");
        params.put("success_url", Optional.ofNullable(req.getCallbackUrl())
                .orElse(esewaConfig.getSuccessUrl()));
        params.put("failure_url", Optional.ofNullable(req.getCallbackUrl())
                .orElse(esewaConfig.getFailureUrl()));
        params.put("signed_field_names", "total_amount,transaction_uuid,product_code");

        // Calculate signature
        String signature = calculateSignature(transactionId, totalAmount);
        params.put("signature", signature);

        return params;
    }

    public PaymentDetails updateTransactionStatus(String transactionId, String status) {
        PaymentDetails paymentDetails = paymentRepo.findByTransactionUuid(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        paymentDetails.setStatus(status);
        paymentDetails.setUpdatedAt(LocalDateTime.now());

        return paymentRepo.save(paymentDetails);
    }

    public boolean verifyPayment(String transactionUuid) {
        PaymentDetails payment = paymentRepo.findByTransactionUuid(transactionUuid)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        // Verify with eSewa's API
        boolean apiVerification = verifyWithEsewaApi(payment);

        if (!apiVerification) {
            logger.warn("API verification failed for transaction: {}", transactionUuid);
            return false;
        }

        // Also verify signature locally
        boolean signatureValid = verifySignature(payment);

        if (!signatureValid) {
            logger.warn("Signature verification failed for transaction: {}", transactionUuid);
        }

        return apiVerification && signatureValid;
    }

    private boolean verifyWithEsewaApi(PaymentDetails payment) {
        try {
            String url = UriComponentsBuilder.fromHttpUrl("https://rc.esewa.com.np/api/epay/transaction/status")
                    .queryParam("product_code", "EPAYTEST")
                    .queryParam("transaction_uuid", payment.getTransactionUuid())
                    .queryParam("total_amount", String.format("%.2f", payment.getAmount()))
                    .toUriString();

            HttpHeaders headers = new HttpHeaders();
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

            HttpEntity<?> entity = new HttpEntity<>(headers);

            //  GET request
            ResponseEntity<String> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    String.class
            );

            logger.info("eSewa verification response: {}", response.getBody());

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                String responseBody = response.getBody();

                return responseBody.contains("\"status\":\"Success\"") ||
                        responseBody.contains("\"response_code\":\"Success\"") ||
                        responseBody.contains("<status>Success</status>") ||
                        responseBody.contains("COMPLETED") ||
                        responseBody.contains("SUCCESS");
            }
            return false;
        } catch (Exception e) {
            logger.error("Error verifying payment with eSewa API", e);
            return false;
        }
    }

    private boolean verifySignature(PaymentDetails payment) {
        String calculatedSignature = calculateSignature(
                payment.getTransactionUuid(),
                String.valueOf(payment.getAmount())
        );
        boolean isValid =  calculatedSignature.equals(payment.getSignatureHash());
        logger.info("Signature verification - Stored: {}, Calculated: {}, Valid: {}",
                payment.getSignatureHash(), calculatedSignature, isValid);
        return isValid;
    }

    private String calculateSignature(String transactionId, String totalAmount) {
        String formattedAmount = String.format("%.2f", Double.parseDouble(totalAmount));

        String signatureData = String.format(
                "total_amount=%s,transaction_uuid=%s,product_code=%s",
                formattedAmount,
                transactionId,
                "EPAYTEST"
        );

        try {
            Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
            SecretKeySpec secret_key = new SecretKeySpec(
                    esewaConfig.getMerchantSecret().getBytes(StandardCharsets.UTF_8),
                    "HmacSHA256");
            sha256_HMAC.init(secret_key);

            byte[] hash = sha256_HMAC.doFinal(signatureData.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hash);
        } catch (Exception e) {
            logger.error("Error calculating signature", e);
            throw new RuntimeException("Error calculating signature", e);
        }
    }

    private String generateTransactionId() {
        // More robust transaction ID generation
        return "TXN-" + System.currentTimeMillis() + "-" +
                String.format("%04d", new Random().nextInt(10000));
    }

    // Method to verify incoming payment callback from eSewa
    public boolean verifyPaymentCallback(Map<String, String> callbackParams) {
        try {
            String transactionUuid = callbackParams.get("transaction_uuid");
            String totalAmount = callbackParams.get("total_amount");
            String productCode = callbackParams.get("product_code");
            String receivedSignature = callbackParams.get("signature");

            if (transactionUuid == null || totalAmount == null || productCode == null || receivedSignature == null) {
                logger.warn("Missing required parameters in callback");
                return false;
            }

            // Calculate expected signature
            String expectedSignature = calculateSignature(transactionUuid, totalAmount);

            boolean isValid = expectedSignature.equals(receivedSignature);

            logger.info("Callback signature verification - Expected: {}, Received: {}, Valid: {}",
                    expectedSignature, receivedSignature, isValid);

            return isValid;

        } catch (Exception e) {
            logger.error("Error verifying payment callback", e);
            return false;
        }
    }
}