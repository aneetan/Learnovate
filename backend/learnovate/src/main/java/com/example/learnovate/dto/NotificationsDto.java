package com.example.learnovate.dto;

import lombok.Data;

import java.util.Date;

@Data
public class NotificationsDto {
    private String id;
    private String message;
    private Date timestamp;
    private String type;
}
