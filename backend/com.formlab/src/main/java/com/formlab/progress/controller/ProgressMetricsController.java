package com.formlab.progress.controller;

import com.formlab.progress.dto.ProgressMetricsResponse;
import com.formlab.progress.service.ProgressMetricsService;
import com.formlab.security.AuthorizationService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/me/progress")
public class ProgressMetricsController {

    private final ProgressMetricsService progressMetricsService;
    private final AuthorizationService authorizationService;

    public ProgressMetricsController(
            ProgressMetricsService progressMetricsService,
            AuthorizationService authorizationService
    ) {
        this.progressMetricsService = progressMetricsService;
        this.authorizationService = authorizationService;
    }

    @GetMapping("/metrics")
    @PreAuthorize("isAuthenticated()")
    public ProgressMetricsResponse getMetrics(
            Authentication authentication
    ) {
        UUID userId =
                authorizationService.getCurrentUserId(
                        authentication
                );

        return progressMetricsService.getMetrics(userId);
    }
}