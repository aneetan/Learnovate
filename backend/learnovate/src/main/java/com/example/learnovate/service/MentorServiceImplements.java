package com.example.learnovate.service;

import com.example.learnovate.classfile.AuthenticateEmail;
import com.example.learnovate.dto.MentorAvailabilityDto;
import com.example.learnovate.dto.MentorDTO;
import com.example.learnovate.exception.UnauthorizedAccessException;
import com.example.learnovate.model.*;
import com.example.learnovate.repository.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MentorServiceImplements implements MentorService{

    @Autowired
    private MentorRepository mRepo;

    @Autowired
    private MentorAvailabilityRepository availableRepo;

    @Autowired
    private RegisteredUserRespository rRepo;

    @Autowired
    private MentorBookingsRepository bookingRepo;

    @Autowired
    private PaymentDetailsRepository pRepo;


    Map<String, Object> response = new HashMap<>();
    //set the data for profile
    @Override
    public Map<String, Object> saveProfile(MentorDTO mentorDTO) {
        AuthenticateEmail authenticateEmail = new AuthenticateEmail();
        String authenticatedEmail = authenticateEmail.getAuthenticatedUserEmail();
        RegisteredUser user = rRepo.findById(mentorDTO.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        // Validate email matches
        if (!authenticatedEmail.equals(user.getEmail())) {
            throw new UnauthorizedAccessException("Email in request does not match authenticated user");
        }

        Mentor mentor = new Mentor();
        mentor.setBio(mentorDTO.getBio());
        mentor.setPhoneNumber(mentorDTO.getNumber());
        mentor.setPrice(mentorDTO.getPrice());

        mentor.setArea(mentorDTO.getArea());
        mentor.setTitle(mentorDTO.getTitle());
        mentor.setExperience(mentorDTO.getExperience());
        String skillsJson = mentorDTO.getSkills();
        List<String> skills = Arrays.asList(skillsJson
                .replace("[", "")
                .replace("]", "")
                .split(",\\s*"));
        mentor.setSkills(skills);

        mentor.setProfileUrl(mentorDTO.getProfileUrl());
        mentor.setDocumentUrl(mentorDTO.getDocumentUrl());

        user.setDetailsFilled(true);

        mentor.setUser(user);

        mentor.setStatus("pending");
        mentor.setAvailability(false);

        rRepo.save(user);
        mRepo.save(mentor);

        response.put("mentor", mentor);
        response.put("status", HttpStatus.OK);

        return  response;

    }

    @Override
    public Map<String, Object> saveAvailability(MentorAvailabilityDto availabilityDto) {
        RegisteredUser user = rRepo.findById(availabilityDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + availabilityDto.getUserId()));

        Mentor mentor = mRepo.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Mentor not found with id: " + user.getUserId()));


        AuthenticateEmail authenticateEmail = new AuthenticateEmail();
        String authenticatedEmail = authenticateEmail.getAuthenticatedUserEmail();

        // Validate email matches
        if (!authenticatedEmail.equals(user.getEmail())) {
            throw new UnauthorizedAccessException("Email in request does not match authenticated user");
        }

        MentorAvailability availability = availableRepo.findByUser(user)
                .orElse(new MentorAvailability());

        availability.setStartTime(availabilityDto.getStartTime());
        availability.setEndTime(availabilityDto.getEndTime());
        availability.setDays(availabilityDto.getDays());
        availability.setUser(user);

        mentor.setAvailability(true);
        mRepo.save(mentor);
        availableRepo.save(availability);

        response.put("availability", availability);
        response.put("status", HttpStatus.OK);

        return  response;
    }

    public Mentor getMentorByUserId(int id){
        Mentor mentor = mRepo.getMentorByUser_UserId(id);
        return mentor;
    }


    public List<Mentor> getPendingMentors() {
        return mRepo.findByStatus("pending");
    }

    @Override
    public MentorAvailability getAvailabilityByUserId(int userId) {
        RegisteredUser user = rRepo.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        MentorAvailability availability = availableRepo.findByUser(user)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        return availability;
    }

    @Override
    public List<PaymentDetails> findPaymentByMentor(int userId) {
        Mentor mentor = mRepo.getMentorByUser_UserId(userId);
        List<PaymentDetails> payment = pRepo.findByMentor(mentor);
        return  payment;
    }

    public List<MentorBookings> getSessionsByMentorId(int userId){
        RegisteredUser user = rRepo.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Mentor mentor = mRepo.findByUser(user)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        List<MentorBookings> sessions = bookingRepo.findByMentor(mentor);
        return  sessions;
    }




}
