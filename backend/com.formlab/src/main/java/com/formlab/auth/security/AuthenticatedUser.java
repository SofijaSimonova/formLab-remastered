package com.formlab.auth.security;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;
import java.util.UUID;

@Getter
public class AuthenticatedUser extends User {

    private final UUID userId;

    public AuthenticatedUser(
            UUID userId,
            String email,
            String password,
            Collection<? extends GrantedAuthority> authorities
    ) {
        super(email, password, authorities);
        this.userId = userId;
    }

}