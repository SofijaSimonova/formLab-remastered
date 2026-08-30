package com.formlab.user.controller;

import com.formlab.user.dto.AppUserResponse;
import com.formlab.user.dto.UpdateAppUserRequest;
import com.formlab.user.service.AppUserService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class AppUserController {

    private final AppUserService appUserService;

    public AppUserController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @GetMapping("/{id}")
    @PreAuthorize("@authorizationService.isCurrentUser(#id, authentication)")
    public AppUserResponse getUserById(
            @PathVariable UUID id
    ) {
        return appUserService.getUserById(id);
    }

    @PutMapping("/{id}")
    @PreAuthorize("@authorizationService.isCurrentUser(#id, authentication)")
    public AppUserResponse updateUser(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateAppUserRequest request
    ) {
        return appUserService.updateUser(id, request);
    }
}