package com.example.learnovate.controller;

import com.example.learnovate.model.Mentor;
import com.example.learnovate.service.AdminService;
import com.example.learnovate.service.MentorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
