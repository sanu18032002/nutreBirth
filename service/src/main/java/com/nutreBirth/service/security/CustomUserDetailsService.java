package com.nutreBirth.service.security;

import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.nutreBirth.service.Entity.User;
import com.nutreBirth.service.repo.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private static final Logger log = LoggerFactory.getLogger(CustomUserDetailsService.class);

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String userIdString)
            throws UsernameNotFoundException {

        log.debug("Loading user by username (userId): {}", userIdString);

        UUID userId;
        try {
            userId = UUID.fromString(userIdString);
            log.debug("Successfully parsed userId UUID: {}", userId);
        } catch (IllegalArgumentException ex) {
            log.error("Invalid user id format in token: {} - {}", userIdString, ex.getMessage());
            throw new UsernameNotFoundException("Invalid user id in token");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> {
                    log.error("User not found in database with id: {}", userId);
                    return new UsernameNotFoundException("User not found");
                });

        log.debug("User found: {} with plan: {}", user.getEmail(), user.getPlan());

        UserDetails userDetails = org.springframework.security.core.userdetails.User
                .withUsername(user.getId().toString()) // convert UUID → String
                .password("") // Google auth, no password
                .authorities("ROLE_" + user.getPlan().name())
                .build();

        log.info("UserDetails loaded successfully for user: {}", user.getEmail());
        return userDetails;
    }
}
