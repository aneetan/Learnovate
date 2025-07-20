package com.example.learnovate.repository;

import com.example.learnovate.model.OtpRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface OtpRepository extends JpaRepository<OtpRecord, Integer> {
    Optional<OtpRecord> findByEmailAndUsedFalse(String email);
    void deleteByExpiresAtBefore(LocalDateTime dateTime);
}
