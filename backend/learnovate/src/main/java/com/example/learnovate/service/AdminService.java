package com.example.learnovate.service;

import com.example.learnovate.classfile.AuthenticateEmail;
import com.example.learnovate.exception.UnauthorizedAccessException;
import com.example.learnovate.model.Mentor;
import com.example.learnovate.repository.MentorAvailabilityRepository;
import com.example.learnovate.repository.MentorBookingsRepository;
import com.example.learnovate.repository.MentorRepository;
import com.example.learnovate.repository.RegisteredUserRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {
    @Autowired
    private MentorRepository mRepo;

    @Autowired
    private MentorAvailabilityRepository availableRepo;

    @Autowired
    private RegisteredUserRespository rRepo;

    @Autowired
    private MentorBookingsRepository bookingRepo;

    AuthenticateEmail authenticateEmail = new AuthenticateEmail();

    public void authenticateAdmin(){
        String authenticatedEmail = authenticateEmail.getAuthenticatedUserEmail();
        if (!authenticatedEmail.equals("admin@gmail.com")) {
            throw new UnauthorizedAccessException("Email in request does not match authenticated user");
        }
    }

    public List<Mentor> getPendingMentors() {
        authenticateAdmin();
        return mRepo.findByStatus("pending");
    }

    public Mentor approveMentor(int mentorId){
        authenticateAdmin();
        Mentor mentor = mRepo.findById(mentorId)
                .orElseThrow(() -> new RuntimeException("Mentor not found with id: " + mentorId));
        mentor.setStatus("approved");
        mRepo.save(mentor);
        return mentor;
    }

    public Mentor declineMentor(int mentorId){
        authenticateAdmin();
        Mentor mentor = mRepo.findById(mentorId)
                .orElseThrow(() -> new RuntimeException("Mentor not found with id: " + mentorId));
        mentor.setStatus("declined");
        mRepo.save(mentor);
        return mentor;
    }
}
