package com.formlab.workout.dto;

import com.formlab.workout.entity.enums.WorkoutSessionStatus;

import java.time.OffsetDateTime;
import java.util.UUID;

public record CreateWorkoutSessionResponse(
        UUID id,
        UUID workoutId,
        WorkoutSessionStatus status,
        OffsetDateTime startedAt,
        OffsetDateTime completedAt
) {
}