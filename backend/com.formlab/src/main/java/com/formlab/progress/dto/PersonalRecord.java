package com.formlab.progress.dto;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

public record PersonalRecord(
        UUID exerciseId,
        String exerciseName,
        BigDecimal value,
        Integer reps,
        OffsetDateTime achievedAt,
        UUID workoutSessionId,
        String workoutName
) {
}