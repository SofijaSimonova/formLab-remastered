package com.formlab.progress.controller;

import com.formlab.progress.dto.PersonalRecordsResponse;
import com.formlab.progress.service.ProgressPersonalRecordsService;
import com.formlab.security.AuthorizationService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/me/progress")
public class ProgressPersonalRecordsController {

    private final ProgressPersonalRecordsService service;
    private final AuthorizationService authorizationService;

    public ProgressPersonalRecordsController(
            ProgressPersonalRecordsService service,
            AuthorizationService authorizationService
    ) {
        this.service = service;
        this.authorizationService = authorizationService;
    }

    @GetMapping("/personal-records")
    @PreAuthorize("isAuthenticated()")
    public PersonalRecordsResponse getPersonalRecords(
            Authentication authentication
    ) {
        UUID userId =
                authorizationService.getCurrentUserId(
                        authentication
                );

        return service.getPersonalRecords(userId);
    }
}