package com.formlab.workout.controller;

import com.formlab.workout.dto.WorkoutSessionHistoryResponse;
import com.formlab.workout.service.WorkoutSessionService;
import com.formlab.security.AuthorizationService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/me/workout-sessions")
public class WorkoutHistoryController {

    private final WorkoutSessionService workoutSessionService;
    private final AuthorizationService authorizationService;

    public WorkoutHistoryController(
            WorkoutSessionService workoutSessionService,
            AuthorizationService authorizationService
    ) {
        this.workoutSessionService = workoutSessionService;
        this.authorizationService = authorizationService;
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public Page<WorkoutSessionHistoryResponse> getHistory(
            Authentication authentication,
            @PageableDefault(size = 20, sort = "startedAt")
            Pageable pageable
    ) {
        UUID userId = authorizationService.getCurrentUserId(authentication);

        return workoutSessionService.getHistory(userId, pageable);
    }
}