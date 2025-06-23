package com.example.learnovate.service;

import com.example.learnovate.dto.AuthResponse;
import com.example.learnovate.dto.LoginDto;
import com.example.learnovate.dto.RegistrationDto;
import com.example.learnovate.dto.TokenRequest;
import com.example.learnovate.model.RegisteredUser;
import org.springframework.stereotype.Service;

import java.util.Map;

public interface AuthService {
    Map<String, Object> registerUser(RegistrationDto registrationDto);

    Map<String, Object> loginUser(LoginDto loginDto);

    AuthResponse authenticateGoogle(String id);

    RegisteredUser getUserById(int id);
}
