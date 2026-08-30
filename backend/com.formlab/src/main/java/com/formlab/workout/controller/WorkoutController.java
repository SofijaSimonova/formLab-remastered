package com.formlab.workout.controller;

import com.formlab.security.AuthorizationService;
import com.formlab.workout.dto.CreateWorkoutRequest;
import com.formlab.workout.dto.UpdateWorkoutRequest;
import com.formlab.workout.dto.WorkoutResponse;
import com.formlab.workout.service.WorkoutService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/me/workouts")
public class WorkoutController {

    private final WorkoutService workoutService;
    private final AuthorizationService authorizationService;

    public WorkoutController(
            WorkoutService workoutService,
            AuthorizationService authorizationService
    ) {
        this.workoutService = workoutService;
        this.authorizationService = authorizationService;
    }

    @GetMapping
    public List<WorkoutResponse> getMyWorkouts(
            org.springframework.security.core.Authentication authentication
    ) {
        UUID userId =
                authorizationService.getCurrentUserId(authentication);

        return workoutService.getUserWorkouts(userId);
    }

    @GetMapping("/{workoutId}")
    @PreAuthorize("@authorizationService.canAccessWorkout(#workoutId, authentication)")
    public WorkoutResponse getWorkoutById(
            @PathVariable UUID workoutId
    ) {
        return workoutService.getWorkoutById(workoutId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public WorkoutResponse createWorkout(
            @Valid @RequestBody CreateWorkoutRequest request,
            org.springframework.security.core.Authentication authentication
    ) {
        UUID userId =
                authorizationService.getCurrentUserId(authentication);

        return workoutService.createWorkout(userId, request);
    }

    @PutMapping("/{workoutId}")
    @PreAuthorize("@authorizationService.canAccessWorkout(#workoutId, authentication)")
    public WorkoutResponse updateWorkout(
            @PathVariable UUID workoutId,
            @Valid @RequestBody UpdateWorkoutRequest request
    ) {
        return workoutService.updateWorkout(
                workoutId,
                request
        );
    }

    @DeleteMapping("/{workoutId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("@authorizationService.canAccessWorkout(#workoutId, authentication)")
    public void deleteWorkout(
            @PathVariable UUID workoutId
    ) {
        workoutService.deleteWorkout(workoutId);
    }
}