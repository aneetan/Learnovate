package com.example.learnovate.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class UserDto {
    private int userId;
    private String name;
    private String role;
}
