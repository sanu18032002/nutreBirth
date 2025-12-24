package com.nutreBirth.service.Service;

import java.time.Instant;
import java.util.Date;

import javax.crypto.SecretKey;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.nutreBirth.service.Entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    private static final Logger log = LoggerFactory.getLogger(JwtService.class);

    @Value("${jwt.secret}")
    private String secret;

    private SecretKey getKey() {
        if (secret == null || secret.isBlank()) {
            log.error("JWT secret is missing or blank. Check JWT_SECRET environment variable");
            throw new IllegalStateException("Missing JWT_SECRET (jwt.secret)");
        }
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    public Claims parse(String token) {
        try {
            log.debug("Parsing JWT token");
            Claims claims = Jwts.parser()
                    .verifyWith(getKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
            log.debug("JWT token parsed successfully");
            return claims;
        } catch (io.jsonwebtoken.ExpiredJwtException e) {
            log.warn("JWT token is expired: {}", e.getMessage());
            throw e;
        } catch (io.jsonwebtoken.MalformedJwtException e) {
            log.error("Malformed JWT token: {}", e.getMessage());
            throw e;
        } catch (io.jsonwebtoken.security.SignatureException e) {
            log.error("Invalid JWT signature: {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            log.error("Error parsing JWT token: {}", e.getMessage(), e);
            throw e;
        }
    }

    public String getUserId(String token) {
        try {
            String userId = parse(token).getSubject();
            log.debug("Extracted userId from token: {}", userId);
            return userId;
        } catch (Exception e) {
            log.error("Failed to extract userId from token: {}", e.getMessage());
            throw e;
        }
    }

    public String getPlan(String token) {
        try {
            String plan = parse(token).get("plan", String.class);
            log.debug("Extracted plan from token: {}", plan);
            return plan;
        } catch (Exception e) {
            log.error("Failed to extract plan from token: {}", e.getMessage());
            throw e;
        }
    }

    private static final long EXPIRY_SECONDS = 60 * 60 * 24 * 7; // 7 days

    public String generate(User user) {
        try {
            log.debug("Generating JWT for user: {} ({})", user.getEmail(), user.getId());

            Instant now = Instant.now();

            String jwt = Jwts.builder()
                    .subject(user.getId().toString())
                    .claim("email", user.getEmail())
                    .claim("plan", user.getPlan().name())
                    .issuedAt(Date.from(now))
                    .expiration(Date.from(now.plusSeconds(EXPIRY_SECONDS)))
                    .signWith(getKey())
                    .compact();

            log.info("JWT generated successfully for user: {}", user.getEmail());
            return jwt;
        } catch (Exception e) {
            log.error("Failed to generate JWT for user {}: {}", user.getEmail(), e.getMessage(), e);
            throw new RuntimeException("Failed to generate JWT", e);
        }
    }
}
