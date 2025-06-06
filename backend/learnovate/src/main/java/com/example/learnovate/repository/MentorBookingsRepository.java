package com.example.learnovate.repository;

import com.example.learnovate.model.Mentor;
import com.example.learnovate.model.MentorAvailability;
import com.example.learnovate.model.MentorBookings;
import com.example.learnovate.model.RegisteredUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MentorBookingsRepository extends JpaRepository<MentorBookings, Integer> {

    Optional<MentorBookings> findByUser(Mentor mentor);
    Optional<MentorBookings> findByMentor(Mentor mentor);
}
