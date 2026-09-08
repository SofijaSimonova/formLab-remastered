package com.formlab.ai.dto.input;

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