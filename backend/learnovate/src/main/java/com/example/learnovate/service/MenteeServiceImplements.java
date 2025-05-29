package com.example.learnovate.service;

import com.example.learnovate.dto.MenteeDto;
import com.example.learnovate.exception.UnauthorizedAccessException;
import com.example.learnovate.model.Mentee;
import com.example.learnovate.model.RegisteredUser;
import com.example.learnovate.repository.MenteeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class MenteeServiceImplements implements MenteeService{
    @Autowired
    private MenteeRepository menteeRepository;
    @Override
    public Mentee saveProfile(MenteeDto menteeDto) {
        String authenticatedEmail = getAuthenticatedUserEmail();

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
        user.setId(Integer.valueOf(menteeDto.getUser().getId()));
        user.setName(menteeDto.getUser().getName());
        user.setEmail(menteeDto.getUser().getEmail());
        user.setRole(menteeDto.getUser().getRole());

        mentee.setUser(user);
        return menteeRepository.save(mentee);
    }

    private String getAuthenticatedUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new AuthenticationCredentialsNotFoundException("No authentication found");
        }

        // The principal should be your UserDetails implementation
        Object principal = authentication.getPrincipal();

        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername(); // or getEmail() if available
        } else if (principal instanceof String) {
            return (String) principal; // if JWT subject is the email
        }

        throw new AuthenticationServiceException("Unable to extract email from authentication");
    }
}
