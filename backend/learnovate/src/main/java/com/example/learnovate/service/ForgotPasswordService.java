package com.example.learnovate.service;

import com.example.learnovate.model.OtpRecord;
import com.example.learnovate.repository.OtpRepository;
import io.github.cdimascio.dotenv.Dotenv;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Random;
import java.util.UUID;

@Service
public class ForgotPasswordService {
    @Autowired
    private OtpRepository otpRepository;

    private static final int OTP_EXPIRY_MINUTES = 2;
    private static final int RESET_TOKEN_EXPIRY_MINUTES = 60;
    private static final String SECRET = Dotenv.load().get("RESET_TOKEN_KEY");;
    private static final Key SECRET_KEY = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

    public String generateOtp() {
        Random random = new Random();
        StringBuilder otp = new StringBuilder(6);
        for (int i = 0; i < 6; i++) {
            otp.append(random.nextInt(10));
        }
        return otp.toString();
    }

    @Transactional
    public void storeOtp(String email, String otp) {
        // Check if an OTP exists for the email and delete it
        otpRepository.findByEmailAndUsedFalse(email).ifPresent(otpRepository::delete);

        // Create new OTP record
        OtpRecord otpRecord = new OtpRecord();
        otpRecord.setEmail(email);
        otpRecord.setOtp(otp);
        otpRecord.setCreatedAt(LocalDateTime.now());
        otpRecord.setExpiresAt(LocalDateTime.now().plusMinutes(OTP_EXPIRY_MINUTES));
        otpRecord.setUsed(false);

        // Save to database
        otpRepository.save(otpRecord);
    }

    @Transactional(readOnly = true)
    public String getStoredOtp(String email) {
        return otpRepository.findByEmailAndUsedFalse(email)
                .filter(otpRecord -> !otpRecord.getExpiresAt().isBefore(LocalDateTime.now()))
                .map(OtpRecord::getOtp)
                .orElse(null);
    }

    @Transactional
    public boolean verifyOtp(String email, String otp) {
        OtpRecord otpRecord = otpRepository.findByEmailAndUsedFalse(email)
                .filter(record -> !record.getExpiresAt().isBefore(LocalDateTime.now()))
                .orElse(null);

        if (otpRecord == null) {
            return false;
        }

        if (otpRecord.getOtp().equals(otp)) {
            // Mark OTP as used
            otpRecord.setUsed(true);
            otpRepository.save(otpRecord);
            return true;
        }
        return false;
    }

    @Transactional
    public void clearOtp(String email) {
        otpRepository.findByEmailAndUsedFalse(email).ifPresent(otpRepository::delete);
    }

    public String getResetToken(String email) {
        // Generate a JWT with email and expiration
        long expirationTime = System.currentTimeMillis() + RESET_TOKEN_EXPIRY_MINUTES * 60 * 1000;
        return Jwts.builder()
                .setSubject(email)
                .setExpiration(new Date(expirationTime))
                .signWith(SECRET_KEY)
                .compact();
    }

    public boolean validateResetToken(String email, String token) {
        try {
            var claims = Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            return claims.getSubject().equals(email);
        } catch (Exception e) {
            return false;
        }
    }

    // Method to clean up expired OTPs (can be scheduled)

    @Transactional
    public void cleanupExpiredOtps() {
        otpRepository.deleteByExpiresAtBefore(LocalDateTime.now());
    }


}
