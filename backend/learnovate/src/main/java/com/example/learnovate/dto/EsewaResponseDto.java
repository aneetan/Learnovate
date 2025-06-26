package com.example.learnovate.dto;

import com.example.learnovate.model.PaymentDetails;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EsewaResponseDto {
    private int paymentId;
    private String transactionUuid;
    private String status;

    public EsewaResponseDto(PaymentDetails payment) {
        this.paymentId = payment.getPayment_id();
        this.transactionUuid = payment.getTransactionUuid();
        this.status = payment.getStatus();
    }

}
