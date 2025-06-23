package com.example.learnovate.dto;

import lombok.Data;

import java.util.Date;

@Data
public class NotificationsDto {
    private String id;
    private String type; // e.g., "SYSTEM", "MESSAGE", "ALERT"
    private String title;
    private String message;
    private String recipientUsername; // For targeted notifications
    private Date timestamp = new Date();
    private boolean read = false;
    private Object payload;
}
