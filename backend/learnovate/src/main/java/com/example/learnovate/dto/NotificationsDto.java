package com.example.learnovate.dto;

import lombok.Data;

import java.util.Date;

@Data
public class NotificationsDto {
    private int senderId;
    private String sender;
    private String senderName;
    private String message;
    private Date timestamp;
    private String type;
    private String isRead;
}
