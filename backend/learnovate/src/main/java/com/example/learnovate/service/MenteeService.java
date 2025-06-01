package com.example.learnovate.service;

import com.example.learnovate.dto.MenteeDto;
import com.example.learnovate.model.Mentee;

import java.util.Map;

public interface MenteeService {
    Map<String, Object> saveProfile(MenteeDto menteeDto);
}
