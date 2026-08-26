package com.formlab.exercise.dto;

import java.util.UUID;

public record ExerciseAlternativeResponse(
        UUID id,
        UUID exerciseId,
        UUID alternativeExerciseId,
        String alternativeExerciseName,
        String reason
) {
}