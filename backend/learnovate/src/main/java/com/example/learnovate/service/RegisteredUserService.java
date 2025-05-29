package com.example.learnovate.service;

import com.example.learnovate.model.RegisteredUser;
import com.example.learnovate.repository.RegisteredUserRespository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class RegisteredUserService implements UserDetailsService {

    @Autowired
    private RegisteredUserRespository rRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<RegisteredUser> user = rRepo.findByEmail(email);
        if(user.isPresent()){            var userObj = user.get();
            return User.builder()
                    .username(userObj.getEmail())
                    .password(userObj.getPassword())
                    .build();
        } else {
            throw new UsernameNotFoundException(email);
        }
    }
}