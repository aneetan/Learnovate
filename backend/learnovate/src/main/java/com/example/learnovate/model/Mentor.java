package com.example.learnovate.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Data
@Getter
@Setter
public class Mentor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int mentorId;

    private String bio;
    private String phoneNumber;
    private String price;
    private String area;
    private String title;
    private String experience;
    private String documentUrl;
    private String profileUrl;
    private String status;

    // Foreign key to RegisteredUser
    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private RegisteredUser user;

    @ElementCollection
    @CollectionTable(name = "mentor_skills", joinColumns = @JoinColumn(name = "mentor_id"))
    @Column(name = "skill")
    private List<String> skills;
    public Mentor() {
    }

}
