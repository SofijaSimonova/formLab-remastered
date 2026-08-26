package com.formlab.workout.dto;

import java.time.OffsetDateTime;
import java.util.UUID;

public record WorkoutResponse(
        UUID id,
        UUID userId,
        String name,
        String description,
        OffsetDateTime createdAt,
        OffsetDateTime updatedAt
) {
}