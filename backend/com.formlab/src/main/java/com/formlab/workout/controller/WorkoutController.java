package com.formlab.workout.controller;

import com.formlab.workout.dto.CreateWorkoutRequest;
import com.formlab.workout.dto.UpdateWorkoutRequest;
import com.formlab.workout.dto.WorkoutResponse;
import com.formlab.workout.service.WorkoutService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/users/{userId}/workouts")
public class WorkoutController {

    private final WorkoutService workoutService;

    public WorkoutController(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }

    @GetMapping
    public List<WorkoutResponse> getUserWorkouts(
            @PathVariable UUID userId
    ) {
        return workoutService.getUserWorkouts(userId);
    }

    @GetMapping("/{workoutId}")
    public WorkoutResponse getWorkoutById(
            @PathVariable UUID userId,
            @PathVariable UUID workoutId
    ) {
        return workoutService.getWorkoutById(userId, workoutId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public WorkoutResponse createWorkout(
            @PathVariable UUID userId,
            @Valid @RequestBody CreateWorkoutRequest request
    ) {
        return workoutService.createWorkout(userId, request);
    }

    @PutMapping("/{workoutId}")
    public WorkoutResponse updateWorkout(
            @PathVariable UUID userId,
            @PathVariable UUID workoutId,
            @Valid @RequestBody UpdateWorkoutRequest request
    ) {
        return workoutService.updateWorkout(
                userId,
                workoutId,
                request
        );
    }

    @DeleteMapping("/{workoutId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteWorkout(
            @PathVariable UUID userId,
            @PathVariable UUID workoutId
    ) {
        workoutService.deleteWorkout(
                userId,
                workoutId
        );
    }
}