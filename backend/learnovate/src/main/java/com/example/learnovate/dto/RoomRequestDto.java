package com.example.learnovate.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RoomRequestDto {
    private int senderId;
    private int receiverId;
}
