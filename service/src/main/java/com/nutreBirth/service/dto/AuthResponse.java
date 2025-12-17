package com.nutreBirth.service.dto;

import com.nutreBirth.service.Entity.User;

public class AuthResponse {
    private String token;
    private UserResponse user;

    public AuthResponse(String token, User user) {
        this.token = token;
        this.user = new UserResponse(user);
    }

    public String getToken() {
        return token;
    }

    public UserResponse getUser() {
        return user;
    }
}