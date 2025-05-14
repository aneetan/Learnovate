package com.example.learnovate.service;

import com.example.learnovate.model.RegisteredUser;
import com.example.learnovate.repository.RegisteredUserRespository;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RegisteredUserService {
    @Autowired
    private RegisteredUserRespository regRepo;

    @Transactional
    public RegisteredUser registerNewUser(RegisteredUser.RegistrationDto registrationDto) {
        // Validate input
        validateRegistration(registrationDto);

        // Save user to database
        return regRepo.save(registrationDto.toEntity());
    }

    private void validateRegistration(RegisteredUser.RegistrationDto dto) {
        // Validate name
        if (dto.getName() == null || dto.getName().trim().length() < 2) {
            throw new IllegalArgumentException("Name must be at least 2 characters long");
        }

        // Validate email
        if (dto.getEmail() == null || !isValidEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Invalid email format");
        }

        // Check if email already exists
        if (regRepo.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }

        // Validate password
        if (dto.getPassword() == null || dto.getPassword().length() < 8) {
            throw new IllegalArgumentException("Password must be at least 8 characters long");
        }

        // Validate password confirmation
        if (!dto.getPassword().equals(dto.getConfirmPassword())) {
            throw new IllegalArgumentException("Passwords do not match");
        }

        // Validate role
        if (dto.getRole() == null || (!dto.getRole().equals("mentor") && !dto.getRole().equals("mentee"))) {
            throw new IllegalArgumentException("Invalid role. Must be 'mentor' or 'mentee'");
        }
    }

    // Simple email validation regex
    private boolean isValidEmail(String email) {
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        return email.matches(emailRegex);
    }
}