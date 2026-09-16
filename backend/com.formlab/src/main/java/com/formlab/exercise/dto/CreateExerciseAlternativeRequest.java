package com.formlab.exercise.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record CreateExerciseAlternativeRequest(

        @NotNull
        UUID alternativeExerciseId,

        @NotBlank
        @Size(max = 255)
        String reason,

        @NotBlank
        @Size(max = 255)
        String reverseReason
) {
}