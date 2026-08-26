package com.formlab.exercise.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record CreateExerciseAlternativeRequest(
        @NotNull
        UUID alternativeExerciseId,

        @NotBlank
        String reason,

        @NotBlank
        String reverseReason
) {
}