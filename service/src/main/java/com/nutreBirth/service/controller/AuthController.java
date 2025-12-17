package com.nutreBirth.service.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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

    @PostMapping(
            value = "/google",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> loginWithGoogle(@RequestBody GoogleLoginRequest request) {

        try {
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
            return ResponseEntity.ok(new AuthResponse(jwt, user));
        } catch (RuntimeException ex) {
            // Return JSON error directly (avoid falling back to /error HTML negotiation)
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(java.util.Map.of("error", "Google authentication failed"));
        }
    }
}
