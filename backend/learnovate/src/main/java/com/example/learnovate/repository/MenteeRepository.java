package com.example.learnovate.repository;

import com.example.learnovate.model.Mentee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MenteeRepository extends JpaRepository<Mentee, Integer> {
    Mentee getMenteeByUser_UserId(int userId);

    @Query("SELECT COUNT(m) FROM Mentee m")
    int countTotalUsers();
}
