package com.formlab.ai.dto.input;

import java.util.List;
import java.util.UUID;

public record WorkoutExerciseData(
        UUID exerciseId,
        String exerciseName,
        Integer exerciseOrder,
        List<WorkoutSetData> sets
) {
}