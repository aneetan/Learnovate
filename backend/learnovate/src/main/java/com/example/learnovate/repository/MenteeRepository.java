package com.example.learnovate.repository;

import com.example.learnovate.model.Mentee;
import com.example.learnovate.model.RegisteredUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenteeRepository extends JpaRepository<Mentee, Integer> {
    Mentee getMenteeByUser_UserId(int userId);
}
