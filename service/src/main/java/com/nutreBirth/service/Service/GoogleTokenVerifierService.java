package com.nutreBirth.service.Service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;

@Service
public class GoogleTokenVerifierService {

    private static final Logger log = LoggerFactory.getLogger(GoogleTokenVerifierService.class);

    @Value("${google.client-id}")
    private String clientId;

    public GoogleIdToken.Payload verify(String idTokenString) {
        log.debug("Starting Google token verification");
        
        try {
            if (clientId == null || clientId.isBlank()) {
                log.error("Google Client ID is missing or blank. Check GOOGLE_CLIENT_ID environment variable");
                throw new IllegalStateException("Missing GOOGLE_CLIENT_ID (google.client-id)");
            }
            
            if (idTokenString == null || idTokenString.isBlank()) {
                log.error("ID token string is missing or blank");
                throw new IllegalArgumentException("Missing idToken");
            }

            log.debug("Creating GoogleIdTokenVerifier with clientId: {}", clientId);
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                    new NetHttpTransport(),
                    new GsonFactory())
                    .setAudience(List.of(clientId))
                    .build();

            log.debug("Attempting to verify Google ID token");
            GoogleIdToken idToken = verifier.verify(idTokenString);

            if (idToken == null) {
                log.error("Google token verification returned null - token is invalid or expired");
                throw new RuntimeException("Invalid Google token");
            }

            GoogleIdToken.Payload payload = idToken.getPayload();
            log.info("Google token verified successfully for email: {}", payload.getEmail());
            return payload;

        } catch (IllegalStateException | IllegalArgumentException e) {
            log.error("Configuration or input error during Google token verification: {}", e.getMessage());
            throw new RuntimeException("Google token verification failed: " + e.getMessage(), e);
        } catch (java.security.GeneralSecurityException e) {
            log.error("Security error during Google token verification: {}", e.getMessage(), e);
            throw new RuntimeException("Google token verification failed due to security error", e);
        } catch (java.io.IOException e) {
            log.error("Network/IO error during Google token verification: {}", e.getMessage(), e);
            throw new RuntimeException("Google token verification failed due to network error", e);
        } catch (Exception e) {
            log.error("Unexpected error during Google token verification: {}", e.getMessage(), e);
            throw new RuntimeException("Google token verification failed", e);
        }
    }
}
