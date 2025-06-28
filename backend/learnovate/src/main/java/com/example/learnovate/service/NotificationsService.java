package com.example.learnovate.service;

import com.example.learnovate.model.Mentor;
import com.example.learnovate.model.NotificationType;
import com.example.learnovate.model.Notifications;
import com.example.learnovate.model.RegisteredUser;
import com.example.learnovate.repository.MentorRepository;
import com.example.learnovate.repository.NotificationsRepository;
import com.example.learnovate.repository.RegisteredUserRespository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationsService {

    @Autowired
    private NotificationsRepository notificationsRepo;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private MentorRepository mRepo;

    @Autowired
    private RegisteredUserRespository uRepo;
    public void sendMentorRequestNotification(String recipientEmail, String senderEmail, int senderId) {
        RegisteredUser user = uRepo.findById(senderId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Notifications notification = new Notifications();
        notification.setRecipientEmail(recipientEmail);
        notification.setSenderEmail(senderEmail);
        notification.setUser(user);
        notification.setType(NotificationType.MENTOR_REQUEST);
        notification.setMessage("You have a new mentor request from " + senderEmail);

        notificationsRepo.save(notification);

        // Send to specific user
        messagingTemplate.convertAndSendToUser(
                recipientEmail,
                "/queue/notifications",
                notification
        );
    }

    public void markAsRead(int notificationId) {
        notificationsRepo.findById(notificationId).ifPresent(notification -> {
            notification.setRead(true);
            notificationsRepo.save(notification);
        });
    }

    public List<Notifications> getUnreadNotifications(String email) {
        return notificationsRepo.findByRecipientEmailAndIsReadFalse(email);
    }
}
