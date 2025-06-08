package com.example.learnovate.service;

import com.example.learnovate.config.EsewaConfig;
import com.example.learnovate.dto.PaymentRequestDto;
import com.example.learnovate.model.Mentor;
import com.example.learnovate.model.MentorBookings;
import com.example.learnovate.model.PaymentDetails;
import com.example.learnovate.model.RegisteredUser;
import com.example.learnovate.repository.MentorBookingsRepository;
import com.example.learnovate.repository.MentorRepository;
import com.example.learnovate.repository.PaymentDetailsRepository;
import com.example.learnovate.repository.RegisteredUserRespository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentDetailsRepository paymentRepo;
    private final RegisteredUserRespository uRepo;
    private final MentorRepository mRepo;
    private final MentorBookingsRepository bookingRepo;
    private final EsewaConfig esewaConfig;
    private final SignatureService signatureService;

    public PaymentDetails initiateTransaction(PaymentRequestDto request, int mentorId){
        String transactionId = UUID.randomUUID().toString();
        Mentor mentor = mRepo.findById(mentorId)
                .orElseThrow(() -> new RuntimeException("Mentor not found"));

        RegisteredUser user = uRepo.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("user not found"));

        MentorBookings bookings = bookingRepo.findByUserAndMentor(user, mentor)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        String signedData = String.format(
                "total_amount=%s,transaction_uuid=%s,product_code=%s",
                request.getAmount(),
                transactionId,
                "EPAYTEST"
        );

        String signature = calculateSignature(signedData);
        String signatureHash = signatureService.hashSignature(signature);

        PaymentDetails payment = new PaymentDetails();
        payment.setTransactionUuid(transactionId);
        payment.setAmount(request.getAmount());
        payment.setStatus("PENDING");
        payment.setSignatureHash(signatureHash);
        payment.setUser(user);
        payment.setCreatedAt(LocalDateTime.now());
        payment.setMentor(mentor);
        payment.setMentorBookings(bookings);

        return paymentRepo.save(payment);
    }

    public PaymentDetails updateTransactionStatus(String transactionId, String status){
        PaymentDetails paymentDetails = paymentRepo.findByTransactionUuid(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        paymentDetails.setStatus(status);
        paymentDetails.setUpdatedAt(LocalDateTime.now());

        return paymentRepo.save(paymentDetails);

    }

    public Map<String,String> initiatePayment(PaymentRequestDto req){
        Map<String, String> params = new HashMap<>();

        params.put("amount", String.valueOf(req.getAmount()));
        params.put("tax_amount", "0");
        params.put("total_amount", String.valueOf(req.getAmount()));
        params.put("transaction_uuid", UUID.randomUUID().toString());
        params.put("product_code", "EPAYTEST");
        params.put("product_service_charge", "0");
        params.put("product_delivery_charge", "0");
        params.put("success_url",
                Optional.ofNullable(req.getCallbackUrl()).orElse(esewaConfig.getSuccessUrl()));
        params.put("failure_url",
                Optional.ofNullable(req.getCallbackUrl()).orElse(esewaConfig.getFailureUrl()));
        params.put("signed_field_names",
                "total_amount,transaction_uuid,product_code");

        //Calculate signature
        String signatureData = String.format(
                "total_amount=%s,transaction_uuid=%s,product_code=%s",
                params.get("total_amount"),
                params.get("transaction_uuid"),
                params.get("product_code")
        );

        String signature = calculateSignature(signatureData);
        params.put("signature", signature);

        return params;

    }

    private String calculateSignature(String data) {
        try {
            Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
            SecretKeySpec secret_key = new SecretKeySpec(
                    esewaConfig.getMerchantSecret().getBytes(StandardCharsets.UTF_8),
                    "HmacSHA256");
            sha256_HMAC.init(secret_key);

            byte[] hash = sha256_HMAC.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hash);
        } catch (Exception e) {
            throw new RuntimeException("Error calculating signature", e);
        }
    }

    public boolean verifyPayment(String transactionUuid) {
        //get original transaction
        PaymentDetails payment = paymentRepo.findByTransactionUuid(transactionUuid)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        String signatureData = String.format(
                "total_amount=%s,transaction_uuid=%s,product_code=%s",
                payment.getAmount(),
                payment.getTransactionUuid(),
                "EPAYTEST"
        );

        String signature = calculateSignature(signatureData);

        //validate the signature with database hashed service
        return signatureService.verifySignature(
                signature,
                payment.getSignatureHash()
        );
    }
}
