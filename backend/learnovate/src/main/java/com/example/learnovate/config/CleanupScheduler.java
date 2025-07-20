package com.example.learnovate.config;

import com.example.learnovate.service.ForgotPasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class CleanupScheduler {
    @Autowired
    private ForgotPasswordService forgotPasswordService;

    // Run every 10 minutes
    @Scheduled(fixedRate = 2 * 60 * 1000)
    public void cleanupExpiredRecords() {
        forgotPasswordService.cleanupExpiredOtps();
    }
}
