package com.formlab.ai.dto.context;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

public record ExercisePerformanceSession(
        UUID sessionId,
        OffsetDateTime date,
        String workoutName,
        List<ExerciseSetPerformance> sets
) {
}