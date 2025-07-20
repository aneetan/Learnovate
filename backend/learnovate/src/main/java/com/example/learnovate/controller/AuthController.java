package com.example.learnovate.controller;

import com.example.learnovate.config.JwtUtil;
import com.example.learnovate.dto.AuthResponse;
import com.example.learnovate.dto.LoginDto;
import com.example.learnovate.dto.RegistrationDto;
import com.example.learnovate.dto.TokenRequest;
import com.example.learnovate.exception.UnauthorizedAccessException;
import com.example.learnovate.model.Mentee;
import com.example.learnovate.model.Mentor;
import com.example.learnovate.model.RegisteredUser;
import com.example.learnovate.repository.RegisteredUserRespository;
import com.example.learnovate.service.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private final AuthService authService;

    @Autowired
    private  final MentorService mentorService;

    @Autowired
    private final MenteeService menteeService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private TokenBlacklistService tokenBlacklistService;

    @Autowired
    private EmailService emailService;
    @Autowired
    private ForgotPasswordService forgotPasswordService;

    @Autowired
    private RegisteredUserRespository rRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public AuthController(AuthService authService, MentorService mentorService, MenteeService menteeService) {
        this.authService = authService;
        this.mentorService = mentorService;
        this.menteeService = menteeService;
    }

    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> registerUser(@RequestBody RegistrationDto registrationDto) {
        try {
            Map<String, Object> response = authService.registerUser(registrationDto);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(response);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Email already in use"));
        }
    }

    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> login(@RequestBody LoginDto login) {
        try {
            Map<String, Object> response = authService.loginUser(login);
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(response);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid email or password"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "An unexpected error occurred"));
        }
    }

    @PostMapping("/google")
    public ResponseEntity<?> authenticateGoogle(@RequestHeader("Authorization") String authHeader,
                                                @RequestBody TokenRequest tokenRequest) {
        logger.info("Received Google auth request with idToken: {}", tokenRequest.getIdToken());
        try {
            // Extract token from header
            String idToken = authHeader.replace("Bearer ", "");

            AuthResponse response = authService.authenticateGoogle(idToken);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Authentication failed: {}", e.getMessage());
            return ResponseEntity.status(401).body("Authentication failed: " + e.getMessage());
        }
    }

    @GetMapping("/getUsers/{id}")
    public ResponseEntity<?> getMentorById(@PathVariable int id) {
        try {
            RegisteredUser user = authService.getUserById(id);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e){
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST.value())
                    .body("User not found of id " + id);
        }
    }

    @GetMapping("/getMentor/{userId}")
    public ResponseEntity<?> getMentorByUserId(@PathVariable int userId) {
        try {
            Mentor mentor = mentorService.getMentorByUserId(userId);
            return ResponseEntity.ok(mentor);
        } catch (RuntimeException e){
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST.value())
                    .body("User not found of id " + userId);
        }
    }

    @GetMapping("/getMentee/{userId}")
    public ResponseEntity<?> getMenteeByUserId(@PathVariable int userId) {
        try {
            Mentee mentee = menteeService.getMenteeByUserId(userId);
            return ResponseEntity.ok(mentee);
        } catch (UnauthorizedAccessException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED.value())
                    .body("You are unauthorized to access the system");
        } catch (RuntimeException e){
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST.value())
                    .body("User not found of id " + userId);
        }
    }

    @Data
    private static class ErrorResponse {
        public String error;
        public ErrorResponse(String error) {
            this.error = error;
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);

            // Add token to blacklist
            tokenBlacklistService.blacklistToken(token);

            // Return 200 OK with no body
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.ok().build();
    }


    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> requestBody) {
        String email = requestBody.get("email");

        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Email is required"
            ));
        }

        // Basic email format validation
        if (!email.matches("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Invalid email format"
            ));
        }

        try {
            // Check if user exists in database
            if (!rRepo.existsByEmail(email)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                        "success", false,
                        "message", "Email not registered with our system"
                ));
            }

            String otp = forgotPasswordService.generateOtp();
            forgotPasswordService.storeOtp(email, otp);

            // Send OTP via email
            String subject = "Password Reset OTP";
            String text = String.format(
                    "Your OTP for password reset is: %s\n\n" +
                            "This OTP is valid for 2 minutes.\n\n" +
                            "If you didn't request this, please ignore this email.",
                    otp
            );

            emailService.sendSimpleEmail(email, subject, text);

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "OTP sent to your email"
            ));

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                    "success", false,
                    "message", "Failed to process your request"
            ));
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");

        if (email == null || email.isEmpty() || otp == null || otp.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Email and OTP are required"
            ));
        }

        try {
            if (!forgotPasswordService.verifyOtp(email, otp)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                        "success", false,
                        "message", "Invalid or expired OTP"
                ));
            }

            String resetToken = forgotPasswordService.getResetToken(email);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "OTP verified successfully",
                    "resetToken", resetToken
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                    "success", false,
                    "message", "Error verifying OTP"
            ));
        }
    }

    @PostMapping("/resend-otp")
    public ResponseEntity<?> resendOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");

        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Email is required"
            ));
        }

        try {
            if (!rRepo.existsByEmail(email)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                        "success", false,
                        "message", "Email not registered"
                ));
            }

            String newOtp = forgotPasswordService.generateOtp();
            forgotPasswordService.storeOtp(email, newOtp);

            // Send new OTP via email
            String subject = "Your New Password Reset OTP";
            String text = String.format(
                    "Your new OTP for password reset is: %s\n\n" +
                            "This OTP is valid for 2 minutes.\n\n" +
                            "If you didn't request this, please ignore this email.",
                    newOtp
            );

            emailService.sendSimpleEmail(email, subject, text);

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "New OTP sent to your email"
            ));

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                    "success", false,
                    "message", "Failed to resend OTP"
            ));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String resetToken = request.get("resetToken");
        String newPassword = request.get("newPassword");

        if (email == null || resetToken == null || newPassword == null) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Email, reset token, and new password are required"
            ));
        }

        try {
            // Validate reset token
            if (!forgotPasswordService.validateResetToken(email, resetToken)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                        "success", false,
                        "message", "Invalid or expired reset token"
                ));
            }

            // Check if user exists
            RegisteredUser user = rRepo.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found for email: " + email));

            // Update password
            user.setPassword(passwordEncoder.encode(newPassword));
            rRepo.save(user);

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Password reset successfully"
            ));
        } catch (RuntimeException e) {
            logger.error("Error resetting password for email {}: {}", email, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        } catch (Exception e) {
            logger.error("Error resetting password for email {}: {}", email, e.getMessage(), e);
            return ResponseEntity.internalServerError().body(Map.of(
                    "success", false,
                    "message", "Error resetting password: " + e.getMessage()
            ));
        }
    }

}