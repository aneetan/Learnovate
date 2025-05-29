package com.example.learnovate.service;

import com.example.learnovate.dto.MenteeDto;
import com.example.learnovate.model.Mentee;

public interface MenteeService {
    Mentee saveProfile(MenteeDto menteeDto);
}
