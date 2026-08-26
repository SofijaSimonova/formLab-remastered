package com.formlab.workout.dto;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

public record WorkoutSetResponse(
        UUID id,
        UUID workoutExerciseId,
        Integer setNumber,
        BigDecimal weight,
        Integer reps,
        OffsetDateTime completedAt
) {
}