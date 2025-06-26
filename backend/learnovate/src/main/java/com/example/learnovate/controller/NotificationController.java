package com.example.learnovate.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class NotificationController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PostMapping("/api/notify")
    public String triggerNotification(@RequestBody String message) {
        messagingTemplate.convertAndSend("/topic/notifications", message);
        return "Notification sent: " + message;
    }


}
