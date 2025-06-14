package com.example.learnovate.service;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;


@Service
public class GoogleTokenVerifier {
    private static final Logger logger = LoggerFactory.getLogger(GoogleTokenVerifier.class);
    public FirebaseToken verifyGoogleToken(String idToken) throws FirebaseAuthException {
        try {
            FirebaseToken token = FirebaseAuth.getInstance().verifyIdToken(idToken);
            logger.info("Google token verified successfully for email: {}", token.getEmail());
            return token;
        } catch (FirebaseAuthException e) {
            logger.error("Google token verification failed: {}", e.getMessage(), e);
            throw e;
        }
    }

    public List<GrantedAuthority> getAuthoritiesFromGoogleToken(FirebaseToken token) {
        String role = "MENTEE";
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role));
    }

    public String extractUsername(FirebaseToken token) {
        return token.getEmail(); // Use email as the username
    }
}
