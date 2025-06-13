package com.example.learnovate.dto;

import lombok.*;

import java.util.List;
import java.util.Map;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MentorDTO {
    private String area;
    private String bio;
    private String documentUrl;
    private String experience;
    private String number;
    private String price;
    private String profileUrl;
    private String title;
    private String skills;

    private int userId;
    private String status;
}
