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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static final Logger logger = LoggerFactory.getLogger(PaymentService.class);

    private final PaymentDetailsRepository paymentRepo;
    private final RegisteredUserRespository uRepo;
    private final MentorRepository mRepo;
    private final MentorBookingsRepository bookingRepo;
    private final EsewaConfig esewaConfig;
    private final SignatureService signatureService;
//    String transactionId = UUID.randomUUID().toString();
    String transactionId = String.format("%05d", new Random().nextInt(100000));

    public PaymentDetails initiateTransaction(PaymentRequestDto request, int mentorId){
        Mentor mentor = mRepo.findById(mentorId)
                .orElseThrow(() -> new RuntimeException("Mentor not found"));

        RegisteredUser user = uRepo.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("user not found"));

        MentorBookings bookings = bookingRepo.findByUserAndMentor(user, mentor)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        String totalAmount = String.format("%.2f", request.getAmount());


        String signedData = String.format(
                "total_amount=%s,transaction_uuid=%s,product_code=%s",
                totalAmount,
                transactionId,
                "EPAYTEST"
        );

        String signature = calculateSignature(signedData);

        PaymentDetails payment = new PaymentDetails();
        payment.setTransactionUuid(transactionId);
        payment.setAmount(Double.parseDouble(totalAmount));
        payment.setStatus("PENDING");
        payment.setSignatureHash(signature);
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
        String totalAmount = String.format("%.2f", req.getAmount());


        params.put("amount",  totalAmount);
        params.put("tax_amount", "0.00");
        params.put("total_amount", totalAmount);
        params.put("transaction_uuid",  transactionId);
        params.put("product_code", "EPAYTEST");
        params.put("product_service_charge", "0.00");
        params.put("product_delivery_charge", "0.00");
        params.put("success_url",
                Optional.ofNullable(req.getCallbackUrl()).orElse(esewaConfig.getSuccessUrl()));
        params.put("failure_url",
                Optional.ofNullable(req.getCallbackUrl()).orElse(esewaConfig.getFailureUrl()));
        params.put("signed_field_names",
                "total_amount,transaction_uuid,product_code");



        //Calculate signature
        String signatureData = String.format(
                "total_amount=%s,transaction_uuid=%s,product_code=%s",
                totalAmount,
                params.get("transaction_uuid"),
                params.get("product_code")
        );

        String signature = calculateSignature(signatureData);
        params.put("signature", signature);

        return params;

    }

    private String calculateSignature(String data) {
        logger.info("Signature input data: {}", data);
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
        String totalAmount = String.format("%.2f", payment.getAmount());

        String signatureData = String.format(
                "total_amount=%s,transaction_uuid=%s,product_code=%s",
                totalAmount,
                payment.getTransactionUuid(),
                "EPAYTEST"
        );

        logger.info("Signature Data", signatureData);

        String signature = calculateSignature(signatureData);
        logger.info("Signature", signature);


        //validate the signature with database hashed service
        return Objects.equals(signature, payment.getSignatureHash());
    }
}
