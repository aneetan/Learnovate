package com.example.learnovate.repository;

import com.example.learnovate.model.Notifications;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationsRepository extends JpaRepository<Notifications, Integer> {
    List<Notifications> findByRecipientEmailAndIsReadFalse(String email);
    List<Notifications> findByRecipientEmailOrderByCreatedAtDesc(String email);
    Long countByRecipientEmailAndIsReadFalse(String email);
}
