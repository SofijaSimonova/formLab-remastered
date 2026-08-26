package com.formlab.exercise.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record CreateExerciseFocusVariationRequest(
        @NotNull
        UUID focusBodyPartId,

        @NotBlank
        String name,

        String description,

        String animationReference
) {
}