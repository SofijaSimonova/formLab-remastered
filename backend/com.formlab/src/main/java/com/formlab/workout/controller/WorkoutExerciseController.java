package com.formlab.workout.controller;

import com.formlab.workout.dto.AddWorkoutExerciseRequest;
import com.formlab.workout.dto.WorkoutExerciseResponse;
import com.formlab.workout.service.WorkoutExerciseService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/workouts/{workoutId}/exercises")
public class WorkoutExerciseController {

    private final WorkoutExerciseService workoutExerciseService;

    public WorkoutExerciseController(
            WorkoutExerciseService workoutExerciseService
    ) {
        this.workoutExerciseService = workoutExerciseService;
    }

    @GetMapping
//    @PreAuthorize("@authorizationService.canAccessWorkout(#workoutId, authentication)")
    public List<WorkoutExerciseResponse> getWorkoutExercises(
            @PathVariable UUID workoutId
    ) {
        return workoutExerciseService.getWorkoutExercises(workoutId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("@authorizationService.canAccessWorkout(#workoutId, authentication)")
    public WorkoutExerciseResponse addExercise(
            @PathVariable UUID workoutId,
            @Valid @RequestBody AddWorkoutExerciseRequest request
    ) {
        return workoutExerciseService.addExercise(
                workoutId,
                request
        );
    }

    @DeleteMapping("/{workoutExerciseId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("@authorizationService.canAccessWorkoutExercise(#workoutExerciseId, authentication)")
    public void removeExercise(
            @PathVariable UUID workoutId,
            @PathVariable UUID workoutExerciseId
    ) {
        workoutExerciseService.removeExercise(
                workoutId,
                workoutExerciseId
        );
    }
}