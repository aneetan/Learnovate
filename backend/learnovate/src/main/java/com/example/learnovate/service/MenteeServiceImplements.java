package com.example.learnovate.service;

import com.example.learnovate.classfile.AuthenticateEmail;
import com.example.learnovate.dto.MenteeDto;
import com.example.learnovate.dto.MentorBookingsDto;
import com.example.learnovate.exception.UnauthorizedAccessException;
import com.example.learnovate.model.*;
import com.example.learnovate.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class MenteeServiceImplements implements MenteeService{
    @Autowired
    private MenteeRepository menteeRepository;

    @Autowired
    private RegisteredUserRespository uRepo;

    @Autowired
    private MentorRepository mRepo;

    @Autowired
    private MentorBookingsRepository bookingRepo;

    @Autowired
    private MentorAvailabilityRepository availableRepo;

    Map<String, Object> response = new HashMap<>();

    AuthenticateEmail authenticateEmail = new AuthenticateEmail();
    String authenticatedEmail = authenticateEmail.getAuthenticatedUserEmail();

    @Override
    public Map<String, Object> saveProfile(MenteeDto menteeDto) {

        // Validate email matches
        if (!authenticatedEmail.equals(menteeDto.getUser().getEmail())) {
            throw new UnauthorizedAccessException("Email in request does not match authenticated user");
        }

        Mentee mentee = new Mentee();
        mentee.setArea(menteeDto.getArea());
        mentee.setPhone(menteeDto.getPhone());
        mentee.setProfileUrl(menteeDto.getProfileUrl());
        mentee.setCurrentStatus(menteeDto.getCurrentStatus());

        RegisteredUser user = new RegisteredUser();
        user.setUserId(Integer.valueOf(menteeDto.getUser().getUserId()));
        user.setName(menteeDto.getUser().getName());
        user.setEmail(menteeDto.getUser().getEmail());
        user.setRole(menteeDto.getUser().getRole());

        mentee.setUser(user);

        response.put("mentee", mentee);
        response.put("status", HttpStatus.OK.value());

        return response;
    }

    @Override
    public Map<String, Object> saveBookingRequest(MentorBookingsDto mentorBookingsDto,
                                                  @PathVariable int id) {
        RegisteredUser user = uRepo.findById(mentorBookingsDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " +  mentorBookingsDto.getUserId()));

        Mentor mentor = mRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Mentor not found with id: " + id));

        // Validate email matches
        if (!authenticatedEmail.equals(user.getEmail())) {
            throw new UnauthorizedAccessException("Email in request does not match authenticated user");
        }

        MentorBookings bookings = new MentorBookings();
        bookings.setBookingDate(mentorBookingsDto.getBookingDate());
        bookings.setTimeSlot(mentorBookingsDto.getTimeSlot());
        bookings.setTopic(mentorBookingsDto.getTopic());
        bookings.setNotes(mentorBookingsDto.getNotes());
        bookings.setPaymentStatus(mentorBookingsDto.getPaymentStatus());
        bookings.setUser(user);
        bookings.setMentor(mentor);

        bookingRepo.save(bookings);
//        response.put("booking", bookings);
        response.put("status", HttpStatus.OK.value());
        response.put("message", "User booking requested");

        return response;
    }

    @Override
    public MentorAvailability getAvailability(int id) {

        RegisteredUser user = uRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        if (!authenticatedEmail.equals(user.getEmail())) {
            throw new UnauthorizedAccessException("Email in request does not match authenticated user");
        }

        MentorAvailability mentorAvailability = availableRepo.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Mentor not found with id: " + id));

        return mentorAvailability;
    }

    @Override
    public MentorBookings getBookingDetails(int id) {
        Mentor mentor = mRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Mentor not found with id: " + id));

        if (!authenticatedEmail.equals(mentor.getUser().getEmail())) {
            throw new UnauthorizedAccessException("Email in request does not match authenticated user");
        }

        MentorBookings bookings = bookingRepo.findByMentor(mentor)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));

        return bookings;
    }
}
