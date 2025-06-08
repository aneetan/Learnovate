package com.example.learnovate.config;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Data
@Configuration
@ConfigurationProperties(prefix = "esewa")
public class EsewaConfig {
    private String baseUrl;
    private String merchantId;

//    @Value("${esewa.merchant-secret}")
    private String merchantSecret;
    private String successUrl;
    private String failureUrl;
}
