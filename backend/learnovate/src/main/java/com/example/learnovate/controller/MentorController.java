package com.example.learnovate.controller;

import com.example.learnovate.dto.MentorAvailabilityDto;
import com.example.learnovate.dto.MentorDTO;
import com.example.learnovate.exception.UnauthorizedAccessException;
import com.example.learnovate.model.Mentor;
import com.example.learnovate.model.MentorAvailability;
import com.example.learnovate.model.MentorBookings;
import com.example.learnovate.model.PaymentDetails;
import com.example.learnovate.service.MentorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mentor")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class MentorController {

    @Autowired
    public final MentorService mentorService;

    public MentorController(MentorService mentorService){
        this.mentorService = mentorService;
    }

    @PostMapping(value = "/register")
    public ResponseEntity<?> saveProfile(@RequestBody MentorDTO mentorDTO) {
        try {
            Map<String, Object> response = mentorService.saveProfile(mentorDTO);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(response);
        } catch (UnauthorizedAccessException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("You are unauthorized to access the system!");
        }
    }

    @PostMapping(value = "/setAvailability")
    public ResponseEntity<?> setAvailability(@RequestBody MentorAvailabilityDto availabilityDto) {
        try {
            Map<String, Object> response = mentorService.saveAvailability(availabilityDto);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(response);
        } catch (UnauthorizedAccessException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("You are unauthorized to access the system!");
        } catch (RuntimeException e){
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("User id not found");
        }
    }

    @GetMapping("/sessions/{id}")
    public List<MentorBookings> getAllSessionsByMentor(@PathVariable int id){
        return mentorService.getSessionsByMentorId(id);
    }


    @GetMapping("/pending")
    public ResponseEntity<List<Mentor>> getPendingMentors() {
        List<Mentor> pendingMentors = mentorService.getPendingMentors();
        return ResponseEntity.ok(pendingMentors);
    }

    @GetMapping("/getTransactions/{userId}")
    public ResponseEntity<List<PaymentDetails>> getTransactionList(@PathVariable int userId) {
        List<PaymentDetails> paymentDetails = mentorService.findPaymentByMentor(userId);
        return ResponseEntity.ok(paymentDetails);
    }

    @GetMapping("/getMentor/{userId}")
    public ResponseEntity<?> getMentorByUserId(@PathVariable int userId) {
        try {
            Mentor mentor = mentorService.getMentorByUserId(userId);
            return ResponseEntity.ok(mentor);
        } catch (RuntimeException e){
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST.value())
                    .body("User not found of id " + userId);
        }
    }

    @GetMapping("getAvailability/{userId}")
    public ResponseEntity<?> getAvailabilityByMentorId(@PathVariable int userId) {
        try {
            MentorAvailability available = mentorService.getAvailabilityByUserId(userId);
            return ResponseEntity.ok(available);
        } catch (RuntimeException e){
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST.value())
                    .body("Mentor not found of id " + userId);
        }
    }

    @PutMapping ("/updateStatus/{bookingId}")
    public ResponseEntity<?> updateSessionStatus(@PathVariable int bookingId) {
        try {
            MentorBookings bookings = mentorService.updateStatus(bookingId);
            return ResponseEntity.ok(bookings);
        } catch (RuntimeException e){
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST.value())
                    .body("Booking not found of id " + bookingId);
        }
    }

    @PutMapping(value = "/updateAvailability/{bookingId}")
    public ResponseEntity<?> updateAvailability(
            @PathVariable Integer bookingId,
            @RequestBody MentorAvailabilityDto availabilityDto) {
        try {
            MentorAvailability availability = mentorService.updateAvailability(bookingId, availabilityDto);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(availability);
        } catch (RuntimeException e){
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("User id not found");
        }
    }

    @PutMapping(value = "/updateProfile")
    public ResponseEntity<?> updateProfile(@RequestBody MentorDTO mentorDTO) {
        try {
            Map<String, Object> response = mentorService.updateProfile(mentorDTO);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(response);
        } catch (UnauthorizedAccessException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("You are unauthorized to access the system!");
        }
    }



}
