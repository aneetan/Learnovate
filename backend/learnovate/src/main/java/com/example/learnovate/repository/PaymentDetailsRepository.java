package com.example.learnovate.repository;

import com.example.learnovate.model.Mentor;
import com.example.learnovate.model.PaymentDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentDetailsRepository extends JpaRepository<PaymentDetails, Integer> {
    Optional<PaymentDetails> findByTransactionUuid(String transactionUuid);

    List<PaymentDetails> findByMentor(Mentor mentor);

    @Query("SELECT SUM(p.amount) FROM PaymentDetails p")
    Double getTotalTransactionAmount();
}
