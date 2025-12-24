package com.nutreBirth.service.controller;

import java.util.UUID;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nutreBirth.service.Entity.User;
import com.nutreBirth.service.Enum.PlanType;
import com.nutreBirth.service.repo.UserRepository;

@RestController
public class MeController {

    private static final Logger log = LoggerFactory.getLogger(MeController.class);

    private final UserRepository userRepository;

    public MeController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/me")
    public Map<String, Object> me(Authentication auth) {
        log.debug("GET /me endpoint called");

        if (auth == null || auth.getName() == null) {
            log.warn("Unauthenticated access attempt to /me endpoint");
            throw new org.springframework.security.access.AccessDeniedException("Unauthenticated");
        }

        log.debug("Authenticated user name: {}", auth.getName());

        UUID userId;
        try {
            userId = UUID.fromString(auth.getName());
            log.debug("Successfully parsed userId: {}", userId);
        } catch (IllegalArgumentException ex) {
            log.error("Invalid user id format in authentication: {} - {}", auth.getName(), ex.getMessage());
            throw new org.springframework.security.access.AccessDeniedException("Invalid user id");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> {
                    log.error("User not found in database with id: {}", userId);
                    return new org.springframework.security.access.AccessDeniedException("User not found");
                });

        log.info("User data retrieved successfully for: {} ({})", user.getEmail(), userId);

        return Map.of(
            "email", user.getEmail(),
            "plan", user.getPlan(),
            "features", Map.of(
                "fullDietPlan", user.getPlan() == PlanType.PREMIUM,
                "exportPdf", user.getPlan() == PlanType.PREMIUM
            )
        );
    }
}
