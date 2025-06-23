package com.example.learnovate.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisteredUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @JsonIgnore
    private String password;

    private String role;

    private boolean isDetailsFilled;

    public boolean isDetailsFilled() {
        return isDetailsFilled;
    }

    public void setDetailsFilled(boolean detailsFilled) {
        isDetailsFilled = detailsFilled;
    }

    public RegisteredUser(String name, String email, String password, String role, boolean isDetailsFilled) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.isDetailsFilled = isDetailsFilled;
    }
}