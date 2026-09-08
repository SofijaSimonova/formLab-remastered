package com.formlab.workout.dto;

import com.formlab.workout.entity.enums.WorkoutSessionStatus;

import java.time.OffsetDateTime;
import java.util.UUID;

public record WorkoutSessionHistoryResponse(
        UUID sessionId,
        UUID workoutId,
        String workoutName,
        WorkoutSessionStatus status,
        OffsetDateTime startedAt,
        OffsetDateTime completedAt,
        Long durationSeconds,
        UUID resumeWorkoutExerciseId
) {
}