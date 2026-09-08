package com.formlab.progress.controller;

import com.formlab.progress.dto.ProgressDataResponse;
import com.formlab.progress.service.ProgressDataService;
import com.formlab.security.AuthorizationService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/me/progress-data")
public class ProgressDataController {

    private final ProgressDataService progressDataService;
    private final AuthorizationService authorizationService;

    public ProgressDataController(
            ProgressDataService progressDataService,
            AuthorizationService authorizationService
    ) {
        this.progressDataService = progressDataService;
        this.authorizationService = authorizationService;
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ProgressDataResponse getProgressData(
            Authentication authentication
    ) {
        UUID userId =
                authorizationService.getCurrentUserId(
                        authentication
                );

        return progressDataService.getProgressData(userId);
    }
}