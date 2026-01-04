package com.nutreBirth.service.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseCookie;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.nutreBirth.service.Entity.User;
import com.nutreBirth.service.Enum.PlanType;
import com.nutreBirth.service.repo.UserRepository;

import jakarta.servlet.http.HttpServletResponse;

import com.nutreBirth.service.Service.GoogleTokenVerifierService;
import com.nutreBirth.service.Service.JwtService;
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

    @PostMapping(value = "/google", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> loginWithGoogle(@RequestBody GoogleLoginRequest request, HttpServletResponse response) {

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
            String jwt = jwtService.generate(user);

            // Set JWT as HTTP-only cookie
            ResponseCookie cookie = ResponseCookie.from(cookieName, jwt)
                    .httpOnly(true)
                    .secure(cookieSecure) // set true in production (HTTPS)
                    .path("/")
                    .sameSite(cookieSameSite)
                    .maxAge(Duration.ofDays(7))
                    .build();

            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

            // Return minimal user info (NO TOKEN)
            return ResponseEntity.ok(Map.of(
                    "email", user.getEmail(),
                    "name", user.getName(),
                    "plan", user.getPlan().name()));
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
