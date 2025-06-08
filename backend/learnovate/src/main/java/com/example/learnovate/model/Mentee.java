package com.example.learnovate.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Mentee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int menteeId;

    private String profileUrl;
    private String area;
    private String phone;
    private String currentStatus;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId", nullable = false)
    private RegisteredUser user;
}
