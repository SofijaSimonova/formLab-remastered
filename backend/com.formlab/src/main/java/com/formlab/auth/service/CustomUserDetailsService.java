package com.formlab.auth.service;

import com.formlab.auth.entity.UserCredential;
import com.formlab.auth.repository.UserCredentialRepository;
import com.formlab.auth.security.AuthenticatedUser;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import com.formlab.user.entity.UserRole;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserCredentialRepository userCredentialRepository;

    public CustomUserDetailsService(
            UserCredentialRepository userCredentialRepository
    ) {
        this.userCredentialRepository = userCredentialRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        UserCredential credential =
                userCredentialRepository
                        .findByUserEmailIgnoreCase(email)
                        .orElseThrow(() ->
                                new UsernameNotFoundException(
                                        "User not found"
                                )
                        );

        return new AuthenticatedUser(
                credential.getUser().getId(),
                credential.getUser().getEmail(),
                credential.getPasswordHash(),
                credential.getUser().getTokenVersion(),
                List.of(
                        new SimpleGrantedAuthority(
                                "ROLE_" +
                                        credential.getUser()
                                                .getRole()
                                                .name()
                        )
                )
        );
    }
}