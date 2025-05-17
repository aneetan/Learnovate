package com.example.learnovate.controller;

import com.example.learnovate.model.RegisteredUser;
import com.example.learnovate.repository.RegisteredUserRespository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class RegisteredUserController {
    @Autowired
    private RegisteredUserRespository regRepo;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping(value = "/register", produces = "application/json")
    public ResponseEntity<?> registerUser(@RequestBody RegisteredUser.RegistrationDto registrationDto) {
        try {

            if (regRepo.existsByEmail(registrationDto.getEmail())) {
                return ResponseEntity
                        .status(HttpStatus.CONFLICT)
                        .body(Map.of("error", "Email already in use!"));
            }

            String hashedPassword = passwordEncoder.encode(registrationDto.getPassword());

            RegisteredUser registeredUser = registrationDto.toEntity();
            registeredUser.setPassword(hashedPassword);

            regRepo.save(registeredUser);

            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("id", registeredUser.getId());
            responseBody.put("name", registeredUser.getName());
            responseBody.put("email", registeredUser.getEmail());
            responseBody.put("role", registeredUser.getRole());
            responseBody.put("message", "Registration successful");
            responseBody.put("redirectUrl", "/login");

            return ResponseEntity.status(HttpStatus.CREATED)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(responseBody);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("An unexpected error occurred"));
        }
    }

    @Data
    private static class ErrorResponse {
        public String error;
        public ErrorResponse(String error) {
            this.error = error;
        }
    }

    // Additional endpoints could be added here
    // @PostMapping("/login") etc.
}