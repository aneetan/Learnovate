package com.example.learnovate.dto;

import lombok.*;


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
