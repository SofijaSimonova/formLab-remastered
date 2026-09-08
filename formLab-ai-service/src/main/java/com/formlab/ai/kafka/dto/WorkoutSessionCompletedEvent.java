package com.formlab.ai.kafka.dto;

import java.util.List;
import java.util.UUID;

public record WorkoutSessionCompletedEvent(
        UUID userId,
        List<UUID> exerciseIds
) {
}