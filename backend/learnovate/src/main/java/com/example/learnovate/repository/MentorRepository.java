package com.example.learnovate.repository;

import com.example.learnovate.model.Mentor;
import com.example.learnovate.model.RegisteredUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MentorRepository extends JpaRepository<Mentor, Integer> {
    Optional<Mentor> findByUser(RegisteredUser user);
}
