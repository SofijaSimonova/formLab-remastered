package com.formlab.workout.dto;

import com.formlab.workout.entity.enums.WorkoutSessionStatus;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

public record WorkoutSessionSummaryResponse(
        UUID sessionId,
        UUID workoutId,
        String workoutName,
        WorkoutSessionStatus status,
        OffsetDateTime startedAt,
        OffsetDateTime completedAt,
        long durationSeconds,
        int exerciseCount,
        int totalSets,
        BigDecimal totalVolume,
        List<WorkoutSessionExerciseSummaryResponse> exercises
) {
}