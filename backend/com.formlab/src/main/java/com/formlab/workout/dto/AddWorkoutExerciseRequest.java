package com.formlab.workout.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record AddWorkoutExerciseRequest(

        @NotNull
        UUID exerciseId,

        @NotNull
        @Min(1)
        Integer exerciseOrder,

        @Min(1)
        Integer targetSets,

        @Min(1)
        Integer targetReps
) {
}