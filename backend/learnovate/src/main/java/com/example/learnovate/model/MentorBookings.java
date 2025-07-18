package com.example.learnovate.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MentorBookings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookingId;

    private LocalDate bookingDate;
    private LocalTime timeSlot;
    private String topic;
    private String notes;
    private String paymentStatus;
    private String status;


    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private RegisteredUser user;

    @ManyToOne
    @JoinColumn(name = "mentorId", nullable = false)
    private Mentor mentor;
}
