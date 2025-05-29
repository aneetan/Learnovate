package com.example.learnovate.service;

import com.example.learnovate.dto.MentorDTO;
import com.example.learnovate.model.Mentor;

public interface MentorService {
    Mentor saveProfile(MentorDTO mentorDTO);

}
