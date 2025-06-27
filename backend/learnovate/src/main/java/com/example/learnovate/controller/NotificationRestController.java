package com.example.learnovate.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NotificationRestController {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PostMapping("/api/mentor-request")
    public String triggerMentorRequest(@RequestBody String requestMessage) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        String userName = (String) SecurityContextHolder.getContext().getAuthentication().getDetails(); // Adjust based on JWT
        String notification = "You have a new mentor request from " + userName;

        String adminEmail = "admin@gmail.com";
        messagingTemplate.convertAndSendToUser(adminEmail, "/notifications", notification);

        return "Mentor request sent: " + requestMessage;
    }
}
