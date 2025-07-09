package com.example.learnovate.controller;

import com.example.learnovate.model.Mentor;
import com.example.learnovate.service.AdminService;
import com.example.learnovate.service.MentorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AdminController {

    public final AdminService adminService;

    public AdminController(AdminService adminService){
        this.adminService = adminService;
    }


    @GetMapping("/pending")
    public ResponseEntity<List<Mentor>> getPendingMentors() {
        List<Mentor> pendingMentors = adminService.getPendingMentors();
        return ResponseEntity.ok(pendingMentors);
    }

    @PutMapping("/approve/{mentorId}")
    public ResponseEntity<?> approveMentors(@PathVariable int mentorId){
        Mentor mentor = adminService.approveMentor(mentorId);
        return ResponseEntity.ok(mentor);
    }

    @PutMapping("/decline/{mentorId}")
    public ResponseEntity<?> declineMentors(@PathVariable int mentorId){
        Mentor mentor = adminService.declineMentor(mentorId);
        return ResponseEntity.ok(mentor);
    }
}
