package com.nutreBirth.service.controller;

import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nutreBirth.service.Entity.User;
import com.nutreBirth.service.Enum.PlanType;

@RestController
public class MeController {

    @GetMapping("/me")
    public Map<String, Object> me(Authentication auth) {

        User user = (User) auth.getPrincipal();

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
