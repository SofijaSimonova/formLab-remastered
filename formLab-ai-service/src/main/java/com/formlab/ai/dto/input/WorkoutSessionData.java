package com.formlab.ai.dto.input;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

public record WorkoutSessionData(
        UUID sessionId,
        UUID workoutId,
        String workoutName,
        OffsetDateTime startedAt,
        OffsetDateTime completedAt,
        List<WorkoutExerciseData> exercises
) {
}