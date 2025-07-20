package com.example.learnovate.repository;

import com.example.learnovate.model.Mentor;
import com.example.learnovate.model.MentorBookings;
import com.example.learnovate.model.RegisteredUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MentorBookingsRepository extends JpaRepository<MentorBookings, Integer> {

    Optional<MentorBookings> findByUser(Mentor mentor);
    List<MentorBookings> findByMentor(Mentor mentor);

    List<MentorBookings> findByUser(RegisteredUser user);

    Optional<MentorBookings> findByUserAndMentor(RegisteredUser user, Mentor mentor);

    List<MentorBookings> findByPaymentStatus(String status);

    // Fetch the most recent booking for a user and mentor
    Optional<MentorBookings> findTopByUser_UserIdAndMentor_MentorIdOrderByBookingIdDesc(int userId, int mentorId);


}
