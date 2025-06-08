package com.example.learnovate.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.userdetails.User;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@Table(name = "esewa_transactions")
public class PaymentDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long payment_id;

    @Column(nullable = false, unique = true)
    private String transactionUuid;

    private double amount;

    private String status;

    @Column(nullable = false, length = 60)
    private String signatureHash;

    @ManyToOne
    @JoinColumn(name = "booking_id", nullable = false)
    private MentorBookings mentorBookings;

    @ManyToOne
    @JoinColumn(name = "payer_id", nullable = false)
    private RegisteredUser user;

    @ManyToOne
    @JoinColumn(name = "payee_id", nullable = false)
    private Mentor mentor;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public PaymentDetails() {
        this.createdAt = LocalDateTime.now();
        this.status = "PENDING";
    }
}
