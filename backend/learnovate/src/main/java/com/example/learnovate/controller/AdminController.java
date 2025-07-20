package com.example.learnovate.controller;

import com.example.learnovate.model.Feedback;
import com.example.learnovate.model.Mentee;
import com.example.learnovate.model.Mentor;
import com.example.learnovate.model.MentorBookings;
import com.example.learnovate.service.AdminService;
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

    @GetMapping("/getTotalUsers")
    public ResponseEntity<?> getTotalUsers(){
        int totalUserCount = adminService.getTotalUserCount();
        return ResponseEntity.ok(totalUserCount);
    }

    @GetMapping("/getTotalMentors")
    public ResponseEntity<?> getTotalMentors(){
        int totalMentorCount = adminService.getTotalMentorCount();
        return ResponseEntity.ok(totalMentorCount);
    }

    @GetMapping("/getTotalTransaction")
    public ResponseEntity<?> getTotalTransaction(){
        double totalAmountCount = adminService.getTotalTransactionAmount();
        return ResponseEntity.ok(totalAmountCount);
    }

    @GetMapping("/getAllMentors")
    public ResponseEntity<List<Mentor>> getAllMentors() {
        List<Mentor> pendingMentors = adminService.getAllMentors();
        return ResponseEntity.ok(pendingMentors);
    }

    @GetMapping("/getAllMentee")
    public ResponseEntity<List<Mentee>> getAllMentee() {
        List<Mentee> pendingMentors = adminService.getAllMentee();
        return ResponseEntity.ok(pendingMentors);
    }

    @GetMapping("/getAllBookings")
    public ResponseEntity<List<MentorBookings>> getAllBookings() {
        List<MentorBookings> pendingMentors = adminService.getAllBookings();
        return ResponseEntity.ok(pendingMentors);
    }

    @GetMapping("/getAllFeedback")
    public ResponseEntity<List<Feedback>> getAllFeedback() {
        List<Feedback> feedback = adminService.getAllFeedback();
        return ResponseEntity.ok(feedback);
    }

    @GetMapping("/mentors/{mentorId}")
    public ResponseEntity<?> getMentorById(@PathVariable int mentorId) {
        Mentor mentor = adminService.getMentorById(mentorId);
        return ResponseEntity.ok(mentor);
    }
}
