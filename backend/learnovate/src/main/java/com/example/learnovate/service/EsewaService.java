package com.example.learnovate.service;

import com.example.learnovate.classfile.AuthenticateEmail;
import com.example.learnovate.dto.EsewaInitiationDto;
import com.example.learnovate.dto.EsewaVerificationDto;
import com.example.learnovate.exception.UnauthorizedAccessException;
import com.example.learnovate.model.Mentor;
import com.example.learnovate.model.MentorBookings;
import com.example.learnovate.model.PaymentDetails;
import com.example.learnovate.model.RegisteredUser;
import com.example.learnovate.repository.MentorBookingsRepository;
import com.example.learnovate.repository.MentorRepository;
import com.example.learnovate.repository.PaymentDetailsRepository;
import com.example.learnovate.repository.RegisteredUserRespository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class EsewaService {
    private final PaymentDetailsRepository paymentRepository;

    private final MentorBookingsRepository bookingRepo;

    private final RegisteredUserRespository uRepo;

    private final MentorRepository mRepo;
    AuthenticateEmail authenticateEmail = new AuthenticateEmail();

    public PaymentDetails initiatePayment(EsewaInitiationDto dto, int bookingId, int mentorId) {
        RegisteredUser user = uRepo.findById(dto.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("Booking not found"));

        MentorBookings bookings = bookingRepo.findById(bookingId)
                .orElseThrow(() -> new EntityNotFoundException("Booking not found"));

        Mentor mentor = mRepo.findById(mentorId)
                .orElseThrow(() -> new EntityNotFoundException("Mentor not found"));

        PaymentDetails payment = new PaymentDetails();
        payment.setTransactionUuid(dto.getTransactionUuid());
        payment.setAmount(Double.parseDouble(dto.getAmount()));
        payment.setSignatureHash(dto.getSignature());
        payment.setStatus("INITIATED");
        payment.setUser(user);
        payment.setMentor(mentor);
        payment.setMentorBookings(bookings);

        return paymentRepository.save(payment);
    }

    public PaymentDetails verifyPayment(EsewaVerificationDto dto) {
        String authenticatedEmail = authenticateEmail.getAuthenticatedUserEmail();

        PaymentDetails payment = paymentRepository.findByTransactionUuid(dto.getTransactionUuid())
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        if ("SUCCESS".equals(payment.getStatus())) {
            throw new RuntimeException("Payment already verified");
        }

        RegisteredUser user = uRepo.findById(payment.getUser().getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!authenticatedEmail.equals(user.getEmail())) {
            throw new UnauthorizedAccessException("Email in request does not match authenticated user");
        }

        Mentor mentor = mRepo.findById(payment.getMentor().getMentorId())
                .orElseThrow(() -> new RuntimeException("Mentor not found"));
        System.out.println(mentor);

        MentorBookings bookings = bookingRepo.findByUserAndMentor(user, mentor)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        payment.setStatus("SUCCESS");
        payment.setUpdatedAt(LocalDateTime.now());
        bookings.setPaymentStatus("PAID");
        bookingRepo.save(bookings);

        return paymentRepository.save(payment);
    }

    public PaymentDetails getPaymentByTransactionId(String transactionUuid) {
        return paymentRepository.findByTransactionUuid(transactionUuid)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
    }
}
