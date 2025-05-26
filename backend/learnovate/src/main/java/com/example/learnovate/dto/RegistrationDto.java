package com.example.learnovate.dto;

import com.example.learnovate.model.RegisteredUser;
import lombok.*;
@Getter
@Data
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegistrationDto {
        private String id;
        private String name;
        private String email;
        private String password;
        private String confirmPassword;
        private String role;

        public RegisteredUser toEntity() {
            return new RegisteredUser(
                    this.name,
                    this.email,
                    this.password,
                    this.role
            );
        }
}
