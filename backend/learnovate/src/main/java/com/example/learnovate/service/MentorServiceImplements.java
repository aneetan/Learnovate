package com.example.learnovate.service;

import com.example.learnovate.dto.MentorDTO;
import com.example.learnovate.exception.UnauthorizedAccessException;
import com.example.learnovate.model.Mentor;
import com.example.learnovate.model.RegisteredUser;
import com.example.learnovate.repository.MentorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class MentorServiceImplements implements MentorService{

    @Autowired
    private MentorRepository mRepo;
    @Override
    public Mentor saveProfile(MentorDTO mentorDTO) {
        String authenticatedEmail = getAuthenticatedUserEmail();

        // Validate email matches
        if (!authenticatedEmail.equals(mentorDTO.getUser().getEmail())) {
            throw new UnauthorizedAccessException("Email in request does not match authenticated user");
        }

        Mentor mentor = new Mentor();
        mentor.setBio(mentorDTO.getAdditionalInfo().get("bio"));
        mentor.setPhoneNumber(mentorDTO.getAdditionalInfo().get("number"));
        mentor.setPrice(mentorDTO.getAdditionalInfo().get("price"));

        mentor.setArea(mentorDTO.getProfessionalInfo().get("area"));
        mentor.setTitle(mentorDTO.getProfessionalInfo().get("title"));
        mentor.setExperience(mentorDTO.getProfessionalInfo().get("experience"));
        String skillsJson = mentorDTO.getProfessionalInfo().get("skills");
        List<String> skills = Arrays.asList(skillsJson
                .replace("[", "")
                .replace("]", "")
                .split(",\\s*"));
        mentor.setSkills(skills);

        mentor.setProfileUrl(mentorDTO.getDocumentUpload().get("profileUrl"));
        mentor.setDocumentUrl(mentorDTO.getDocumentUpload().get("documentUrl"));

        RegisteredUser user = new RegisteredUser();
        user.setId(Integer.valueOf(mentorDTO.getUser().getId()));
        user.setName(mentorDTO.getUser().getName());
        user.setEmail(mentorDTO.getUser().getEmail());
        user.setRole(mentorDTO.getUser().getRole());

        mentor.setUser(user);

        mentor.setStatus(mentorDTO.getStatus());
        return mRepo.save(mentor);
    }

    private String getAuthenticatedUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new AuthenticationCredentialsNotFoundException("No authentication found");
        }

        // The principal should be your UserDetails implementation
        Object principal = authentication.getPrincipal();

        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername(); // or getEmail() if available
        } else if (principal instanceof String) {
            return (String) principal; // if JWT subject is the email
        }

        throw new AuthenticationServiceException("Unable to extract email from authentication");
    }
}
