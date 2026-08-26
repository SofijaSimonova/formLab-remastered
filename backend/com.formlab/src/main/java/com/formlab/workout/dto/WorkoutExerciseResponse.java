package com.formlab.workout.dto;

import java.util.UUID;

public record WorkoutExerciseResponse(
        UUID id,
        UUID workoutId,
        UUID exerciseId,
        String exerciseName,
        Integer exerciseOrder,
        Integer targetSets,
        Integer targetReps
) {
}