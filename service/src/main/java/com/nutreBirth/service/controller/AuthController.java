package com.nutreBirth.service.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nutreBirth.service.Entity.User;
import com.nutreBirth.service.Service.GoogleTokenVerifierService;
import com.nutreBirth.service.Service.JwtService;
import com.nutreBirth.service.dto.AuthResponse;
import com.nutreBirth.service.dto.GoogleLoginRequest;
import com.nutreBirth.service.repo.UserRepository;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final GoogleTokenVerifierService googleService;
    private final UserRepository userRepo;
    private final JwtService jwtService;

    public AuthController(
        GoogleTokenVerifierService googleService,
        UserRepository userRepo,
        JwtService jwtService
    ) {
        this.googleService = googleService;
        this.userRepo = userRepo;
        this.jwtService = jwtService;
    }

    @PostMapping("/google")
    public AuthResponse login(@RequestBody GoogleLoginRequest req) {

        var payload = googleService.verify(req.idToken());

        String email = payload.getEmail();

        User user = userRepo.findByEmail(email)
            .orElseGet(() -> {
                User u = new User();
                u.setEmail(email);
                u.setName((String) payload.get("name"));
                u.setPictureUrl((String) payload.get("picture"));
                return userRepo.save(u);
            });

        String jwt = jwtService.generate(user);

        return new AuthResponse(jwt, user);
    }
}
