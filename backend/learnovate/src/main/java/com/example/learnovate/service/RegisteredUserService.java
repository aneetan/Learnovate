//package com.example.learnovate.service;
//
//import com.example.learnovate.model.RegisteredUser;
//import com.example.learnovate.repository.RegisteredUserRespository;
//import org.springframework.beans.factory.annotation.Autowired;
////import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//@Service
//public class RegisteredUserService {
//    @Autowired
//    private RegisteredUserRespository regRepo;
//
//    @Transactional
//    public RegisteredUser registerNewUser(RegisteredUser.RegistrationDto registrationDto) {
//        // Validate input
//        validateRegistration(registrationDto);
//
//        // Save user to database
//        return regRepo.save(registrationDto.toEntity());
//    }
//
//    private String validateRegistration(RegisteredUser.RegistrationDto dto) {
//
//        // Check if email already exists
//        if (regRepo.existsByEmail(dto.getEmail())) {
//            return "Email already exists";
//        }
//
//        return "Validation completed";
//    }
//
//}