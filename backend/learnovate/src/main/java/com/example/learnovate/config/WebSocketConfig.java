package com.example.learnovate.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import java.security.Principal;

@Configuration
@EnableWebSocketMessageBroker //this enables websocket message handling with STOMP
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    
    private final JwtUtil jwtUtil;

    @Autowired
    public WebSocketConfig(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic", "/queue", "/user"); // Enables a simple in-memory broker to send messages to client
        config.setApplicationDestinationPrefixes("/app"); // Prefix for client messages
        config.setUserDestinationPrefix("/user");
    }

    //defines the WebSocket endpoint (/ws) that clients connect to
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/api/ws")
                .setAllowedOrigins("http://localhost:5173")
                .withSockJS(); // WebSocket endpoint with SockJS fallback
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(new ChannelInterceptor() {
            @Override
            public Message<?> preSend(Message<?> message, MessageChannel channel) {
                StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
                if (StompCommand.CONNECT.equals(accessor.getCommand())) {
                    String authHeader = accessor.getFirstNativeHeader("Authorization");
                    if (authHeader != null && authHeader.startsWith("Bearer ")) {
                        String token = authHeader.substring(7);
                        try {
                            // Validate JWT and extract email using JwtUtil
                            String email = jwtUtil.extractUsername(token);
                            if (!jwtUtil.isTokenValid(token, email)) {
                                throw new SecurityException("Invalid or expired JWT token");
                            }
                            accessor.setUser(new Principal() {
                                @Override
                                public String getName() {
                                    return email;
                                }
                            });
                        } catch (Exception e) {
                            throw new SecurityException("JWT validation failed: " + e.getMessage());
                        }
                    } else {
                        throw new SecurityException("Missing or invalid Authorization header");
                    }
                }
                return message;
            }
        });
    }

}
