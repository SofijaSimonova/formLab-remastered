package com.formlab.progress.dto;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

public record WorkoutSetData(
        UUID setId,
        Integer setNumber,
        BigDecimal weight,
        Integer reps,
        OffsetDateTime completedAt
) {
}