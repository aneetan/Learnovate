package com.example.learnovate.controller;

import com.example.learnovate.dto.NotificationsDto;
import com.example.learnovate.model.Notifications;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Date;
import java.util.Random;
import java.util.UUID;

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
