package com.example.learnovate.controller;

import com.example.learnovate.dto.FeedbackDto;
import com.example.learnovate.model.Feedback;
import com.example.learnovate.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class FeedbackController {

    @Autowired
    private FeedbackRepository fRepo;

    @PostMapping
    public ResponseEntity<?> receiveFeedback(@RequestBody FeedbackDto dto) {
        Feedback feedback = new Feedback();
        feedback.setName(dto.getName());
        feedback.setEmail(dto.getEmail());
        feedback.setRating(dto.getRating());
        feedback.setCategory(dto.getCategory());
        feedback.setMessage(dto.getMessage());

        fRepo.save(feedback);
        return ResponseEntity.ok(feedback);
    }
}
