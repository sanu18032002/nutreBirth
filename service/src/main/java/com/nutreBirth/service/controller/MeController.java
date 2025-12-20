package com.nutreBirth.service.controller;

import java.util.UUID;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nutreBirth.service.Entity.User;
import com.nutreBirth.service.Enum.PlanType;
import com.nutreBirth.service.repo.UserRepository;

@RestController
public class MeController {

    private final UserRepository userRepository;

    public MeController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/me")
    public Map<String, Object> me(Authentication auth) {

        if (auth == null || auth.getName() == null) {
            throw new org.springframework.security.access.AccessDeniedException("Unauthenticated");
        }

        UUID userId;
        try {
            userId = UUID.fromString(auth.getName());
        } catch (IllegalArgumentException ex) {
            throw new org.springframework.security.access.AccessDeniedException("Invalid user id");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new org.springframework.security.access.AccessDeniedException("User not found"));

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
