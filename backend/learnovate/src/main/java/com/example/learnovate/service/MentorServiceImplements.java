package com.example.learnovate.service;

import com.example.learnovate.classfile.AuthenticateEmail;
import com.example.learnovate.dto.MentorAvailabilityDto;
import com.example.learnovate.dto.MentorDTO;
import com.example.learnovate.exception.UnauthorizedAccessException;
import com.example.learnovate.model.Mentor;
import com.example.learnovate.model.MentorAvailability;
import com.example.learnovate.model.RegisteredUser;
import com.example.learnovate.repository.MentorAvailabilityRepository;
import com.example.learnovate.repository.MentorRepository;
import com.example.learnovate.repository.RegisteredUserRespository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.*;

@Service
public class MentorServiceImplements implements MentorService{

    @Autowired
    private MentorRepository mRepo;

    @Autowired
    private MentorAvailabilityRepository availableRepo;

    @Autowired
    private RegisteredUserRespository rRepo;


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

        mentor.setUser(user);

        mentor.setStatus("pending");

        mRepo.save(mentor);

        response.put("mentor", mentor);
        response.put("status", HttpStatus.OK);

        return  response;

    }

    @Override
    public Map<String, Object> saveAvailability(MentorAvailabilityDto availabilityDto) {
        RegisteredUser user = rRepo.findById(availabilityDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + availabilityDto.getUserId()));

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

        availableRepo.save(availability);

        response.put("availability", availability);
        response.put("status", HttpStatus.OK);

        return  response;
    }




}
