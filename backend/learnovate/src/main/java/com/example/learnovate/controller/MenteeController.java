package com.example.learnovate.controller;

import com.example.learnovate.dto.MenteeDto;
import com.example.learnovate.dto.MentorDTO;
import com.example.learnovate.model.Mentee;
import com.example.learnovate.model.Mentor;
import com.example.learnovate.model.RegisteredUser;
import com.example.learnovate.repository.MenteeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/mentee")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class MenteeController {

    @Autowired
    private MenteeRepository menteeRepo;

    @PostMapping(value = "/register")
//    @PreAuthorize("hasRole('MENTEE')")
    public Mentee saveProfile(@RequestBody MenteeDto menteeDTO) {
        Mentee mentee = new Mentee();

        mentee.setArea(menteeDTO.getArea());
        mentee.setPhone(menteeDTO.getPhone());
        mentee.setProfileUrl(menteeDTO.getProfileUrl());
        mentee.setCurrentStatus(menteeDTO.getCurrentStatus());

        RegisteredUser user = new RegisteredUser();
        user.setId(Integer.valueOf(menteeDTO.getUser().getId()));
        user.setName(menteeDTO.getUser().getName());
        user.setEmail(menteeDTO.getUser().getEmail());
        user.setRole(menteeDTO.getUser().getRole());

        mentee.setUser(user);
        return menteeRepo.save(mentee);
    }
}
