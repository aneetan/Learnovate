package com.example.learnovate.controller;

import com.example.learnovate.dto.MenteeDto;
import com.example.learnovate.dto.MentorBookingsDto;
import com.example.learnovate.dto.MentorDTO;
import com.example.learnovate.exception.UnauthorizedAccessException;
import com.example.learnovate.model.*;
import com.example.learnovate.repository.MenteeRepository;
import com.example.learnovate.service.MenteeService;
import jakarta.websocket.OnClose;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mentee")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class MenteeController {

    @Autowired
    private final MenteeService menteeService;

    public MenteeController(MenteeService menteeService){
        this.menteeService = menteeService;
    }

    @PostMapping(value = "/register")
    public ResponseEntity<?> saveProfile(@RequestBody MenteeDto menteeDTO) {
        try {
            Map<String, Object> response = menteeService.saveProfile(menteeDTO);
            return ResponseEntity.status(HttpStatus.CREATED.value())
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(response);
        } catch (UnauthorizedAccessException e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .body("You are unauthorized to access the system");
        }
    }

    @PostMapping(value = "/requestBooking/{id}")
    public ResponseEntity<?> saveBookingRequest(@RequestBody MentorBookingsDto bookingDto,
                                                @PathVariable int id){
        try{
            Map<String, Object> response = menteeService.saveBookingRequest(bookingDto, id);
            return ResponseEntity.status(HttpStatus.CREATED.value())
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(response);

            } catch (UnauthorizedAccessException e) {
                return ResponseEntity
                        .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                        .body("You are unauthorized to access the system");
            } catch (RuntimeException e){
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST.value())
                    .body("User not found");
        }
    }

    @GetMapping("/getAvailability/{id}")
    public ResponseEntity<?> getAvailability(@PathVariable int id) {
        try {
            MentorAvailability mentorAvailability = menteeService.getAvailability(id);
            return ResponseEntity.ok(mentorAvailability);
        } catch (UnauthorizedAccessException e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .body("You are unauthorized to access the system");
        }  catch (RuntimeException e){
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST.value())
                    .body("User not found of id " + id);
        }
    }
    @GetMapping("/getBookingDetails/{id}")
    public ResponseEntity<?> getBookingDetails(@PathVariable int id) {
        try {
            List<MentorBookings> bookings = menteeService.getAllBookingsForMentor(id);
            return ResponseEntity.ok(bookings);
        } catch (UnauthorizedAccessException e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .body("You are unauthorized to access the system");
        } catch (RuntimeException e){
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST.value())
                    .body("User not found of id " + id);
        }
    }

    @GetMapping("/getMentors")
    public List<Mentor> getAllMentors(){
        return menteeService.getAllMentors();
    }



}
