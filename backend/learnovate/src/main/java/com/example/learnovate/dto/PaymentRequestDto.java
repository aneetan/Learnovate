package com.example.learnovate.dto;

import lombok.Data;

@Data
public class PaymentRequestDto {
    private double amount;
    private String productName;
    private String transactionUuid;
    private String productId;
    private String callbackUrl;
    private int userId;
}
