package com.formlab.workout.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record CreateWorkoutSetRequest(

        @NotNull
        @Min(1)
        Integer setNumber,

        @Min(0)
        BigDecimal weight,

        @NotNull
        @Min(1)
        Integer reps
) {
}