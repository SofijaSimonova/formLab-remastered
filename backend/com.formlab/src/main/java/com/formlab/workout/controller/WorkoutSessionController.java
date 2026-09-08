package com.formlab.workout.controller;

import com.formlab.workout.dto.CreateWorkoutSessionResponse;
import com.formlab.workout.dto.WorkoutSessionHistoryResponse;
import com.formlab.workout.dto.WorkoutSessionSummaryResponse;
import com.formlab.workout.service.WorkoutSessionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/workouts/{workoutId}/sessions")
public class WorkoutSessionController {

    private final WorkoutSessionService workoutSessionService;

    public WorkoutSessionController(
            WorkoutSessionService workoutSessionService
    ) {
        this.workoutSessionService = workoutSessionService;
    }



    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize(
            "@authorizationService.canAccessWorkout(#workoutId, authentication)"
    )
    public CreateWorkoutSessionResponse startSession(
            @PathVariable UUID workoutId
    ) {
        return workoutSessionService.startSession(workoutId);
    }
    @GetMapping("/{sessionId}")
    @PreAuthorize(
            "@authorizationService.canAccessWorkoutSession(#sessionId, authentication)"
    )
    public CreateWorkoutSessionResponse getSession(
            @PathVariable UUID workoutId,
            @PathVariable UUID sessionId
    ) {
        return workoutSessionService.getSession(sessionId);
    }

    @PostMapping("/{sessionId}/complete")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize(
            "@authorizationService.canAccessWorkoutSession(#sessionId, authentication)"
    )
    public CreateWorkoutSessionResponse completeSession(
            @PathVariable UUID workoutId,
            @PathVariable UUID sessionId
    ) {
        return workoutSessionService.completeSession(sessionId);
    }

    @PostMapping("/{sessionId}/abandon")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize(
            "@authorizationService.canAccessWorkoutSession(#sessionId, authentication)"
    )
    public CreateWorkoutSessionResponse abandonSession(
            @PathVariable UUID workoutId,
            @PathVariable UUID sessionId
    ) {
        return workoutSessionService.abandonSession(sessionId);
    }

    @GetMapping("/{sessionId}/summary")
    @PreAuthorize(
            "@authorizationService.canAccessWorkout(#workoutId, authentication)"
    )
    public WorkoutSessionSummaryResponse getSessionSummary(
            @PathVariable UUID workoutId,
            @PathVariable UUID sessionId
    ) {
        return workoutSessionService.getSessionSummary(
                workoutId,
                sessionId
        );
    }
}