package com.example.learnovate.service;

import com.example.learnovate.dto.MenteeDto;
import com.example.learnovate.dto.MentorBookingsDto;
import com.example.learnovate.model.*;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Map;

public interface MenteeService {
    Map<String, Object> saveProfile(MenteeDto menteeDto);

    Map<String, Object> saveBookingRequest(MentorBookingsDto mentorBookingsDto, @PathVariable int id);

    MentorAvailability getAvailability(@PathVariable int id);

    List<MentorBookings> getAllBookingsForMentor(@PathVariable int id);

    MentorBookings  updatePaymentForBookings(int id);


}
