package com.example.learnovate.controller;

import com.example.learnovate.model.RegisteredUser;
import com.example.learnovate.service.RegisteredUserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class RegisteredUserController {

    @Autowired
    private RegisteredUserService userService;

    @PostMapping(value = "/register", produces = "application/json")
    public ResponseEntity<?> registerUser(@RequestBody RegisteredUser.RegistrationDto registrationDto) {
        try {
            RegisteredUser registeredUser = userService.registerNewUser(registrationDto);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .contentType(MediaType.APPLICATION_JSON)
                            .body(new UserResponse(registeredUser));
        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .badRequest()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("An unexpected error occurred"));
        }
    }

    // Response DTOs using Lombok
    @Data
    @NoArgsConstructor
    private static class UserResponse {
        private Integer id;
        private String name;
        private String email;
        private String role;

        public UserResponse(RegisteredUser user) {
            this.id = user.getId();
            this.name = user.getName();
            this.email = user.getEmail();
            this.role = user.getRole();
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