package com.formlab.exercise.dto;

import java.util.UUID;

public record ExerciseListResponse(
        UUID id,
        String name
) {
}