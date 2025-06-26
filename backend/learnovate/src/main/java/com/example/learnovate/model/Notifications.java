package com.example.learnovate.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Notifications {
    private int id;
    private String title;
    private String message;
    private Date timestamp;
    private boolean read;
}
