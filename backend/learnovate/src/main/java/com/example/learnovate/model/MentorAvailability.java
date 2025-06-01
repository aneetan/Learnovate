package com.example.learnovate.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.time.LocalTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MentorAvailability {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int availabilityId;

    private LocalTime startTime;
    private LocalTime endTime;

    // Foreign key to RegisteredUser
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId", nullable = false)
    private RegisteredUser user;

    @ElementCollection
    @CollectionTable(name = "available_days", joinColumns = @JoinColumn(name = "availabilityId"))
    @Column(name = "days")
    private List<String> days;
}
