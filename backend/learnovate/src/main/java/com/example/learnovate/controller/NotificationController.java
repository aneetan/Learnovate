package com.example.learnovate.controller;

import com.example.learnovate.dto.NotificationsDto;
import com.example.learnovate.model.Notifications;
import com.example.learnovate.service.NotificationsService;
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

    @Autowired
    private NotificationsService notificationService;


    private static final String ADMIN_EMAIL = "admin@gmail.com";

    @MessageMapping("/mentor-request")
    public Notifications handleMentorRequest(@Payload NotificationsDto request) {
        if (request.getSender() == null || request.getSender().isEmpty()) {
            throw new IllegalArgumentException("Sender cannot be empty");
        }

        String senderEmail = request.getSender();
        notificationService.sendMentorRequestNotification(
                "admin@gmail.com",
                senderEmail,
                request.getSenderId()
        );

        return new Notifications();
    }

    @MessageMapping("/notifications/mark-as-read")
    public void markAsRead(@Payload int notificationId) {
        notificationService.markAsRead(notificationId);
    }




}
