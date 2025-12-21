package com.nutreBirth.service.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseCookie;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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
    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    private final GoogleTokenVerifierService googleTokenVerifier;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Value("${app.auth.cookie-name:nb_auth}")
    private String cookieName;

    @Value("${app.auth.cookie-secure:false}")
    private boolean cookieSecure;

    @Value("${app.auth.cookie-same-site:Lax}")
    private String cookieSameSite;

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
            // Verify Google ID token (CRITICAL)
            Payload payload;
            try {
                payload = googleTokenVerifier.verify(request.getIdToken());
            } catch (RuntimeException ex) {
                log.warn("Google auth failed during token verification: {}", ex.getMessage());
                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(java.util.Map.of("error", "Google authentication failed"));
            }

            String email = payload.getEmail();
            String name = (String) payload.get("name");
            String picture = (String) payload.get("picture");

            // Find or create user
            User user = userRepository.findByEmail(email)
                    .orElseGet(() -> {
                        User u = new User();
                        u.setEmail(email);
                        u.setName(name);
                        u.setPictureUrl(picture);
                        u.setPlan(PlanType.FREE); // default
                        return userRepository.save(u);
                    });

            // Issue YOUR JWT (not Google’s)
            String jwt;
            try {
                jwt = jwtService.generate(user);
            } catch (RuntimeException ex) {
                // This is usually misconfiguration (missing/invalid JWT_SECRET)
                log.error("Failed to issue JWT: {}", ex.getMessage(), ex);
                return ResponseEntity
                        .status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(java.util.Map.of("error", "Server misconfigured (JWT)"));
            }

            // Set HttpOnly auth cookie (frontend should NOT store token)
            ResponseCookie cookie = ResponseCookie.from(cookieName, jwt)
                    .httpOnly(true)
                    .secure(cookieSecure)
                    .path("/")
                    .maxAge(60 * 60 * 24 * 7) // 7 days
                    .sameSite(cookieSameSite)
                    .build();

            // Return minimal, frontend-safe response (token can be omitted later)
            return ResponseEntity
                    .ok()
                    .header("Set-Cookie", cookie.toString())
                    .body(new AuthResponse(jwt, user));
        } catch (RuntimeException ex) {
            log.error("Unexpected error in /auth/google: {}", ex.getMessage(), ex);
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(java.util.Map.of("error", "Unexpected server error"));
        }
    }

    @PostMapping(value = "/logout", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> logout() {
        ResponseCookie cookie = ResponseCookie.from(cookieName, "")
                .httpOnly(true)
                .secure(cookieSecure)
                .path("/")
                .maxAge(0)
                .sameSite(cookieSameSite)
                .build();

        return ResponseEntity
                .ok()
                .header("Set-Cookie", cookie.toString())
                .body(java.util.Map.of("ok", true));
    }
}
