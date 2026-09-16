package com.formlab.workout.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateWorkoutRequest(

        @NotBlank
        @Size(max = 150)
        String name,

        @Size(max = 10000)
        String description
) {
}