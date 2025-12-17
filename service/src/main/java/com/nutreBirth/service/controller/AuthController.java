package com.nutreBirth.service.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.nutreBirth.service.Entity.User;
import com.nutreBirth.service.Enum.PlanType;
import com.nutreBirth.service.repo.UserRepository;
import com.nutreBirth.service.Service.GoogleTokenVerifierService;
import com.nutreBirth.service.Service.JwtService;
import com.nutreBirth.service.dto.AuthResponse;
import com.nutreBirth.service.dto.GoogleLoginRequest;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final GoogleTokenVerifierService googleTokenVerifier;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public AuthController(GoogleTokenVerifierService googleTokenVerifier,
            UserRepository userRepository,
            JwtService jwtService) {
        this.googleTokenVerifier = googleTokenVerifier;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    @PostMapping("/google")
    public ResponseEntity<AuthResponse> loginWithGoogle(@RequestBody GoogleLoginRequest request) {

        // 1️⃣ Verify Google ID token (CRITICAL)
        Payload payload = googleTokenVerifier.verify(request.getIdToken());

        String email = payload.getEmail();
        String name = (String) payload.get("name");
        String picture = (String) payload.get("picture");

        // 2️⃣ Find or create user
        User user = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    User u = new User();
                    u.setEmail(email);
                    u.setName(name);
                    u.setPictureUrl(picture);
                    u.setPlan(PlanType.FREE); // default
                    return userRepository.save(u);
                });

        // 3️⃣ Issue YOUR JWT (not Google’s)
        String jwt = jwtService.generate(user);

        // 4️⃣ Return minimal, frontend-safe response
        return ResponseEntity.ok(
                new AuthResponse(jwt, user));
    }
}
