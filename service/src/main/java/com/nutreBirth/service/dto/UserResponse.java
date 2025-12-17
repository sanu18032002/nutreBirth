package com.nutreBirth.service.dto;

import com.nutreBirth.service.Entity.User;

public class UserResponse {
    private final String email;
    private final String name;
    private final String plan;

    public UserResponse(User user) {
        this.email = user.getEmail();
        this.name = user.getName();
        this.plan = user.getPlan().name();
    }

    public String getEmail() {
        return email;
    }
    public String getName() {
        return name;
    }
    public String getPlan() {
        return plan;
    }

}
