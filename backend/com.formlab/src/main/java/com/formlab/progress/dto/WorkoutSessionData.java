package com.formlab.progress.dto;

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