package com.example.learnovate.service;

import com.example.learnovate.classfile.AuthenticateEmail;
import com.example.learnovate.dto.MenteeDto;
import com.example.learnovate.exception.UnauthorizedAccessException;
import com.example.learnovate.model.Mentee;
import com.example.learnovate.model.RegisteredUser;
import com.example.learnovate.repository.MenteeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class MenteeServiceImplements implements MenteeService{
    @Autowired
    private MenteeRepository menteeRepository;
    Map<String, Object> response = new HashMap<>();

    @Override
    public Map<String, Object> saveProfile(MenteeDto menteeDto) {
        AuthenticateEmail authenticateEmail = new AuthenticateEmail();
        String authenticatedEmail = authenticateEmail.getAuthenticatedUserEmail();

        // Validate email matches
        if (!authenticatedEmail.equals(menteeDto.getUser().getEmail())) {
            throw new UnauthorizedAccessException("Email in request does not match authenticated user");
        }

        Mentee mentee = new Mentee();

        mentee.setArea(menteeDto.getArea());
        mentee.setPhone(menteeDto.getPhone());
        mentee.setProfileUrl(menteeDto.getProfileUrl());
        mentee.setCurrentStatus(menteeDto.getCurrentStatus());

        RegisteredUser user = new RegisteredUser();
        user.setUserId(Integer.valueOf(menteeDto.getUser().getUserId()));
        user.setName(menteeDto.getUser().getName());
        user.setEmail(menteeDto.getUser().getEmail());
        user.setRole(menteeDto.getUser().getRole());

        mentee.setUser(user);

        response.put("mentee", mentee);
        response.put("status", HttpStatus.OK);

        return response;
    }
}
