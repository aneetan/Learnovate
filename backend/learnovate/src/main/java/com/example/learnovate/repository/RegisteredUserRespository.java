package com.example.learnovate.repository;

import com.example.learnovate.model.RegisteredUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RegisteredUserRespository extends JpaRepository<RegisteredUser, Integer> {
    Optional<RegisteredUser> findByEmail(String email);

    boolean existsByEmail(String email);

}
