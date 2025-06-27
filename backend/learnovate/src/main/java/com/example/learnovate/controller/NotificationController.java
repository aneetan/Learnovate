package com.example.learnovate.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.HashMap;
import java.util.Map;

@Controller
public class NotificationController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    private static final String ADMIN_EMAIL = "admin@gmail.com";

    @MessageMapping("/mentor-request")
    public void handleMentorRequest(@Payload MentorRequest request) {
        if (request.getSender() == null || request.getSender().isEmpty()) {
            throw new IllegalArgumentException("Sender cannot be empty");
        }

        Map<String, String> notification = new HashMap<>();
        notification.put("message", "You have a new mentor request from " + request.getSender());
        notification.put("timestamp", java.time.Instant.now().toString());
        messagingTemplate.convertAndSendToUser(ADMIN_EMAIL, "/queue/notifications", notification);
    }

    public static class MentorRequest {
        private String sender;
        private String type;

        // getters and setters
        public String getSender() { return sender; }
        public void setSender(String sender) { this.sender = sender; }
        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
    }


}
