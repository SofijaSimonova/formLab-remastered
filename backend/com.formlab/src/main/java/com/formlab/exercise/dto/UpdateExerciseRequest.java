package com.formlab.exercise.dto;

import com.formlab.exercise.entity.ExerciseTrackingType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.Set;
import java.util.UUID;

public record UpdateExerciseRequest(

        @NotBlank
        @Size(max = 150)
        String name,

        @Size(max = 10000)
        String description,

        @Size(max = 10000)
        String instructions,

        @NotNull
        ExerciseTrackingType trackingType,

        @NotNull
        Set<UUID> bodyPartIds,

        @NotNull
        Set<UUID> equipmentIds,

        @NotNull
        Set<UUID> tagIds
) {
}