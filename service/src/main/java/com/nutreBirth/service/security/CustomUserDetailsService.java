package com.nutreBirth.service.security;

import java.util.UUID;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.nutreBirth.service.Entity.User;
import com.nutreBirth.service.repo.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String userIdString)
            throws UsernameNotFoundException {

        UUID userId;
        try {
            userId = UUID.fromString(userIdString);
        } catch (IllegalArgumentException ex) {
            throw new UsernameNotFoundException("Invalid user id in token");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getId().toString()) // convert UUID → String
                .password("") // Google auth, no password
                .authorities("ROLE_" + user.getPlan().name())
                .build();
    }
}
