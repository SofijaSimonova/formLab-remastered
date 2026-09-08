package com.formlab.workout.dto;

import java.math.BigDecimal;
import java.util.UUID;

public record WorkoutSessionExerciseSummaryResponse(
        UUID workoutExerciseId,
        String exerciseName,
        Integer exerciseOrder,
        int totalSets,
        BigDecimal totalVolume,
        BigDecimal bestSetWeight,
        Integer bestSetReps
) {
}