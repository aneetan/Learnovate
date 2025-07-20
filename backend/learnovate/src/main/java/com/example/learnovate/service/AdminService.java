package com.example.learnovate.service;

import com.example.learnovate.classfile.AuthenticateEmail;
import com.example.learnovate.exception.UnauthorizedAccessException;
import com.example.learnovate.model.Feedback;
import com.example.learnovate.model.Mentee;
import com.example.learnovate.model.Mentor;
import com.example.learnovate.model.MentorBookings;
import com.example.learnovate.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {
    @Autowired
    private MentorRepository mRepo;

    @Autowired
    private MenteeRepository menteeRepository;

    @Autowired
    private MentorAvailabilityRepository availableRepo;

    @Autowired
    private RegisteredUserRespository rRepo;

    @Autowired
    private MentorBookingsRepository bookingRepo;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PaymentDetailsRepository pRepo;

    @Autowired
    private FeedbackRepository fRepo;

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

    public  List<Mentor> getAllMentors(){
        authenticateAdmin();
        return mRepo.findAll();
    }

    public  Mentor getMentorById(int id){
        authenticateAdmin();
        Mentor mentor = mRepo.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("Mentor not found with id: " + id));

        return mentor;
    }

    public List<Mentee> getAllMentee(){
        authenticateAdmin();;
        return menteeRepository.findAll();
    }

    public List<Feedback> getAllFeedback(){
        authenticateAdmin();;
        return fRepo.findAll();
    }

    public List<MentorBookings> getAllBookings(){
        authenticateAdmin();
        return bookingRepo.findByPaymentStatus("PAID");
    }

    public Mentor approveMentor(int mentorId){
        authenticateAdmin();
        Mentor mentor = mRepo.findById(mentorId)
                .orElseThrow(() -> new RuntimeException("Mentor not found with id: " + mentorId));
        mentor.setStatus("approved");
        mRepo.save(mentor);
        String text = """
                Dear %s,

                Congratulations! We are pleased to inform you that your mentor application has been approved.
                                
                Please log in to your account to:
                    - Set your availability schedule
                    
                If you have any questions, don't hesitate to contact our support team.
                Best regards,
                Learnovate
                """.formatted(mentor.getUser().getName());
        emailService.sendSimpleEmail(
                mentor.getUser().getEmail(),
                "Mentor Application Declined",
                text
        );
        return mentor;
    }

    public Mentor declineMentor(int mentorId){
        authenticateAdmin();
        Mentor mentor = mRepo.findById(mentorId)
                .orElseThrow(() -> new RuntimeException("Mentor not found with id: " + mentorId));
        mentor.setStatus("declined");
        mRepo.save(mentor);
        String text = """
                Dear %s,

                Thank you for applying to be a mentor. Unfortunately, your application has been declined because the submitted documents are insufficient.

                You can reply to this email with updated documents. Please ensure all required information is provided in your next submission.

                Best regards,
                Learnovate
                """.formatted(mentor.getUser().getName());
        emailService.sendSimpleEmail(
                mentor.getUser().getEmail(),
                "Mentor Application Declined",
                text
        );

        return mentor;
    }

    public int getTotalMentorCount() {
        authenticateAdmin();
        return mRepo.countTotalMentors();
    }

    public int getTotalUserCount() {
        authenticateAdmin();
        return menteeRepository.countTotalUsers();
    }

    public double getTotalTransactionAmount(){
        authenticateAdmin();
        return pRepo.getTotalTransactionAmount();
    }

}
