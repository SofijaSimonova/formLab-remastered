package com.formlab.ai.dto.context;

import java.util.List;
import java.util.UUID;

public record ExercisePerformanceData(
        UUID exerciseId,
        String exerciseName,
        List<ExercisePerformanceSession> sessions
) {
}