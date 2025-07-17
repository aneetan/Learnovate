package com.example.learnovate.service;

import com.example.learnovate.dto.MentorAvailabilityDto;
import com.example.learnovate.dto.MentorDTO;
import com.example.learnovate.model.Mentor;
import com.example.learnovate.model.MentorAvailability;
import com.example.learnovate.model.MentorBookings;
import com.example.learnovate.model.PaymentDetails;

import java.util.List;
import java.util.Map;

public interface MentorService {
    Map<String, Object> saveProfile(MentorDTO mentorDTO);

    Map<String, Object> saveAvailability(MentorAvailabilityDto availabilityDto);

    Mentor getMentorByUserId(int id);

    List<MentorBookings> getSessionsByMentorId(int mentorId);

    List<Mentor> getPendingMentors();

    MentorAvailability getAvailabilityByUserId(int userId);

    List<PaymentDetails> findPaymentByMentor(int userId);




}
