package com.formlab.auth.service;

import com.formlab.auth.dto.ChangePasswordRequest;
import com.formlab.auth.dto.LoginRequest;
import com.formlab.auth.dto.LoginResponse;
import com.formlab.auth.dto.RegisterRequest;
import com.formlab.auth.entity.UserCredential;
import com.formlab.auth.repository.UserCredentialRepository;
import com.formlab.auth.security.AuthenticatedUser;
import com.formlab.common.exception.BadRequestException;
import com.formlab.common.exception.ResourceNotFoundException;
import com.formlab.user.dto.AppUserResponse;
import com.formlab.user.entity.AppUser;
import com.formlab.user.mapper.AppUserMapper;
import com.formlab.user.repository.AppUserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final AppUserRepository appUserRepository;
    private final UserCredentialRepository userCredentialRepository;
    private final AppUserMapper appUserMapper;
    private final PasswordEncoder passwordEncoder;

    public AuthService(
            AuthenticationManager authenticationManager,
            JwtService jwtService, AppUserRepository appUserRepository, UserCredentialRepository userCredentialRepository, AppUserMapper appUserMapper, PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.appUserRepository = appUserRepository;
        this.userCredentialRepository = userCredentialRepository;
        this.appUserMapper = appUserMapper;
        this.passwordEncoder = passwordEncoder;
    }

    public LoginResponse login(LoginRequest request) {

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.email(),
                                request.password()
                        )
                );

        AuthenticatedUser user =
                (AuthenticatedUser) authentication.getPrincipal();

        String token = jwtService.generateToken(
                user.getUserId(),
                user.getUsername(),
                user.getTokenVersion()
        );

        return new LoginResponse(token);
    }

    public AppUserResponse register(RegisterRequest request) {

        if (appUserRepository.existsByEmail(request.email())) {
            throw new BadRequestException("Email is already registered");
        }

        AppUser user = new AppUser();

        user.setId(UUID.randomUUID());
        user.setEmail(request.email());
        user.setFirstName(request.firstName());
        user.setLastName(request.lastName());

        AppUser savedUser = appUserRepository.save(user);

        UserCredential credential = new UserCredential();

        credential.setUser(savedUser);
        credential.setPasswordHash(
                passwordEncoder.encode(request.password())
        );

        userCredentialRepository.save(credential);

        return appUserMapper.toResponse(savedUser);
    }

    @Transactional
    public void changePassword(
            UUID userId,
            ChangePasswordRequest request
    ) {
        UserCredential credential =
                userCredentialRepository.findByUserId(userId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "User credentials not found"
                                )
                        );

        if (!passwordEncoder.matches(
                request.currentPassword(),
                credential.getPasswordHash()
        )) {
            throw new BadRequestException(
                    "Current password is incorrect"
            );
        }

        if (passwordEncoder.matches(
                request.newPassword(),
                credential.getPasswordHash()
        )) {
            throw new BadRequestException(
                    "New password must be different from current password"
            );
        }

        credential.setPasswordHash(
                passwordEncoder.encode(
                        request.newPassword()
                )
        );

        AppUser user = credential.getUser();

        user.setTokenVersion(
                user.getTokenVersion() + 1
        );

        userCredentialRepository.save(credential);
    }
}