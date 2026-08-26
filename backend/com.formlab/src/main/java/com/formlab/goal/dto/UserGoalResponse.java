package com.formlab.goal.dto;

import java.time.OffsetDateTime;
import java.util.UUID;

public record UserGoalResponse(
        UUID id,
        UUID userId,
        UUID goalId,
        String goalName,
        OffsetDateTime createdAt
) {
}