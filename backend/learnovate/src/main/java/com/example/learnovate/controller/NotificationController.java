package com.example.learnovate.controller;

import com.example.learnovate.dto.NotificationsDto;
import com.example.learnovate.model.Notifications;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.Date;

@Controller
public class NotificationController {

    @MessageMapping("/notify-test")
    @SendTo("/topic/test-notifications")
    public NotificationsDto testNotification(@Payload NotificationsDto notification) {
        return notification;
    }
}
