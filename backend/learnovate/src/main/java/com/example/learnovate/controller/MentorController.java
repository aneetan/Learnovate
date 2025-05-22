package com.example.learnovate.controller;

import com.example.learnovate.dto.MentorDTO;
import com.example.learnovate.model.Mentor;
import com.example.learnovate.repository.MentorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mentor")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class MentorController {

    @Autowired
    private MentorRepository mRepo;

    @PostMapping(value = "/register")
    public Mentor saveProfile(@RequestBody MentorDTO mentorDTO) {
        Mentor mentor = new Mentor();
        mentor.setAdditonalInfo(mentorDTO.getAdditonalInfo());
        mentor.setProfessionalInfo(mentorDTO.getProfessionalInfo());
        mentor.setDocumentUpload(mentorDTO.getDocumentUpload());
        mentor.setStatus(mentorDTO.getStatus());
        return mRepo.save(mentor);
    }
}
