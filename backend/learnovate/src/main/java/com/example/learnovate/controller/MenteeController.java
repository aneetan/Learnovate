package com.example.learnovate.controller;

import com.example.learnovate.dto.MenteeDto;
import com.example.learnovate.dto.MentorDTO;
import com.example.learnovate.exception.UnauthorizedAccessException;
import com.example.learnovate.model.Mentee;
import com.example.learnovate.model.Mentor;
import com.example.learnovate.model.RegisteredUser;
import com.example.learnovate.repository.MenteeRepository;
import com.example.learnovate.service.MenteeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/mentee")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class MenteeController {

    @Autowired
    private final MenteeService menteeService;

    public MenteeController(MenteeService menteeService){
        this.menteeService = menteeService;
    }

    @PostMapping(value = "/register")
    public ResponseEntity<?> saveProfile(@RequestBody MenteeDto menteeDTO) {
        try {
            Map<String, Object> response = menteeService.saveProfile(menteeDTO);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(response);
        } catch (UnauthorizedAccessException e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("You are unauthorized to access the system");
        }
    }
}
