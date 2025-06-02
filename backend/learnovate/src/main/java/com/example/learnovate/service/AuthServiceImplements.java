package com.example.learnovate.service;

import com.example.learnovate.config.JwtUtil;
import com.example.learnovate.dto.LoginDto;
import com.example.learnovate.dto.RegistrationDto;
import com.example.learnovate.model.RegisteredUser;
import com.example.learnovate.repository.RegisteredUserRespository;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthServiceImplements implements AuthService{
    private final RegisteredUserRespository userRepository;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    Map<String, Object> response = new HashMap<>();



    public AuthServiceImplements(RegisteredUserRespository userRepository, @Lazy AuthenticationManager authenticationManager,
                                 PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public Map<String, Object> registerUser(RegistrationDto registrationDto) {
        //check if email exists
        if (userRepository.existsByEmail(registrationDto.getEmail())) {
            throw new RuntimeException("Email already in use!");
        }

        //hash the password
        String hashedPassword = passwordEncoder.encode(registrationDto.getPassword());
        RegisteredUser registeredUser = registrationDto.toEntity();
        registeredUser.setPassword(hashedPassword);

        //save to database
        RegisteredUser savedUser = userRepository.save(registeredUser);

        response.put("id", savedUser.getUserId());
        response.put("name", savedUser.getName());
        response.put("email", savedUser.getEmail());
        response.put("role", savedUser.getRole());
        response.put("status", HttpStatus.OK);
        response.put("redirectUrl", "/login");

        return response;
    }

    @Override
    public Map<String, Object> loginUser(LoginDto loginDto) {
        String token;
        String adminPw = passwordEncoder.encode("admin@123");
        Map<String, Object> userInfo = new HashMap<>();

        // Admin shortcut
        if ("admin@gmail.com".equalsIgnoreCase(loginDto.getEmail()) &&
                passwordEncoder.matches(loginDto.getPassword(), adminPw)) {
            userInfo.put("id", 0);
            userInfo.put("name", "Admin");
            userInfo.put("email", "admin@gmail.com");
            userInfo.put("role", "ADMIN");

            token = jwtUtil.generateToken("admin@gmail.com", "ADMIN", "Admin", 0);
        } else {
            // Regular user authentication
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

            RegisteredUser user = userRepository.findByEmail(loginDto.getEmail())
                    .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));

            userInfo.put("id", user.getUserId());
            userInfo.put("name", user.getName());
            userInfo.put("email", user.getEmail());
            userInfo.put("role", user.getRole());

            token = jwtUtil.generateToken(user.getEmail(), user.getRole(), user.getName(), user.getUserId());
        }
        Map<String, Object> response = new HashMap<>();
        response.put("user", userInfo);
        response.put("token", token);
        response.put("status", HttpStatus.OK);

        return response;
    }
}
