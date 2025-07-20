package com.example.learnovate.dto;

import lombok.Data;

@Data
public class FeedbackDto {
    private String name;
    private String email;
    private int rating;
    private String category;
    private String message;
}
