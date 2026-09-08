package com.formlab.workout.controller;

import com.formlab.workout.dto.CreateWorkoutSetRequest;
import com.formlab.workout.dto.WorkoutSetResponse;
import com.formlab.workout.service.WorkoutSetService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/workout-sessions/{workoutSessionId}/exercises/{workoutExerciseId}/sets")
public class WorkoutSetController {

    private final WorkoutSetService workoutSetService;

    public WorkoutSetController(
            WorkoutSetService workoutSetService
    ) {
        this.workoutSetService = workoutSetService;
    }

    @GetMapping
    @PreAuthorize(
            "@authorizationService.canAccessWorkoutSession(#workoutSessionId, authentication)"
    )
    public List<WorkoutSetResponse> getSets(
            @PathVariable UUID workoutSessionId,
            @PathVariable UUID workoutExerciseId
    ) {
        return workoutSetService.getSets(
                workoutSessionId,
                workoutExerciseId
        );
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize(
            "@authorizationService.canAccessWorkoutSession(#workoutSessionId, authentication)"
    )
    public WorkoutSetResponse addSet(
            @PathVariable UUID workoutSessionId,
            @PathVariable UUID workoutExerciseId,
            @Valid @RequestBody CreateWorkoutSetRequest request
    ) {
        return workoutSetService.addSet(
                workoutSessionId,
                workoutExerciseId,
                request
        );
    }

    @DeleteMapping("/{setId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize(
            "@authorizationService.canAccessWorkoutSession(#workoutSessionId, authentication)"
    )
    public void deleteSet(
            @PathVariable UUID workoutSessionId,
            @PathVariable UUID workoutExerciseId,
            @PathVariable UUID setId
    ) {
        workoutSetService.deleteSet(
                workoutSessionId,
                workoutExerciseId,
                setId
        );
    }
}