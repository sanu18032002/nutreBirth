package com.nutreBirth.service.security;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.nutreBirth.service.Service.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    @Value("${app.auth.cookie-name:nb_auth}")
    private String cookieName;

    public JwtAuthenticationFilter(
            JwtService jwtService,
            CustomUserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        String requestUri = request.getRequestURI();
        log.debug("JwtAuthenticationFilter processing request: {} {}", request.getMethod(), requestUri);

        String jwt = extractJwtFromCookie(request);

        // No token → continue (SecurityConfig decides if endpoint is protected)
        if (jwt == null) {
            log.debug("No JWT cookie found for request: {}", requestUri);
            filterChain.doFilter(request, response);
            return;
        }

        log.debug("JWT cookie found, attempting authentication for request: {}", requestUri);

        try {
            String userId = jwtService.getUserId(jwt);
            log.debug("Successfully extracted userId from JWT: {}", userId);

            if (SecurityContextHolder.getContext().getAuthentication() == null) {

                var userDetails = userDetailsService.loadUserByUsername(userId);
                log.debug("Loaded user details for userId: {}", userId);

                var authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities());

                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authToken);
                log.debug("Authentication set successfully for userId: {}", userId);
            } else {
                log.debug("Authentication already exists in SecurityContext");
            }

        } catch (io.jsonwebtoken.ExpiredJwtException ex) {
            log.warn("Expired JWT token for request {}: {}", requestUri, ex.getMessage());
            SecurityContextHolder.clearContext();
        } catch (io.jsonwebtoken.MalformedJwtException ex) {
            log.warn("Malformed JWT token for request {}: {}", requestUri, ex.getMessage());
            SecurityContextHolder.clearContext();
        } catch (io.jsonwebtoken.security.SignatureException ex) {
            log.warn("Invalid JWT signature for request {}: {}", requestUri, ex.getMessage());
            SecurityContextHolder.clearContext();
        } catch (org.springframework.security.core.userdetails.UsernameNotFoundException ex) {
            log.warn("User not found during JWT authentication for request {}: {}", requestUri, ex.getMessage());
            SecurityContextHolder.clearContext();
        } catch (Exception ex) {
            log.error("Unexpected error during JWT authentication for request {}: {}", requestUri, ex.getMessage(), ex);
            SecurityContextHolder.clearContext();
        }

        filterChain.doFilter(request, response);
    }

    /**
     * Extract JWT from HTTP-only cookie
     */
    private String extractJwtFromCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null)
            return null;

        for (Cookie cookie : cookies) {
            if (cookieName.equals(cookie.getName())) {
                return cookie.getValue();
            }
        }
        return null;
    }
}