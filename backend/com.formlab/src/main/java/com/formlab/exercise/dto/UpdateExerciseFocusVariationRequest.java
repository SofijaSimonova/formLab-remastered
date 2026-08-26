package com.formlab.exercise.dto;

import jakarta.validation.constraints.NotBlank;

public record UpdateExerciseFocusVariationRequest(
        @NotBlank
        String name,

        String description,

        String animationReference
) {
}