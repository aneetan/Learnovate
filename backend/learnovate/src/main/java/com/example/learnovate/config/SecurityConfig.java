    package com.example.learnovate.config;

    import com.example.learnovate.service.RegisteredUserService;
    import com.fasterxml.jackson.databind.ObjectMapper;
    import jakarta.servlet.http.HttpServletRequest;
    import jakarta.servlet.http.HttpServletResponse;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.context.annotation.Bean;
    import org.springframework.context.annotation.Configuration;
    import org.springframework.http.HttpStatus;
    import org.springframework.security.authentication.AuthenticationManager;
    import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
    import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
    import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
    import org.springframework.security.config.annotation.web.builders.HttpSecurity;
    import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
    import org.springframework.security.core.userdetails.UserDetailsService;
    import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
    import org.springframework.security.crypto.password.PasswordEncoder;
    import org.springframework.security.web.AuthenticationEntryPoint;
    import org.springframework.security.web.SecurityFilterChain;

    import java.util.HashMap;
    import java.util.Map;

    @Configuration
    @EnableWebSecurity
    @EnableMethodSecurity(prePostEnabled = true)
    public class SecurityConfig {

        private final RegisteredUserService rService;

        @Autowired
        private JwtAuthenticationFilter jwtAuthFilter;

        public SecurityConfig(RegisteredUserService userDetailsService) {
            this.rService = userDetailsService;
        }

        @Bean
        public UserDetailsService userDetailsService(){
            return rService;
        }

        @Bean
        public DaoAuthenticationProvider authenticationProvider(){
            DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
            provider.setUserDetailsService(rService);
            provider.setPasswordEncoder(passwordEncoder());
            return provider;
        }

        @Bean
        public AuthenticationManager authenticationManager(
                AuthenticationConfiguration authConfig) throws Exception {
            return authConfig.getAuthenticationManager();
        }

        @Bean
        public AuthenticationEntryPoint restAuthenticationEntryPoint() {
            return (HttpServletRequest request, HttpServletResponse response, org.springframework.security.core.AuthenticationException authException) -> {
                response.setContentType("application/json");
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                Map<String, Object> data = new HashMap<>();
                data.put("error", "Unauthorized");
                data.put("message", authException.getMessage());
                new ObjectMapper().writeValue(response.getOutputStream(), data);
            };
        }

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
            http
                    .csrf(csrf -> csrf.disable())
                    .authorizeHttpRequests(auth -> auth
                            //user don't need to be logged in to access registration page
                            .requestMatchers("/api/auth/register", "/api/auth/login", "/api/auth/google").permitAll()
                            .requestMatchers("/api/admin/**").hasRole("ADMIN")
                            .requestMatchers("/api/mentor/**").hasRole("MENTOR")
                            .requestMatchers("/api/mentee/**").hasRole("MENTEE")
                            .anyRequest().permitAll()
                    )
                    .exceptionHandling(exception -> exception
                            .authenticationEntryPoint(restAuthenticationEntryPoint())
                    )
                    .sessionManagement(session -> session
                            .sessionCreationPolicy(org.springframework.security.config.http.SessionCreationPolicy.STATELESS)
                    )
                    .authenticationProvider(authenticationProvider())
                    .addFilterBefore(jwtAuthFilter, org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class);

            return http.build();
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
            return new BCryptPasswordEncoder();
        }



    }
