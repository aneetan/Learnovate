package com.example.learnovate.repository;

import com.example.learnovate.model.Mentor;
import com.example.learnovate.model.RegisteredUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MentorRepository extends JpaRepository<Mentor, Integer> {
    Optional<Mentor> findByUser(RegisteredUser user);

    @Query("SELECT m FROM Mentor m JOIN FETCH m.user u WHERE u.role = 'MENTOR'")
    List<Mentor> findAllMentorsWithUserDetails();

    Mentor getMentorByUser_UserId(int userId);

    List<Mentor> findByStatus(String status);


}
