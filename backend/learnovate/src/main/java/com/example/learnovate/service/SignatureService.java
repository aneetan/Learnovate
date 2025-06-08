package com.example.learnovate.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class SignatureService {
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public SignatureService(){
        this.bCryptPasswordEncoder = new BCryptPasswordEncoder();
    }

    public String hashSignature(String rawSignature) {
        return bCryptPasswordEncoder.encode(rawSignature);
    }

    public boolean verifySignature(String rawSignature, String storedHash) {
        return bCryptPasswordEncoder.matches(rawSignature, storedHash);
    }
}
