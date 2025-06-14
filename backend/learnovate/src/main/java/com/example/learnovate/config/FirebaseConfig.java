package com.example.learnovate.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;
import com.google.firebase.FirebaseOptions;

import java.io.FileInputStream;

@Configuration
public class FirebaseConfig {
    @PostConstruct
    public void initialize() {
        try {
            FileInputStream serviceAccount = new FileInputStream("src/main/resources/firebase-service-account.json");
            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();
            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
