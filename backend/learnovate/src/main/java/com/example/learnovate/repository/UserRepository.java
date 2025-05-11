package com.example.learnovate.repository;

import com.example.learnovate.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<Student, Integer> {
    Student findByUsername(String username);
}
