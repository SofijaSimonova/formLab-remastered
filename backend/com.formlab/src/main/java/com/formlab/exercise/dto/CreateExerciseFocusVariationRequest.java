package com.formlab.exercise.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record CreateExerciseFocusVariationRequest(

        @NotNull
        UUID focusBodyPartId,

        @NotBlank
        @Size(max = 100)
        String name,

        @Size(max = 10000)
        String description,

        @Size(max = 255)
        String animationReference
) {
}