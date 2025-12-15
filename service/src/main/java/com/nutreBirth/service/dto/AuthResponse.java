package com.nutreBirth.service.dto;

import com.nutreBirth.service.Entity.User;

public record AuthResponse(String token, User user) {}
