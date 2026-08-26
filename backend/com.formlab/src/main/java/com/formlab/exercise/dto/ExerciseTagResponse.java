package com.formlab.exercise.dto;

import java.util.UUID;

public record ExerciseTagResponse(
        UUID id,
        String name
) {
}