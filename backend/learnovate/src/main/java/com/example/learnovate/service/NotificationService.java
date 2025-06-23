package com.example.learnovate.service;

import com.example.learnovate.dto.NotificationsDto;
import com.example.learnovate.model.Notifications;
import org.aspectj.weaver.ast.Not;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public void sendGlobalNotification(String title, String message) {
        NotificationsDto notification = new NotificationsDto();
        notification.setTitle(title);
        notification.setMessage(message);
        messagingTemplate.convertAndSend("/topic/global-notifications", notification);
    }

    public void sendPrivateNotification(String username, String title, String message) {
        NotificationsDto notification = new NotificationsDto();
        notification.setTitle(title);
        notification.setMessage(message);
        messagingTemplate.convertAndSendToUser(
                username,
                "/queue/notifications",
                notification
        );
    }

    public void sendTestNotification() {
        NotificationsDto notification = new NotificationsDto();
        notification.setTitle("Test Notification");
        notification.setMessage("This is a test notification from the server");
        messagingTemplate.convertAndSend("/topic/test-notifications", notification);
    }
}
