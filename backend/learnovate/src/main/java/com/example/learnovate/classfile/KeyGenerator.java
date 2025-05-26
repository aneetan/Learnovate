package com.example.learnovate.classfile;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;

public class KeyGenerator {
    public static void main(String[] args) {
        var key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
        String base64Key = Encoders.BASE64.encode(key.getEncoded());
        System.out.println("Your JWT_SECRET_KEY (base64 encoded):");
        System.out.println(base64Key);
    }
}
