package com.example.learnovate.service;

import com.example.learnovate.dto.MentorAvailabilityDto;
import com.example.learnovate.dto.MentorDTO;
import com.example.learnovate.model.Mentor;

import java.util.Map;

public interface MentorService {
    Map<String, Object> saveProfile(MentorDTO mentorDTO);

    Map<String, Object> saveAvailability(MentorAvailabilityDto availabilityDto);

    Mentor getMentorByUserId(int id);



}
