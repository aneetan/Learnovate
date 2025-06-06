package com.example.learnovate.repository;

import com.example.learnovate.model.MentorAvailability;
import com.example.learnovate.model.RegisteredUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MentorAvailabilityRepository extends JpaRepository<MentorAvailability, Integer> {
    Optional<MentorAvailability> findByUser(RegisteredUser user);


}
