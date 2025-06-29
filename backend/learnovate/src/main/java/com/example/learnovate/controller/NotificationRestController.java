package com.example.learnovate.controller;

import com.example.learnovate.model.Notifications;
import com.example.learnovate.service.NotificationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationRestController {
    @Autowired
    private NotificationsService notificationService;

    @GetMapping
    public ResponseEntity<List<Notifications>> getUserNotifications(
            @RequestParam String email
    ) {
        return ResponseEntity.ok(notificationService.getUnreadNotifications(email));
    }

    @PostMapping("/{id}/read")
    public ResponseEntity<Void> markNotificationAsRead(
            @PathVariable int id
    ) {
        notificationService.markAsRead(id);
        return ResponseEntity.ok().build();
    }
}
