package com.example.learnovate.dto;

import lombok.Data;

@Data
public class EsewaInitiationDto {
    private String transactionUuid;
    private String amount;
    private String signature;
    private int bookingId;
    private int userId;
    private int mentorId;
}
