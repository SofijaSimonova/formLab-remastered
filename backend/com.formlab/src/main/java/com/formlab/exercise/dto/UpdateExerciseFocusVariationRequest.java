package com.formlab.exercise.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateExerciseFocusVariationRequest(

        @NotBlank
        @Size(max = 100)
        String name,

        @Size(max = 10000)
        String description,

        @Size(max = 255)
        String animationReference
) {
}