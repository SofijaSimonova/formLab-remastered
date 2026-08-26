package com.formlab.exercise.dto;

import java.util.UUID;

public record UpdateExerciseRequest(
        String name,
        String description,
        String instructions,
        UUID movementPatternId
) {
}