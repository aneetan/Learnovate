package com.example.learnovate.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RoomResponseDto {
    private Integer id;
    private UserDto partner;
    private String lastMessage;
    private String lastMessageTime;
}
