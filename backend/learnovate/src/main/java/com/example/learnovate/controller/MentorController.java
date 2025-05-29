package com.example.learnovate.controller;

import com.example.learnovate.dto.MentorDTO;
import com.example.learnovate.model.Mentor;
import com.example.learnovate.model.RegisteredUser;
import com.example.learnovate.repository.MentorRepository;
import com.example.learnovate.service.MentorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mentor")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class MentorController {

    @Autowired
    public final MentorService mentorService;

    public MentorController(MentorService mentorService){
        this.mentorService = mentorService;
    }

    @PostMapping(value = "/register")
    public Mentor saveProfile(@RequestBody MentorDTO mentorDTO) {
        Mentor response = mentorService.saveProfile(mentorDTO);
        return response;
    }
}
