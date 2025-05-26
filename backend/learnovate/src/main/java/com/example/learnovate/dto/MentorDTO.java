package com.example.learnovate.dto;

import lombok.*;

import java.util.Map;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MentorDTO {
    private Map<String, String> additionalInfo;
    private Map<String, String> professionalInfo;
    private Map<String, String> documentUpload;
    private RegistrationDto User;
    private String status;
}
