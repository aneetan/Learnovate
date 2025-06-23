package com.example.learnovate.dto;

import lombok.Data;

@Data
public class EsewaVerificationDto {
    private String transactionUuid;
    private double amount;
    private String status;
    private String signature;
    private String referenceId;
}
