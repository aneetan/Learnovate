package com.example.learnovate.repository;

import com.example.learnovate.model.Mentee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenteeRepository extends JpaRepository<Mentee, Integer> {
}
