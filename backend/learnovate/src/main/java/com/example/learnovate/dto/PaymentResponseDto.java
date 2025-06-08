package com.example.learnovate.dto;

import lombok.Data;

@Data
public class PaymentResponseDto {
    private String paymentUrl;
    private String message;
    private boolean success;
}
