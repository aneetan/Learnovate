package com.example.learnovate.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MentorBookingsDto {

    private LocalDate bookingDate;

    @JsonFormat(pattern = "HH:mm")
    private LocalTime timeSlot;

    private String topic;
    private String notes;
    private String paymentStatus;
    private String status;

    private int userId;
    private int mentorId;
}
