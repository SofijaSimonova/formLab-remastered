package com.formlab.user.controller;

import com.formlab.security.AuthorizationService;
import com.formlab.user.dto.AppUserResponse;
import com.formlab.user.dto.UpdateAppUserRequest;
import com.formlab.user.service.AppUserService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class AppUserController {

    private final AppUserService appUserService;
    private final AuthorizationService authorizationService;

    public AppUserController(
            AppUserService appUserService,
            AuthorizationService authorizationService
    ) {
        this.appUserService = appUserService;
        this.authorizationService = authorizationService;
    }

    @GetMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public AppUserResponse getCurrentUser(
            Authentication authentication
    ) {
        return appUserService.getUserById(
                authorizationService.getCurrentUserId(authentication)
        );
    }

    @PutMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public AppUserResponse updateCurrentUser(
            Authentication authentication,
            @Valid @RequestBody UpdateAppUserRequest request
    ) {
        return appUserService.updateUser(
                authorizationService.getCurrentUserId(authentication),
                request
        );
    }
}