package com.example.learnovate.controller;

import com.example.learnovate.dto.MentorDTO;
import com.example.learnovate.model.Mentor;
import com.example.learnovate.model.RegisteredUser;
import com.example.learnovate.repository.MentorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/mentor")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class MentorController {

    @Autowired
    private MentorRepository mRepo;

    @PostMapping(value = "/register")
    public Mentor saveProfile(@RequestBody MentorDTO mentorDTO) {
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
}
