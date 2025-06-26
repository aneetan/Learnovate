package com.example.learnovate.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessageDto {
    private int roomId;
    private int senderId;
    private int recipientId;
    private String content;
}
