package com.example.learnovate.controller;

import com.example.learnovate.config.JwtUtil;
import com.example.learnovate.dto.LoginDto;
import com.example.learnovate.dto.RegistrationDto;
import com.example.learnovate.model.RegisteredUser;
import com.example.learnovate.repository.RegisteredUserRespository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {
    @Autowired
    private RegisteredUserRespository rRepo;

    @Autowired
    private AuthenticationManager authenticationManager;
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> registerUser(@RequestBody RegistrationDto registrationDto) {
        try {

            if (rRepo.existsByEmail(registrationDto.getEmail())) {
                return ResponseEntity
                        .status(HttpStatus.CONFLICT)
                        .body(Map.of("error", "Email already in use!"));
            }

            String hashedPassword = passwordEncoder.encode(registrationDto.getPassword());

            RegisteredUser registeredUser = registrationDto.toEntity();
            registeredUser.setPassword(hashedPassword);

            rRepo.save(registeredUser);

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

    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> login(@RequestBody LoginDto login) {
        Map<String, Object> userInfo = new HashMap<>();
        String token;
        String adminPw = passwordEncoder.encode("admin@123");

        try {
            // Admin shortcut
            if ("admin@gmail.com".equalsIgnoreCase(login.getEmail()) && passwordEncoder.matches(login.getPassword(), adminPw)) {
                userInfo.put("id", 0);
                userInfo.put("name", "Admin");
                userInfo.put("email", "admin@gmail.com");
                userInfo.put("role", "ADMIN");

                token = jwtUtil.generateToken("admin@gmail.com", "ADMIN", "Admin", 0);
            } else {
                // Regular user authentication
                Authentication authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(login.getEmail(), login.getPassword())
                );
                SecurityContextHolder.getContext().setAuthentication(authentication);

                RegisteredUser user = rRepo.findByEmail(login.getEmail()).orElseThrow();

                userInfo.put("id", user.getId());
                userInfo.put("name", user.getName());
                userInfo.put("email", user.getEmail());
                userInfo.put("role", user.getRole());

                token = jwtUtil.generateToken(user.getEmail(), user.getRole(), user.getName(), user.getId());
            }

            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("user", userInfo);
            responseBody.put("token", token);
            responseBody.put("message", "Login successful");

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(responseBody);

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid email or password"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "An unexpected error occurred"));
        }
    }


    @Data
    private static class ErrorResponse {
        public String error;
        public ErrorResponse(String error) {
            this.error = error;
        }
    }

}