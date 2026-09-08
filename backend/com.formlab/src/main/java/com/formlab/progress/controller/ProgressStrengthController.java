package com.formlab.progress.controller;

import com.formlab.progress.dto.StrengthProgressRange;
import com.formlab.progress.dto.StrengthProgressResponse;
import com.formlab.progress.service.ProgressStrengthService;
import com.formlab.security.AuthorizationService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;

import java.util.UUID;

@RestController
@RequestMapping("/api/me/progress")
public class ProgressStrengthController {

    private final ProgressStrengthService progressStrengthService;
    private final AuthorizationService authorizationService;

    public ProgressStrengthController(
            ProgressStrengthService progressStrengthService,
            AuthorizationService authorizationService
    ) {
        this.progressStrengthService =
                progressStrengthService;
        this.authorizationService =
                authorizationService;
    }

    @GetMapping("/strength")
    @PreAuthorize("isAuthenticated()")
    public StrengthProgressResponse getStrengthProgress(
            Authentication authentication,
            @RequestParam UUID exerciseId,
            @RequestParam StrengthProgressRange range
    ) {
        UUID userId =
                authorizationService.getCurrentUserId(
                        authentication
                );

        return progressStrengthService.getStrengthProgress(
                userId,
                exerciseId,
                range
        );
    }
}