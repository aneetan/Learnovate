package com.example.learnovate.service;

import com.example.learnovate.classfile.AuthenticateEmail;
import com.example.learnovate.dto.MenteeDto;
import com.example.learnovate.dto.MentorBookingsDto;
import com.example.learnovate.exception.UnauthorizedAccessException;
import com.example.learnovate.model.*;
import com.example.learnovate.repository.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @Override
    public Map<String, Object> saveProfile(MenteeDto menteeDto) {
        String authenticatedEmail = authenticateEmail.getAuthenticatedUserEmail();

        RegisteredUser user = uRepo.findById(menteeDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + menteeDto.getUserId()));

        // Validate email matches
        if (!authenticatedEmail.equals(user.getEmail())) {
            throw new UnauthorizedAccessException("Email in request does not match authenticated user");
        }

        Mentee mentee = new Mentee();
        mentee.setArea(menteeDto.getArea());
        mentee.setPhone(menteeDto.getPhone());
        mentee.setProfileUrl(menteeDto.getProfileUrl());
        mentee.setCurrentStatus(menteeDto.getCurrentStatus());

        user.setDetailsFilled(true);
        uRepo.save(user);

        mentee.setUser(user);
        menteeRepository.save(mentee);
        response.put("mentee", mentee);
        response.put("status", HttpStatus.OK.value());

        return response;
    }

    @Override
    public Map<String, Object> saveBookingRequest(MentorBookingsDto mentorBookingsDto,
                                                  @PathVariable int id) {
        String authenticatedEmail = authenticateEmail.getAuthenticatedUserEmail();
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
        bookings.setStatus(mentorBookingsDto.getStatus());
        bookings.setUser(user);
        bookings.setMentor(mentor);

        bookingRepo.save(bookings);
        response.put("bookingId", bookings.getBookingId());
        response.put("status", HttpStatus.OK.value());
        response.put("message", "User booking requested");

        return response;
    }

    @Override
    public MentorAvailability getAvailability(int id) {
        String authenticatedEmail = authenticateEmail.getAuthenticatedUserEmail();

        Mentor mentor = mRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Mentor not found with id: " + id));

        RegisteredUser user = mentor.getUser();

//        if (!authenticatedEmail.equals(user.getEmail())) {
//            throw new UnauthorizedAccessException("Email in request does not match authenticated user");
//        }

        MentorAvailability mentorAvailability = availableRepo.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Mentor not found with id: " + id));

        return mentorAvailability;
    }

    @Override
    public List<Mentor> getAllMentors() {
        return mRepo.findAllMentorsWithUserDetails();

    }

    @Override
    public Mentor getMentorById(int id) {
//        String authenticatedEmail = authenticateEmail.getAuthenticatedUserEmail();

        Mentor mentor = mRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Mentor not found with id: " + id));

//        if (!authenticatedEmail.equals(mentor.getUser().getEmail())) {
//            throw new UnauthorizedAccessException("Email in request does not match authenticated user");
//        }

        return mentor;
    }

    @Override
    public List<MentorBookings> getAllBookingsForMentor(int id) {
        String authenticatedEmail = authenticateEmail.getAuthenticatedUserEmail();
        Mentor mentor = mRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Mentor not found with id: " + id));
        System.out.println(mentor);

//        if (!authenticatedEmail.equals(mentor.getUser().getEmail())) {
//            throw new UnauthorizedAccessException("Email in request does not match authenticated user");
//        }

        List<MentorBookings> bookings = bookingRepo.findByMentor(mentor);

        if (bookings.isEmpty()) {
            throw new RuntimeException("No bookings found for mentor with id: " + id);
        }

        return bookings;
    }

    @Override
    public MentorBookings updatePaymentForBookings(int bookingId) {
        MentorBookings bookings = bookingRepo.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        bookings.setPaymentStatus("PAID");

        bookingRepo.save(bookings);
        return bookings;
    }

    public Mentee getMenteeByUserId(int id){
        Mentee mentee = menteeRepository.getMenteeByUser_UserId(id);
        return mentee;
    }

    @Override
    public List<MentorBookings> getSessionsByUser(int userId) {
        RegisteredUser user = uRepo.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        List<MentorBookings> sessions = bookingRepo.findByUser(user);
        return sessions;
    }

}
